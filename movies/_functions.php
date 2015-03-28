<?php
function ajaxformat($bin) {
    $bin = strval($bin);
    if ($bin === '1') {
        return "&#10004;";
    } elseif ($bin === '0') {
        return "&#10008;";
    } else {
        return htmlspecialchars($bin);
    }
}
function getifset($dict, $key, $default) {
    if (isset($dict[$key])) {
        return $dict[$key];
    } else {
        return $default;
    };
}
function formatifset($dict, $key,  $string) {
    $value = getifset($dict, $key, '');
    if ($value != '') {
        return sprintf($string, $value);
    };
}
function options($dict, $key, $list, $default) {
    $order = getifset($dict, $key, $default);
    foreach ($list  as $value) {
        if ($value == $order) {$selected = ' selected="selected"';} else {$selected = '';};
        echo sprintf('<option value="%s"%s>%s</option>', $value, $selected ,$value);
    };
}
function reverse($ascdesc) {
    if ($ascdesc == 'ASC') {return 'DESC';} elseif ($ascdesc == 'DESC') {return 'ASC';};
}

function cleanse($string, $mysqli) {
    if ($string === NULL) {return 'NULL';}
    $tmp2 = $mysqli->real_escape_string($string);
    return "'" . $tmp2 . "'";
}

?>
