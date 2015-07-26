<?php
class Server {
    public function serve() {
        $method = $_SERVER['REQUEST_METHOD'];
        if ($method === 'POST') {
            $this->feed = json_decode(file_get_contents("php://input"));
            if (is_null($this->feed)) {
                header('HTTP/1.1 400 Bad Request');
                exit;
            }
            $this->send_page();
        } elseif ($method === 'GET') {
            if (!array_key_exists('hours',$_GET) || !preg_match("/^[0-9]+$/", $_GET['hours'])) {
                header('HTTP/1.1 400 Bad Request');
                exit;
            }
            $hours = intval($_GET['hours']);
            $this->page_log($hours);
        } else {
            header('HTTP/1.1 405 Method Not Allowed');
            exit;
        }
    }
    private function page_log($hours){
        include('../../_connect.php');
        date_default_timezone_set("Pacific/Auckland");
        $stmt = $mysqli->prepare("
            SELECT UNIX_TIMESTAMP(`ts`),`no`,`msg`,`caller`,`phone`,`within`,`patient`,`nhi`,`ward`,`bed`,`why`,`details`
            FROM `page_log`
            WHERE `ts` > NOW()-INTERVAL ? HOUR
            ORDER BY `ts` DESC");
        $stmt->bind_param('i',$hours);
        $stmt->execute();
        $stmt->bind_result(
            $ts,
            $no,
            $msg,
            $caller,
            $phone,
            $within,
            $patient,
            $nhi,
            $ward,
            $bed,
            $why,
            $details
        );
        $rows = [];
        while($stmt->fetch()) {
            $data = [
                "ptpage" => $nhi ? true : false,
                "no" => [$no],
            ];
            if ($data["ptpage"]) {
                $data["caller"] = $caller;
                $data["phone"] = $phone;
                $data["reply"] = $within ? true : false;
                if ($data["reply"]) {$data["within"] = $within;}
                $data["patient"] = $patient;
                $data["nhi"] = $nhi;
                $data["ward"] = $ward;
                $data["bed"] = $bed;
                $data["why"] = $why;
                $data["details"] = $details;
            } else {
                $data["contents"] = $msg;
            }
            $rows[] = [
                "data" => $data,
                "ts" => $ts
            ];
        }
        $stmt->close();
        $this->output($rows);
    }
    private function test_input($key) {
        $maxlength = 128;
        if (!array_key_exists($key, $this->feed)) {
            if ($key === "no" || $key === "msg" || $key === "bp") {
                $this->valid = false;
            }
            return null;
        }
        $data = $this->feed->$key;
        if ($data === "") {return null;}
        if ($key === 'no') {
            foreach($data as $number) {
                if (!is_int($number) || $number < 20000 || $number >= 30000) {
                    $this->valid = false;
                }
            }
        } elseif (
            ($key === 'bp' && !is_int($data)) ||
            ($key === 'msg' && (strlen($data) > $maxlength))
        ) {
            $this->valid = false;
        }
        return $data;
    }
    private function send_page(){
        $this->valid = true;
        $no = $this->test_input("no");
        $msg = $this->test_input("msg");
        $bp = $this->test_input("bp");
        if (!$this->valid) {
            header('HTTP/1.1 400 Bad Request');
            exit;
        }
        $private = (!$this->feed->ptpage && $this->feed->private);
        if (!$private) {
            //submit to database
            include('../../_connect.php');
            date_default_timezone_set("Pacific/Auckland");
            $stmt=$mysqli->prepare("INSERT INTO `page_log` (`no`,`msg`,
            `caller`,
            `phone`,
            `within`,
            `patient`,
            `nhi`,
            `ward`,
            `bed`,
            `why`,
            `details`
            ) VALUES (?,?,
            ?,?,?,?,?,?,?,?,?)");
            $stmt->bind_param('issiissssss', $number, $msg,
            $this->feed->caller,
            $this->feed->phone,
            $this->feed->within,
            $this->feed->patient,
            $this->feed->nhi,
            $this->feed->ward,
            $this->feed->bed,
            $this->feed->why,
            $this->feed->details
            );
            foreach($no as $number) {
                $stmt->execute();
            }
            $stmt->close();
        }
        //return last message to browser
        $this->output(['no'=>$no,'msg'=>$msg,'bp'=>$bp,'private'=>$private]);
    }
    private function output($json) {
        header('Content-Type: application/json');
        echo json_encode($json);
    }
}
$server = new Server;
$server->serve();