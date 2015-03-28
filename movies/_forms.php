<div id="forms">
<form action="omdb.php" method="get">
<p>
<input name="search" value=""/>
<input type="submit" value="Search IMDb" />
</p>
</form>
<form action="#" method="get">
<p>
Search <input name="search"<?php
echo formatifset($_GET, 'search', ' value="%s"');
?>/> (include summary <input type="checkbox" name="inclsummary" value="True"<?php
echo formatifset($_GET, 'inclsummary', ' checked="checked"');
?>/>)
-- Order by <select name="order1">
<?php
$fields = array('Title', 'Year', 'Genre', 'Rating', 'Seen', 'Flagged', 'Owned', 'Added');
options($_GET, 'order1', $fields, 'Title');
?>
</select>
(reverse <input type="checkbox" name="reverse1" value="True"<?php
echo formatifset($_GET, 'reverse1', ' checked="checked"');
?>/>)
then <select name="order2">
<?php
options($_GET, 'order2', $fields, 'Year');
?>
</select>
(reverse <input type="checkbox" name="reverse2" value="True"<?php
echo formatifset($_GET, 'reverse2', ' checked="checked"');
?>/>) --
Show <select name="limit">
<?php
options($_GET, 'limit', array('5', '25', '50', '75', '100', 'All'), '25');
?>
</select> results --
<input type="submit" value="Go!" />
</p>
</form>
</div>
