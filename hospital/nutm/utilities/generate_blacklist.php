<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>Good/Bad/Ugly</title>
<style type="text/css">
#good {background-color: #dfffdf;}
#bad {background-color: #dceaff;}
#ugly {background-color: #ffebdf;}
</style>
</head><body>
<?php

include 'amion.php';

$lists = get_database(false);

function print_list($str) {
    global $lists;
    echo '<pre>';
    foreach($lists[$str] as $specialty => $rows) {
        foreach($rows as $r) {
            printf('    [%d,%d], // %s: %s [%s - %s] (%s)
', $r[4][0], $r[4][1], $specialty, $r[1], $r[2], $r[3], $r[0]);
        }
    }
    echo '</pre>';
}

echo '<div id="good">Whitelist (eligible, on call)';
print_list('good');
echo '</div><div id="bad">Greylist (not on call, otherwise eligible)';
print_list('bad');

echo '</div><div id="ugly">Blacklist (not eligible)';
print_list('ugly');
echo '</div>';
?>
</body></html>

