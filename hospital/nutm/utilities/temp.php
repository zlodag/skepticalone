<?php
include('../../_connect.php');
include('_blacklist.php');

function outliers ($reversed) {
    global $mysqli;
    global $blacklist;
    $stmt = $mysqli->prepare("select amion_unique, amion_backup from nutm_roles where blacklist=true");
    $stmt->execute();
    $stmt->bind_result($u,$b);
    while ($stmt->fetch()) {
        $db_blacks[] = [$u,$b];
    }
    //print_r($db_blacks);
    //echo count($db_blacks), ' ', count($blacklist);
    $dups = array();
    if (!$reversed) {
        return array_diff($blacklist,$db_blacks);
    }
    else {
        return array_diff($db_blacks, $blacklist);
    }
}

function getspecialties() {
    global $mysqli;
    $stmt = $mysqli->prepare('select specialty,name,blacklist from nutm_specialties');
    $stmt->execute();
    $stmt->bind_result($s_id, $s_name, $s_black);
    while ($stmt->fetch()) {
        if ($s_black) {$s_blacks[] = $s_name;}
        $specialties[$s_name] = $s_id;
    }
    $stmt->close();
    return ['list'=>$specialties, 'blacklist'=>$s_blacks];
}
function deal_with_row($r, $stmt, $specs) {
        $specialties = $specs['list']; $s_blacks = $specs['blacklist'];
        $specialty = $r[0]; if (in_array($specialty, $s_blacks, true)) {return 0;}
        //if (!is_string($specialty)) {var_dump($specialty);}
        if (!array_key_exists($specialty, $specialties)) {
            //var_dump( $specialties); var_dump($specialty); exit();
            //New specialty, needs adding to db first...
            global $roundtwo;
            $roundtwo[$specialty][] = $r;
            return 0;
        }
        $amion_unique = intval($r[5]); $amion_backup=intval($r[6]);
        $specialty_i = $specialties[$specialty]; $role_name = $r[4];
        $stmt->bind_param("isii", $specialty_i, $role_name, $amion_unique, $amion_backup);
        $stmt->execute();
        //if ($stmt->error) {echo $specialty_i, ',',$role_name, ',',$amion_unique, ',',$amion_backup, $stmt->error; exit();}
        $x = $stmt->affected_rows;
        if ($x > 0) {return $x;} else {return 0;}
        /*echo json_encode([$specialty_i,$role_name, $amion_unique, $amion_backup]);
        if ($x) {
            $a += $x;
            $rows[$specialty][] = $role_name;
        }
        */
}
function getfutureroles() {
    global $mysqli;
    global $roundtwo;
    if (isset($roundtwo) && count($roundtwo > 0)) {
        foreach (array_keys($roundtwo) as $specialty) {
            if (!$mysqli->query(sprintf("INSERT INTO nutm_specialties (name) VALUES ('%s')", $specialty))) {echo $mysqli->error;exit();}
        }
    }
    $specs = getspecialties();
    if (!$stmt = $mysqli->prepare('
        INSERT INTO nutm_roles (specialty, name, amion_unique, amion_backup,blacklist) VALUES (?,?,?,?,false)
        ')) {echo $mysqli->error;}
    $a = 0;
    if (isset($roundtwo) && count($roundtwo > 0)) {
        foreach ($roundtwo as $specialty=>$rows) {
            foreach($rows as $r) {
                $a += deal_with_row($r, $stmt,$specs);
            }
        }
        unset($roundtwo);
    } else {
        $params = ['Lo' => 'waikato', 'Rpt' => 625, 'Month'=>$_GET['month']];
        $url = 'http://www.amion.com/cgi-bin/ocs?' . http_build_query($params, '', '&', PHP_QUERY_RFC3986);
        //$url = 'June.csv';
        $file = fopen($url,"r");

        echo  fgetcsv($file)[0] , ' , ';
        /*if (!$stmt = $mysqli->prepare('IF NOT EXISTS(select * from nutm_roles where amion_unique =? and amion_backup=?)
            BEGIN
            INSERT INTO nutm_roles (specialty, name, amion_unique, amion_backup) VALUES (?,?,?,?)
            END')) {echo $mysqli->error;}
            $stmt->bind_param("iiisii", $amion_unique, $amion_backup, $specialty_i, $role_name, $amion_unique, $amion_backup);
         */
        while(! feof($file)) {
            $r = fgetcsv($file);
            if (count($r) == 12) {
                $a += deal_with_row($r,$stmt,$specs);
            }
        }
        fclose($file);
        $stmt->close();
        if (isset($roundtwo)) {
            return $a + getfutureroles();
        }
    }
    return $a;
}
function getstaff() {
    global $mysqli;
    if (!$stmt = $mysqli->prepare('
        INSERT INTO nutm_staff (full_name, amion_unique, amion_backup, type, pager) VALUES (?,?,?,?,?)
        ')) {echo $mysqli->error;}
    $stmt->bind_param("siiss", $full_name, $amion_unique, $amion_backup, $type, $pager);
    $a = 0;
    $params = ['Lo' => 'waikato', 'Rpt' => 625, 'Month'=>$_GET['month']];
    $url = 'http://www.amion.com/cgi-bin/ocs?' . http_build_query($params, '', '&', PHP_QUERY_RFC3986);
    //$url = 'June.csv';
    $file = fopen($url,"r");

    echo  fgetcsv($file)[0] , ' , ';
        /*if (!$stmt = $mysqli->prepare('IF NOT EXISTS(select * from nutm_roles where amion_unique =? and amion_backup=?)
            BEGIN
            INSERT INTO nutm_roles (specialty, name, amion_unique, amion_backup) VALUES (?,?,?,?)
            END')) {echo $mysqli->error;}
            $stmt->bind_param("iiisii", $amion_unique, $amion_backup, $specialty_i, $role_name, $amion_unique, $amion_backup);
         */
    while(! feof($file)) {
        $r = fgetcsv($file);
        if (count($r) == 12) {
            $full_name=$r[1];
            $amion_unique=$r[2];
            $amion_backup=$r[3];
            $type=$r[10];
            $pager=$r[11];
            $stmt->execute();
            $x = $stmt->affected_rows;
            if ($x>0) {$a += $x;}
        }
    }
    fclose($file);
    $stmt->close();
    return $a;
}
printf(" %d rows added",getstaff());
//var_dump(outliers(true));
//var_dump(outliers(false));
