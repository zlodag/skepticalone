<?php
header('Content-type: application/json');
date_default_timezone_set("Pacific/Auckland");
$filename = "pages.txt";
$maxlength = 128;
$valid = true;
$fields = [];
$errors = [];
function test_input($key) {
    global $valid;
    global $errors;
    global $maxlength;
    if (!array_key_exists($key, $_POST)) {
        $valid = false;
        $errors[] = [$key,sprintf('"%s" was not submitted in POST', $key)];
        return '';
    }
    
    $data = $_POST[$key];
    /*remember to clean data before inserting into DB
    $data = trim($_POST[$key]);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
     */
    if ($key == "no" && !preg_match("/^20[0-9]{3}$/", $data)) {
        $valid = false;
        $errors[] = [$key,sprintf('Parameter: <em>%s</em> must be 20 followed by 3 digits - "%s" submitted', $key, $data)];
    } elseif ($key == "msg") {
        $l = strlen($data);
        if ($l == 0 || $l > $maxlength) {
            $valid = false;
            $errors[] = [$key,sprintf('Parameter: <em>%s</em> must be 1 to %d characters - submitted string was "%s" (%d characters)', $key, $maxlength, $data, strlen($data))];
        }
    }
    return $data;
}
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $no = test_input("no");
    $msg = test_input("msg");
} else {
    $valid = false;
    $errors[] = ["",'<em>The request method must be POST</em>'];
}
if ($valid) {
    $t = time();
    $logmessage = sprintf("%s To: %s %s\n", date("Y-m-d H:i:s", $t), $no, $msg); 
    file_put_contents ($filename, $logmessage, FILE_APPEND | LOCK_EX);
    echo json_encode(['ok'=>true,'page'=>$msg]);
} else {
    echo json_encode(['ok'=>false,'errors'=>$errors]);
}
?>
