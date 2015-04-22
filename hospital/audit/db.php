<?php
include('../../_connect.php');

function getAll() {
    global $mysqli;
    global $obj;
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
        ORDER BY `pages`.`timestamp` DESC
    ');
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
        $obj['rows'][] = [
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
}
if ($_REQUEST["data"] == "initial") {
    $stmt = $mysqli->prepare("select shift,description from audit_shifts order by shift asc");
    $stmt->execute();
    $stmt->bind_result($shift,$description);
    while ($stmt->fetch()) {
        $obj['shift'][] = [$shift,$description];
    }
    $stmt->close();

    $stmt = $mysqli->prepare("select specialty,name from audit_specialties order by specialty asc");
    $stmt->execute();
    $stmt->bind_result($specialty,$name);
    while ($stmt->fetch()) {
        $obj['specialty'][] = [$specialty,$name];
    }
    $stmt->close();

    $stmt = $mysqli->prepare("select person,name from audit_team order by person asc");
    $stmt->execute();
    $stmt->bind_result($person,$name);
    while ($stmt->fetch()) {
        $obj['person'][] = [$person,$name];
    }
    $stmt->close();

    getAll();

} else if ($_POST['data'] == 'submit') {
    $specialty = intval($_POST['specialty']);
    $shift = intval($_POST['shift']);
    $date = $mysqli->real_escape_string($_POST['date']);

    $stmt = $mysqli->prepare("INSERT IGNORE INTO audit_sessions (specialty,shift,date) VALUES (?,?,?)");
    $stmt->bind_param('iis',$specialty,$shift,$date);
    $stmt->execute();
    $stmt->close();

    $person = intval($_POST['person']);
    $contents = $mysqli->real_escape_string($_POST['contents']);
    $urgent = intval($_POST['urgent']);
    $required = intval($_POST['required']);
    $repeat = intval($_POST['repeat']);
    $received = $mysqli->real_escape_string($_POST['received']);
    if ($received === "") {$received = NULL;}

    if (!$stmt = $mysqli->prepare("INSERT IGNORE INTO `audit_pages`
    (`person`,`session`,`text`,`urgent`,`required`,`repeat`,`received`)
    VALUES (?,
    (SELECT `session` from `audit_sessions`
        where `specialty`=?
        and `shift`=?
        and `date`=?
    ),
    ?,?,?,?,?)")) {
        echo $mysqli->error;
    }
    $stmt->bind_param('iiissiiis',
        $person,
        $specialty,
        $shift,
        $date,
        $contents,
        $urgent,
        $required,
        $repeat,
        $received);
    $stmt->execute();
    $stmt->close();
    
    getAll();
    //printf('%d affected rows', $mysqli->affected_rows);

} else {
    echo '_REQUEST["data"] must be specified';
    exit;
}
header('Content-type: application/json');
echo json_encode($obj);
