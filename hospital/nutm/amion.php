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

/*function add_to_list($r, $specialty, $listname) {
    $lists[$listname][] = sprintf('%d, // %s %s **** %s', $r[4], $specialty, $r[1],$r[0]);
}*/

function get_database($good_only) {
    global $time;
    include '_blacklist.php';
    $specialty_blacklist = ['*ICU','Anaesthesia','Clinic and OT Schedule','Emergency Department','Radiology','Thames','Tokoroa'];

    $timestr = $time->format('Hi');
    
    $file = fopen(get_url(),"r");
    if (array_key_exists('test', $_GET) && $_GET['test'] === 'true') {
        $file = fopen('data.csv',"r");
    }
    $online_stamp = fgetcsv($file)[0];
    $stack = [];
    while(! feof($file)) {
        $r = fgetcsv($file);
        if (count($r) == 10) {
            $specialty = $r[0];
            if (!array_key_exists($specialty, $stack)) {
                $stack[$specialty] = [];
            }
            $stack[$specialty][] = [$r[1],$r[4],$r[8],$r[9],[intval($r[5]),intval($r[6])]];
        }
    }
    fclose($file);
    ksort($stack);

    $template = array_fill_keys(array_keys($stack), []);
    $lists =[
    'good' =>  $template,
    'bad'=> $template, 
    'ugly'=> $template
    ];

    $db = [];
    foreach($stack as $specialty => $rows) {
        foreach($rows as $r) {
            if (in_array($specialty, $specialty_blacklist) || in_array($r[4], $blacklist)) {
                //Row is ugly!
                $lists['ugly'][$specialty][] = $r;
            } elseif (
                    ($r[2] < $r[3] && $timestr >= $r[2] && $timestr <= $r[3])
                    || ($r[2] > $r[3] && ($timestr >= $r[2] || $timestr <= $r[3]))
                    || ($r[2] == $r[3])

            ) {
                //Row is good!
                $lists['good'][$specialty][] = $r;

            } else {
                //Row is bad!
                $lists['bad'][$specialty][] = $r;
            }
        }
        $db[] = [$specialty, $lists['good'][$specialty]];
    }
    

    if ($good_only) {
        return [$db, $online_stamp];
    } else {
        return $lists;
    }
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
if (array_key_exists('get_database', $_GET) && $_GET['get_database'] === 'true') {
    echo json_encode(get_database(true));
}