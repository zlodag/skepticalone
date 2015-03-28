<?php
include('../_connect.php');

if ($mysqli->connect_errno)
{
    echo sprintf('<p>Could not connect to MySQL: %s</p>', $mysqli->connect_error);
    exit();
}
if (isset($_POST["name"]) AND isset($_POST["priority"]) AND ($_POST["name"] != "")) {
    $taskname = $_POST["name"];
    $taskpriority = $_POST["priority"];
    $due = $_POST["due"];
    if ($due == '') {
        $due = NULL;
    } else {
        if ($due = strtotime($due)) {
            $due = date("Y-m-d", $due);
        } else {
            $due = NULL;
            $errormsg = sprintf("Could not interpret '%s' as a date", $_POST["due"]);
        }
    }

    if (!isset($errormsg) AND $stmt = $mysqli->prepare("INSERT INTO `todo_main` (`Task`, `Priority`, `Due`) VALUES (?,?,?)")) {
        $stmt->bind_param("sds", $taskname, $taskpriority, $due);
        $stmt->execute();
        if ($stmt->errno == 1062) {
            if ($stmt = $mysqli->prepare("UPDATE `todo_main` SET `Priority`=?, `Due`=?, `Active`=1, `Completed`=0 WHERE `Task`=?")) {
                $stmt->bind_param("dss", $taskpriority, $due, $taskname);
                $stmt->execute();
            } else {
                $errormsg = $stmt->errno;
            }
        }
        $stmt->close();
    }
    if (isset($errormsg)) {
        echo '<p>' . $errormsg . '</p>';
    }
    /*$updatequery = sprintf('INSERT INTO `todo_main` (`Task`, `Priority`) VALUES ("%s","%d");', $mysqli->real_escape_string($taskname), $mysqli->real_escape_string($taskpriority));
    $mysqli->query($updatequery);
     */
}
#elseif (isset($_GET["completed"])) {
#    $completed = $_GET["completed"];
#    $updatequery = sprintf("UPDATE `todo_main` SET `Completed`='1', `Date Completed`=NOW() WHERE `Index` = %d;", $mysqli->real_escape_string($completed));
#    $mysqli->query($updatequery);
#}
?>
<button id="showtoggle">Toggle completed tasks</button>
<?php

$searchstr = 'SELECT * FROM `todo_main` WHERE `Active`=1 ORDER BY `Priority` ASC, `Completed` ASC, `Due` ASC, `Added` ASC;';

/*
 * echo sprintf('<div><button id="searchstrbutton">Show query</button><code id="searchstr">%s</code></div>', htmlspecialchars($searchstr));
 */

$result = $mysqli->query($searchstr);
$numrows = $result->num_rows;
if ( $numrows ) {
    echo '<table>';
    echo '<thead><tr>
        <th id="task">Task</th>
        <th>Priority</th>
        <th id="due">Due</th>
        <th>Completed</th>
        <th></th>
        </tr></thead>';
    echo '<tbody>';
    $completecount = 0;
    while ($r = $result->fetch_assoc()) {
        if (intval($r['Completed']) == 1) { $completecount++; }
            $due = $r['Due'];
        if ($due != '') {
            $today = new DateTime('today');
            $dueobj = new DateTime($due);
            $interval = $today->diff($dueobj);
            $interval = $interval->format('%R%a days');
            $due = htmlspecialchars(sprintf('%s (%s)', $interval, date('jS M', strtotime($due))));
        }

        echo sprintf('<tr id="i%d" class="entry p%d c%d a%d">
            <td>%s</td>
            <td>%d</td>
            <td>%s</td>
            <td><button>Toggle</button></td>
            <td><button>Remove</button></td>
            </tr>',
            $r['Index'],
            $r['Priority'],
            $r['Completed'],
            $r['Active'],
            htmlspecialchars($r['Task']),
            $r['Priority'],
            $due
        );
    }
    echo "</tbody></table>";
    echo sprintf('<p>%d tasks (%d incomplete, %d complete)</p>', $numrows, $numrows - $completecount, $completecount);
}
else {
    echo '<p class="pages">No results found.</p>';
}
?>
<form action='#' method='post'>
<p>
Task name: <input type='text' name='name' />
Priority: <input type="number" name="priority" min="1" max="5" value="3" />
Due: <input type='date' name='due' />
<input type='submit' />
</p>
</form>

