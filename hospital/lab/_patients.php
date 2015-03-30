<?php
$stmt = $mysqli->prepare(
    "SELECT nhi,first_names,last_name,dob,sex FROM `lab_patients` ORDER BY dob DESC"
);
$stmt->execute();
$stmt->bind_result($nhi, $first_names, $last_name, $dob, $sex);
?>
<table>
<thead><tr>
<th>NHI</th>
<th>Name</th>
<th>Age</th>
<th>Sex</th>
<th>DOB</th>
</tr></thead>
<tbody>
<?php
    while ($stmt->fetch()) {
        $age = (new DateTime($dob))->diff(new DateTime("now"));
        printf(
            '<tr>
            <td>%s</td>
            <td>',
            strtoupper($nhi));
        if ($nhi == 'uvw7654') {
            printf ('<a href="?nhi=%s">%s, %s</a>',$nhi,$last_name, $first_names);
        } else {
            printf ('%s, %s', $last_name, $first_names);
        }
        printf('</td>
            <td>%s</td>
            <td>%s</td>
            <td>%s</td>
            </tr>
            ',
            $age->format("%y years, %m months, %d days"),
            $sex,
            $dob
        );
    }
    $stmt->close();
?>
</tbody>
</table>
