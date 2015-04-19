<?php
if ($_REQUEST["data"] === "csv") {

    $password = 'waikato';
    $report = 625;
    $params = ['Lo' => $password, 'Rpt' => $report];
    $file = 'http://www.amion.com/cgi-bin/ocs?' . http_build_query($params, '', '&', PHP_QUERY_RFC3986);
    //$file = 'data.csv';

    header('Pragma: public');
    header('Cache-Control: max-age=300');
    header('Content-Type: application/octet-stream');
    //header('Content-Disposition: attachment; filename='.basename($file));
    //header('Content-Length: ' . filesize($file));
    header('Content-Transfer-Encoding: binary');
    readfile($file);
    exit;
}

include('../../_connect.php');

function getrows() {
    global $mysqli;
    global $obj;
    if(!$stmt = $mysqli->prepare("select * from nutm_taskview")) {
        $obj['errors'][] = $mysqli->error;
    } else {
        $stmt->execute();
        $stmt->bind_result(
            $pk,
            $nhi,        
            $p_name,     
            $ward,       
            $bed,        
            $specialty,  
            $urgency,    
            $details,    
            $added,      
            $added_p,    
            $added_pg,    
            $added_s,    
            $added_r,    
            $accepted,   
            $accepted_p, 
            $accepted_pg, 
            $accepted_s, 
            $accepted_r, 
            $completed,  
            $completed_p,
            $completed_pg,
            $completed_s,
            $completed_r);
        while ($stmt->fetch()) {
            $obj['tasks'][] = [
                $pk,
                $nhi,        
                $p_name,     
                $ward,       
                $bed,        
                $specialty,  
                $urgency,    
                $details,    
                $added,      
                $added_p,    
                $added_pg,    
                $added_s,    
                $added_r,    
                $accepted,   
                $accepted_p, 
                $accepted_pg, 
                $accepted_s, 
                $accepted_r, 
                $completed,  
                $completed_p,
                $completed_pg,
                $completed_s,
                $completed_r];
        }
        $stmt->close();
    }
}

/*if ($_GET["data"] === "displayblacklist") {
    ?>
    <!DOCTYPE html>
    <html><head><meta charset="utf-8"><title>Good/Bad/Ugly</title>
    <style type="text/css">
    #good {background-color: #dfffdf;}
    #bad {background-color: #dceaff;}
    #ugly {background-color: #ffebdf;}
    </style>
    </head><body>
    <?php
    $time = new DateTime();

} else
*/
if ($_REQUEST["data"] == "initial") {
    $stmt = $mysqli->prepare("select ward,w.name,b.building,b.name from nutm_wards w join nutm_buildings b using (building) order by ward asc");
    $stmt->execute();
    $stmt->bind_result($w,$wn,$b,$bn);
    while ($stmt->fetch()) {
        $obj['wards'][$w] = [$wn,$b,$bn];
    }
    $stmt->close();

    $stmt = $mysqli->prepare("SELECT specialty,name from nutm_specialties ORDER BY specialty ASC");
    $stmt->execute();
    $stmt->bind_result($s,$n);
    while ($stmt->fetch()) {
        $obj['specialties'][$s] = $n;
    }
    $stmt->close();

    $stmt = $mysqli->prepare("SELECT urgency,name from nutm_urgency ORDER BY urgency ASC");
    $stmt->execute();
    $stmt->bind_result($u,$n);
    while ($stmt->fetch()) {
        $obj['urgency'][$u] = $n;
    }
    $stmt->close();
    getrows();

} elseif ($_REQUEST["data"] == "blacklists") {

    $stmt=$mysqli->prepare("select name from nutm_divisions where blacklist order by division asc");
    $stmt->execute();
    $stmt->bind_result($n);
    while ($stmt->fetch()) {
        $obj['divisions'][] = $n;
    }
    $stmt->close();

    $stmt=$mysqli->prepare("select amion_unique, amion_backup from nutm_roles where blacklist order by amion_unique, amion_backup");
    $stmt->execute();
    $stmt->bind_result($u, $b);
    while ($stmt->fetch()) {
        $obj['roles'][] = [$u,$b];
    }
    $stmt->close();

} elseif ($_POST["data"] == "update" && ($_POST["context"] === "accepted" || $_POST["context"] === "completed" || $_POST["context"] === "added")) {

    $context = $_POST["context"];
    $person= $mysqli->real_escape_string($_POST["person"]);
    $pg = intval($_POST["pg"]);
    $div = $mysqli->real_escape_string($_POST["div"]);
    $role= $mysqli->real_escape_string($_POST["role"]);
    $au = intval($_POST["au"]);
    $ab = intval($_POST["ab"]);
    $on = intval($_POST["on"]);
    $off = intval($_POST["off"]);


    if(!$stmt=$mysqli->prepare("
        insert into nutm_staff (full_name,pager)
        values (?,?)
        on duplicate key update pager=VALUES(pager)")) {
        $obj['errors'][] = $mysqli->error;
    } else {
        if(!$stmt->bind_param('si',
            $person,
            $pg
        )) {
            $obj['errors'][] = $stmt->error;
        } else {
            if (!$stmt->execute()) {
                $obj['errors'][] = $stmt->error;
            }
        }
        $stmt->close();
    }

    if(!$stmt=$mysqli->prepare("
        insert into nutm_roles (division,name,amion_unique,amion_backup,start,finish) values
        ((select division from nutm_divisions where name=?),?,?,?,?,?)
        on duplicate key update 
        division=VALUES(division),
        name=VALUES(name),
        start=VALUES(start),
        finish=VALUES(finish)")) {
        $obj['errors'][] = $mysqli->error;
    } else {
        if(!$stmt->bind_param('ssiiii',
            $div, $role,
            $au, $ab,
            $on, $off
        )) {
            $obj['errors'][] = $stmt->error;
        } else {
            if (!$stmt->execute()) {
                $obj['errors'][] = $stmt->error;
            }
        }
        $stmt->close();
    }

    if ($context === "added") {
        //adding a task
        $nhi = $mysqli->real_escape_string(strtoupper($_POST["nhi"]));
        $p_name = $mysqli->real_escape_string(ucwords($_POST["p_name"]));
        $ward = intval($_POST["ward"]);
        $bed = $mysqli->real_escape_string(strtoupper($_POST["bed"]));
        $specialty = intval($_POST["specialty"]);
        $urgency = intval($_POST["urgency"]);
        $details = $mysqli->real_escape_string($_POST["details"]);

        if(!$stmt=$mysqli->prepare("
            insert into nutm_tasks (
                nhi,
                p_name,
                ward,
                bed,
                specialty,
                urgency,
                details,
                added,
                added_p,
                added_r
            ) values (
                ?,
                ?,
                ?,
                ?,
                ?,
                ?,
                ?,
                now(),
                (select pk from nutm_staff where full_name = ?),
                (select role from nutm_roles where amion_unique = ? and amion_backup=?)
            )
            ")
        ) {
            $obj['errors'][] = $mysqli->error;
        } else {
            if(!$stmt->bind_param('ssisiissii',
                $nhi,
                $p_name,
                $ward,
                $bed,
                $specialty,
                $urgency,
                $details,
                $person,
                $au,
                $ab
            )) {
                $obj['errors'][] = $stmt->error;
            } else {
                if (!$stmt->execute()) {
                    $obj['errors'][] = $stmt->error;
                } else {
                    $affected = $stmt->affected_rows;
                    $stmt->close();
                    if ($affected === 1) {
                        getrows();
                    } else {
                        $obj['errors'][] = sprintf("%d affected rows (context = %s)", $affected, $context);
                    }
                }
            }
        }
    } else {
        //accepting or completing a task

        $pk = intval($_POST["pk"]);

        if(!$stmt=$mysqli->prepare(sprintf("update nutm_tasks t join nutm_staff p join nutm_roles r
            set t.%s = now(), t.%s_p = p.pk, t.%s_r = r.role
            where t.pk =?
            and p.full_name=?
            and r.amion_unique=? and r.amion_backup=?
            ",
            $context,
            $context,
            $context)
        )) {
            $obj['errors'][] = $mysqli->error;
        } else {
            if(!$stmt->bind_param('isii',
                $pk,
                $person,
                $au,
                $ab
            )) {
                $obj['errors'][] = $stmt->error;
            } else {

                if (!$stmt->execute()) {
                    $obj['errors'][] = $stmt->error;
                } else {
                    $affected = $stmt->affected_rows;
                    $stmt->close();
                    if ($affected === 1) {
                        $stmt = $mysqli->prepare(sprintf("select %s,%s_p,%s_pg,%s_d,%s_r from nutm_taskview where pk=?",
                            $context,
                            $context,
                            $context,
                            $context,
                            $context
                        ));
                        $stmt->bind_param('i',$pk);
                        $stmt->execute();
                        $stmt->bind_result($t, $p, $pg, $d, $r);    
                        $stmt->fetch();
                        $obj['labels'] = [
                            't'=>$t,
                            'p'=>$p,
                            'pg'=>$pg,
                            'd'=>$d,
                            'r'=>$r
                            ];
                        $stmt->close();
                    } else {
                        $obj['errors'][] = sprintf("%d affected rows (context = %s)", $affected, $context);
                    }
                }
            }
        }
    }
} else {
    echo '_REQUEST["data"] must be specified';
    exit;
}
header('Content-type: application/json');
echo json_encode($obj);
