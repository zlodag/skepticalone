<?php
require_once("imdbsearch.class.php");
require_once("imdb.class.php");
include('../_connect.php');
$movie = new imdb('0112573');
$tmp = $movie->plot_split();
$plot = $tmp[0]['plot'];
//$plot = 'William Wallace&#x27;s';
printf ("%s
%s
", $plot, $mysqli->real_escape_string($plot));
?>
