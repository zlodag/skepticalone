<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Page Log</title>
<link rel="icon" type="image/x-icon" href="favicon.ico">
<style>
td,th {border: 1px solid black;}
table {border-collapse: collapse;}
</style>
</head>
<body>
<table><tr>
<th>Timestamp</th>
<th>To</th>
<th>Message</th>
<th>Caller</th>
<th>Phone</th>
<th>Within</th>
<th>Patient</th>
<th>NHI</th>
<th>Ward</th>
<th>Bed</th>
<th>Why</th>
<th>Details</th>
</tr>
<?php
date_default_timezone_set("Pacific/Auckland");
include('../../_connect.php');
$result=$mysqli->query("SELECT * FROM `page_log`");
while ($row = $result->fetch_assoc()) {
    print ("<tr>");
    foreach (["ts","no","msg","caller","phone","within","patient","nhi","ward","bed","why","details"] as $k) {
        printf ("<td>%s</td>", $row[$k]);
    }
    print ("</tr>");
}
?>
</table>
</body>
</html>
<?
