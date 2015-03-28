<?php
date_default_timezone_set("Pacific/Auckland");
function test_input($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}
function value_p($str) {
    global $fields;
    $value = $fields[$str];
    if ($str == "to" && $value == "") {
        $value = "20";
    }
    printf(' value="%s"', $value);
}
//$to = $phone = $caller = $nhi = $patient = $ward = $bed = $why = $details = "";
$field_strings = [
"to" => ["Pager number", "be 20 followed by 3 digits", "/^20[0-9]{3}$/"],
"phone" => ["Phone number", "contain 5 to 11 digits", "/^[0-9]{5,12}$/"],
"caller" => ["Name", "contain 2 to 10 characters", "/^.{2,10}$/"],
"nhi" => ["NHI", "be a valid NHI number", "/^[A-Za-z]{3}[0-9]{4}$/"],
"patient"=> ["Name", "contain 2 to 10 characters", "/^.{2,10}$/"],
"ward"=> ["Ward", "contain 1 to 3 characters", "/^[A-Za-z0-9]{1,3}$/"],
"bed"=>["Bed", "contain 1 to 3 characters", "/^[A-Za-z0-9]{1,3}$/"],
"why"=>["Reason for page", "be selected", "/.*/"],
"details"=>["Details","be no more than 50 characters", "/^.{0,50}$/"]
];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $fields = [];
    $errors = [];
    $valid = true;
    foreach ($field_strings as $key => $array) {
        $str = $array[0];
        $format = $array[1];
        $regexp = $array[2];
        $value = test_input($_POST[$key]);
        if (empty($value) && $key != "details") {
            $fields[$key] = "";
            $valid = false;
            $errors[$key] = sprintf('<span class="error">%s is required</span>', $str);
        } else {
            if ($key == "nhi" || $key == "ward" || $key == "bed") {
                $value = strtoupper($value);
            }
            if ($key == "caller" || $key == "patient") {
                $value = ucwords($value);
            }
            $fields[$key] = $value;
            if (preg_match($regexp, $value)) {
                $errors[$key] = "";
            } else {
                $valid = false;
                $errors[$key] = sprintf('<span class="error">%s must %s</span>', $str, $format);
            }
        }
    }
}

?>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>BetterPage</title>
<link rel="icon" type="image/x-icon" href="favicon.ico">
<link rel="stylesheet" href="betterpage.css" />
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
</head>

<body>
<form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>" method="POST">

<fieldset>
<legend>To</legend>
<label for="to">Pager</label>
<input<?php value_p('to');?>" id="to" name="to" title="20 followed by 3 digits" pattern="20[0-9]{3}" maxlength="5" value="20" required>
<?php
echo $errors["to"];
?>
</fieldset>

<fieldset>
<legend>From</legend>
<label for="caller">Name</label>
<input<?php value_p('caller');?>" id="caller" name="caller" title="2 to 10 characters" pattern=".{2,10}" maxlength="10" required>
<label for="phone">Phone</label>
<input<?php value_p('phone');?>" id="phone"  name="phone" title="5 to 11 digits" pattern="[0-9]{5,12}" maxlength="11" required>
<?php
echo $errors["caller"], $errors["phone"];
?>
</fieldset>

<fieldset>
<legend>Patient</legend>
<label for="patient">Name</label>
<input<?php value_p('patient');?>" id="patient" name="patient" title="2 to 10 characters" pattern=".{2,10}" maxlength="10" required>
<label for="nhi">NHI</label>
<input<?php value_p('nhi');?>" id="nhi" name="nhi" title="ABC1234" pattern="[A-Za-z]{3}[0-9]{4}" maxlength="7" required>
<label for="ward">Ward</label>
<input<?php value_p('ward');?>" id="ward" name="ward" title="1 to 3 characters" pattern="[A-Za-z0-9]{1,3}" maxlength="3" required>
<label for="bed">Bed</label>
<input<?php value_p('bed');?>" id="bed" name="bed" title="1 to 3 characters" pattern="[A-Za-z0-9]{1,3}" maxlength="3" required>
<?php
echo $errors["patient"], $errors["nhi"], $errors["ward"], $errors["bed"];
?>
</fieldset>

<fieldset>
<legend>Details</legend>
<select id="why" name="why" required>
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
        if ($option[1] == $fields['why']) {
            print(' selected');
        }
        printf('>%s</option>', $option[0]);
    }
    print('</optgroup>');
}
?>
</select>
<label id="specify" for="details">Specify if needed</label>
<input<?php value_p('details');?>" id="details" name="details" title="up to 50 characters" pattern=".{0,50}" maxlength="50" placeholder="Specify (optional - 50 character limit)"></input>
<?php
echo $errors["why"], $errors["details"];
?>
</fieldset>

<input type="submit" value="Send">

</form>
<?php
$filename = "pages.txt";
if ($valid) {
    echo "<p>Successful submission of form!</p>";
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
    printf('<code>%s</code>', $message);
    $t = time();
    $logmessage = sprintf("%s To: %s\t%s\n", date("Y-m-d H:i:s", $t), $fields["to"],  $message); 
    file_put_contents ($filename, $logmessage, FILE_APPEND | LOCK_EX);
}
/*
echo "<pre>";
print_r($fields);
echo "</pre>";
*/
printf("<p><a href=%s>Page Log</a></p>", $filename);
?>
</body>
</html>
