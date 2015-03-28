<?php
include('../_connect.php');

if ($mysqli->connect_errno)
{
    echo sprintf('<p>Could not connect to MySQL: %s</p>', $mysqli->connect_error);
    exit();
}
?>
<p>
<form method="post" action="#">
    <input name="ss" type="text"></input><input type="submit" value="Search"></input></p>
</form>
</p>
<table>
<tr>
<th>Name</th>
<th>Username</th>
<th>Password</th>
<th>Comment</th>
<th></th>
</tr>
<?php
$searchstr=$_POST["ss"];
if ($_POST["search"] AND $_POST["un"] AND $_POST["pw"]) {
    $stmt = $mysqli->prepare(
        "INSERT INTO `pw_main` (`search`,`un`,`pw`,`comment`) VALUES (?,?,?,?)");
    $stmt->bind_param('ssss', 
        $_POST["search"],
        $_POST["un"],
        $_POST["pw"],
        $_POST["comment"]);
    $stmt->execute();
    $stmt->close();
    $searchstr = $_POST["search"];
} 
if ($searchstr) {
    $stmtstr = sprintf('SELECT `index`,`search`,`un`,`pw`,`comment` FROM `pw_main` WHERE `search` LIKE "%%%s%%" ORDER BY `search`', $searchstr);
    $stmt = $mysqli->prepare(
        $stmtstr
    );
    $stmt->execute();
    $stmt->bind_result(
        $index,
        $search,
        $un,
        $pw,
        $comment);
    while ($stmt->fetch()) {
        printf('<tr>
            <td>%s</td>
            <td>%s</td>
            <td><div class="pw">%s</div></td>
            <td><div class="pw">%s</div></td>
            <td><form method="post" action="#"><input type="hidden" name="delete" value="%d"><input value="Delete" type="submit"></input></form></td>
            </tr>',
            $search,
            $un,
            $pw,
            $comment,
            $index
        );
    }
    $stmt->close();
}
elseif($_POST["delete"]) {
    $delkey = $_POST["delete"];
    $stmt = $mysqli->prepare('DELETE FROM `pw_main` WHERE `index` = ?');
    $stmt->bind_param('d', $delkey);
    $stmt->execute();
    $stmt->close();
    print('<p>Entry deleted</p>');
}
?>
<tr>
<form method="post" action="#">
<td><input type="text" name="search"></input></td>
<td><input type="text" name="un"></input></td>
<td><input type="password" name="pw"></input></td>
<td><input type="text" name="comment"></input><input type="submit" value="Add"></input></td>
<td></td>
</form>
</tr>
</table>

<form id="pwgen">
<h2>Random Password Generator</h2>
<label for="length">Password Length</label> <input type="text" id="length" value="8">
<br>
<input checked="checked" type="checkbox" id="upper"><label for="upper">A-Z</label>
<input checked="checked" type="checkbox" id="lower"><label for="lower">a-z</label>
<input checked="checked" type="checkbox" id="digits"><label for="digits">0-9</label>
<input type="checkbox" id="special"><label for="special">Special</label>
<br>
<label for="mindigits">Minimum Digit Count</label> <input value="1" type="number" id="mindigits">
<br>
<input type="checkbox" id="ambig"><label for="ambig">Avoid Ambiguous Characters</label>
<br>
<input checked="checked" type="checkbox" id="reqevery"><label for="reqevery">Require Every Character Type</label>
<br>
<input type="submit" id="generatebutton" onclick="dogenerate();return false;" value="Generate">
<input type="reset" id="reset">
<br>
<textarea id="password"></textarea>
</form>
