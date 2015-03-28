window.onload = main;

function calculate() {
    var time = document.getElementById("time").value;
    time = time.split(":");
    var d = new Date();
    d.setHours(time[0], time[1], 0);
    if (d < new Date()) {
        d.setDate(d.getDate() + 1);
    }
    document.getElementById("date").innerHTML = d.toDateString();
    d = d.getTime();
    var options = document.getElementsByClassName("option");
    for (var n = options.length - 1; n > -1; n--) {
        var option = options[n];
        if (option.children[1].lastChild.checked) {
            value = option.children[1].firstChild.value;
            d = d - 60000*value;
            option.lastChild.innerHTML = getTime(d);
        }
        else {
            option.lastChild.innerHTML = "";
        }
    }
    var alarms = [['final',0],['itouch',5],['initial',5]]; 
    for (var i=0; i<alarms.length; i++) {
        var alarm = alarms[i];
        var element = document.getElementById(alarm[0]);
        if (element.children[1].firstChild.checked) {
            d = d - 60000*alarm[1];
            element.lastChild.innerHTML = getTime(d);
        } else {
            element.lastChild.innerHTML = "--:--";
        }
    }
}

function getTime(stamp) {
    function pad(n) {
        n = n > 9 ? n : '0' + n;
        return n;
    }
    e = new Date(stamp);
    return pad(e.getHours()) + ":" + pad(e.getMinutes());
}

function main() {
    var boxes = document.getElementsByTagName("input");
    for (var n = 0; n < boxes.length; n++) {
        boxes[n].addEventListener("change", calculate);
    }
    calculate();
}
