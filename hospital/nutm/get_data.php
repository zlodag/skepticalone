<?php
include('../../_connect.php');

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

    $stmt = $mysqli->prepare("select * from nutm_taskview");
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

} elseif ($_POST["data"] == "update") {
    $context = $mysqli->real_escape_string($_POST["context"]);
    $pk = $_POST["pk"];
    if(!$stmt=$mysqli->prepare(sprintf("update nutm_tasks t join nutm_staff s join nutm_roles r
        set t.%s = now(), t.%s_p = s.pk, t.%s_r = r.role
        where t.pk =?
        and s.amion_unique=? and s.amion_backup=?
        and r.amion_unique=? and r.amion_backup=?
        ",
        $context,
        $context,
        $context)
    )) {
        $obj['errors'][] = $stmt->error;
    }
    if(!$stmt->bind_param('iiiii',
        $pk,
        $_POST["pu"],
        $_POST["pb"],
        $_POST["au"],
        $_POST["ab"]
    )) {
        $obj['errors'][] = $stmt->error;
    }

    if (!$stmt->execute()) {
        $obj['errors'][] = $stmt->error;
    }
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
        $obj['errors'][] = sprintf("%d affected rows", $affected);
    }

} else {
    echo '_REQUEST["data"] must be specified';
    exit();
}
header('Content-type: application/json');
echo json_encode($obj);
