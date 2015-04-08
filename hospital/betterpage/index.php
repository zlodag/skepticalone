<?php
date_default_timezone_set("Pacific/Auckland");
function test_input($key) {
    if (!array_key_exists($key, $_POST)) {
        return '';
    }
    $data = trim($_POST[$key]);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}
function value_p($str) {
    global $fields;
    global $invalid;
    if (!$invalid) {
        if ($str == "to") {$value = '20';}
        else {return;}
    } else {$value = $fields[$str];}
    if ($value != "") {printf(' value="%s"', $value);}
}
$field_strings = [
"to" => ["To: Pager", "be 20 followed by 3 digits", "/^20[0-9]{3}$/"],
"caller" => ["From: Name", "contain 2+ characters", "/^.{2,}$/"],
"phone" => ["From: Phone", "contain 5 to 11 digits", "/^[0-9]{5,11}$/"],
"patient"=> ["Patient: Name", "contain 2+ characters", "/^.{2,}$/"],
"nhi" => ["Patient: NHI", "be a valid NHI number", "/^[A-Za-z]{3}[0-9]{4}$/"],
"ward"=> ["Patient: Ward", "contain 1 to 3 characters", "/^[A-Za-z0-9]{1,3}$/"],
"bed"=>["Patient: Bed", "contain 1 to 3 characters", "/^[A-Za-z0-9]{1,3}$/"],
"why"=>["Details: Reason for page"],
"details"=>["Details: Specify"]
];

$fields = [];
$errors = [];
$initial = true;
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $initial = false;
    foreach ($field_strings as $key => $array) {
        $value = test_input($key);
        $str = $array[0];
        if ($key === 'details') {
        } elseif ($value === '') {
            $errors[$key] = sprintf('<em>%s</em> is required', $str);
        } else {
            if ($key == "nhi" || $key == "ward" || $key == "bed") {
                $value = strtoupper($value);
            } elseif ($key == "caller" || $key == "patient") {
                $value = ucwords($value);
            }
            if ($key != "why" && !preg_match($array[2], $value)) {
                $errors[$key] = sprintf('<em>%s</em> must %s', $str, $array[1]);
            }
        }
        $fields[$key] = $value;
    }
}
$invalid =  !$initial && count($errors) > 0;
$valid = !$initial && !$invalid;
?>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>BetterPage</title>
<link rel="icon" type="image/x-icon" href="favicon.ico">
<link rel="stylesheet" href="betterpage.css" />
<script src="http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.11.2.min.js"></script>
<script src="http://ajax.aspnetcdn.com/ajax/jquery.validate/1.13.1/jquery.validate.min.js"></script>
<script src="jquery.placeholder.min.js"></script>
<script src="betterpage.js"></script>
</head>

<body>
<form id="ptpage" method="POST">

<fieldset>
<legend>To</legend>
<label for="to" class="info">Pager</label>
<input<?php value_p('to');?> name="to">
</fieldset>

<fieldset>
<legend>From</legend>
<label for="caller" class="info">Name</label>
<input<?php value_p('caller');?>  name="caller">
<label for="phone" class="info">Phone</label>
<input<?php value_p('phone');?>  name="phone">
</fieldset>

<fieldset>
<legend>Patient</legend>
<label for="patient" class="info">Name</label>
<input<?php value_p('patient');?> name="patient">
<label for="nhi" class="info">NHI</label>
<input<?php value_p('nhi');?> name="nhi">
<label for="ward" class="info">Ward</label>
<input<?php value_p('ward');?> name="ward">
<label for="bed" class="info">Bed</label>
<input<?php value_p('bed');?> name="bed">
</fieldset>

<fieldset>
<legend>Details</legend>
<select name="why">
<option value="">Reason for page</option>
<?php
$reasons = array(
    "High ADDS - specify why" => [["ADDS 3" , "adds3"], ["ADDS 4" , "adds4"], ["ADDS 5+" , "adds5plus"]],
    "Concern" => [["Pain" , "pain"], ["Wound" , "wound"], ["Clarify plan" , "plan"]],
    "Medication" => [["Fluids" , "fluids"], ["Pain relief" , "analgesia"], ["Anti-emetic" , "antiemetic"], ["Sleeping pill" , "sleep"], ["Laxatives" , "laxatives"], ["Regular Meds" , "regmeds"]],
    "Task" => [["IV line" , "iv_line"], ["Consent" , "consent"], ["Discharge papers" , "discharge"], ["Rechart" , "rechart"]],
    "Other - specify below" => [["Inform (no response needed)" , "inform"], ["Call urgently!" , "call_urgent"], ["Come urgenly!" , "come_urgent"], ["None of the above" , "custom"]]
);
foreach($reasons as $optgroup => $options) {
    printf('<optgroup label="%s">', $optgroup);
    foreach($options as $option) {
        printf('<option value="%s"', $option[1]);
        if ($invalid && $option[1] == $fields['why']) {
            print(' selected');
        }
        printf('>%s</option>', $option[0]);
    }
    print('</optgroup>');
}
?>
</select>
<input<?php value_p('details');?> name="details" placeholder="Specify (optional)"></input>
</fieldset>

<input type="submit" value="Send">

</form>
<div id="preview">
<label>Preview</label>
<code>###:<span class="phone"></span>(<span class="caller"></span>)&nbsp;<span class="nhi"></span>(<span class="patient"></span>)[<span class="ward"></span>-<span class="bed"></span>]&nbsp;<span class="why"></span><span class="details"></span></code>
<label><span></span>/128 characters</label>
</div>
<div id="outcome">
<?php
$filename = "pages.txt";
if ($valid) {
    echo "<label>Successful submission of form!</label>";
    $message = sprintf("%s(%s) %s(%s)[%s-%s] %s",
        $fields["phone"],
        $fields["caller"],
        $fields["nhi"],
        $fields["patient"],
        $fields["ward"],
        $fields["bed"],
        $fields["why"]
    );
    if ($fields["details"] != "") {
        $message .= sprintf(" (%s)", $fields["details"]);
    }
    printf('<code>###:%s</code>', $message);
    $t = time();
    $logmessage = sprintf("%s To: %s\t%s\n", date("Y-m-d H:i:s", $t), $fields["to"],  $message); 
    file_put_contents ($filename, $logmessage, FILE_APPEND | LOCK_EX);
} elseif ($invalid) {
    foreach($errors as $key => $value) {
        echo '<label class="error" for="', $key,'">', $value, '</label>';
    }
}
printf("<a href=%s>Page Log</a>", $filename);
?>
</div>
</body>
</html>
