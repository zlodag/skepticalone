<?php

date_default_timezone_set("Pacific/Auckland");
$time = new DateTime();

function get_url() {
    $password = 'waikato';
    $params = ['Lo' => $password, 'Rpt' => 619];
    return 'http://www.amion.com/cgi-bin/ocs?' . http_build_query($params, '', '&', PHP_QUERY_RFC3986);
}
function print_time() {
    global $time;
    echo '<p>' . $time->format(DATE_RSS) . '</p>';
}
function get_database() {
    global $time;
    $database = [];
    $timestr = $time->format('Hi');
    //$file = fopen('data.csv',"r");
    $file = fopen(get_url(),"r");
    $database['online_stamp'] = fgetcsv($file)[0];
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
    return $database;
}

function print_database() {
    $database_obj = get_database();
    $database = $database_obj[0];
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
    $database_obj = get_database();
    $database = $database_obj[0];
    echo '<select id="user" class="form-control" required><option value="">Sign in</option>';
    foreach($database as $specialty => $rows) {
        printf('<optgroup label="%s">', $specialty);
        foreach($rows as $role => $person_time) {
            printf('<option data-person="%s" data-role="%s" data-start="%s" data-end="%s"></option>', $person_time[0], $role, $person_time[1], $person_time[2]);
        }
        echo '</optgroup>';
    }
    printf('</select><p>%s</p>', $database_obj[1]);
}
echo '<pre>' . json_encode(get_database(), JSON_PRETTY_PRINT) . '</pre>';