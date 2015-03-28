<?php
error_reporting(E_ALL);
require_once("_functions.php"); 
require_once("../_connect.php");
if (isset ($_GET["search"])) {
    $searchstr = $_GET["search"];
} else {
    echo "<p>No search string set</p>";
    exit();
}

if (preg_match('/^tt[0-9]{7}$/',$searchstr)) {

    $json = file_get_contents(sprintf("http://www.omdbapi.com/?i=%s&plot=full", $searchstr));
    $movie = json_decode($json);
    $title = $movie->Title;
    $year = $movie->Year;
    $genre = $movie->Genre;
    $rating = $movie->imdbRating;
    $plot = $movie->Plot;
    //$url = "http://www.imdb.com/title/" . $movie->imdbID;
    $imdbid = $movie->imdbID;
    //$badurl = sprintf("http://akas.imdb.com/title/%s/", $movie->imdbID);
    //$badurl = sprintf("http://www.imdb.com/title/%s", $movie->imdbID);
    if ($title == '') {
        echo ('<p>Title is empty</p>');
    } else {
        $sql = "INSERT INTO `media_movies` (`Title`, `Original_Title`, `Year`, `Genre`, `Rating`, `Summary`, `imdbID`) VALUES (?,?,?,?,?,?,?)";
//        $sql = "UPDATE `media_movies` SET `Title`=?, `Original_Title`=?, `Year`=?, `Genre`=?, `Rating`=?, `Summary`=?, `imdbID`=? WHERE `imdbID`=?";
        $stmt = $mysqli->prepare($sql);
        $stmt->bind_param('ssisdss',
            $title,
            $title,
            $year,
            $genre,
            $rating,
            $plot, 
            $imdbid);
        //echo "<code>$badquery</code><br />";
        //echo "<p><code>$query</code></p>";
        $result = $stmt->execute();
        if ($mysqli->affected_rows AND (isset($_GET["auto"]))) {
            echo('1');
        } elseif ($mysqli->affected_rows) {
?>
            <script type="text/javascript">
<?php
            //echo(sprintf("window.location = \"/movies?search=%s&limit=1\"", $imdbid));
            echo('window.location = "/movies?order1=Added&limit=1"');
            //window.location = "/movies?order1=Added&limit=1";
?>
            </script>
<?php
        } else {
            //echo sprintf("<p>Error: %s</p>", $stmt->error);
            echo('0');
        }
    }
}
else { 
    //echo ("Search String: \"$searchstr\"<br />");
    $jsonlist = file_get_contents(sprintf("http://www.omdbapi.com/?s=%s", urlencode($searchstr)));
    $movielist = json_decode($jsonlist);
    if ((isset($movielist->Response)) AND $movielist->Response == "False") {
        echo sprintf("<p>No results found for search string: '%s'</p>", $searchstr);
    } else {
        foreach ($movielist->Search as $res) {
            $mid = $res->imdbID;
            $name = $res->Title;
            $year = $res->Year;
            echo sprintf('<a href="omdb.php?search=%s">%s</a> (%d)<br />', $mid, $name, $year);
        }
    }
}
if (!isset($_GET["auto"])) {echo('<p><a href="/movies?order1=Added&limit=1">Back</a></p>');}
