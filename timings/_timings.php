<?php
include('../_connect.php');
$stmt = $mysqli->prepare("SELECT * FROM `timings_options` WHERE `active` = 1 ORDER BY `seq` ASC");
$stmt->execute();
$stmt->bind_result($order, $name, $duration, $checked, $active); 
?>
<table>
<tr>
<th>Activity</th>
<th>Duration (mins)</th>
<th>Target time</th>
</tr>
<?php
while($stmt->fetch()) {
    printf('<tr class="option"><td class="left">%s</td><td><input type="number" class="number" value="%d"> <input type="checkbox" name="%d"',
        $name,
        $duration,
        $order);
    if ($checked == 1) {
        print(' checked="checked"');
    }
    print('/></td><td></td></tr>');
}
    //<tr class="option"><td colspan="2">spare time: <input id="spare" class="number" type="number" value="10"> mins</td><td id="sparetime"></td></tr>
?>
    <tr><td colspan="2">Arrival time:</td><td><input id="time" type="time" name="time" value="07:50"><br /><span id="date"></span></td></tr>
</table>
<table>
<tr id="initial"><td class="left">initial alarm</td><td><input type="checkbox" checked="checked" /></td><td class="set"></td></tr>
<tr id="itouch"><td class="left">itouch alarm</td><td><input type="checkbox" checked="checked" /></td><td class="set"></td></tr>
<tr id="final"><td class="left">final alarm</td><td><input type="checkbox" checked="checked" /></td><td class="set"></td></tr>
</table>
