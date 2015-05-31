function listen(item, event_str, myFunction) {
    if (item.addEventListener) {                // For all major browsers, except IE 8 and earlier
            item.addEventListener(event_str, myFunction);
    } else if (item.attachEvent) {              // For IE 8 and earlier versions
            item.attachEvent("on" + event_str, myFunction);
    }
}
function validateForm() {
    var drugs = document.getElementsByClassName("meds");
    var drug_dict = [];
    for (x = 1; x <= drugs.length; x++) {
        var drug = drugs[x-1];
        var choice = drug.getElementsByClassName("medchoice")[0].value;
        if (choice == 'stop') {continue;}
        var rx = drug.getElementsByClassName("rx")[0].children[0];
        var sig1 = drug.getElementsByClassName("sig1")[0].children[0];
        var sig2 = drug.getElementsByClassName("sig2")[0].children[0];
        var mitte = drug.getElementsByClassName("mitte")[0].children[0];
        var include = drug.getElementsByClassName("include")[0].children[0];
        if (rx.value == "" && sig1.value == "" && sig2.value == "" && mitte.value == "") {continue;}
        else if (rx.value == "") {
            //alert("missing Drug in row " + x);
            rx.focus();
            return;}
        else if ((sig1.value == "") && (choice != "new")) {
            //alert("missing Admission dose in row " + x);
            sig1.focus();
            return;}
        else if ((sig2.value == "") && (choice != "stop") && (choice != "cont")) {
            //alert("missing Discharge dose in row " + x);
            sig2.focus();
            return;}
        else if ((include.checked) && (mitte.value == "")) {
            //alert("missing Amount in row " + x);
            mitte.focus();
            return;}
        else if (!include.checked) {
            continue;
        } else {
            if (choice == "cont") {
                var sig = sig1.value;
            } else { var sig = sig2.value; }

            drug_dict.push([rx.value, sig, mitte.value]);
        }
    }
    return drug_dict;
}
function printdrugdict() {
    var drug_dict = validateForm();
    if (drug_dict && drug_dict.length == 0) {
        var drug_dict = [["prednisone", "5mg PO mane", "2 weeks"], ["allopurinol", "300mg PO mane", "1 month"], ["paracetamol", "1g PO QID/PRN", "7 days"]];
    }
    if (drug_dict && drug_dict.length > 0) {
        var pt_name = document.getElementById("pt_firstname").innerHTML + " " + document.getElementById("pt_surname").innerHTML;
        var pt_address = document.getElementById("pt_address").innerHTML;
        var dr_name = "Dr John Watson";
        var dr_mcnz = "12345";
        var hosp_address = document.getElementById("hosp_address").innerHTML;
        s = '<div class="left">' + pt_name + "<br>" + pt_address + "</div>";
        s += '<div class="right">' + dr_name + "<br>" + "MCNZ: " + dr_mcnz + "<br>" + hosp_address + "</div>";
        s += "<div><hr><ul>";
        for (x in drug_dict) {
            s += "<li>℞: " + drug_dict[x][0] + "</br>Sig: " + drug_dict[x][1] + "<br>Mitte: " + drug_dict[x][2] + "</li>";
        }
        s += "</ul></div>";
        var today = new Date();
        s += '<hr><div class="left">Signed:</div><div class="right">Date: ' + today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear() + "</div><div></div>";
        var replace = document.getElementById("replace");
        replace.innerHTML = s;
        replace.style.display = "block";

    }
}
function meds() {
    this.parentNode.parentNode.className = "meds " + this.value;
}
function box() {
    var mitte = this.parentNode.nextElementSibling;
    if (this.checked) {
            mitte.className = "mitte";
    } else {
            mitte.className = "mitte hidden";
    }
}
function del() {
    var i = window.event.srcElement.parentNode.parentNode.rowIndex;
    var table = document.getElementById("medtable");
    table.deleteRow(i);
    if (table.rows.length == 1) {add(1)}
}
function del_diag() {
    var i = window.event.srcElement.parentNode;
    var ol = document.getElementById("diagnoses");
    if (ol.children.length == 1) {add_diag();}
    ol.removeChild(i);
}
function add_diag() {
    var diags = document.getElementById("diagnoses");
    var diag = document.createElement("li");
    var input = document.createElement("input");
    input.className = "diagnosis";
    input.required = true;
    diag.appendChild(input);
    var dd = document.createElement("button");
    dd.setAttribute("type","button");
    dd.className = "del_diag";
    var deltxt = document.createTextNode("Delete");
    dd.appendChild(deltxt);
    listen(dd, "click", del_diag);
    diag.appendChild(dd);
    var ad = document.createElement("button");
    ad.setAttribute("type","button");
    ad.className = "add_diag";
    var addtxt = document.createTextNode("More");
    ad.appendChild(addtxt);
    listen(ad, "click", add_diag);
    diag.appendChild(ad);
    if (window.event && window.event.type=="click") {
        var t = window.event.srcElement.parentNode;
        diags.insertBefore(diag, t.nextSibling);
    } else {
        diags.appendChild(diag);
    }
}
function add(num) {
    if (typeof num != "number") {
        num = document.getElementById("addnumber").value;
    }
    var i = 0;
    while (i < num) {
        var row = document.getElementById("medtable_body").insertRow(-1);
        var rowi = row.rowIndex;
        row.className= "meds cont";
        var rx = row.insertCell(0);
        rx.className= "rx";
        var node = document.createElement("input");
        if (rowi == 1) {node.placeholder = "prednisone";}
        rx.appendChild(node);
        var sig1 = row.insertCell(1);
        sig1.className= "sig1";
        var node = document.createElement("input");
        if (rowi == 1) {node.placeholder = "5mg PO mane";}
        sig1.appendChild(node);
        var sel_td = row.insertCell(2);
        var sel_tag = document.createElement("select");
        sel_td.appendChild(sel_tag);
        sel_tag.className="medchoice";
        var optlist = [
            ["cont", "Continued"],
            ["stop", "Stopped"],
            ["change", "Changed"],
            ["new", "New"]
                ];
        for (var o in optlist) {
            var opt = document.createElement("option");
            opt.value=optlist[o][0];
            var txt = document.createTextNode(optlist[o][1]);
            opt.appendChild(txt);
            sel_tag.appendChild(opt);
        }
        listen(sel_tag, "change", meds);
        var sig2 = row.insertCell(3);
        sig2.className= "sig2";
        var node = document.createElement("input");
        if (rowi == 1) {node.placeholder = "1mg PO mane";}
        sig2.appendChild(node);
        var incl = row.insertCell(4);
        incl.className= "include";
        var node = document.createElement("input");
        node.setAttribute("type","checkbox");
        node.checked="true";
        listen(node, "change", box);
        incl.appendChild(node);
        var mitte = row.insertCell(5);
        mitte.className= "mitte";
        var node = document.createElement("input");
        if (rowi == 1) {node.placeholder = "2 weeks";}
        mitte.appendChild(node);
        var delcel = row.insertCell(6);
        var node = document.createElement("button");
        node.setAttribute("type","button");
        delcel.appendChild(node);
        var txt = document.createTextNode("Delete");
        node.appendChild(txt);
        listen(node, "click", del);
        i++;
    }
}

window.onload =  function () {
    add_diag();
    add(3);
    listen(document.getElementById("addmore"), "click", add);
    listen(document.getElementById("checkrx"), "click", printdrugdict);
    listen(document.getElementById("main_form"), "submit", validateForm);
}
