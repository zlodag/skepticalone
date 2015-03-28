<?php
$car = array(
    "maxkm" => 1000,
    "maxcost" => 150,
    "maxl" => 100,
);
$motorbike = array(
    "maxkm" => 500,
    "maxcost" => 50,
    "maxl" => 11,
);

include('../_connect.php');
if ($mysqli->connect_errno)
{
    echo sprintf('<p>Could not connect to MySQL: %s</p>', $mysqli->connect_error);
    exit();
}
$stmt = $mysqli->prepare("SELECT `vehicle`, MAX(`odo`) FROM `petrol_main` GROUP BY `vehicle` ORDER BY `vehicle` ASC");
$stmt->execute();
$stmt->bind_result($vehicle, $odo);
while ($stmt->fetch()) {
    if ($vehicle == 'C') {
        $car["odo"] = $odo + 1;
    } elseif ($vehicle == 'M') {
        $motorbike["odo"] = $odo + 1;
    }
}
$stmt->close();
?>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name=viewport content="width=device-width, initial-scale=1">
<title>Add petrol</title>
<style>
    td > input,select {
        width:100%;
    }
</style>
</head>
<body>
<form method="post" action="/petrol/">
    <table>
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
<td>Location</td><td><input type="text" name="location"></td>
</tr>
<tr>
<?php
//printf('<td>Odo (km)</td><td><input type="number" name="odo" min="%d" max="%d"></td>', $car['odo'], $car['odo'] + $car['maxkm']);
?>
<td>Odo (km)</td><td><input type="number" name="odo" id="odo"></td>
</tr>
<tr>
<td>Petrol (L)</td><td><input type="number" name="litres" id="litres" min="0" step="0.01"></td>
</tr>
<tr>
<td>Cost ($)</td><td><input type="number" name="cost" id="cost" min="0" step="0.01"></td>
</tr>
</table>
<p><input type="submit" value="Add"></p>
</form>
<script>
var car = <?php
echo json_encode($car);
?>

var motorbike = <?php
echo json_encode($motorbike);
?>

var vehicle = document.getElementById("vehicle");
vehicle.addEventListener("change", limit);
window.onload=limit;
function limit() {
        switch(vehicle.value) {
            case "C":
                var map = car;
                break;
            case "M":
                var map = motorbike;
                break;
        }
        var odo = document.getElementById("odo");
        odo.min = map.odo;
        odo.max = map.odo + map.maxkm;
        var litres = document.getElementById("litres");
        litres.max = map.maxl;
        var cost = document.getElementById("cost");
        cost.max = map.maxcost;
}
</script>
</body>
</html>
