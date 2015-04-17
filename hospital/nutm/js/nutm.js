$(function() {
    'use strict';
    var production = false, 
    randomrows = 0, 
    time = new Date(), 
    obj, locationfns, urgencyfns;
    
    $.fn.appendLabels = function(options, get_str) {
        /*    var settings = $.extend({
            type:'added',
        }, options),
    */
        var btype;
        switch (options.type) {
            case 'added':
                btype = 'default';
                break;
            case 'accepted':
                btype = 'info';
                break;
            case 'completed':
                btype = 'success';
                break;
        }
        if (options.t) {
            var tooltipdata = {toggle: "tooltip",placement: "right"}, 
            span = $('<span>', {
                data: tooltipdata,
                title: options.d + ': ' + options.r,
                text: options.p,
                'class': 'label label-' + btype
            }).tooltip(), 
            pg = options.pg ? $('<a>', {'class': 'glyphicon glyphicon-phone',data: tooltipdata,title: 'pg 20' + options.pg,href: '../betterpage/?no=20' + options.pg + '&' + get_str,target: '_blank'}).tooltip() : null, 
            time = $('<time>', {
                datetime: options.t.toISOString(),
                data: tooltipdata,
                title: options.t.getDate() + '/' + pad(options.t.getMonth() + 1) + '/' + pad(options.t.getFullYear() % 100) + ' ' + pad(options.t.getHours()) + ':' + pad(options.t.getMinutes()),
                'class': "timeago label label-" + btype
            }).timeago().tooltip();
            return this.empty().attr('class', options.type).data('timestamp', options.t.getTime()).append(span, pg, time);
        } else {
            var btxt;
            switch (options.type) {
                case 'accepted':
                    btxt = 'Accept';
                    break;
                case 'completed':
                    btxt = 'Complete';
                    break;
            }
            return this.empty().attr('class', options.type).append($('<button>', {'class': btxt.toLowerCase() + ' btn btn-' + btype,text: btxt}));
        }
    };
    
    function pad(number, sigfigs, padding) {
        sigfigs = typeof sigfigs !== "undefined" ? sigfigs : 2;
        padding = typeof padding !== "undefined" ? padding : '0';
        var paddingstr = '';
        for (var i = 0; i < sigfigs; i++) {
            paddingstr += padding;
        }
        return (paddingstr + number).slice(-sigfigs);
    }
    function get_database(results) {
        var timestr = pad(time.getHours()) + pad(time.getMinutes()), 
        onlinestamp = results.data[0][0], 
        database = {}, 
        r;
        $.each(results.data, function() {
            r = $(this);
            if (r.length === 10) {
                if (!(r[0] in database)) {
                    database[r[0]] = [];
                }
                if (
                (r[8] < r[9] && timestr >= r[8] && timestr <= r[9]) || 
                (r[8] > r[9] && (timestr >= r[8] || timestr <= r[9])) || 
                (r[8] == r[9])
                
                ) {
                    database[r[0]][r[4]] = [r[1], r[8], r[9]];
                }
            }
        });
        return [database, onlinestamp];
    }
    
    function get_select(database_obj) {
        var select = $("<select>")
        .attr({"id": "user","class": "form-control"})
        .prop('required', true)
        .change(loginToggle)
        .append(
        $('<option>')
        .attr("value", '')
        .text("Sign in")
        ), 
        database = database_obj[0], 
        onlinestamp = database_obj[1], 
        specialty, rows, optgroup, r, role, person, start, end, option;
        for (var i = 0; i < database.length; i++) {
            specialty = database[i][0];
            rows = database[i][1];
            if (rows.length > 0) {
                optgroup = $("<optgroup>").attr("label", specialty);
                for (var k = 0; k < rows.length; k++) {
                    r = rows[k];
                    person = r[0];
                    role = r[1];
                    start = r[2];
                    end = r[3];
                    option = $('<option>')
                    .data({
                        'person': person,
                        'role': role,
                        'start': start,
                        'end': end
                    })
                    .text(person + ' (' + role + ') [' + start + ' - ' + end + ']');
                    optgroup.append(option);
                }
                select.append(optgroup);
            }
        }
        $("#user-panel").prepend(select, $('<p>').text('Time generated: ' + time), $('<p>').text(onlinestamp));
        $("#addrandom").removeClass("disabled");
        loginToggle();
        //completeTable();
    }
    
    /*function completeTable() {
        for (var i = 0; i < randomrows; i++) {
            addnew(get_random_rowdata());
        }
    }*/
    
    function updatePeople_dynamic() {
        $.getJSON("amion.php", 
        {'get_database': 'true','test': production === true ? 'false' : 'true'}, 
        function(database_obj) {
            get_select(database_obj);
        });
    }
    
    /*function updatePeople_static() {
        //var password = 'waikato', url = 'http://www.amion.com/cgi-bin/ocs?' + $.param({'Lo':password, 'Rpt':619});
        var url = 'data.csv';
        Papa.parse(url, {
            delimiter: ",",
            download: true,
            skipEmptyLines: true,
            complete: function(results) {
                get_select(get_database(results));
            }
        });
    }*/
    
    function getTime(d) {
        return $("<time>").addClass("timeago")
        .attr("title", d.getDate() + '/' + pad(d.getMonth() + 1) + '/' + (d.getFullYear()).toString().slice(-2) + ' ' + pad(d.getHours()) + ':' + pad(d.getMinutes()))
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
            return;
        }
        $("button.accept, button.complete").addClass("disabled");
        $("#user>option:first-child").text("Sign in");
        $("#whoami-icon").attr("class", "glyphicon glyphicon-log-in who");
        $("#whoami").text("Sign in");
        $("#whatami-icon, #whenami-icon, #new-tab").addClass("hidden");
        $("#whatami, #whenami").empty();
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
    
    
    
    
    function accept_complete() {
        var row = $(this).parent().parent();
        var button_type = $(this).text();
        var td, btype;
        if (button_type === "Accept") {
            td = row.find("td.accepted");
            btype = "info";
        } else if (button_type === "Complete") {
            //row.appendTo($("#oldjobs"));
            td = row.find("td.completed");
            btype = "success";
            row.find("td.accepted>button").remove();
        }
        td.empty();
        var timestamp = new Date();
        row.attr("class", btype);
        td.attr("data-timestamp", timestamp.getTime());
        /*appendLabels({
            'class': '',
            time: timestamp,
            btype: btype,
            target: td,
            random: false
        });*/
        $('#jobs').trigger('update');
    }
    
    function addnew(row_data) {
        var pk = row_data[0], 
        nhi = row_data[1], 
        p_name = row_data[2], 
        ward = row_data[3], 
        warddata = obj.wards[ward], 
        bed = row_data[4], 
        specialty = row_data[5], 
        urgency = row_data[6], 
        details = row_data[7], 
        added = {
            type: 'added',
            t: row_data[8] ? new Date(row_data[8] * 1000) : null,
            p: row_data[9],
            pg: row_data[10],
            d: row_data[11],
            r: row_data[12]
        }, 
        accepted = {
            type: 'accepted',
            t: row_data[13] ? new Date(row_data[13] * 1000) : null,
            p: row_data[14],
            pg: row_data[15],
            d: row_data[16],
            r: row_data[17]
        }, 
        completed = {
            type: 'completed',
            t: row_data[18] ? new Date(row_data[18] * 1000) : null,
            p: row_data[19],
            pg: row_data[20],
            d: row_data[21],
            r: row_data[22]
        }, 
        get_str = ['patient=' + encodeURIComponent(p_name), 'nhi=' + nhi, 'ward=' + warddata[0], 'bed=' + bed].join('&'), 
        status;
        if (completed.t) {
            status = "success";
        } 
        else if (accepted.t) {
            status = "info";
        } 
        else {
            status = "default";
        }
        $("#jobs>tbody").append(
        $('<tr>', {data: {'pk': pk},'class': status}).append(
        $("<td>").appendLabels(added, get_str), 
        $("<td>").addClass("nhi text-uppercase").text(nhi), 
        $("<td>").addClass("p_name text-capitalize").text(p_name), 
        $("<td>").addClass("location").data({'building': warddata[2],'location_int': ward * 1000 + parseInt(bed, 10)})
        .append($("<span>").addClass("ward").text(warddata[0]))
        .append(' - ')
        .append($("<span>").addClass("bed").text(bed)), 
        $("<td>").addClass("specialty").text(obj.specialties[specialty]), 
        $("<td>").addClass("urgency").data('urgency', urgency).text(obj.urgency[urgency]), 
        $("<td>").addClass("details").text(details), 
        $("<td>").appendLabels(accepted, get_str), 
        $("<td>").appendLabels(completed, get_str)
        ));
    //$("<td>").addClass("accepted").append($("<button>").addClass("accept btn btn-info").text("Accept").click(accept_complete)), 
    //$("<td>").addClass("completed").append($("<button>").addClass("complete btn btn-success").text("Complete").click(accept_complete)));
    //loginToggle();
    //$('#jobs').trigger('update');
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
        addnew(row_data);
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
        var list = $("#" + id + " option:not(:first-child)");
        return list.get(Math.floor(Math.random() * list.length)).text;
    }
    
    /*function get_random_rowdata() {
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
    }*/
    
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
    /*function get_building(ward) {
        return ward in wards ? wards[ward][1] : "Unknown";
    }*/
    
    function getlocationfn() {
        return function(e, n, f, i, $r) {
            return $r.children('.location').data('building') === f;
        };
    }
    
    function processJson(data) {
        obj = data;
        locationfns = {};
        urgencyfns = {
            "within 4 hours": function(e, n) {
                return n >= 2;
            },
            "within 2 hours": function(e, n) {
                return n >= 3;
            },
            "within 1 hour": function(e, n) {
                return n >= 4;
            },
            "30 mins": function(e, n) {
                return n === 5;
            }
        };
        var selectward = $('select#ward'), 
        selecturgency = $('select#urgency'), 
        selectspecialty = $('select#specialty');
        for (var w in obj.wards) {
            if (obj.wards.hasOwnProperty(w)) {
                if (!(obj.wards[w][2] in locationfns)) {
                    locationfns[obj.wards[w][2]] = getlocationfn();
                }
                selectward.append($('<option>', {value: w,text: obj.wards[w][0]}));
            }
        }
        for (var s in obj.specialties) {
            if (obj.specialties.hasOwnProperty(s)) {
                selectspecialty.append($('<option>', {value: s,text: obj.specialties[s]}));
            }
        }
        for (var u in obj.urgency) {
            if (obj.urgency.hasOwnProperty(u)) {
                //if (u != "1") {urgencyfns['within ' + obj.urgency[u]] = geturgencyfn(parseInt(u,10));}
                selecturgency.append($('<option>', {value: u,text: obj.urgency[u]}));
            }
        }
        for (var i = 0; i < obj.tasks.length; i++) {
            addnew(obj.tasks[i]);
        }
        $('.timeago').timeago();
        sortTables();
    }
    
    function sortTables() {
        
        $.tablesorter.addParser(
        {
            parsed: true,
            id: 'timestamp',
            format: function(s, table, cell) {
                return $(cell).data('timestamp') || 0;
            },
            type: 'numeric'
        });
        
        $.tablesorter.addParser({id: 'urgency',parsed: false,format: function(s, table, cell) {
                return $(cell).data('urgency');
            },type: 'numeric'});
        
        $.tablesorter.addParser({id: 'location',parsed: true,format: function(s, table, cell) {
                return $(cell).data('location_int');
            },type: 'numeric'});
        
        $.tablesorter.themes.bootstrap.table = 'table table-striped table-hover table-condensed';
        
        $("#jobs").tablesorter({
            theme: "bootstrap",
            sortList: [[5, 0], [0, 0]],
            widgets: ["uitheme", "filter"],
            headerTemplate: '{content} {icon}',
            widgetOptions: {
                zebra: ["even", "odd"],
                filter_reset: "button.reset",
                filter_hideEmpty: true,
                filter_hideFilters: true,
                filter_placeholder: {search: 'Search...',select: 'All'},
                //filter_useParsedData : true,
                filter_functions: {
                    3: locationfns,
                    5: urgencyfns,
                    7: {
                        'Not accepted': function(e, n, f, i, $r) {
                            return n === 0;
                        },
                        'Accepted': function(e, n, f, i, $r) {
                            return n !== 0;
                        }
                    },
                    8: {
                        'Incomplete': function(e, n) {
                            return n === 0;
                        },
                        'Completed': function(e, n) {
                            return n !== 0;
                        }
                    }
                }
            }
        })
        .tablesorterPager({
            container: $(".ts-pager"),
            cssGoto: ".pagenum",
            removeRows: false,
            output: '{startRow} - {endRow} / {filteredRows} ({totalRows})'
        });
    
    }
    function updateDom() {
        $('select.pagesize, select.pagenum').data({"toggle": "tooltip","placement": "right"}).tooltip();
        if (!production) {
            $("#tasks-panel").append(
            $("<button>", {id: 'addrandom',text: 'Add new random task',click: function() {
                    //addnew(get_random_rowdata());
                }})
            .addClass('btn btn-default btn-block disabled')
            );
        }
        //$("#taskform select").change(updateValidity);
        $("#taskform input").on("input", updateValidity);
        
        $("#user-tab>a").click(logOut).hover(
        function() {
            if (loggedOn()) {
                $("#whoami-icon").removeClass('glyphicon-user').addClass('glyphicon-log-out');
            }
        }, 
        function() {
            if (loggedOn()) {
                $("#whoami-icon").removeClass('glyphicon-log-out').addClass('glyphicon-user');
            }
        }
        );
        $("#addthis").click(validateForm);
    }
    
    updateDom();
    
    $.getJSON("get_data.php", {'data': 'initial'}, function(obj) {
        processJson(obj);
    });


//updatePeople_dynamic();
});
