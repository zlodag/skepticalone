<?php
header('Content-type: application/json');
$q = "
SELECT
    UNIX_TIMESTAMP(added),
    added_p,
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
    order by urgency desc, added asc
";
/*
$q = "
    SELECT UNIX_TIMESTAMP(added) as Added,
    a.full_name as 'Added by',
    nhi as NHI,
    p_name as Patient,
    w.name as Ward,
    bed as Bed,
    s.name as Specialty,
    u.name as Urgency,
    details as Details,
    UNIX_TIMESTAMP(accepted) as Accepted,
    b.full_name as 'Accepted by',
    UNIX_TIMESTAMP(completed) as Completed,
    c.full_name as 'Completed by'
    FROM nutm_tasks as t
    join nutm_wards as w using (ward)
    join nutm_staff as a on (t.added_p = a.pk)
    join nutm_specialties as s using (specialty)
    join nutm_urgency as u using (urgency)
    left join nutm_staff as b on (t.accepted_p = b.pk)
    left join nutm_staff as c on (t.completed_p = c.pk)
    order by u.urgency desc, added asc
";
*/
include('../../_connect.php');
if ($mysqli->real_query($q)) {
    echo json_encode($mysqli->use_result()->fetch_all(), JSON_NUMERIC_CHECK); 
} else {
    echo {error: 'Query failed'};
}
$mysqli->close(); 
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
