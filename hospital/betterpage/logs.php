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
<table>
<?php
date_default_timezone_set("Pacific/Auckland");
include('../../_connect.php');
$result=$mysqli->query("SELECT * FROM `page_log` ORDER BY `ts` DESC");
echo "<tr>";
foreach (["Timestamp","To","Message","Caller","Phone","Within (mins)","Patient","NHI","Ward","Bed","Why","Details"] as $title) {
    printf("<th>%s</th>", $title);
}
echo "</tr>";
while ($row = $result->fetch_assoc()) {
    echo "<tr>";
    foreach (["ts","no","msg","caller","phone","within","patient","nhi","ward","bed","why","details"] as $k) {
        printf ("<td>%s</td>", htmlspecialchars($row[$k]));
    }
    echo "</tr>";
}
?>
</table>
</body>
</html>
