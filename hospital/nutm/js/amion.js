
function pad(number) {
    return ('0' + number).slice(-2);
}

function get_database(results) {
    var time = new Date(),
    timestr = pad(time.getHours()) + pad(time.getMinutes()),
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

function get_select(results) {
    var select = $("<select>")
        .attr({"id": "user", "class":"form-control"})
        .prop('required',true)
        .append(
            $('<option>')
            .text("Sign in")
        ),
    database_obj = get_database(results),
    database = database_obj[0],
    onlinestamp = database_obj[1];
    for(var specialty in database) {
        if (Object.keys(database[specialty]).length > 0) {
            var optgroup = $("<optgroup>").attr("label", specialty);
            for (var role in database[specialty]) {
                var person_time = database[specialty][role],
                option = $('<option>')
                    .data({
                        'person':person_time[0],
                        'role':role,
                        'start':person_time[1],
                        'end':person_time[2]
                    })
                    .text(person_time[0] + ' (' + role + ') [' + person_time[1] + ' - ' + person_time[2] + ']');
                optgroup.append(option);
            }
            select.append(optgroup);
        }
    }
    $("body").append(select, $('<p>').text(onlinestamp));
}

$(function() {
    Papa.parse("data.csv", {
        delimiter: ",", // auto-detect
        download: true,
        skipEmptyLines: true,
        download: true,
        complete: function(results) {
            get_select(results);
        }
    });
});
