<?php
$file = fopen('data.csv',"r");
echo '<pre>$blacklist = [
';
while(! feof($file)) {
    $r = fgetcsv($file);
    if (count($r) == 10) {
        printf('    %d, // %s %s **** %s
', $r[5],$r[0],$r[4], $r[1]);
    }
}
echo '];</pre>';
fclose($file);

