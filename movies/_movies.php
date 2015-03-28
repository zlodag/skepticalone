<?php
include('../_connect.php');
include('_functions.php');
include('_forms.php');
$offset = 0;
$resultslength = 25;
$limit = array($offset, $resultslength);

$addtoquery = array();
$addtoquery[] = "SELECT `Index`, `Title`, `Year`, `Genre`, `Rating`, `imdbID`, `Seen`, `Flagged`, `Owned`, `Added` FROM `media_movies`";
if (isset($_GET["id"])) {
	$addtoquery[] = sprintf("WHERE `Index` = %d", $_GET["id"]);
	unset($limit);
}
else {
	$querystring = getifset($_GET, 'search', '');
	if ($querystring) {
		$addtoquery[] = sprintf('WHERE 
				(`Title` LIKE "%%%s%%") OR 
				(`Original_Title` LIKE "%%%s%%") OR 
				(`Year` = "%s") OR 
				(`Genre` LIKE "%%%s%%") OR 
				(`imdbID` LIKE "%%%s%%")',
				$querystring, 
				$querystring, 
				$querystring, 
				$querystring, 
				$querystring );
		$inclsummary = getifset($_GET, 'inclsummary', '');
		if ($inclsummary == 'True') {
			$addtoquery[] = sprintf('OR (`Summary` LIKE "%%%s%%")', $querystring);
		};
	};
	$order1 = getifset($_GET, 'order1', 'Title');
	$order2 = getifset($_GET, 'order2', 'Year');
	if (in_array($order1, array("Rating", "Flagged", "Added"))) {$direction1 = 'DESC';} else {$direction1 = 'ASC';};
	if (getifset($_GET, 'reverse1', '') == 'True') { $direction1 = reverse($direction1);};
	if (in_array($order2, array("Rating", "Flagged", "Added"))) {$direction2 = 'DESC';} else {$direction2 = 'ASC';};
	if (getifset($_GET, 'reverse2', '') == 'True') { $direction2 = reverse($direction2);};
	$addtoquery[] = sprintf("ORDER BY `%s` %s, `%s` %s", $order1, $direction1, $order2, $direction2);
	if (isset($_GET["limit"])) {
		if ($_GET["limit"] == "All") {
			unset($limit);
		}
		else {
			$limit[1] = (int) $_GET["limit"];
		}
	};
	if (isset($_GET["page"])) {
		$limit[0] = $limit[1] * ((int) $_GET["page"] - 1);
	};
	if (isset($limit)) {
		$searchstrunlimited = implode(" ", $addtoquery);
		$addtoquery[] = sprintf("LIMIT %d, %d", $limit[0], $limit[1]);
	};
};
$searchstr = implode(" ", $addtoquery);
//echo sprintf('<div><button id="searchstrbutton">Show query</button><code id="searchstr">%s</code></div>', htmlspecialchars($searchstr));

$result = $mysqli->query($searchstr);
$numrows = $result->num_rows;
if ( $numrows ) {
	if (isset($limit)) {
		$totalcount = $mysqli->query($searchstrunlimited)->num_rows;
		$pageno = $limit[0]/$limit[1] + 1;
		$maxpages = ceil($totalcount/$limit[1]);
		$resubmit = $_GET;
		unset($resubmit["page"]);
		$href = '?';
		foreach ($resubmit as $key => $value) {
			$href .= sprintf('&%s=%s', $key, $value);
		};
		$href = htmlspecialchars($href);
		$nextprev = sprintf( '<p class="pages">%d Results &#8212; ', $totalcount);
		if ($pageno > 1) {
			$nextprev .= sprintf('<a href="%s&amp;page=%d">&lt;&lt;</a> <a href="%s&amp;page=%d">&lt;</a> ',
					$href, 1,
					$href, $pageno - 1);
		};
		$nextprev .= sprintf('Page %d of %d', 
				$pageno,
				$maxpages);
		if ($pageno < $maxpages ) {
			$nextprev .= sprintf(' <a href="%s&amp;page=%d">&gt;</a> <a href="%s&amp;page=%d">&gt;&gt;</a>',
					$href, $pageno + 1,
					$href, $maxpages);
		};
		$nextprev .= '</p>';
	};
	if (isset($nextprev)) {echo $nextprev;}
	echo '<table id="dbtable">';
	echo '<thead><tr><th>Title</th><th>Year</th><th>Genre</th><th>Rating</th><th>Summary</th><th>Seen</th><th>Flagged</th><th>Owned</th><th>Added</th><th>Delete</th></tr></thead>';
	echo '<tbody>';
	$counter = 1;
	while ($r = $result->fetch_assoc()) {
		echo sprintf('<tr id="i%d" class="entry">
				<td class="title"><a href="%s">%s</a></td>
				<td>%d</td>
				<td>%s</td>
				<td>%.1f</td>
				<td class="summary"><div class="summarytxt"></div><div class="more">Click to show summary...</div></td>
				<td><button class="seen">%s</button></td>
				<td><button class="flagged">%s</button></td>
				<td><button class="owned">%s</button></td>
				<td class="added">%s</td>
				<td><button class="delete">%s</button></td>
				</tr>',
				$r['Index'],
				htmlspecialchars(sprintf("http://www.imdb.com/title/%s", $r['imdbID'])),
				htmlspecialchars($r['Title']),
				$r['Year'],
				htmlspecialchars($r['Genre']),
				$r['Rating'],
				ajaxformat($r['Seen']),
				ajaxformat($r['Flagged']),
				ajaxformat($r['Owned']),
                                date("j/n/y H:i:s", strtotime($r['Added'])),
                                ajaxformat(0)
					);
		$counter++;
	}
	echo "</tbody></table>";
	if (isset($nextprev)) {echo $nextprev;}
}
else {
	echo '<p class="pages">No results found.</p>';
}
?>
