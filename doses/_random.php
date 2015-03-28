<?php
include('../_connect.php');
$stmt = $mysqli->prepare("SELECT * FROM `drug_items` WHERE `active`=1 ORDER BY (`correct`/(`correct`+`incorrect`)) ASC, RAND() LIMIT 12");
$stmt->execute();
$stmt->bind_result($id, $name, $dose, $class, $notes, $correct, $incorrect, $active);
while($stmt->fetch()) {
    $class = explode(" ", $class, 2);
    $class = strtolower($class[0]);
    printf('<dl id="i%d" class="%s"><dt>%s</dt>
        <dd class="answer dose">%s</dd>
        ',
        $id,
        $class,
        $name,
        $dose
    );
    if ($notes) {
        printf('<dd class="answer dose"><em>%s</em></dd>', $notes);
    }
    $correct = (int) $correct;
    $incorrect = (int) $incorrect;
    $attempts = $correct + $incorrect;
    print('<dd class="answer stats">');
    if ($attempts > 0) {
        printf('%.0f%% correct!', $correct/$attempts*100);
    }
    else {print('Not yet attempted');}
    print('</dd>');
    print('<dd class="answer"><button class="correct">Y</button><button class="incorrect">N</button></dd>
        <dd><button class="reveal">Show dose</button></dd></dl>');
}
$stmt->close();
?>
<p id="tail">
<?php
//<a href="add.php">Add drugs</a>
?>
<a href="doses.php">Dose list</a>
</p>
