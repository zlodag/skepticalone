<?php
include('../../_connect.php');
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
function get_specialties() {
    global $mysqli;
    $stmt = $mysqli->prepare("select specialty,name from nutm_specialties");
    $stmt->execute();
    $stmt->bind_result($i,$n);
    while ($stmt->fetch()) {
        $specialties[$n] = $i;
    }
    $stmt->close();
    return $specialties;
}
function get_blacklist() {
    global $mysqli;
    $stmt = $mysqli->prepare("select amion_unique,amion_backup from nutm_roles where blacklist=true");
    $stmt->execute();
    $blacklist = $stmt->get_result()->fetch_all();
    $stmt->close();
    return $blacklist;
}

function get_database($good_only) {
    global $time;
    global $mysqli;
    $blacklist=get_blacklist();
    $specialty_blacklist = ['*ICU','Anaesthesia','Clinic and OT Schedule','Emergency Department','Radiology','Thames','Tokoroa'];
    $specialties = get_specialties();
    //foreach ($specialty_blacklist as $s) {
    //    $specialty_blacklist_i[] = $specialties[$s];
    //}

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


    if (!$stmt = $mysqli->prepare("INSERT INTO nutm_specialties (name) VALUES (?)")) {echo 'Prepare failed';}
    if (!$stmt->bind_param("s", $s_db)){echo 'Bind param failed';}
    $y = false;
    foreach($stack as $s_db => $rows) {
        if (!array_key_exists($s_db, $specialties)) {
            $y = true;
            if (!$stmt->execute()) {echo 'Statement execute failed ', $stmt->error;}
        }
    }
    $stmt->close();
    if ($y) {
        $specialties = get_specialties();
    }
    $db = [];
    $stmt = $mysqli->prepare("INSERT INTO nutm_roles (specialty, name, amion_unique, amion_backup) VALUES (?,?,?,?)");
    $stmt->bind_param("isii", $specialty_i, $role_name, $amion_unique, $amion_backup);
    foreach($stack as $specialty => $rows) {
        foreach($rows as $r) {
            if (in_array($specialty, $specialty_blacklist) || in_array($r[4], $blacklist)) {
                //Row is ugly!
                $lists['ugly'][$specialty][] = $r;
            } else {
                if (
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
                $specialty_i = $specialties[$specialty];
                $role_name = $r[1];
                $amion_unique = $r[4][0];
                $amion_backup = $r[4][1];
                $stmt->execute();
            }
        }
        $db[] = [$specialty, $lists['good'][$specialty]];
    }
    $stmt->close();
    
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
    header('Content-type: application/json');
    echo json_encode(get_database(true));
}
