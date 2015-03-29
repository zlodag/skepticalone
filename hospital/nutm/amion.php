<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>Amion</title>
        <link rel="stylesheet" href="css/amion.css" />
    </head>
    <body>
<?php
$file = fopen("data.csv","r");
$last_specialty = "";
$i = 0;
$indices = [0, 1, 4];
$database = [];
echo("<table>");
while(! feof($file)) {
    $r = fgetcsv($file);
    if (count($r) == 10) {
        $specialty = $r[0];
        if (!array_key_exists($specialty, $database)) {$database[$specialty] = [];}
        $database[$specialty][$r[4]] = $r[1];
        if ($specialty !== $last_specialty && $i !== 0) {
            echo '</table><table>';
            $last_specialty = $specialty;
        }
        echo '<tr>';
        foreach($r as $index => $data) {
            if (in_array($index, $indices)) {
                echo '<td>' . $data . '</td>';
            }
        }
        echo '</tr>';
    }
    $i++;
}
echo("</table>");

fclose($file);
?>
    </body>
</html>