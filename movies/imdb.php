<?php
error_reporting(E_ALL);
require_once("_functions.php"); 
require_once("../_connect.php");
require_once("imdbphp2/imdbsearch.class.php"); 
require_once("imdbphp2/imdb.class.php"); 
if (isset ($_GET["imdbid"]) && preg_match('/^[0-9]+$/',$_GET["imdbid"])) {
    $imdbid = $_GET["imdbid"];
    $movie = new imdb($imdbid);
    $plots = $movie->plot();
    $title = $movie->title();
    $year = $movie->year();
    $genre = $movie->genre();
    $rating = $movie->rating();
    $plotoutline = $movie->plotoutline();
    $plots = $movie->plot();
    if (!empty($plots)) {
        $plot = $plots[0];
    } elseif (!empty($plotoutline)) {
        $plot = $plotoutline;
    } else {
        $plot = NULL;
    }
    $url = $movie->main_url();
    if ($title == '') {
        echo ('<p>Title is empty</p>');
    } else {
        $sql = "INSERT INTO `media_movies` (`Title`, `Original_Title`, `Year`, `Genre`, `Rating`, `Summary`, `URL`) VALUES (?,?,?,?,?,?,?)";
        $stmt = $mysqli->prepare($sql);
        $stmt->bind_param('ssisdss',
            $title,
            $title,
            $year,
            $genre,
            $rating,
            $plot, 
            $url
        );
        //echo "<code>$badquery</code><br />";
        //echo "<p><code>$query</code></p>";
        $result = $stmt->execute();
        if ($result) {
?>
            <script type="text/javascript">
            window.location = "/movies?order1=Added&limit=1";
            </script>
<?php
    } else {
        echo sprintf("<p>Error: %s</p>", $stmt->error);
    }
}
} elseif (isset($_GET['search'])) { 
    $name = $_GET['search']; 
    echo "Search String: \"$name\"<br />";
    $search = new imdbsearch(); 
    $search->setsearchname($name); 
    $results = $search->results(); 
    foreach ($results as $res) {
        $mid = $res->imdbid();
        $name = $res->title();
        $year = $res->year();
        echo sprintf('<a href="imdb.php?imdbid=%s">%s</a> (%d)<br />', $mid, $name, $year);
    };
} else {
    echo "<p>No search string set</p>";
};
?>
<p><a href="/movies?order1=Added&limit=1">Back</a></p>
