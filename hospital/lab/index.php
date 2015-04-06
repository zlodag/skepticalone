<?php
class Person {
    public $nhi;
    public $first_names;
    public $last_name;
    public $dob;
    public $age;
    public $sex;
    function __construct() {
        global $mysqli;
        global $nhi;
        $stmt = $mysqli->prepare("SELECT nhi, first_names, last_name, dob, sex from lab_patients where nhi=?");
        $stmt->bind_param('s',  $nhi);
        $stmt->execute();
        $stmt->bind_result($this->nhi, $this->first_names, $this->last_name,$dob,$this->sex);
        if (!$stmt->fetch()) {
            printf ("<p>NHI not known</p></body></html>");
            exit();
        }
        $this->dob = new DateTime($dob);
        $this->age = $this->dob->diff(new DateTime("now"));
        print $this;
    }
    public function __toString() {
        return sprintf('<div id="toplink" class="link" data-panel_i="0"><span id="nhi">%s</span><span id="name">%s, %s</span><span id="age">%d%s</span> (click for all labs)</div>', 
            strtoupper($this->nhi),
            $this->last_name,
            $this->first_names,
            $this->age->format("%y"),
            strtoupper($this->sex)
            //$this->dob->format("d/m/Y"),
        );
    }
}
class Sidebar {
    private $panels;
    public function __construct() {
        global $mysqli;
        global $nhi;
        $stmt = $mysqli->prepare("SELECT panel.i, panel.name FROM lab_values as value JOIN lab_tests as test on test.i=value.test_i JOIN lab_panels as panel on panel.i=test.panel_i JOIN lab_specs as spec on spec.i=value.specimen WHERE spec.nhi=? GROUP BY panel.i ORDER BY panel.i ASC");
        $stmt->bind_param('s', $nhi);
        $stmt->bind_result($i, $name);
        $stmt->execute();
        while ($stmt->fetch()) {
            $this->panels[] = array($i, $name);
        }
        $stmt->close();
    }
    public function is_empty() {
        if (empty($this->panels)) {
            return true;
        } else {return false;}
    }
    public function __toString() {
        /*
        global $mysqli;
        global $nhi;
        $stmt = $mysqli->prepare("SELECT i, name from lab_panels ORDER BY i");
        $stmt->execute();
        $stmt->bind_result($i, $name);
        $s = '<div id="left"><ul id="sidebar">';
        while ($stmt->fetch()) {
            $s .= sprintf('<li><a class="side p%d" href="?nhi=%s&amp;panel=%d">%s</a></li>', $i,$nhi, $i, $name);
        }
        $s .= "</ul></div>";
        return $s;
         */
        global $nhi;
        if ($this->is_empty()) {
            return "<p>No labs exist for this patient</p>";
        }
        $s = '<div id="left"><ul id="sidebar">';
        foreach($this->panels as list($i, $name)) {
            $s .= sprintf('<li class="side link p%d" data-panel_i="%d">%s (click)</li>', $i, $i, $name);
        }
        $s .= "</ul> <a href='./'>Return</a></div>";
        return $s;
    }
}
class SpecList {
    private $specs;
    function __construct() {
        $this->specs = array();
    }
    private function getCurrentSpec() {
        $last = end($this->specs);
        return $last;
    }
    public function addLab($name,$spec,$panel,$dcol,$drec,$dack) {
        $last = $this->getCurrentSpec();
        if (!$last OR ($last->id != $spec)) {
            $this->specs[] = new SpecOld($spec,$dcol,$drec,$dack);
        }
        $last = $this->getCurrentSpec();
        $last->addLab($name,$panel);
    }
    public function printAll() {
        foreach($this->specs as $spec) {
            $spec->printAll();
        }
    }
}
class Series {
    public $name;
    private $values;
    private $type;
    private $units;
    private $lln;
    private $uln;
    private $range;
    function __construct($name,$type,$units,$lln,$uln,$lln_f,$uln_f) {
        global $person;
        if ($person->sex=='f') {
            if (!is_null($lln_f)) {$lln = $lln_f;}
            if (!is_null($uln_f)) {$uln = $uln_f;}
        }
        $this->name = $name;
        $this->values = array();
        $this->type = $type;
        $this->units = $units;
        $this->lln = $lln;
        $this->uln = $uln;
        $this->setRange();
    }
    private function setRange() {

        if (!is_null($this->lln) AND !is_null($this->uln)) {$this->range = sprintf("%g - %g", $this->lln, $this->uln);}
        elseif (!is_null($this->lln) AND is_null($this->uln)) {$this->range = sprintf("&gt; %g", $this->lln);}
        elseif (is_null($this->lln) AND !is_null($this->uln)) {$this->range = sprintf("&lt; %g", $this->uln);}
        else {$this->range = '';}
    }
    public function addResult($spec,$value) {
        $this->values[$spec] = $value;
    }
    private function getResult($spec) {
        if (array_key_exists($spec, $this->values)) {
            $value = $this->values[$spec];
            if ($value < $this->lln OR $value > $this->uln) {
                $entry = sprintf('<em>%g</em>', $value);
            } else {
                $entry = sprintf('%g', $value);
            }
            return sprintf("<td>%s</td>",$entry);
        } else {
            return '<td></td>';
        }
    }
    private function getRange() {
        return sprintf('<td class="range">%s</td>', $this->range);
    }
    private function getUnits() {
        return sprintf('<td class="units">%s</td>', $this->units);
    }
    public function printRow($specs) {
        $s = sprintf('<tr><td class="blank"></td><td class="test">%s</td>', $this->name);
        foreach ($specs as $spec) {
            $s .= $this->getResult($spec->id);
            $s .= $this->getResult($spec->id); //deleteme
            $s .= $this->getResult($spec->id); //deleteme
            $s .= $this->getResult($spec->id); //deleteme
            $s .= $this->getResult($spec->id); //deleteme
            $s .= $this->getResult($spec->id); //deleteme
            $s .= $this->getResult($spec->id); //deleteme
        }
        $s .= $this->getRange(). $this->getUnits() . "</tr>";
        return $s;
    }
}
class LabList {
    public $panel;
    public $panel_i;
    private $labs;
    private $specs;

    function __construct($panel, $panel_i) {
        $this->panel = $panel;
        $this->panel_i = $panel_i;
        $this->labs = array();
        $this->specs = array();
    }
    public function addLab(
            $name,
            $spec,
            $value,
            $type,
            $units,
            $lln,
            $uln,
            $lln_f,
            $uln_f,
            $dcol,
            $drec,
            $dack,
            $coll,
            $pack) {
        $series = $this->getSeries($name,$type,$units,$lln,$uln,$lln_f,$uln_f);
        $series->addResult($spec,$value);
        $this->updateSpecs($spec,$dcol,$drec,$dack,$coll,$pack);
    }
    private function getSeries($name,$type,$units,$lln,$uln,$lln_f,$uln_f) {
        if (!array_key_exists($name, $this->labs)) {
            $this->labs[$name] = new Series($name,$type,$units,$lln,$uln,$lln_f,$uln_f);
        } 
        return $this->labs[$name];
    }
    private function updateSpecs($spec,$dcol,$drec,$dack,$coll, $pack) {
        if (!array_key_exists($spec, $this->specs)) {
            $this->specs[$spec] = new Spec($spec,$dcol,$drec,$dack, $coll, $pack);
        }
        //return $this->specs[$spec];
    }
    public function __toString() {
        $s = sprintf('<div class="caption p%d">%s (scroll&rarr;)</div><div class="contain"><div class="scroll">
            <table class="panel"><thead><tr><th class="blank"></th><th class="test">Test</th>',
            $this->panel_i, $this->panel);
        foreach($this->specs as $spec) {
            $s .= $spec->getSpec();
            $s .= $spec->getSpec(); //deleteme
            $s .= $spec->getSpec(); //deleteme
            $s .= $spec->getSpec(); //deleteme
            $s .= $spec->getSpec(); //deleteme
            $s .= $spec->getSpec(); //deleteme
            $s .= $spec->getSpec(); //deleteme
        }
        $s .= '<th class="range">Range</th><th class="units">Units</th></tr></thead><tbody>';
        foreach($this->labs as $lab) {
            $s .= $lab->printRow($this->specs);
        }
        $s .= '</tbody></table></div></div>';
        return $s;
    }
}
class Spec {
    public $id;
    private $dcol;
    private $drec;
    private $dack;
    private $coll;
    private $pack;
    function __construct($spec,$dcol,$drec,$dack, $coll, $pack) {
        $this->id=$spec;
        $this->dcol=$dcol;
        $this->drec=$drec;
        $this->dack=$dack;
        $this->coll=$coll;
        $this->pack=$pack;
    }
    public function getSpec() {
        $format_date = 'd/m/y';
        $format_time = 'H:i';
        /*
        printf('<th>Collected %s by %s<br />Received: %s',
            $this->dcol->format($format),
            $this->coll,
            $this->drec->format($format)
        );
        */
        if (!$this->dack) {
            /*
            printf('<br />Acknowledged %s by %s',
                $this->dack->format($format),
                $this->pack
            );
            */
            $e = '<input type="checkbox"><br>';
        } else { $e = '<br>';}
        return sprintf('<th>%s%s<br>%s</th>',
            $e,
            $this->dcol->format($format_date),
            $this->dcol->format($format_time));
    }
}
class PanelList {
    private $stack;
    function __construct($panel = null) {
        global $_GET;
        global $nhi;
        global $mysqli;
        $this->stack = [];
        $prepare = "SELECT
            panel.name,
            panel.i,
            test.name,
            spec.i,
            value_float,type,units,lln,uln,lln_f,uln_f,collected,received,acknowledged,collector,acknowledger
            FROM lab_values as value
            JOIN lab_tests as test on test.i=value.test_i
            JOIN lab_panels as panel on panel.i=test.panel_i
            JOIN lab_specs as spec on spec.i=value.specimen
            WHERE spec.nhi=? %s
            ORDER BY panel.i ASC, spec.collected DESC, test.i ASC";
        if ($panel) {
            $str = sprintf($prepare, 'AND panel.i=?');
            $stmt = $mysqli->prepare($str);
            $stmt->bind_param('si',  $nhi, $panel);
        } else {
            $str = sprintf($prepare, '');
            $stmt = $mysqli->prepare($str);
            $stmt->bind_param('s', $nhi);
        }
        $stmt->execute();
        $stmt->bind_result(
            $panel,
            $panel_i,
            $name,
            $spec,
            $value,
            $type,
            $units,
            $lln,
            $uln,
            $lln_f,
            $uln_f,
            $dcol,
            $drec,
            $dack,
            $coll,
            $pack
        );
        $p = false;
        while ($stmt->fetch()) {
            if ($p != $panel) {
                $lablist = new LabList($panel, $panel_i);
                $this->stack[] = $lablist;
                $p = $panel;
            }
            $dcol = new DateTime($dcol);
            $drec = new DateTime($drec);
            if ($dack) {$dack = new DateTime($dack);}
            $lablist->addLab(
                $name,
                $spec,
                $value,
                $type,
                $units,
                $lln,
                $uln,
                $lln_f,
                $uln_f,
                $dcol,
                $drec,
                $dack,
                $coll,
                $pack
            );
        }
        $stmt->close();
    }
    public function __toString() {
        $s = "";
        foreach ($this->stack as $item) {
            $s .= $item;
        }
        return $s;
    }
}


global $mysqli;
include('../../_connect.php');
if (array_key_exists("nhi",$_GET)
&& preg_match('/^[a-z]{3}\d{4}$/', $_GET["nhi"])
&& array_key_exists('panel', $_GET)
&& is_numeric($_GET['panel'])) {
    $nhi = $_GET["nhi"];
    $panel = intval($_GET["panel"]);
    print new PanelList($panel);
} else {
?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>LabViewer</title>
        <link rel="stylesheet" type="text/css" href="lab.css">
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
        <script src="lab.js"></script>
    </head>
    <body>
<?php
    if (array_key_exists("nhi",$_GET)
        && preg_match('/^[a-z]{3}\d{4}$/', $_GET["nhi"])) {
        $nhi = $_GET["nhi"];
        $person = new Person();
        $sidebar = new Sidebar();
        print '<div id="page">';
        print $sidebar;
        if (!$sidebar->is_empty()) {
            print '<img src="loading.gif" id="loadimg">';
            print '<div id="right">';
            print new PanelList();
            print '</div>';
        }
        print '</div>';
    } else {
        include('./_patients.php');
    }
    print "</body></html>";
}
exit();
