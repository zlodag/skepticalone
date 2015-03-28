<?php
include('../_connect.php');
$delete_enabled = false;
$RUC_rates = array(
    array(new DateTime('2000-01-01'), 48),
    array(new DateTime('2012-05-25'), 45),
    array(new DateTime('2013-05-30'), 48),
    array(new DateTime('2014-07-02'), 58) // Road user charges in $ per 1000km incl GST
);
function getRUC_rate($datetime) {
    global $RUC_rates;
    foreach ($RUC_rates as $RUC_pair) {
        if ($datetime >= $RUC_pair[0]) {
            $rate = $RUC_pair[1];
            continue;
        } 
        return $rate;
    }
    return $rate;
}
if ($mysqli->connect_errno)
{
    echo sprintf('<p>Could not connect to MySQL: %s</p>', $mysqli->connect_error);
    exit();
}
if ($_REQUEST['vehicle'] == "M") {
    $vehicle = array("Motorbike", "Car");
} else {
    $vehicle = array("Car", "Motorbike");
}
printf('<table class="info"><caption>Petrol - %s</caption>', $vehicle[0]);
?>
<thead>
<tr>
<th>Date</th>
<th>Location</th>
<th>Odo (km)</th>
<th>Petrol (L)</th>
<th>Petrol ($)</th>
<th>per L (c)</th>
<th>Trip (km)</th>
<?php
    if ($vehicle[0] != 'Motorbike') {
?><th>+ RUC ($)</th><?php
    }
?>
<th>L/100km</th>
<th>$/100km</th>
<th>Cumulative ($)</th>
<?php
    if ($delete_enabled) {
        print('<th></th>');
    }
?>
</tr>
</thead>
<tbody>
<?php
if ($_POST["vehicle"] AND $_POST["location"] AND $_POST["odo"] AND $_POST["litres"] AND $_POST["cost"]) {
    $stmt = $mysqli->prepare(
        "INSERT INTO `petrol_main` (`vehicle`,`date`,`location`,`odo`,`litres`,`cost`) VALUES (?,?,?,?,?,?)");
    try {
        $date = new DateTime($_POST["date"]);
    } catch (Exception $e) {
        echo 'Caught exception: ',  $e->getMessage(), "\n";
        //echo 'Help me!';
        $date = new DateTime();
    }
    //echo $date->format("Y-m-d H:i:s");
    $stmt->bind_param('sssidd', 
        $_POST["vehicle"],
        $date->format("Y-m-d"),
        $_POST["location"],
        $_POST["odo"],
        $_POST["litres"],
        $_POST["cost"]);
    $stmt->execute();
    $stmt->close();
}
elseif($_POST["delete"]) {
    if ($delete_enabled) {
        $delkey = $_POST["delete"];
        $stmt = $mysqli->prepare('DELETE FROM `petrol_main` WHERE `i` = ?');
        $stmt->bind_param('d', $delkey);
        $stmt->execute();
        $stmt->close();
        printf('<p>Entry deleted (index: %d)</p>', $delkey);
    } else {
        print('<p>Deleting has been disabled</p>');
    }
}
$stmtstr = sprintf('SELECT `i`,`date`,`location`,`odo`,`litres`,`cost` FROM `petrol_main` where `vehicle` = "%s" ORDER BY `date` ASC', $vehicle[0][0]);
$stmt = $mysqli->prepare($stmtstr);
$stmt->execute();
$stmt->bind_result(
    $index,
    $date,
    $location,
    $odo,
    $litres,
    $cost_excl);
if ($vehicle[0][0] == 'M') {
    $odo_total = 3461;
} else {
    $odo_total = 208501;
}
$cost_cumulative = 0;
while ($stmt->fetch()) {
    $date = new DateTime($date);
    $trip_kms = $odo - $odo_total;
    $odo_total = $odo;
    $cost_per_l = 100 * $cost_excl/$litres;
    $l_per_100k = 100 * $litres/$trip_kms;
    if ($vehicle[0] == 'Motorbike') {
        $cost_incl = $cost_excl;
    } else {
        $cost_incl = $cost_excl + $trip_kms * getRUC_rate($date) / 1000;
    }
    $cost_per_100k = 100 * $cost_incl/$trip_kms;
    $cost_cumulative += $cost_incl;
    print('<tr>');
    printf('<td>%s</td>', $date->format("d/m/Y"));
    printf('<td class="text">%s</td>', $location);
    printf('<td>%d</td>', $odo);
    printf('<td>%.2f</td>', $litres);
    printf('<td>$%.2f</td>', $cost_excl);
    printf('<td>%.1f</td>', $cost_per_l);
    printf('<td>%d</td>', $trip_kms);
    if ($vehicle[0] != 'Motorbike') {
        printf('<td>$%.2f</td>', $cost_incl);
    }
    printf('<td>%.2f</td>', $l_per_100k);
    printf('<td>$%.2f</td>', $cost_per_100k);
    printf('<td>$%.2f</td>', $cost_cumulative);
    if ($delete_enabled) {
        printf('<td><form method="post" action="#"><input type="hidden" name="delete" value="%d"><input value="Delete" type="submit"></form></td>', $index);
    }
    print('</tr>');
}
$stmt->close();
?>
</tbody>
</table>
<p><a href="add">Add</a></p>
<p><a href="?vehicle=<?php
echo $vehicle[1][0];
?>">Petrol - <?php
echo $vehicle[1];
?></a></p>
<p><a href="extras">Extras</a></p>
