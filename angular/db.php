<?php
date_default_timezone_set('Pacific/Auckland');
header('Content-type: application/json');
include('../_connect.php');
$data = json_decode(file_get_contents("php://input"));

switch($data->str) {

case "initial":
    $stmt = $mysqli->prepare("select shift,description from audit_shifts order by shift asc");
    $stmt->execute();
    $stmt->bind_result($shift,$description);
    while ($stmt->fetch()) {
        $obj["shift"][] = [$shift,$description];
    }
    $stmt->close();

    $stmt = $mysqli->prepare("select specialty,name from audit_specialties order by specialty asc");
    $stmt->execute();
    $stmt->bind_result($specialty,$name);
    while ($stmt->fetch()) {
        $obj["specialty"][] = [$specialty,$name];
    }
    $stmt->close();

    $stmt = $mysqli->prepare("select person,name from audit_team order by person asc");
    $stmt->execute();
    $stmt->bind_result($person,$name);
    while ($stmt->fetch()) {
        $obj["person"][] = [$person,$name];
    }
    $stmt->close();

    break;

case "rows":
    $stmt = $mysqli->prepare('SELECT
        `pages`.`page_id`,
        `team`.`name`,
        `specialties`.`name`,
        `shifts`.`description`,
        DATE_FORMAT(`sessions`.`date`,"%d/%m/%Y"),
        `pages`.`text`,
        TIME_FORMAT(`pages`.`received`,"%H:%i"),
        `pages`.`urgent`,
        `pages`.`required`,
        `pages`.`repeat`
        FROM `audit_pages` `pages`
        JOIN `audit_sessions` `sessions` USING (`session`)
        JOIN `audit_shifts` `shifts` USING (`shift`)
        JOIN `audit_specialties` `specialties` USING (`specialty`)
        JOIN `audit_team` `team` USING (`person`)
        WHERE `pages`.`page_id` > ?
        ORDER BY `pages`.`page_id` DESC
    ');
    $stmt = $mysqli->prepare('SELECT
        `pages`.`page_id`,
        `team`.`name`,
        `specialties`.`name`,
        `shifts`.`description`,
        UNIX_TIMESTAMP(`sessions`.`date`),
        `pages`.`text`,
        TIME_FORMAT(`pages`.`received`,"%H:%i"),
        `pages`.`urgent`,
        `pages`.`required`,
        `pages`.`repeat`
        FROM `audit_pages` `pages`
        JOIN `audit_sessions` `sessions` USING (`session`)
        JOIN `audit_shifts` `shifts` USING (`shift`)
        JOIN `audit_specialties` `specialties` USING (`specialty`)
        JOIN `audit_team` `team` USING (`person`)
        WHERE `pages`.`page_id` > ?
        ORDER BY `pages`.`page_id` DESC
    ');
    $stmt->bind_param('i', array_key_exists("since",$data) ? intval($data->since) : 0);
    $stmt->execute();
    $stmt->bind_result(
    $page_id,
    $entered,
    $specialty,
    $shift,
    $date,
    $exact,
    $received,
    $urgent,
    $required,
    $repeat
    );
    while ($stmt->fetch()) {
        $obj[] = [
            $page_id,
            $entered,
            $specialty,
            $shift,
            $date,
            $exact,
            $received,
            $urgent,
            $required,
            $repeat
        ];
    }
    break;

case "submit":
    $specialty = $data->params->specialty;
    $shift = $data->params->shift;
    $date = $data->params->date;

    $stmt = $mysqli->prepare("INSERT IGNORE INTO audit_sessions (specialty,shift,date) VALUES (?,?,?)");
    $stmt->bind_param('iis',$specialty,$shift,$date);
    $stmt->execute();
    $stmt->close();
    
    $stmt = $mysqli->prepare("INSERT IGNORE INTO `audit_pages`
    (`person`,`session`,`text`,`urgent`,`required`,`repeat`,`received`)
    VALUES (?,
    (SELECT `session` from `audit_sessions`
        where `specialty`=?
        and `shift`=?
        and `date`=?
    ),
    ?,?,?,?,?)");
    $stmt->bind_param('iiissiiis',
        $data->params->person,
        $specialty,
        $shift,
        $date,
        $data->params->contents,
        $data->params->urgent,
        $data->params->required,
        $data->params->repeat,
        $data->params->received
    );
    $stmt->execute();
    $obj = $stmt->affected_rows;
    $stmt->close();
    break;
default:
    $obj = sprintf('str must be set to a valid value, not "%s"', $data->str);
    break;
}
echo json_encode($obj);
