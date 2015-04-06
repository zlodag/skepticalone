<?php
include('../../_connect.php');
include('_blacklist.php');


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

$stmt = $mysqli->prepare("SELECT full_name from nutm_staff");
$stmt->execute();
$stmt->bind_result($p);
while ($stmt->fetch()) {
    $obj['staff'][] = $p;
}
$stmt->close();

$stmt = $mysqli->prepare("SELECT name from nutm_urgency ORDER BY urgency DESC");
$stmt->execute();
$stmt->bind_result($p);
while ($stmt->fetch()) {
    $obj['urgency'][] = $p;
}
$stmt->close();

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

$obj['blacklist'] = $blacklist;

echo json_encode($obj);

/*
foreach(['tasks'=>$t] as $str => $query) {
    $stmt = $mysqli->prepare($query);
    $stmt->execute();
    $obj[$str] = $stmt->get_result()->fetch_all();
    $stmt->close();
}

echo '<pre>';
echo json_encode($obj,JSON_PRETTY_PRINT);
echo '</pre>';
 */

/*
    $stmt->execute();
    //$stmt->bind_result($this->nhi, $this->first_names, $this->last_name,$dob,$this->sex);

    $meta = $stmt->result_metadata(); 
    while ($field = $meta->fetch_field()) 
    { 
        $params[] = &$row[$field->name]; 
    } 

    call_user_func_array(array($stmt, 'bind_result'), $params); 

    while ($stmt->fetch()) { 
        echo '<tr>';
        foreach($row as $key => $val) 
        { 
            switch ($key) {
                case 'Added' :
                case 'Accepted' :
                case 'Completed' :
                    printf('<td>%s', $val);
                    break;
                case 'Added by' :
                case 'Accepted by' :
                case 'Completed by' :
                    if ($val) {printf(' by %s', $val);}
                    echo '</td>';
                    break;
                case 'Ward' : printf('<td>%s', $val); break;
                case 'Bed' : printf(' - %s</td>', $val); break;
                default : printf('<td>%s</td>', $val);
            }
            $c[$key] = $val; 
        } 
        $result[] = $c; 
        echo '</tr>';
    } 

    $stmt->close(); 
} 
 */
