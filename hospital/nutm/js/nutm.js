$(function() {
    "use strict";
    var randomrows = 0, 
    oncall = {}, 
    time = new Date(), 
    timeint = time.getHours() * 100 + time.getMinutes(), 
    url = "get_data.php", 
    select = $('#user'), 
    obj, locationfns, urgencyfns, booleanfns, listbody;
    
    $.fn.appendLabels = function(options) {
        var t = $(this),
        tdclass = t.attr('class'),
        btype;
        switch (tdclass) {
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
            if (tdclass == 'completed' && (!('timestamp' in t.prev().data()))) {
                t.prev().empty();
            }
            var trdata = t.closest('tr').data(), 
            get_str = ['patient=' + encodeURIComponent(trdata.patient), 'nhi=' + trdata.nhi, 'ward=' + trdata.ward, 'bed=' + trdata.bed].join('&'),
            date = new Date(options.t * 1000),
            tooltipdata = {toggle: "tooltip",placement: "right"}, 
            span = $('<span>', {
                data: tooltipdata,
                title: options.d + ': ' + options.r,
                text: options.p,
                'class': 'label label-' + btype
            }).tooltip(), 
            pg = options.pg ? $('<a>', {'class': 'glyphicon glyphicon-phone',data: tooltipdata,title: 'pg 20' + pad(options.pg,3),href: '../betterpage/?no=20' + pad(options.pg,3) + '&' + get_str,target: '_blank'}).tooltip() : null, 
            time = $('<time>', {
                datetime: date.toISOString(),
                data: tooltipdata,
                title: date.getDate() + '/' + pad(date.getMonth() + 1) + '/' + pad(date.getFullYear() % 100) + ' ' + pad(date.getHours()) + ':' + pad(date.getMinutes()),
                'class': "timeago label label-" + btype
            }).timeago().tooltip();
            return t.empty().attr('class', options.type).data('timestamp', options.t).append(span, pg, time);
        } else {
            var btxt;
            switch (t.attr('class')) {
                case 'accepted':
                    btxt = 'Accept';
                    break;
                case 'completed':
                    btxt = 'Complete';
                    break;
            }
            return t.empty().attr('class', options.type).append($('<button>', {'class': btxt.toLowerCase() + ' btn btn-' + btype,text: btxt,click: accept_complete}));
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
    
    function loggedOn() {
        return $('#user').val() !== "";
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
            $("#whatami-icon, #whichami-icon, #whenami-icon, #new-tab").removeClass("hidden");
            $("#whoami").text(user.person);
            if (user.pg) {
                $('#mypager-icon').removeClass("hidden");
                $("#mypager").text('20' + pad(user.pg,3));
            }
            $("#whatami").text(user.div);
            $("#whichami").text(user.role);
            $("#whenami").text(pad(user.on, 4) + ' - ' + pad(user.off, 4));
        } else {
            $("button.accept, button.complete").addClass("disabled");
            $("#user>option:first-child").text("Sign in");
            $("#whoami-icon").attr("class", "glyphicon glyphicon-log-in who");
            $("#whoami").text("Sign in");
            $("#mypager-icon, #whatami-icon, #whichami-icon, #whenami-icon, #new-tab").addClass("hidden");
            $("#mypager, #whatami, #whenami, #whichami").empty();
        }
    }
    
    function getUser(random) {
        if (random === true) {
            var list = $("#user>optgroup>option"), 
            user = list.eq(Math.floor(Math.random() * list.length));
        } else {
            var user = $('#user>optgroup>option:selected');
        }
        return user.data();
    }
    
    function accept_complete() {
        var t = $(this), 
        td = t.parent(), 
        row = td.parent(), 
        context = td.attr("class"),
        data = $.extend({data: 'update', pk: row.data('pk'), context: context}, getUser(false));
        $.ajax({
            method: "POST",
            url: url,
            data: data,
            dataType: "json",
            success: function(obj) {
                if (!('errors' in obj)) {
                    var btype;
                    if (context === "accepted") {
                        btype = "info";
                    } else if (context === "completed") {
                        btype = "success";
                        row.find("td.accepted>button").remove();
                    }
                    row.attr("class", btype);
                    td.empty().appendLabels(obj.labels);
                    $('#jobs').trigger('update');
                }
        }});
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
            t: row_data[8],
            p: row_data[9],
            pg: row_data[10],
            d: row_data[11],
            r: row_data[12]
        }, 
        accepted = {
            t: row_data[13],
            p: row_data[14],
            pg: row_data[15],
            d: row_data[16],
            r: row_data[17]
        }, 
        completed = {
            t: row_data[18],
            p: row_data[19],
            pg: row_data[20],
            d: row_data[21],
            r: row_data[22]
        }, 
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
        var tr = $('<tr>', {data: {pk: pk,patient: p_name,nhi: nhi,ward: warddata[0],bed: bed},'class': status}).append(
        $("<td>").addClass("added"), 
        $("<td>").addClass("nhi text-uppercase").text(nhi), 
        $("<td>").addClass("p_name text-capitalize").text(p_name), 
        $("<td>").addClass("location").data({'building': warddata[2],'location_int': ward * 1000 + parseInt(bed, 10)})
        .append($("<span>").addClass("ward").text(warddata[0]))
        .append(' - ')
        .append($("<span>").addClass("bed").text(bed)), 
        $("<td>").addClass("specialty").text(obj.specialties[specialty]), 
        $("<td>").addClass("urgency").data('urgency', urgency).text(obj.urgency[urgency]), 
        $("<td>").addClass("details").text(details), 
        $("<td>").addClass("accepted"), 
        $("<td>").addClass("completed")
        );
        tr.find('td.added').appendLabels(added);
        tr.find('td.accepted').appendLabels(accepted);
        tr.find('td.completed').appendLabels(completed);
        return tr;
    }
    
    function submitTask() {
        $.ajax({
            method: "POST",
            url: url,
            data: $.extend({
                data: 'update',
                context: 'added',
                nhi: $("#nhi").val().toUpperCase(),
                p_name: $("#p_name").val(),
                ward: $("#ward").val(),
                bed: $("#bed").val().toUpperCase(),
                specialty: $("#specialty").val(),
                urgency: $("#urgency").val(),
                details: $("#details").val(),
            },getUser(false)),
            dataType: "json",
            success: function(obj) {
                if (!('errors' in obj)) {
                    addAll(obj.tasks);
                    $("#tasks-tab>a").tab("show");
                }
            }
        });
        return false;
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
        booleanfns = {
            'Yes': function(e,n) {return n === 1;},
            'No': function(e,n) {return n === 0;},
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
        sortTables();
        addAll(obj.tasks);
        //$('.timeago').timeago();
    }
    
    function addAll(tasks) {
        var tbody = $("#jobs>tbody").empty();
        for (var i = 0; i < tasks.length; i++) {
            tbody.append(addnew(tasks[i]));
        }
        $('#jobs').trigger('update');
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
        $.tablesorter.addParser(
        {
            parsed: true,
            id: 'boolean',
            format: function(s, table, cell) {
                return $(cell).data('boolean');
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
                filter_reset: "#jobsreset",
                filter_hideEmpty: true,
                filter_hideFilters: true,
                filter_placeholder: {search: 'Search...',select: 'All'},
                //filter_useParsedData : true,
                filter_functions: {
                    3: locationfns,
                    5: urgencyfns,
                    7: {
                        'Not accepted': function(e, n) {
                            return n === 0;
                        },
                        'Accepted': function(e, n) {
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
        $('#lists-panel>table').tablesorter({
            theme: "bootstrap",
            sortList: [[1, 0], [0, 1]],
            widgets: ["uitheme", "filter"],
            headerTemplate: '{content} {icon}',
            widgetOptions: {
                filter_reset: "#listreset",
                filter_hideEmpty: true,
                filter_hideFilters: true,
                filter_placeholder: {search: 'Search...', select: 'All'},
                filter_functions: {0: booleanfns, 5: booleanfns}
            }
        });
    
    }    
    
    function updateDom() {
        $('select.pagesize, select.pagenum').data({"toggle": "tooltip","placement": "right"}).tooltip();
        $("#taskform select").change(updateValidity);
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
        $("#taskform").submit(submitTask);
    }
    
    function addRow(row, type) {
        var glyphicon = null,
        checked = false,
        rowclass = 'default',
        on = parseInt(row[8],10),
        off = parseInt(row[9],10),
        oncall = isOncall(on,off);
        switch(type) {
            case 'good':
            case 'bad':
                rowclass = 'success';
                checked = true;
                break;
        }
        var tr = $('<tr>',{'class':rowclass}).append(
            $('<td>',{data:{boolean:+(oncall)}}).append($('<span>',{'class':'glyphicon ' + (oncall ? 'glyphicon-ok' : 'glyphicon-remove')})),
            $('<td>',{text: row[0]}),
            $('<td>',{text: row[4]}),
            $('<td>',{text: row[8] + ' - ' + row[9]}),
            $('<td>',{text: row[1]}),
            $('<td>',{data:{boolean:+(checked)}}).append($('<input>',{type:'checkbox',prop: {checked:checked}, data: {
                au:parseInt(row[5],10),
                ab:parseInt(row[6],10),
                div:row[0],
                role:row[4],
                on:on,
                off:off
            }, click: function() {
                var paternal = $(this).closest('tr');
                $.ajax({
                    method: "POST",
                    url: url,
                    dataType: "json",
                    data: $.extend($(this).data(),{data:'update',context:'list',blacklist:+(!this.checked)}),
                    success: function(obj) {
                        this.closest('tr').attr('class', (obj.blacklisted === 0 ? 'success' : 'default'));
                    },
                    context: $(this).closest('tr')});
            }}))
        );
        listbody.append(tr);
    }
    function isOncall(on,off) {
        return  ((on < off && timeint >= on && timeint <= off) || 
                (on > off && (timeint >= on || timeint <= off)) || 
                (on == off));
    }
    function processCsv(csv, blacklists, initial) {
        if (!initial) {
            /*var good = $('<table>', {id:'good'}).append($('<caption>', {text: 'Whitelist (eligible, on call)'})),
            bad = $('<table>', {id:'bad'}).append($('<caption>', {text: 'Greylist (not on call, otherwise eligible)'})),
            ugly = $('<table>', {id:'ugly'}).append($('<caption>', {text: 'Blacklist (not eligible)'})),
            */
            //good.add(bad).add(ugly).addClass('table table-condensed table-hover').append($('<thead>').append(tr),$('<tbody>'));
            listbody = $('#lists-panel>table>tbody').empty();
        }
        for (var i = 0; i < csv.data.length; i++) {
            if (initial && i === 0) {var allocationtime = new Date(/\w+ \d{1,2} \d{1,2}:\d{1,2} \d{4}/.exec(csv.data[i][0])[0] + 'EDT');}
            if (csv.data[i].length === 12) {
                var r = csv.data[i], 
                div = r[0],
                on = parseInt(r[8], 10),
                off = parseInt(r[9], 10);
                
                if (blacklists.divisions.indexOf(div) !== -1) {
                    continue;
                }
                var black = false;
                for (var j = 0; j < blacklists.roles.length && !black; j++) {
                    var badrole = blacklists.roles[j];
                    if (parseInt(r[5], 10) === badrole[0] && parseInt(r[6], 10) === badrole[1]) {
                        if (!initial) {
                            addRow(r,'ugly');
                        }
                        black = true;
                        continue;
                    }
                }
                if (black) {
                    continue;
                }
                var pg = r[11].match(/^#?20([0-9]{3}$)/);
                if (pg != null) {pg = parseInt(pg[1],10);}
                var row = {
                    person: r[1],
                    role: r[4],
                    au: parseInt(r[5], 10),
                    ab: parseInt(r[6], 10),
                    on: on,
                    off: off,
                    pg : pg
                };
                if (isOncall(on,off)) {
                    if (div in oncall) {
                        oncall[div].push(row);
                    } else {
                        oncall[div] = [row];
                    }
                    if (!initial) {
                        addRow(r,'good');
                    }

                } else if (!initial) {
                    addRow(r,'bad');
                }
            }
        }
        var divs = Object.keys(oncall).sort();
        if (initial) {
            for (var k = 0; k < divs.length; k++) {
                var div = divs[k], 
                optgroup = $('<optgroup>', {"label": div});
                select.append(optgroup);
                for (var m = 0; m < oncall[div].length; m++) {
                    var row = oncall[div][m];
                    optgroup.append($('<option>')
                    .data(row).data('div',div)
                    .text(row.person + ' (' + row.role + ') [' + pad(row.on, 4) + ' - ' + pad(row.off, 4) + ']'));
                }
            }
            select.change(loginToggle).change().after(
                $('<button>', {'class': "btn btn-info", text:"Who is included?", data: {csv: csv}, click: function() {
                    var csv = $(this).data('csv');
                    $.getJSON(url, {'data': 'blacklists'}, function(blacklists) {
                        processCsv(csv, blacklists, false);
                    });
                }}),
                $('<p>',{text:'Page loaded '}).append($('<time>', {datetime:time.toISOString()}).timeago()),
                $('<p>',{text:'Roster loaded '}).append($('<time>', {datetime:allocationtime.toISOString()}).timeago())
            );
        } else {
            $('#lists-panel>table').trigger('update');
            $('#lists-tab').removeClass("hidden").children('a').click();
        }
    }
    
    updateDom();
    
    $.getJSON(url, {'data': 'initial'}, function(obj) {
        processJson(obj);
    });
    
    $.getJSON(url, {'data': 'blacklists'}, function(blacklists) {
        Papa.parse(url+'?data=csv', {
            download: true,
            delimiter: ",",
            skipEmptyLines: true,
            complete: function(csv) {
                processCsv(csv, blacklists, true);
            }
        });
    });
});
