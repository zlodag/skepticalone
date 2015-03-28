<?php
setlocale(LC_MONETARY, 'en_NZ');
include('../_connect.php');
function pmoney($d) {
    return money_format('%n', $d);
}

if ($mysqli->connect_errno)
{
    echo sprintf('<p>Could not connect to MySQL: %s</p>', $mysqli->connect_error);
    exit();
}

if ($stmt = $mysqli->prepare(
    "SELECT * FROM `accounting` ORDER BY `i` ASC"
)) {
    $n = 3;
    //$stmt->bind_param('i', $spec);
    $stmt->execute();
    $stmt->bind_result(
        $i,
        $stamp,
        $details,
        $amount1,
        $amount2,
        $amount3,
        $ratio1,
        $ratio2,
        $ratio3);
    printf("
        <table>
        <thead><tr>
        <th>Timestamp</th>
        <th>Details</th>
        <th>$ - %s</th>
        <th>$ - %s</th>
        <th>$ - %s</th>
        <th>Ratio - %s</th>
        <th>Ratio - %s</th>
        <th>Ratio - %s</th>
        <th>Cost: TOTAL</th>
        <th>Ratio: TOTAL</th>
        <th>Cost per part ($)</th>
        <th>%s</th>
        <th>%s</th>
        <th>%s</th>
        </tr></thead>
        <tbody>
        ",
        'Ed','Elliott','Corli',
        'Ed','Elliott','Corli',
        'Ed','Elliott','Corli');
    $b1 = 0;
    $b2 = 0;
    $b3 = 0;
    while ($stmt->fetch()) {
        $costs = array($amount1,$amount2,$amount3);
        $ratios = array($ratio1,$ratio2,$ratio3);
        $tcost = array_sum($costs);
        $tratio = array_sum($ratios);
        $cost_per_part = ($tcost / $tratio);
        $b1 += $amount1 - $ratio1 * $cost_per_part;
        $b2 += $amount2 - $ratio2 * $cost_per_part;
        $b3 += $amount3 - $ratio3 * $cost_per_part;

        printf(
            '<tr id="i%d">
            <td>%s</td>
            <td>%s</td>
            <td>%s</td>
            <td>%s</td>
            <td>%s</td>
            <td>%g</td>
            <td>%g</td>
            <td>%g</td>
            <td>%s</td>
            <td>%g</td>
            <td>%s</td>
            <td>%s</td>
            <td>%s</td>
            <td>%s</td>
            </tr>
            ',
            $i,
            $stamp,
            $details,
            pmoney($amount1),
            pmoney($amount2),
            pmoney($amount3),
            $ratio1,
            $ratio2,
            $ratio3,
            pmoney($tcost),
            $tratio,
            pmoney($cost_per_part),
            pmoney($b1),
            pmoney($b2),
            pmoney($b3)
        );
    }
    $stmt->close();
?>
</tbody>
</table>
<?php
    //print("<p>$b1, $b2, $b3</p>");
}
else {
    printf('<p>Prepare statement failed: %s</p>', $mysqli->error);
}
