<?php
error_reporting(E_ALL);
require_once("_functions.php"); 


$hostname="db507580314.db.1and1.com";
$database="db507580314";
$username="dbo507580314";
$password="edgan1neuseeland";
$mysqli2 = new mysqli($hostname, $username, $password, $database);
if ($mysqli2->connect_errno)
{
    echo sprintf('<p>Could not connect to MySQL: %s</p>', $mysqli2->connect_error);
    exit();
}
if ($stmt = $mysqli2->prepare("SELECT `imdbID` from `media_movies`")) {
    $stmt->execute();
    $stmt->store_result();
    $stmt->bind_result($m);
    $i = 0;
    $numrows = $stmt->num_rows;
    while ($i < $numrows) {
    echo(sprintf("%d/%d: ", $i+1, $numrows));
        $stmt->fetch();
        process($m);
        $i++;
    }
}

/*$mlist = array("tt0463854", "tt0062803", "tt0054047");
foreach($mlist as $i => $m) {
    process($m);
}
*/


function process ($searchstr) {
$hostname="db507580314.db.1and1.com";
$database="db507580314";
$username="dbo507580314";
$password="edgan1neuseeland";
$mysqli = new mysqli($hostname, $username, $password, $database);
if ($mysqli->connect_errno)
{
    echo sprintf('<p>Could not connect to MySQL: %s</p>', $mysqli->connect_error);
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
            echo ($searchstr . ' - Title is empty
                ');
        } else {
            //$sql = "INSERT INTO `media_movies` (`Title`, `Original_Title`, `Year`, `Genre`, `Rating`, `Summary`, `imdbID`) VALUES (?,?,?,?,?,?,?)";
            $sql = "UPDATE `media_movies` SET `Title`=?, `Original_Title`=?, `Year`=?, `Genre`=?, `Rating`=?, `Summary`=?, `imdbID`=? WHERE `imdbID`=?";
            $stmt = $mysqli->prepare($sql);
            $stmt->bind_param('ssisdsss',
                $title,
                $title,
                $year,
                $genre,
                $rating,
                $plot, 
                $imdbid, 
                $imdbid);
            //echo "<code>$badquery</code><br />";
            //echo "<p><code>$query</code></p>";
            $result = $stmt->execute();
            if ($mysqli->affected_rows) {
                echo($searchstr . ' - Success (' . $title . ')
                    ');
            } else {
                echo($searchstr . ' - No rows affected (' . $title . ')
                    ');
            }
        }
    }
}
