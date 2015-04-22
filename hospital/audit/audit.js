function processRows(obj) {
    'use strict';
    $('table>caption').text(obj.length + ' entries total');
    var tbody = $('tbody').empty();
    $.each(obj, function(i, arr) {
        var tr = $('<tr>');
        $.each(arr, function(j, str) {
            tr.append($('<td>', {text: str || ""}));
        });
        tbody.append(tr);
    });
    $("table").trigger("update");
}
$(function() {
    'use strict';
    $('#time').click(function() {
        $('#received, #received-error').toggle(this.checked);
    });
    $('#date').keydown(function(event) {
        event.preventDefault();
    })
    .datepicker({
        dateFormat: "dd/mm/yy"
    });
    $('table').tablesorter({theme: "ice"});
    $.get('db.php', {data: 'initial'}, function(obj) {
        $.each(obj, function(key, value) {
            if (key === "rows") {
                processRows(value);
            } else {
                var sel = $('select[name="' + key + '"]');
                $.each(value, function(i, tuple) {
                    sel.append($('<option>', {value: tuple[0],text: tuple[1]}));
                });
            }
        });
    }, 'json');
    $.validator.addMethod(
    "pattern", 
    function(value, element, param) {
        return param.test(value);
    }, 
    function(param, element) {
        return "Format: " + element.placeholder;
    });
    $('form').validate({
        rules: {
            date: {
                pattern: /^(?:(?:0[1-9]|1[0-9]|2[0-9])\/(?:0[1-9]|1[0-2])|(?:(?:30)\/(?!02)(?:0[1-9]|1[0-2]))|(?:31\/(?:0[13578]|1[02])))\/(?:19|20)[0-9]{2}$/
            },
            received: {
                required: $('#time').prop('checked'),
                pattern: /^(?:0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/
            }
        },
        submitHandler: function(form) {
            $.post('db.php', {
                data: 'submit',
                contents: form.contents.value,
                date: $.datepicker.formatDate('yy-mm-dd', $(form.date).datepicker('getDate')),
                person: parseInt(form.person.value, 10),
                shift: parseInt(form.shift.value, 10),
                specialty: parseInt(form.specialty.value, 10),
                received: form.time.checked ? form.received.value: '',
                urgent: +form.urgent.checked,
                required: +form.required.checked,
                repeat: +form.repeat.checked
            }, function(obj) {
                processRows(obj.rows);
                $('fieldset.vary input:not(#time,[type="submit"])').val('').removeAttr('checked');
                $('#contents').focus();
            }, 'json');
            return false;
        }
    });
});
