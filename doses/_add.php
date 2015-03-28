<?php
$enabled = False;
if (isset($_POST['drugs']) AND $enabled) {
    include('../_connect.php');
    $classname = $_POST['classname'];
    $sql1 = "INSERT INTO `drug_classes` (`name`) VALUES (?)";
    $stmt = $mysqli->prepare($sql1);
    $stmt->bind_param('s', $classname);
    $stmt->execute();

    $sql2 = "INSERT INTO `drug_items` ( `name`, `dose`, `notes`, `class` ) VALUES ( ?,?,?,? )";
    $stmt = $mysqli->prepare($sql2);
    $stmt->bind_param('ssss', $name, $dose, $notes, $classname);
    for($i=0;$i<sizeof($_POST['drugs']);$i++) {
        $name = $_POST['drugs'][$i]['name'];
        $dose = $_POST['drugs'][$i]['dose'];
        $notes = $_POST['drugs'][$i]['notes'];
        if ($name AND $dose AND $stmt->execute()) {
            printf('<p>"%s" was successfully added!</p>', $name);
        }
    }
}
#else {
#    print('<p>POST["drugs"] was not set</p>');
#}
?>
<form action="#" method="post">
Class: <input name="classname" />
<input type="submit" />
<table>
<tr>
<th>Name</th>
<th>Dose</th>
<th>Notes</th>
</tr>
<?php
for($i=0;$i<25;$i++) {
    printf('<tr>
        <td><input name="drugs[%d][name]" /></td>
        <td><input name="drugs[%d][dose]" /></td>
        <td><input name="drugs[%d][notes]" /></td>
        </tr>
        ', $i, $i, $i);
}
?>
</table>
</form>
