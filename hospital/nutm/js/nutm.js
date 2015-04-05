var randomrows = 100;
var time = new Date();
var urgency = ['30 mins','1 hour','2 hours','4 hours','8 hours'];
var allwards = [['Medical',['AMU','A2','A3','A4']],['Cardiac care',['CCU','CC2','CC3']],['Menzies',['M2','M12','M3','M4','M14','M5','M6','M16','M7','M17','M8']],['ERB',['E1','E2','E7']],['HBC',['34','35','36']]];

for (var i=j=u=0, wards = {}, locationfns = {}, wardlist = []; i < allwards.length; i++) {
    var w = allwards[i][0],
    l = allwards[i][1];
    locationfns[w] = function(e,n,f,i,$r){return $r.data('building') === f;};
    for (j = 0; j < l.length; j++) {
        wards[l[j]] = [u, w];
        wardlist.push(l[j]);
        u++;
    }
}
//for (w in allwards) {wards = wards.concat(allwards[w]);}

/*function get_building(ward) {
    for (b in allwards) {if (allwards[b].indexOf(ward) != -1) {return b;}}
}*/
function get_building(ward) {
    return wards[ward][1];
}
$.tablesorter.addParser(
    {
        parsed: true,
        id: 'timestamp',
        format: function (s, table, cell, cellIndex) {
            return parseInt(cell.getAttribute('data-timestamp')) || 0;
            },
        type: 'numeric'
    });

$.tablesorter.addParser({id: 'urgency', parsed: true, format: function (s) {return urgency.indexOf(s);}, type: 'numeric'});

$.tablesorter.addParser({id: 'location', parsed: true, format: function (s, table, cell, cellIndex) {
    return location_to_int(cell.children[0].textContent, cell.children[1].textContent);
    }, type: 'numeric'});


function pad(number, sigfigs, padding) {
    sigfigs =  typeof sigfigs !== "undefined" ? sigfigs : 2,
    padding =  typeof padding !== "undefined" ? padding : '0',
    paddingstr = '';
    for (var i=0;i<sigfigs;i++) {paddingstr += padding;}
    return (paddingstr + number).slice(-sigfigs);
}


function location_to_int(ward,bed) {
    return parseInt((typeof wards[ward] !== 'undefined' ? wards[ward][0] : 0) + pad((bed.match(/\d+/g) || []).join('') || '',3));
}


function get_database(results) {
    var timestr = pad(time.getHours()) + pad(time.getMinutes()),
    onlinestamp = results["data"][0][0],
    database = {},
    r;
    $.each(results["data"], function() {
        r = $(this);
        if (r.length === 10) {
            if (!(r[0] in database)) {
                database[r[0]] = [];
            }
            if (
                    (r[8] < r[9] && timestr >= r[8] && timestr <= r[9])
                    || (r[8] > r[9] && (timestr >= r[8] || timestr <= r[9]))
                    || (r[8] == r[9])

            ) {
                database[r[0]][r[4]] = [r[1],r[8],r[9]];
            }
        }
    });
    return [database,onlinestamp];
}

function get_select(database_obj) {
    var select = $("<select>")
        .attr({"id": "user", "class":"form-control"})
        .prop('required',true)
        .change(loginToggle)
        .append(
            $('<option>')
            .attr("value", '')
            .text("Sign in")
        ),
    database = database_obj[0],
    onlinestamp = database_obj[1],
    specialty, rows, optgroup, r, role, person, start,end, option;
    for(i = 0; i < database.length; i++) {
        specialty = database[i][0],
        rows = database[i][1];
        if (rows.length > 0) {
            var optgroup = $("<optgroup>").attr("label", specialty);
            for(k = 0; k < rows.length; k++) {
                r = rows[k],
                person = r[0],
                role = r[1],
                start = r[2],
                end = r[3],
                option = $('<option>')
                    .data({
                        'person':person,
                        'role':role,
                        'start':start,
                        'end':end
                    })
                    .text(person + ' (' + role + ') [' + start + ' - ' + end + ']');
                optgroup.append(option);
            }
            select.append(optgroup);
        }
    }
    $("#user-panel").prepend(select, $('<p>').text('Time generated: ' + time), $('<p>').text(onlinestamp));
    completeTable();
}

function completeTable() {
    //loginToggle();
    for (var i = 0; i < randomrows; i++) {
        addnew(get_random_rowdata()); //insert random rows
    }
}

function updatePeople_dynamic() {
    $.getJSON("amion.php",
    //{'get_database': 'true', 'test':'true'},
    {'get_database': 'true'},
    function(database_obj) {
        get_select(database_obj);
        });
}

function updatePeople_static() {
    //var password = 'waikato';
    //var url = 'http://www.amion.com/cgi-bin/ocs?' + $.param({'Lo':password, 'Rpt':619});
    var url = 'data.csv';
    Papa.parse(url, {
        delimiter: ",",
        download: true,
        skipEmptyLines: true,
        complete: function(results) {
            get_select(get_database(results));
        }
    });
}

function getTime(d) {
    return $("<time>").addClass("timeago")
        .attr("title", d.getDate() + '/' + pad(d.getMonth()+1) + '/' + (d.getFullYear()).toString().slice(-2) + ' ' + pad(d.getHours()) + ':' + pad(d.getMinutes()))
        .attr("datetime", d.toISOString());
}

function loggedOn() {
    return ($("#user:valid").length === 1);
}

function logOut() {
    $("#user").val("").change();
}

function loginToggle() {
    if (loggedOn()) {
        var user = getUser(false);
        $("#tasks-tab>a").tab("show");
        $("button.accept, button.complete").removeClass("disabled");
        $("#user>option:first-child").text("Sign out");
        $("#whoami-icon").attr("class", "glyphicon glyphicon-user who");
        $("#whatami-icon, #whenami-icon, #new-tab").removeClass("hidden");
        $("#whoami").text(user[0]);
        $("#whatami").text(user[1]);
        $("#whenami").text(user[2]);
        //$("#signin-tab").addClass("hidden");
        //$("#signout-tab").removeClass("hidden");
        //$("div.jumbotron").removeClass("hidden");
        return;
    }
    $("button.accept, button.complete").addClass("disabled");
    $("#user>option:first-child").text("Sign in");
    $("#whoami-icon").attr("class", "glyphicon glyphicon-log-in who");
    $("#whoami").text("Sign in");
    $("#whatami-icon, #whenami-icon, #new-tab").addClass("hidden");
    $("#whatami, #whenami").empty();
    //$("#signin-tab").removeClass("hidden");
    //$("#signout-tab").addClass("hidden");
    //$("div.jumbotron").addClass("hidden");
}

function getUser(random) {
    var user;
    if (random === false) {
        user = $("#user>optgroup>option:selected");
    } else if (random === true) {
        var list = $("#user>optgroup>option");
        user = list.eq(Math.floor(Math.random() * list.length));
    }
    return [user.data('person'), user.data('role'), user.data('start') + ' - ' + user.data('end')];
}

function appendLabels(options) {
    var d = getTime(options.time),
    user = getUser(options.random),
    datadict = {
        "toggle": "tooltip",
        "placement": "right"
    },
    person = $("<span>").addClass("label label-" + options.b_type).text(user[0])
        .attr({
        "title": user[1] + ' (' + user[2] + ')'
    })
        .data(datadict)
        .tooltip()
    ,
    time = d.addClass("label label-" + options.b_type)
        .data(datadict)
        .tooltip()
    ;
    options.target.append(person, $("<br>"), time);
    d.timeago();
}


function accept_complete() {
    var row = $(this).parent().parent();
    var button_type = $(this).text();
    var td, b_type;
    if (button_type === "Accept") {
        td = row.find("td.accepted");
        b_type = "info";
    } else if (button_type === "Complete") {
        //row.appendTo($("#oldjobs"));
        td = row.find("td.completed");
        b_type = "success";
        row.find("td.accepted>button").remove();
    }
    td.empty();
    var timestamp = new Date();
    row.attr("class", b_type);
    td.attr("data-timestamp", timestamp.getTime());
    appendLabels({
        cell: td,
        time: timestamp,
        b_type: b_type,
        target: td,
        random: false
    });
    $('#jobs').trigger('update');
}

function addnew(row_data) {
    var tr = $(document.createElement('tr')).attr("data-building", get_building(row_data.ward));
    $("#jobs>tbody").append(tr);
    var a = $("<td>").addClass("added").attr('data-timestamp', row_data.added.getTime());
    tr.append(a);
    appendLabels({
        cell: a,
        time: row_data.added,
        b_type: "default",
        target: a,
        random: row_data.random
    });
    tr.append(
    //$("<td>").addClass("added").append(getTime(row_data.added)),
    $("<td>").addClass("nhi").text(row_data.nhi),
    $("<td>").addClass("p_name text-capitalize").text(row_data.p_name),
    //$("<td>").addClass("location").attr("data-location", location_to_string(row_data.ward,row_data.bed))
    $("<td>").addClass("location")
        .append($("<span>").addClass("ward").text(row_data.ward))
        .append(' - ')
        .append($("<span>").addClass("bed").text(row_data.bed)),
    $("<td>").addClass("specialty").text(row_data.specialty),
    $("<td>").addClass("urgency").text(row_data.urgency),
    $("<td>").addClass("details").text(row_data.details),
    $("<td>").addClass("accepted").append($("<button>").addClass("accept btn btn-info").text("Accept").click(accept_complete)),
    $("<td>").addClass("completed").append($("<button>").addClass("complete btn btn-success").text("Complete").click(accept_complete)));
    loginToggle();
    $('#jobs').trigger('update');
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
            "details": $("#details").val(),
            "random": false
    };
    //$("#formoutput").html(JSON.stringify(row_data, null, 2)).show();

    addnew(row_data);
    //return false;
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
    list = $("#" + id + " option:not(:first-child)");
    return list.get(Math.floor(Math.random() * list.length)).text;
}

function get_random_rowdata() {
    var min = 5,
        max = 20;
    return {
        "added": new Date(new Date().getTime() - Math.random() * 28800000),
            "nhi": get_random_nhi(),
            "p_name": chance.name(),
            "ward": get_random_option("ward"),
            "bed": Math.ceil((Math.random() * 15)).toString(),
            "specialty": get_random_option("specialty"),
            "urgency": get_random_option("urgency"),
            "details": chance.sentence({
            words: Math.floor(Math.random() * (max - min + 1) + min)
        }),
            "random": true
    };
}

function updateValidity() {
    var formgroup = $(this).closest("div.form-group");
    if ($(this).is(":valid")) {
        formgroup.removeClass("has-error").addClass("has-feedback has-success");
        formgroup.find("span.glyphicon").addClass("hidden");
    } else {
        formgroup.removeClass("has-success").addClass("has-feedback has-error");
        formgroup.find("span.glyphicon").removeClass("hidden");
    }
    if ($("#taskform :invalid").length === 0) {
        $("#addthis").removeClass("disabled btn-default").addClass("btn-primary");
    } else {
        $("#addthis").removeClass("btn-primary").addClass("disabled btn-default");
    }
}


$(function () {

    //Update elements:
    //updatePeople_static();
    $.tablesorter.themes.bootstrap.table = 'table table-striped table-hover table-condensed';
    $("#jobs").tablesorter({
        theme : "bootstrap",
        sortList: [[5, 0],[0, 0]],
        widgets : [ "uitheme", "filter"],
        headerTemplate : '{content} {icon}',
        widgetOptions : {
          // using the default zebra striping class name, so it actually isn't included in the theme variable above
          // this is ONLY needed for bootstrap theming if you are using the filter widget, because rows are hidden
          zebra : ["even", "odd"],
          // reset filters button
          filter_reset : "button.reset",
          filter_hideEmpty : true,
          // if true, filters are collapsed initially, but can be revealed by hovering over the grey bar immediately
          // below the header row. Additionally, tabbing through the document will open the filter row when an input gets focus
          filter_hideFilters : true,
          filter_placeholder : { search : 'Search...', select : 'All' },
          //filter_useParsedData : true,
          filter_functions : {
            3 : locationfns,
            5 : {
                '30 mins' : function(e, n) { return n === 0; },
                'within 1 hour' : function(e, n) { return n <= 1; },
                'within 2 hours' : function(e, n) { return n <= 2; },
                'within 4 hours' : function(e, n) { return n <= 3; },
            },
            7 : {
                'Not accepted' : function(e,n,f,i,$r) {return n === 0;},
                'Accepted' : function(e,n,f,i,$r) {return n !== 0;}
            },
            8 : {
                'Incomplete' : function(e, n) {return n === 0;},
                'Completed' : function(e, n) {return n !== 0;}
            }
          }
        }
    })
    .tablesorterPager({
        // target the pager markup - see the HTML block below
        container: $(".ts-pager"),
        // target the pager page select dropdown - choose a page
        cssGoto  : ".pagenum",
        // remove rows from the table to speed up the sort of large tables.
        // setting this to false, only hides the non-visible rows; needed if you plan to add/remove rows with the pager enabled.
        removeRows: false,
        // output string - default is '{page}/{totalPages}';
        // possible variables: {page}, {totalPages}, {filteredPages}, {startRow}, {endRow}, {filteredRows} and {totalRows}
        output: '{startRow} - {endRow} / {filteredRows} ({totalRows})'
    });
    $('select.pagesize, select.pagenum').data({
        "toggle": "tooltip",
        "placement": "right"
    }).tooltip();
    
    updatePeople_dynamic();

    /*
    $.tablesorter.addParser({
        // set a unique id 
        id: 'timestamp',
        is: function (s) {
            // return false so this parser is not auto detected 
            return false;
        },
        format: function (s, table, cell, cellIndex) {
            // get data attributes from $(cell).attr('data-something');
            // check specific column using cellIndex
            //if ($(cell).children().length === 1) {}
            return $(cell).find("time.timeago").attr('datetime');
            //else {return '0';}
        },
        // set type, either numeric or text 
        type: 'text'
    });
    $.tablesorter.addParser({
        // set a unique id
        id: 'urgency',
        is: function (s, table, cell, $cell) {
            // return false so this parser is not auto detected
            return false;
        },
        format: function (s, table, cell, cellIndex) {
            // format your data for normalization
            return s.toLowerCase()
                .replace(/8 hours/, 0)
                .replace(/4 hours/, 1)
                .replace(/2 hours/, 2)
                .replace(/1 hour/, 3)
                .replace(/30 mins/, 4);
        },
        // set type, either numeric or text
        type: 'numeric'
    });

    $("#jobs").tablesorter({
        theme: "bootstrap",
        sortList: [
            [5, 1],
            [0, 0]
        ]
    });
    */
    //Add handlers:
    //$("#user").change(loginToggle); //no "accept"/"complete" buttons or "new task" form when not logged in
    //$("#login-dropdown>li").click(loginToggle);
    $("#user-tab>a").click(logOut);
    $("#addrandom").click(function () {
        addnew(get_random_rowdata()); //add handler to "Add new random task" button
    });
    $("#taskform select").change(updateValidity);
    $("#taskform input").on("input", updateValidity); //add handler to check form validity and toggle submit button

    $("#user-tab>a").hover(
    function () {
        if (loggedOn()) {
            $("#whoami-icon").attr("class", "glyphicon glyphicon-log-out who");
        }
    },
    function () {
        if (loggedOn()) {
            $("#whoami-icon").attr("class", "glyphicon glyphicon-user who");
        }
    });
    $("#addthis").click(validateForm); //add form validation
});
