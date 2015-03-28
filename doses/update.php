<?php
include('../_connect.php');

#$id = $_POST["id"];
#$yn = $_POST["yn"];
$yn = $_REQUEST["yn"];
$id = $_REQUEST["id"];

if ($yn == "y") {$ci = "correct";}
elseif ($yn == "n") {$ci = "incorrect";}
#else {exit('POST value "yn" was not set correctly');}
else {exit('0');}

#printf('id="%s", (in)correct="%s"<br />', $id, $ci);

#$stmt = $mysqli->prepare("UPDATE drug_items SET in=? WHERE id=?");
#$stmt = $mysqli->prepare("INSERT INTO City (District) VALUES (?)");

$stmt = $mysqli->prepare("UPDATE `drug_items` SET `$ci`=`$ci`+1 WHERE `id`=?");
$stmt->bind_param("i", $id);
$stmt->execute();

#printf("%d affected rows", $stmt->affected_rows);
#print ($stmt->affected_rows);
#echo ajaxformat($r[$type]);
if ($stmt->affected_rows == 1) {
    $result = $mysqli->query("SELECT `correct`,`incorrect` FROM `drug_items` WHERE `id`=$id");
    while ($row = $result->fetch_row()) {
        $correct = $row[0];
        $incorrect = $row[1];
        #print("attempts = '$correct' vs '$incorrect'<br />");
        $attempts = $correct + $incorrect;
        if ($attempts > 0) {
            printf('%.0f', $correct/$attempts*100);
        }
        else {
            print('No attempts!');
        }
    }
}
else {
    print('No affected rows!');
}
?>
