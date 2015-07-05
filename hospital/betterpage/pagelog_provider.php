<?php
header('Content-Type: application/json');
if (array_key_exists('hours',$_GET)) {$hours = intval($_GET['hours']);} else {exit;}
date_default_timezone_set("Pacific/Auckland");
include('../../_connect.php');
$stmt = $mysqli->prepare("
    SELECT UNIX_TIMESTAMP(`ts`),`no`,`msg`,`caller`,`phone`,`within`,`patient`,`nhi`,`ward`,`bed`,`why`,`details`
    FROM `page_log`
    WHERE `ts` > NOW()-INTERVAL ? HOUR
    ORDER BY `ts` DESC");
$stmt->bind_param('i',$hours);
$stmt->execute();
$stmt->bind_result(
    $ts,
    $no,
    $msg,
    $caller,
    $phone,
    $within,
    $patient,
    $nhi,
    $ward,
    $bed,
    $why,
    $details
);
$rows = [];
while($stmt->fetch()) {
    $data = [
        "ptpage" => $nhi ? true : false,
        "no" => $no,
    ];
    if ($data["ptpage"]) {
        $data["caller"] = $caller;
        $data["phone"] = $phone;
        $data["reply"] = $within ? true : false;
        if ($data["reply"]) {$data["within"] = $within;}
        $data["patient"] = $patient;
        $data["nhi"] = $nhi;
        $data["ward"] = $ward;
        $data["bed"] = $bed;
        $data["why"] = $why;
        $data["details"] = $details;
    } else {
        $data["contents"] = $msg;
    }
    $rows[] = [
        "data" => $data,
        "ts" => $ts
    ];
}
$stmt->close();
echo json_encode($rows);