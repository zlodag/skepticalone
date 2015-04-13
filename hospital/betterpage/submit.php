<?php
header('Content-type: application/json');
date_default_timezone_set("Pacific/Auckland");
$filename = "pages.txt";
$valid = true;
$fields = [];
$errors = [];
function test_input($key) {
    global $valid;
    if (!array_key_exists($key, $_POST)) {
        $valid = false;
        return '';
    }
    return $_POST[$key];
    //remember to clean data before inserting into DB
    $data = trim($_POST[$key]);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}
if ($_SERVER["REQUEST_METHOD"] == "POST" && array_key_exists('formname', $_POST)) {
    $formname = test_input("formname");
    switch($formname) {
        case 'ptpage':
            $pagename = test_input('pagename');
            $field_strings = [
            "to" => ["To: Pager", "be 20 followed by 3 digits", "/^20[0-9]{3}$/"],
            "caller" => ["From: Name", "contain 2+ characters", "/^.{2,}$/"],
            "phone" => ["From: Phone", "contain 5 to 11 digits", "/^[0-9]{5,11}$/"],
            "patient"=> ["Patient: Name", "contain 2+ characters", "/^.{2,}$/"],
            "nhi" => ["Patient: NHI", "be a valid NHI number", "/^[A-Z]{3}[0-9]{4}$/"],
            "ward"=> ["Patient: Ward", "contain 1 to 3 characters", "/^[A-Z0-9]{1,3}$/"],
            "bed"=>["Patient: Bed", "contain 1 to 3 characters", "/^[A-Z0-9]{1,3}$/"],
            "why"=>["Details: Reason for page"],
            "details"=>["Details: Specify"]
            ];
            if ($pagename == "wong" || $pagename == "wong2") {
                $checked = (array_key_exists('reply',$_POST) && $_POST["reply"] == "on");
                if ($checked) {
                    $pos   = array_search("patient", array_keys($field_strings));
                    $field_strings = array_merge(
                        array_slice($field_strings, 0, $pos),
                        ["within" => ["Response time","be 1 or 2 digits","/^[0-9]{1,2}$/"]],
                        array_slice($field_strings, $pos));
                    //$field_strings["within"] = ["Response time","be 1 or 2 digits","/[0-9]{1,2}/"];
                } elseif ($pagename == "wong") {
                    unset($field_strings["phone"]);
                }
            }
            foreach ($field_strings as $key => $array) {
                $value = test_input($key);
                $str = $array[0];
                if ($key === 'details') {
                    $fields[$key] = $value;
                } elseif ($value === '') {
                    $valid = false;
                    $errors[] = [$key,sprintf('<em>%s</em> is required', $str)];
                } else {
                    if ($key == "nhi" || $key == "ward" || $key == "bed") {
                        $value = strtoupper($value);
                    } elseif ($key == "caller" || $key == "patient") {
                        $value = ucwords($value);
                    }
                    if ($key != "why" && !preg_match($array[2], $value)) {
                        $valid = false;
                        $errors[] = [$key,sprintf('<em>%s</em> must %s', $str, $array[1])];
                    } else {
                        $fields[$key] = $value;
                    }
                }
            }
            if ($valid) {
                if ($pagename == "wong" || $pagename == "wong2") {
                    if ($checked) {
                        $message = sprintf("%s<%dm", $fields["phone"], $fields["within"]);
                    } elseif ($pagename == "wong2") {
                        $message = $fields["phone"];
                    }  else {
                        $message = "";}
                } else {
                    $message = $fields["phone"];
                }
                $message .= sprintf("(%s) %s(%s)[%s-%s] %s",
                    $fields["caller"],
                    $fields["nhi"],
                    $fields["patient"],
                    $fields["ward"],
                    $fields["bed"],
                    $fields["why"]
                );
                if ($fields["details"] != "") {
                    $message .= sprintf(" (%s)", $fields["details"]);
                }
                $to = $fields["to"];
            }
            break;
        case 'otherpage':
            $field_strings = [
            "to_other" => ["Pager", "be 20 followed by 3 digits", "/^20[0-9]{3}$/"],
            "contents" => ["Contents", "be no more than 128 characters long", "/^.{0,128}$/"]
            ];
            foreach ($field_strings as $key => $array) {
                $value = test_input($key);
                $str = $array[0];
                if ($value === '') {
                    $valid = false;
                    $errors[] = [$key,sprintf('<em>%s</em> is required', $str)];
                } elseif (!preg_match($array[2], $value)) {
                        $valid = false;
                        $errors[] = [$key,sprintf('<em>%s</em> must %s', $str, $array[1])];
                } else {
                    $fields[$key] = $value;
                }
            }
            if ($valid) {
                $message = $fields["contents"];
                $to = $fields["to_other"];
            }
            break;
    }
} else {
    $valid = false;
    if ($_SERVER["REQUEST_METHOD"] != "POST") {
        $errors[] = ["",'<em>The request method must be POST</em>'];
    } elseif (!array_key_exists('formname', $_POST)) {
        $errors[] = ["",'<em>"formname" must be specified in the POST data</em>'];
    }
}
if ($valid) {
    $t = time();
    $logmessage = sprintf("%s To: %s %s\n", date("Y-m-d H:i:s", $t), $to,  $message); 
    file_put_contents ($filename, $logmessage, FILE_APPEND | LOCK_EX);
    echo json_encode(['ok'=>true,'page'=>$message]);
} else {
    echo json_encode(['ok'=>false,'errors'=>$errors]);
}
?>
