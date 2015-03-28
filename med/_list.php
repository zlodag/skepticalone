<?php
$file = './data.xml';
if (file_exists($file)) {
    $xml = simplexml_load_file($file);
 
} else {
    echo "<p>Failed to open $file</p>";
    exit();
};
foreach ($xml->topic as $topic) {
    echo sprintf('<h3>%s</h3>', $topic['title']);
    echo '<ul>';
    foreach ($topic->entry as $entry) {
        echo '<li>';
        echo sprintf ('<h4>%s</h4>', $entry['description']);
        echo '<ol>';
        foreach ($entry->point as $point) {
            echo '<li>';
            if (!empty($point['subheading'])) {
                echo sprintf('%s: ', $point['subheading']);
            };
            echo sprintf('%s</li>', $point);
        };
        echo '</ol>';
        echo '</li>';
    };
    echo '</ul>';
};
?>
