<?php
//include('amion.php');

/*
$stmt = $mysqli->prepare("SELECT building, name from nutm_buildings ORDER BY building ASC");
$stmt->execute();
$buildings = $stmt->get_result()->fetch_all();
$stmt->close();

$stmt = $mysqli->prepare("SELECT name FROM nutm_wards WHERE building=? ORDER BY ward ASC");
$stmt->bind_param('i', $x);
$stmt->bind_result($w);
foreach ($buildings as $building) {
    $temp = [];
    list($x,$b) = $building;
    $stmt->execute();
    while ($stmt->fetch()) {
        $temp[] = $w;
    }
    $obj['wards'][] = [$b,$temp];
}
$stmt->close();
*/

include('../../_connect.php');
$stmt = $mysqli->prepare("select ward,w.name,b.building,b.name from nutm_wards w join nutm_buildings b using (building) order by ward asc");
$stmt->execute();
$stmt->bind_result($w,$wn,$b,$bn);
while ($stmt->fetch()) {
    $obj['wards'][$w] = [$wn,$b,$bn];
}
$stmt->close();
/*
 * $stmt = $mysqli->prepare("SELECT full_name from nutm_staff");
$stmt->execute();
$stmt->bind_result($p);
while ($stmt->fetch()) {
    $obj['staff'][] = $p;
}
$stmt->close();
 */


$stmt = $mysqli->prepare("SELECT urgency,name from nutm_urgency ORDER BY urgency ASC");
$stmt->execute();
$stmt->bind_result($u,$n);
while ($stmt->fetch()) {
    $obj['urgency'][$u] = $n;
}
$stmt->close();

$stmt=$mysqli->prepare("select specialty,name from nutm_specialties where NOT blacklist order by specialty asc");
$stmt->execute();
$stmt->bind_result($s,$n);
while ($stmt->fetch()) {
    $obj['specialties'][$s] = $n;
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
    $added_s,    
    $added_r,    
    $accepted,   
    $accepted_p, 
    $accepted_s, 
    $accepted_r, 
    $completed,  
    $completed_p,
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
        $added_s,    
        $added_r,    
        $accepted,   
        $accepted_p, 
        $accepted_s, 
        $accepted_r, 
        $completed,  
        $completed_p,
        $completed_s,
        $completed_r];
}
$stmt->close();
/*
$stmt = $mysqli->prepare('SELECT
    pk,
    UNIX_TIMESTAMP(added),
    added_p,
    added_r,
    nhi,
    p_name,
    ward,
    bed,
    specialty,
    urgency,
    details,
    UNIX_TIMESTAMP(accepted),
    accepted_p,
    accepted_r,
    UNIX_TIMESTAMP(completed),
    completed_p,
    completed_r
    FROM nutm_tasks
    order by urgency desc, added asc');
$stmt->execute();
$obj['tasks'] = $stmt->get_result()->fetch_all();
$stmt->close();

$obj['blacklist'] = get_blacklist();
 */

header('Content-type: application/json');
echo json_encode($obj);
