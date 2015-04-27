<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name=viewport content="width=device-width, initial-scale=1">
<title>
<?php
if ( isset($title)) {
    echo $title;
} else {
    echo 'Skepticalone';
}
?>
</title>
<link rel="icon" type="image/x-icon" href="icon.png" />
<link rel="stylesheet" type="text/css" href="/style.css" />
<link rel="stylesheet" type="text/css" href="/navbar.css" />
<?php
if (isset($head)) {
    echo $head;
}
?>
</head>
<body>
<?php
include('_ul.html');
?>
<div id="main">
<?php
if (isset($target)) {
    include ($target);
}
?>
</div>
<div id="valid">
<a href="http://validator.w3.org/check?uri=referer"><img
 src="http://www.w3.org/html/logo/downloads/HTML5_Badge_32.png" alt="HTML5 Validator" /></a>
<a href="http://jigsaw.w3.org/css-validator/check/referer"><img 
 src="http://jigsaw.w3.org/css-validator/images/vcss" alt="CSS Validator" /></a>
</div>
</body>
</html>
