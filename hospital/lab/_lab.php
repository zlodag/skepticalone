<?php
global $mysqli;
include('../../_connect.php');

if ($mysqli->connect_errno)
{
    echo sprintf('<p>Could not connect to MySQL: %s</p>', $mysqli->connect_error);
    exit();
}
if (array_key_exists("nhi",$_GET) && preg_match('/^[a-z]{3}\d{4}$/', $_GET["nhi"])) {
    $nhi = $_GET["nhi"];
    include('./_nhi.php');
} else {
    include('./_patients.php');
}
    /*

$key = $_GET['key'];
switch ($key) {
case (preg_match('/^[a-z]{3}\d{4}$/i', $key) ? $key : !$key):
    include('./_nhi.php');
    break;
default:
    include('./_patients.php');
    break;
}



if ($stmt = $mysqli->prepare(
    "select lab_values.name,value_float,type,units,lln,uln,lln_f,uln_f,nhi,dob,sex from lab_values LEFT JOIN lab_tests using (name) LEFT JOIN lab_specs on (specimen=lab_specs.i) LEFT JOIN lab_patients on (patient=nhi) LEFT JOIN lab_panels on (lab_tests.panel=lab_panels.name) where specimen=? ORDER BY lab_panels.i, lab_tests.i"
)) {
    $spec = 1;
    $stmt->bind_param('i', $spec);
    $stmt->execute();
    $stmt->bind_result($name,$value,$type,$units,$lln,$uln,$lln_f,$uln_f,$nhi,$dob,$sex);
?>
<table>
<thead><tr>
<th colspan="2"></th>
<th>Units</th>
<th>Range</th>
</tr></thead>
<tbody>
<?php
    while ($stmt->fetch()) {
        if($sex=='f') {
            if (!is_null($lln_f)) {$lln = $lln_f;}
                if (!is_null($uln_f)) {$uln = $uln_f;}
        }

        if(!is_null($lln) AND $lln>$value) {$class= 'red';}
        elseif(!is_null($uln) AND $uln<$value) {$class= 'red';}
        else{$class = 'black';}

        //if ($type == 'int') {$precision = 0;}
        //elseif ($type == 'float') {$precision = 1;}

        if (!is_null($lln) AND !is_null($uln)) {$range = sprintf("%g - %g", $lln, $uln);}
        elseif (!is_null($lln) AND is_null($uln)) {$range = sprintf("> %g", $lln);}
        elseif (is_null($lln) AND !is_null($uln)) {$range = sprintf("< %g", $uln);}
        else {$range = '';}


        printf(
            '<tr>
            <td>%s</td>
            <td class="%s">%g</td>
            <td>%s</td>
            <td>%s</td>
            </tr>
            ',
            $name,
            $class,
            $value,
            $units,
            $range
        );
    }
    $stmt->close();
?>
</tbody>
</table>
<?php
}
else {
    printf('<p>Prepare statement failed: %s</p>', $mysqli->error);
}
}
     */
