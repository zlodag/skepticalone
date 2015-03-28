<?php
include('./_functions.php');
$id = substr($_POST["id"], 1);
$type = $_POST["type"];

include('../_connect.php');

if ($type == "Completed" OR $type == "Active") {
    $query1 = sprintf("UPDATE `todo_main` SET `%s` = !`%s` WHERE `Index` = %d", $type, $type, $id);
    $mysqli->query($query1);
}
else {
    exit("Error: type incorrect");
};
$query2 = sprintf("SELECT `%s`, `%s`, `%s` FROM `todo_main` WHERE `Index` = %d", 'Priority', 'Completed', 'Active', $id);
$result2 = $mysqli->query($query2);
$r = $result2->fetch_assoc();
echo sprintf('p%d c%d a%d', $r['Priority'], $r['Completed'], $r['Active']);
?>
