<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>Amion</title>
        <link rel="stylesheet" href="css/amion.css" />
    </head>
    <body>
<?php
date_default_timezone_set("Pacific/Auckland");

$time = new DateTime();
$timestr = $time->format('Hi');
echo '<p>' . $time->format(DATE_RSS) . '</p>';

$database = [];

$file = fopen("data.csv","r");
while(! feof($file)) {
    $r = fgetcsv($file);
    if (count($r) == 10) {
        $specialty = $r[0];
        if (!array_key_exists($specialty, $database)) {$database[$specialty] = [];}
        if (
                ($r[8] < $r[9] && $timestr >= $r[8] && $timestr <= $r[9])
                || ($r[8] > $r[9] && ($timestr >= $r[8] || $timestr <= $r[9]))
                || ($r[8] == $r[9])

        ) {
            $database[$specialty][$r[4]] = [$r[1],$r[8],$r[9]];
        }
    }
}
fclose($file);

function print_database() {
    global $database;
    foreach($database as $specialty => $rows) {
        printf('<table><caption>%s</caption>', $specialty);
        echo '<thead><th>Role</th><th>Person</th><th>Time</th></thead><tbody>';
        foreach($rows as $role => $person_time) {
            printf('<tr><td>%s</td><td>%s</td><td>%s - %s</td></tr>', $role, $person_time[0], $person_time[1], $person_time[2]);
        }
        echo '</tbody></table>';
    }
}
function print_select() {
    global $database;
    echo '<select><option selected>Log in</option>';
    foreach($database as $specialty => $rows) {
        printf('<optgroup label="%s">', $specialty);
        foreach($rows as $role => $person_time) {
            printf('<option data-role="%s" data-start="%s" data-end="%s">%s</option>', $role, $person_time[1], $person_time[2], $person_time[0]);
        }
        echo '</optgroup>';
    }
    echo '</select>';
}


print_select();
print_database();
?>
    </body>
</html>