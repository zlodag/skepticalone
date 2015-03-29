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
echo '<p>' . $time->format(DATE_RSS) . '</p>';

$database = [];

$file = fopen("data.csv","r");
while(! feof($file)) {
    $r = fgetcsv($file);
    if (count($r) == 10) {
        $specialty = $r[0];
        if (!array_key_exists($specialty, $database)) {$database[$specialty] = [];}
        $database[$specialty][$r[4]] = [$r[1],$r[8],$r[9]];
    }
}
fclose($file);

function print_database() {
    global $database;
    global $time;
    $timestr = $time->format('Hi');
    foreach($database as $specialty => $rows) {
        printf('<table><caption>%s</caption>', $specialty);
        echo '<thead><th>Role</th><th>Person</th><th>Time</th></thead><tbody>';
        foreach($rows as $role => $person_time) {
            $person = $person_time[0];
            if (
                ($person_time[1] < $person_time[2] && $timestr >= $person_time[1] && $timestr <= $person_time[2])
                || ($person_time[1] > $person_time[2] && ($timestr >= $person_time[1] || $timestr <= $person_time[2]))
                || ($person_time[1] == $person_time[2])

            ) {
                $time = $person_time[1] . ' - ' . $person_time[2];
                echo '<tr><td>' . $role . '</td><td>' . $person . '</td><td>' . $time . '</td></tr>';
            }
        }
        echo '</tbody></table>';
    }
}



print_database();
?>
    </body>
</html>