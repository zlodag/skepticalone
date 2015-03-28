<?php
include('../_connect.php');
if ($mysqli->connect_errno)
{
    echo sprintf('<p>Could not connect to MySQL: %s</p>', $mysqli->connect_error);
    exit();
}
if ($_POST["vehicle"] AND $_POST["details"] AND $_POST["cost"]) {
    $stmt = $mysqli->prepare(
        "INSERT INTO `petrol_extra`(`vehicle`, `date`, `details`, `cost`) VALUES (?,?,?,?)");
    try {
        $date = new DateTime($_POST["date"]);
    } catch (Exception $e) {
        echo 'Caught exception: ',  $e->getMessage(), "\n";
        //echo 'Help me!';
        $date = new DateTime();
    }
    //echo $date->format("Y-m-d H:i:s");
    $stmt->bind_param('sssd', 
        $_POST["vehicle"],
        $date->format("Y-m-d"),
        $_POST["details"],
        $_POST["cost"]);
    $stmt->execute();
    $stmt->close();
}
$stmtstrgen = 'SELECT `i`,`date`,`details`,`cost` FROM `petrol_extra` WHERE `vehicle` = "%s" ORDER BY `date` ASC, `cost` DESC';
foreach (array('Car','Motorbike') as $vehicle) {
    printf('
        <table class="info">
        <caption>%s</caption>
        ', $vehicle);
?>
<thead>
<tr>
<th>Date</th>
<th>Details</th>
<th>Cost</th>
<th>Cumulative ($)</th>
</tr>
</thead>
<tbody>
<?php
    $stmtstr = sprintf($stmtstrgen, $vehicle[0]);
    $stmt = $mysqli->prepare($stmtstr);
    $stmt->execute();
    $stmt->bind_result(
        $index,
        $date,
        $details,
        $cost);
    $cost_cumulative = 0;
    while ($stmt->fetch()) {
        $cost_cumulative += $cost;
        $date = new DateTime($date);
        print('<tr>');
        printf('<td>%s</td>', $date->format("d/m/Y"));
        printf('<td class="text">%s</td>', $details);
        printf('<td>$%.2f</td>', $cost);
        printf('<td>$%.2f</td>', $cost_cumulative);
        print('</tr>');
    }
    $stmt->close();
    ?>
    </tbody>
    </table>
<?php
}
?>
<form method="post" action="./extras">
    <table id="add">
<tr>
    <td>Vehicle</td>
    <td>
        <select name="vehicle" id="vehicle">
                <option value="C" selected>Car</option>
                <option value="M">Motorbike</option>
        </select>
    </td>
</tr>
<tr>
    <td>Date (today)</td><td><input type="date" name="date"></td>
</tr>
<tr>
    <td>Details</td><td><input type="text" name="details"></td>
</tr>
<tr>
    <td>Cost ($)</td>
    <td><input type="number" name="cost" id="cost" min="0" step="0.01"></td>
</tr>
<tr>
    <td colspan="2"><input type="submit" value="Add"></td>
</tr>
</table>
</form>
<p><a href="./">Back</a></p>
