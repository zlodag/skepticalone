<?php
include('../_connect.php');

$stmt = $mysqli->prepare("SELECT `name`,`dose`,`class`,`notes`,`active` FROM `drug_items` ORDER BY `class` ASC, `name`");
#$stmt->bind_param("sds", $taskname, $taskpriority, $due);
$stmt->execute();
$stmt->bind_result($name, $dose, $class, $notes, $active);
?>
    <table><thead><tr>
    <th>Name</th>
    <th>Dose</th>
    <th>Class</th>
    <th>Notes</th>
    </tr></thead>
    <tbody>
<?php
while ($stmt->fetch()) {
    if (!$active) {$active=' class="inactive"';}
    else {$active = '';}
    printf("<tr%s>
        <td>%s</td>
        <td>%s</td>
        <td>%s</td>
        <td>%s</td>
        </tr>",
        $active,
        $name,
        $dose,
        $class,
        $notes);
}
$stmt->close();
?>
</tbody>
</table>
