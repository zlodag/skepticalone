<?php
include('../_connect.php');
if ($mysqli->connect_errno)
{
    echo sprintf('<p>Could not connect to MySQL: %s</p>', $mysqli->connect_error);
    exit();
}
?>
<form action="." method="post">
<?php
if ($_POST["emp_id"]) {
if ($_POST["date"]) {
    $stmt = $mysqli->prepare(
        "INSERT INTO `payslips`(`emp_id`, `date`, `ord_n`, `ord_r`, `pub_n`, `pub_r`, `xcov_n`, `xcov_r`, `al_n`, `al_r`, `sl_n`, `sl_r`, `cbad_n`, `cbad_r`, `cbadah_n`, `cbadah_r`, `oc_n`, `oc_r`, `other`, `paye`, `kiwi`, `mas`, `misc`, `leave_bal`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
    foreach($_POST as $key => $value) {
        if ($value == null) {
            $_POST[$key] = "NULL";
        }
    };
    $stmt->bind_param('isididdiididddddddddiddd', 
    $_POST["emp_id"],
    $_POST["date"],
    $_POST["ord_n"],
    $_POST["ord_r"],
    $_POST["pub_n"],
    $_POST["pub_r"],
    $_POST["xcov_n"],
    $_POST["xcov_r"],
    $_POST["al_n"],
    $_POST["al_r"],
    $_POST["sl_n"],
    $_POST["sl_r"],
    $_POST["cbad_n"],
    $_POST["cbad_r"],
    $_POST["cbadah_n"],
    $_POST["cbadah_r"],
    $_POST["oc_n"],
    $_POST["oc_r"],
    $_POST["other"],
    $_POST["paye"],
    $_POST["kiwi"],
    $_POST["mas"],
    $_POST["misc"],
    $_POST["leave_bal"]);
    $stmt->execute();
    $stmt->close();
}
printf('<table><caption>ID: %d</caption>', $_POST["emp_id"]);
?>
<colgroup>
<col span="2" id="details">
<col span="25" id="income">
<col id="gross">
<col span="5" id="expenses">
<col id="net">
<col span="2" id="leave">
<col span="4" id="ytd">
</colgroup>
<thead>
<?php
$headrow = '
<tr>
<th>ID</th>
<th>Date</th>
<th>Ordinary hours worked</th>
<th>Ordinary hours worked (rate)</th>
<th>Amount</th>
<th>Public holiday not worked</th>
<th>Public holiday not worked (rate)</th>
<th>Amount</th>
<th>Cross cover units</th>
<th>Cross cover rate</th>
<th>Amount</th>
<th>Annual leave hours</th>
<th>Annual leave rate</th>
<th>Amount</th>
<th>Sick leave hours</th>
<th>Sick leave rate</th>
<th>Amount</th>
<th>CB/AD hours</th>
<th>CB/AD rate</th>
<th>Amount</th>
<th>CB/AD (10pm onwards) hours</th>
<th>CB/AD (10pm onwards) rate</th>
<th>Amount</th>
<th>On call hours</th>
<th>On call rate</th>
<th>Amount</th>
<th>Other</th>
<th>GROSS</th>
<th>PAYE</th>
<th>Kiwisaver </th>
<th>MAS</th>
<th>Student Loan</th>
<th>Miscellaneous transactions</th>
<th>NET</th>
<th>Leave available</th>
<th>Leave accrued this fortnight</th>
<th>Gross YTD</th>
<th>PAYE YTD</th>
<th>Student loan YTD</th>
<th>Super YTD</th>
</tr>
';
echo $headrow;
?>
</thead>
<tbody>
<?php
$stmt = 'SELECT * FROM `payslips` WHERE `emp_id`=? ORDER BY `date` ASC';
$stmt = $mysqli->prepare($stmt);
$stmt->bind_param('i',$_POST["emp_id"]); 
$stmt->execute();
$stmt->store_result();
if ($stmt->num_rows > 0) {
    $stmt->bind_result(
        $emp_id,
        $date,
        $ord_n,
        $ord_r,
        $pub_n,
        $pub_r,
        $xcov_n,
        $xcov_r,
        $al_n,
        $al_r,
        $sl_n,
        $sl_r,
        $cbad_n,
        $cbad_r,
        $cbadah_n,
        $cbadah_r,
        $oc_n,
        $oc_r,
        $other,
        $paye,
        $kiwi_p,
        $mas,
        $misc,
        $leave_bal);
    $fiscal = new DateTime('2014-03-31');
    $last_leave_bal = 0;
    $gross_ytd = 0;
    $paye_ytd = 0;
    $sloan_ytd = 0;
    $super_ytd = 0;
    while ($stmt->fetch()) {
        $date = new DateTime($date);
        if ($date > $fiscal) {
            $gross_ytd = 0;
            $paye_ytd = 0;
            $sloan_ytd = 0;
            $super_ytd = 0;
            $fiscal->add(new DateInterval('P1Y'));
            print('<tr class="break"><th colspan="40"></th></tr>');
        }
        $gross = 0;
        print('<tr>');
        printf('<td>%d</td>', $emp_id);
        printf('<td>%s</td>', $date->format("d/m/Y"));
        printf('<td>%d</td><td>$%.3f</td>', $ord_n, $ord_r);
        $ord = round($ord_n * $ord_r, 2);
        $gross += $ord;
        printf('<td>$%.2f</td>', $ord);
        printf('<td>%d</td><td>$%.3f</td>', $pub_n, $pub_r);
        $pub = round($pub_n * $pub_r, 2);
        $gross += $pub;
        printf('<td>$%.2f</td>', $pub);
        printf('<td>%d</td><td>$%.3f</td>', $xcov_n, $xcov_r);
        $xcov = round($xcov_n * $xcov_r, 2);
        $gross += $xcov;
        printf('<td>$%.2f</td>', $xcov);
        printf('<td>%d</td><td>$%.3f</td>', $al_n, $al_r);
        $al= round($al_n * $al_r, 2);
        $gross += $al;
        printf('<td>$%.2f</td>', $al);
        printf('<td>%d</td><td>$%.3f</td>', $sl_n, $sl_r);
        $sl= round($sl_n * $sl_r, 2);
        $gross += $sl;
        printf('<td>$%.2f</td>', $sl);
        printf('<td>%.2f</td><td>$%.3f</td>', $cbad_n, $cbad_r);
        $cbad= round($cbad_n * $cbad_r, 2);
        $gross += $cbad;
        printf('<td>$%.2f</td>', $cbad);
        printf('<td>%.2f</td><td>$%.3f</td>', $cbadah_n, $cbadah_r);
        $cbadah= round($cbadah_n * $cbadah_r, 2);
        $gross += $cbadah;
        printf('<td>$%.2f</td>', $cbadah);
        printf('<td>%.2f</td><td>$%.3f</td>', $oc_n, $oc_r);
        $oc= round($oc_n * $oc_r, 2);
        $gross += $oc;
        printf('<td>$%.2f</td>', $oc);
        $gross += $other;
        printf('<td>$%.2f</td>', $other);
        printf('<td>$%.2f</td>', $gross);
        printf('<td>$%.2f</td>', $paye);
        $kiwi = round($gross * $kiwi_p * 0.01, 2);
        printf('<td>$%.2f@%d%%</td>', $kiwi, $kiwi_p);
        printf('<td>$%.2f</td>', $mas);
        $sloan = (floor($gross) - 367*2) * 0.12;
        printf('<td>$%.2f</td>', $sloan);
        printf('<td>$%.2f</td>', $misc);
        $net = $gross - ($paye + $kiwi + $mas + $sloan + $misc);
        printf('<td>$%.2f</td>', $net);
        printf('<td>%.2f</td>', $leave_bal);
        $leave_acc = $leave_bal-$last_leave_bal;
        $last_leave_bal = $leave_bal;
        printf('<td>%.2f</td>', $leave_acc);
        $gross_ytd += $gross;
        printf('<td>$%.2f</td>', $gross_ytd);
        $paye_ytd += $paye;
        printf('<td>$%.2f</td>', $paye_ytd);
        $sloan_ytd += $sloan;
        printf('<td>$%.2f</td>', $sloan_ytd);
        $super_ytd += $kiwi + $mas;
        printf('<td>$%.2f</td>', $super_ytd);
        print('</tr>');
    }
    echo $headrow;
}
$stmt->close();
?>
    <tr id="finalrow">
        <?php printf('<td><input hidden name="emp_id" value="%s">%s</td>', $_POST["emp_id"], $_POST["emp_id"]); ?>
        <td class="required"><input type="date" name="date" value="<?php if (isset($date)) {echo $date->add(new DateInterval('P2W'))->format('Y-m-d');} ?>" required></td>
        <td class="required"><input type="number" name="ord_n" min="0" max="99" value="80" required></td>
        <td class="required"><input type="number" name="ord_r" min="0" max="99.9999" step="0.0001" value="<?php echo $ord_r; ?>" required></td>
        <td></td>
        <td><input type="number" name="pub_n" min="0" max="99"></td>
        <td><input type="number" name="pub_r" min="0" max="99.999" step="0.001"></td>
        <td></td>
        <td><input type="number" name="xcov_n" min="0" max="9.99" step="0.01"></td>
        <td><input type="number" name="xcov_r" min="0" max="999"></td>
        <td></td>
        <td><input type="number" name="al_n" min="0" max="99"></td>
        <td><input type="number" name="al_r" min="0" max="99.9999" step="0.0001"></td>
        <td></td>
        <td><input type="number" name="sl_n" min="0" max="99"></td>
        <td><input type="number" name="sl_r" min="0" max="99.999" step="0.001"></td>
        <td></td>
        <td><input type="number" name="cbad_n" min="0" max="99.99" step="0.01"></td>
        <td><input type="number" name="cbad_r" min="0" max="99.999" step="0.001"></td>
        <td></td>
        <td><input type="number" name="cbadah_n" min="0" max="99.99" step="0.01"></td>
        <td><input type="number" name="cbadah_r" min="0" max="999.999" step="0.001"></td>
        <td></td>
        <td><input type="number" name="oc_n" min="0" max="99.99" step="0.01"></td>
        <td><input type="number" name="oc_r" min="0" max="99.999" step="0.001"></td>
        <td></td>
        <td><input type="number" name="other" min="0" max="999.99" step="0.01"></td>
        <td></td>
        <td class="required"><input type="number" name="paye" min="0" max="9999.99" step="0.01" required></td>
        <td class="required"><select name="kiwi">
            <option value="0">0%</option>
            <option value="3" selected>3%</option>
            <option value="4">4%</option>
            <option value="8">8%</option>
        </select></td>
        <td class="required"><input type="number" name="mas" min="0" max="999.99" step="0.01" required></td>
        <td></td>
        <td><input type="number" name="misc" min="0" max="9999.99" step="0.01"></td>
        <td></td>
        <td class="required"><input type="number" name="leave_bal" min="0" max="999.99" step="0.01" required></td>
        <td></td>
        <td colspan="4"><input type="submit"></td>
    </tr>
    </tbody>
    </table>
<?php
}
else {
?>
        <p>Enter ID: <input type="number" name="emp_id" min="0" max="99999"><input type="submit"></p>
<?php
}
?>
</form>
