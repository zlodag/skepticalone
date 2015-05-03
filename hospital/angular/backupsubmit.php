<?php
header('Content-type: application/json');
include('../../_connect.php');
$data = json_decode(file_get_contents("php://input"));

echo json_encode($data);
exit;

$filename = "pages.txt";
$maxlength = 128;

$specialty = $data->params->specialty;
$shift = $data->params->shift;

$stmt = $mysqli->prepare("INSERT IGNORE INTO xxx (specialty,shift,date) VALUES (?,?,?)");
$stmt->bind_param('iis',$specialty,$shift,$date);
$stmt->execute();
$stmt->close();

echo json_encode($obj);