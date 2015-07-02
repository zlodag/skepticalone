<?php
header('Content-type: application/json');
date_default_timezone_set("Pacific/Auckland");
$filename = "pages.txt";
$maxlength = 128;
$valid = true;
$fields = [];
$errors = [];
$feed = json_decode(file_get_contents("php://input"));

function test_input($key) {
    global $valid;
    global $errors;
    global $feed;
    global $maxlength;
    if (!array_key_exists($key, $feed)) {
        if ($key === "no" || $key === "msg" || $key === "bp") {
            $valid = false;
            $errors[] = [$key,sprintf('"%s" was not submitted in feed', $key)];
        }
        return null;
    }
    $data = $feed->$key;
    if ($data === "") {return null;}
    /*remember to clean data before inserting into DB
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
     */
    switch ($key) {
        case "no":
            if (!preg_match("/^20[0-9]{3}$/", $data)) {
                $valid = false;
                $errors[] = [$key,sprintf('Parameter: <em>%s</em> must be 20 followed by 3 digits - "%s" submitted', $key, $data)];
            }
            break;
        case "bp":
            if (!preg_match("/^[0-9]+$/", $data)) {
                $valid = false;
                $errors[] = [$key,sprintf('Parameter: <em>%s</em> must be a number - "%s" submitted', $key, $data)];
            }
            break;
        case "msg":
            $l = strlen($data);
            if ($l === 0 || $l > $maxlength) {
                $valid = false;
                $errors[] = [$key,sprintf('Parameter: <em>%s</em> must be 1 to %d characters - submitted string was "%s" (%d characters)', $key, $maxlength, $data, strlen($data))];
            }
            break;
        case "nhi":
            if (!preg_match("/^[A-Z]{3}[0-9]{4}$/", $data)) {
                return null;
            }
            break;
    }
    return $data;
}

$no = test_input("no");
$msg = test_input("msg");
$bp = test_input("bp");
$private = ($feed->ptpage === false && $feed->private === true);
if ($valid) {

    //write to text file
    /*
    $t = time();
    $logmessage = sprintf("%s Beep:%d To: %s %s\n", date("Y-m-d H:i:s", $t), $bp, $no, $msg); 
    file_put_contents ($filename, $logmessage, FILE_APPEND | LOCK_EX);
    */
    if (!$private) { 
        
        //submit to database
        include('../../_connect.php');
        $stmt=$mysqli->prepare("INSERT INTO `page_log` (`no`,`msg`,
        `caller`,
        `phone`,
        `within`,
        `patient`,
        `nhi`,
        `ward`,
        `bed`,
        `why`,
        `details`
        ) VALUES (?,?,
        ?,?,?,?,?,?,?,?,?)");
        $stmt->bind_param('issiissssss', $no, $msg,
        test_input("caller"),
        test_input("phone"),
        test_input("within"),
        test_input("patient"),
        test_input("nhi"),
        test_input("ward"),
        test_input("bed"),
        test_input("why"),
        test_input("details")
        );
        $stmt->execute();
        $stmt->close();

    }

    //return status to browser
    echo json_encode(['ok'=>true,'page'=>['msg'=>$msg,'bp'=>$bp,'private'=>$private]]);
} else {
    echo json_encode(['ok'=>false,'errors'=>$errors]);
}
?>
