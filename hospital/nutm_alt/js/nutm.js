function updatePeople () {
    var roles = [
    "Cardiology HO",
    "Cardiology Reg",
    "Medical HO (wards)",
    "Medical HO (AMU)",
    "Medical Reg",
    "Respiratory Reg",
    "Renal RMO",
    "Onc/Haem/Palliative Reg",
    "Orthopaedics HO",
    "General Surgery HO",
    "Surgical Subspecs HO",
    "Nights Medical HO",
    "Nights Medical Reg",
    "Nights Surgical HO",
    "Nights Surgical Reg"
    ];
    var select = $("#user");
    for (i = 0; i < roles.length; i++) {
        var drname = chance.name();
        var role = roles[i];
        select.append($("<option>").data("role", role).data("drname", drname).text(role + ' (' + drname + ')'));
    }
    //$("#user>option:not(:first-child)").each(function(){$(this).text($(this).data("role") + ' (' + $(this).data("drname") + ')')}); //Set the text for the login options using data attributes
}
function getTime(d) {
    return $("<time>").addClass("timeago")
    .attr("title", d.getDate() + '/' + ('0' + (d.getMonth() + 1)).slice(-2) + '/' + (d.getFullYear()).toString().slice(-2) + ' ' + ('0' + d.getHours()).slice(-2) + ':' + ('0' + d.getMinutes()).slice(-2))
    .attr("datetime", d.toISOString());
    //return d.getDate() + '/' + ('0' + (d.getMonth() + 1)).slice(-2) + '/' + (d.getFullYear()).toString().slice(-2) + ' ' + ('0' + d.getHours()).slice(-2) + ':' + ('0' + d.getMinutes()).slice(-2) + ':' + ('0' + d.getSeconds()).slice(-2);
}

function loggedOn() {
    return ($("#user:valid").length === 1);
}

function updateButtons() {
    $("time.timeago").timeago();
    if (loggedOn()) {
        $("div.accept, div.complete").show();
        $("#user>option:first-child").text("Sign out");
        return;
    }    
    $("div.accept, div.complete").hide();
    $("#user>option:first-child").text("Sign in");
}

function getUser() {
    if (loggedOn()) {
        var user = $("#user option:selected");
        return [user.data('drname'), user.data('role')];
    } else {
        return null;
    }
}

function accept() {
    var accepted_td = $(this).parent();
    var row = accepted_td.parent();
    //var accepted_p_td = row.find("td.accepted_p");
    var user = getUser();
    var d = getTime(new Date());
    accepted_td.empty().append(d).append($("<span>").attr("title", user[1]).text(user[0]));
    d.timeago();
}

function complete() {
    var completed_td = $(this).parent();
    var row = completed_td.parent();
    //var completed_p_td = row.find("td.completed_p");
    var user = getUser();
    var d = getTime(new Date());
    completed_td.empty().append(d).append($("<span>").attr("title", user[1]).text(user[0]));
    d.timeago();
    row.find("td.accepted>div").remove();
}

function addnew(row_data) {
    var tr = $(document.createElement('tr'));
    $("#jobs>tbody").append(tr);
    tr.append(
    $("<td>").addClass("added").append(getTime(row_data.added)),
    $("<td>").addClass("nhi").text(row_data.nhi),
    $("<td>").addClass("p_name").text(row_data.p_name),
    $("<td>").addClass("location").text(row_data.ward + '-' + row_data.bed),    
    $("<td>").addClass("specialty").text(row_data.specialty),
    $("<td>").addClass("urgency").text(row_data.urgency),
    $("<td>").addClass("details").text(row_data.details),
    $("<td>").addClass("accepted").append($("<div>").addClass("accept button").text("Accept").click(accept)),
    $("<td>").addClass("completed").append($("<div>").addClass("complete button").text("Complete").click(complete))
    );
    updateButtons();
    /*
    $("button.complete").off("click").click(function () {
        complete($(this).parent().parent());
        $(this).hide();
    });
    $("button.accept").off("click").click(function () {
        accept($(this).parent().parent());
        $(this).hide();
    });
    */
}

function validateForm() {
    var row_data = {
        "added": new Date(),
        "nhi": $("#nhi").val().toUpperCase(),
        "p_name": $("#p_name").val(),
        "ward": $("#ward").val(),
        "bed": $("#bed").val().toUpperCase(),
        "specialty": $("#specialty").val(),
        "urgency": $("#urgency").val(),
        "details": $("#details").val()
    };
    //$("#formoutput").html(JSON.stringify(row_data, null, 2)).show();
    
    addnew(row_data);
    return false;
}

function get_random_str(min, max) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz           ";
    var n = Math.floor(Math.random() * (max - min) + min);
    for (var i = 0; i < n; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

function get_random_nhi() {
    var text = "";
    var possiblealpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var possiblenum = "0123456789";
    for (var i = 0; i < 3; i++) {
        text += possiblealpha.charAt(Math.floor(Math.random() * possiblealpha.length));
    }
    for (var x = 0; x < 4; x++) {
        text += possiblenum.charAt(Math.floor(Math.random() * possiblenum.length));
    }
    return text;
}

function get_random_option(id) {
    list = $("#" + id + ">option:not(:first-child)");
    return list.get(Math.floor(Math.random() * list.length)).text;
}
function get_random_rowdata() {
    var min = 5, max = 20;
    return {
        "added": new Date(new Date().valueOf() - Math.random() * 28800000),
        "nhi": get_random_nhi(),
        "p_name": chance.name(),
        "ward": get_random_option("ward"),
        "bed": Math.ceil((Math.random()*15)),
        "specialty": get_random_option("specialty"),
        "urgency": get_random_option("urgency"),
        "details": chance.sentence({words: Math.floor(Math.random() * (max - min + 1) + min)})
    };
}

function updateValidity() {
    if ($("#taskform :invalid").length === 0) {
        $("#addthis").prop("disabled", false);
    } else {
        $("#addthis").prop("disabled", true);
    }
}

$(function () {
    //Add elements:
    for (i = 0; i < 5; i++) {
        addnew(get_random_rowdata()); //insert 5 random rows
    }
    //Update elements:
    updatePeople();
    //Add handlers:
    $("#user").change(updateButtons); //disable "accept" buttons until logged in
    $("#addrandom").click(function () {
        addnew(get_random_rowdata()); //add handler to "Add new random task" button
    });
    $("#taskform select").change(updateValidity);
    $("#taskform textarea, #taskform input").on("change keyup", updateValidity); //add handler to check form validity and toggle submit button
    $("#taskform").submit(validateForm); //add form validation
});
