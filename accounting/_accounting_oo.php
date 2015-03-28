<?php
class Number {
    public $value;
    function __construct($value) {
        $this->value = $value;
    }
    public function add($x) {
        $this->value += $x;
    }
    public function __toString() {
        /*if (!isset($this->str)) {
            $this->str = $this->value;
        }*/
        if ($this->value == 0) {
            return("<td></td>");
        } else {
            return sprintf("<td>%g</td>", $this->value);
        }
    }
}
class Amount extends Number {
    private $str;
    private $red;
    function __construct($value) {
        parent::__construct($value);
        $this->red = '';
    }
    public function __toString() {
        if ($this->value == 0) {
            $this->str = '';
        } else {
            if ( $this->value < 0 ) {
                $this->red = ' class="red"';
            }
            $this->str = money_format('%n', $this->value);
        }
        return sprintf("<td%s>%s</td>", $this->red, $this->str);
    }

}

class Person {
    public $name;
    public $balance;
    public $lastcontribution;
    public $lastratio;
    function __construct($name) {
        $this->name = $name;
        $this->balance = new Amount(0);
        $this->lastcontribution = new Amount(0);
        $this->lastratio = new Number(0);
    }
    public function update($cpp) {
        $this->balance->add($this->lastcontribution->value - $this->lastratio->value * $cpp);
    }
    function __toString() {
        return ($this->balance->__toString());
    }
}
class People {
    public $list;
    public $n;
    function __construct() {
        global $mysqli;
        $this->list = array();
        $stmt = $mysqli->prepare("SELECT `name` FROM `accounting_names` ORDER BY `i` ASC");
        $stmt->execute();
        $stmt->bind_result($p);
        while ($stmt->fetch()) {
            $this->list[] = new Person($p);
        }
        $stmt->close();
        $this->n = count($this->list);
        //printf ("total number of people is: %s", $this->n);
    }
    public function printheader() {
?>
        <table>
        <thead><tr>
        <th>Timestamp</th>
        <th>Details</th>
<?php
        foreach (array('$', 'Ratio') as $s) {
            foreach ($this->list as $person) {
                printf("<th>%s - %s</th>", $s, $person->name);
            }
        }
?>
        <th>Cost: TOTAL</th>
        <th>Ratio: TOTAL</th>
        <th>Cost per part ($)</th>
<?php
        foreach ($this->list as $person) {
            printf("<th>%s</th>", $person->name);
        }
?>
        </tr></thead>
        <tbody>
<?php
    }
    public function transact($row) {
        $c = 0;
        $tcost = new Amount(0);
        $tratio = new Number(0);
        //$costs = array();
        //$ratios = array();
        while ($c < $this->n) {
            $person = $this->list[$c];
            $cost = $row[sprintf("amount%d", $c+1)];
            $ratio = $row[sprintf("ratio%d", $c+1)];
            //printf ("<p>%s, %s</p>", $cost , $ratio);
            $person->lastcontribution = new Amount($cost);
            $person->lastratio = new Number($ratio);
            $tcost->add($cost);
            $tratio->add($ratio);
            //printf("<p>Person is %s, lastcontrib is %s, lastratio is %s, balance is %s</p>", $person->name, $cost, $ratio, $person->balance->value);
            $c++;
        }
        $cost_per_part = new Amount($tcost->value / $tratio->value);
        printf('
            <tr id="i%d">
            <td>%s</td>
            <td>%s</td>',
            $row['i'],
            $row['stamp'],
            $row['details']);
        foreach ($this->list as $person) {
            $person->update($cost_per_part->value);
            print $person->lastcontribution;
        }
        foreach ($this->list as $person) {
            print $person->lastratio;
        }
        print(
            $tcost . 
            $tratio .
            $cost_per_part);
        foreach ($this->list as $person) {
            print $person;
        }
        print('</tr>');
    }
}

function main() {
    global $mysqli;
    setlocale(LC_MONETARY, 'en_NZ');
    include('../_connect.php');
    if ($mysqli->connect_errno)
    {
        echo sprintf('<p>Could not connect to MySQL: %s</p>', $mysqli->connect_error);
        exit();
    }

    $people = new People();
    $people->printheader();

    $stmt = $mysqli->prepare("SELECT * FROM `accounting` ORDER BY `i` ASC");
    $stmt->execute();
    $result = $stmt->get_result();

    while ($row = $result->fetch_assoc()) {
        $people->transact($row);
    }
    $stmt->close();
?>
</tbody>
</table>
<?php
}

main();
