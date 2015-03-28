<?php
include('../_connect.php');

if (isset($_GET["id"])) {
    $entryid = $_GET["id"];

    $searchstr = sprintf('SELECT `reminder`, `text`, `title`, `subtitle` FROM `quiz_lines` JOIN `quiz_entries` ON `quiz_lines`.`entry_id` = `quiz_entries`.`id` WHERE `quiz_entries`.`id` = %d;', $entryid);

} elseif (isset($_GET["topic"])) {
    $topicid = $_GET["topic"];

    $searchstr = sprintf('SELECT `reminder`, `text`, `title`, `subtitle` FROM `quiz_lines` JOIN `quiz_entries` ON `quiz_lines`.`entry_id` = `quiz_entries`.`id` WHERE `quiz_entries`.`id` = %d;', $entryid);
} else {
    $searchstr = sprintf('SELECT %s AS `id`, %s AS `Entry`, %s AS `Topic` FROM `quiz_entries` JOIN `quiz_topics` ON %s = %s;', '`quiz_entries`.`id`','`quiz_entries`.`title`', '`quiz_topics`.`title`','`quiz_entries`.`topic_id`','`quiz_topics`.`id`');
};
//echo sprintf('<div><button id="searchstrbutton">Show query</button><code id="searchstr">%s</code></div>', htmlspecialchars($searchstr));

$result = $mysqli->query($searchstr);
$numrows = $result->num_rows;
if ( $numrows ) {
    if (isset($entryid)) {
        $count = 0;
        while ($r = $result->fetch_assoc()) {
            if ($count === 0) {
//                echo sprintf('<p>The ID is "%d"</p>', $entryid);
                echo '<p><a href=".">Back to main page</a></p>';
                echo sprintf('<h2>%s</h2><h4>%s</h4>', htmlspecialchars($r['title']), htmlspecialchars($r['subtitle']));
                echo '<table>';
                echo '<thead><tr><th>Reminder</th><th>Text</th></tr></thead>';
                echo '<tbody>';
            };
            echo sprintf('<tr class="entry">
                <td>%s</td>
                <td>%s</td>
                </tr>',
                htmlspecialchars($r['reminder']),
                htmlspecialchars($r['text'])
            );
            $count++;
        }
        echo "</tbody></table>";
    } else {
        echo '<table>';
        echo '<thead><tr><th>Title</th><th>Topic</th></tr></thead>';
        echo '<tbody>';
        while ($r = $result->fetch_assoc()) {
            echo sprintf('<tr class="entry">
                <td><a href="%s">%s</a></td>
                <td>%s</td>
                </tr>',
                htmlspecialchars(sprintf('?id=%d', $r['id'])),
                htmlspecialchars($r['Entry']),
                htmlspecialchars($r['Topic'])
            );
        }
        echo "</tbody></table>";
    }
    echo sprintf('<p>Total results: %d</p>', $numrows);
}
else {
    echo '<p class="pages">No results found.</p>';
}
?>
