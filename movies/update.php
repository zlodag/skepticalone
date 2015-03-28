<?php
include('./_functions.php');
$id = substr($_POST["id"], 1);
$type = $_POST["type"];

include('../_connect.php');

if ($type == "Seen" OR $type == "Flagged" OR $type == "Owned") {
    $stmt = $mysqli->prepare(sprintf("UPDATE `media_movies` SET `%s` = !`%s` WHERE `Index` = ?", $type, $type));
    $stmt->bind_param('d', $id);
    $stmt->execute();
    //$query1 = sprintf("UPDATE `media_movies` SET `%s` = !`%s` WHERE `Index` = %d", $type, $type, $id);
    //$mysqli->query($query1);
}
elseif ($type == "Delete") {
    $stmt = $mysqli->prepare('DELETE FROM `media_movies` WHERE `Index` = ? LIMIT 1'); 
    $stmt->bind_param('d', $id);
    $stmt->execute();
    exit('D');
}
elseif ($type != "Summary") {
    exit("Error: type incorrect");
};
$stmt2 = $mysqli->prepare(sprintf("SELECT `%s` FROM `media_movies` WHERE `Index` = ?", $type));
$stmt2->bind_param('d', $id);
$stmt2->execute();
$stmt2->bind_result($r);
$stmt2->fetch();
echo ajaxformat($r);
//$query2 = sprintf("SELECT `%s` FROM `media_movies` WHERE `Index` = %d", $type, $id);
//$result2 = $mysqli->query($query2);
//$r = $result2->fetch_assoc();
//echo ajaxformat($r[$type]);
