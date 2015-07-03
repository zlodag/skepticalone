<?php
date_default_timezone_set("Pacific/Auckland");
include('../../_connect.php');
echo json_encode($mysqli->query("
    SELECT `ts`,`no`,`msg`,`caller`,`phone`,`within`,`patient`,`nhi`,`ward`,`bed`,`why`,`details`
    FROM `page_log`
    ORDER BY `ts` DESC")->fetch_all(MYSQLI_ASSOC));
exit;