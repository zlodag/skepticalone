$(function() {
    'use strict';
    function processRows(obj) {
        $('table>caption').text(obj.length + ' entries total');
        var tbody = $('tbody').empty();
        $.each(obj,function(i,arr){
            var tr = $('<tr>');
            $.each(arr,function(j,str){
                if (j===7) {str = str ? str.slice(3) : "";}
                tr.append($('<td>',{text:str}));
            })
            tbody.append(tr);
        });
    }
    $('#received').blur(function() {if ($(this).val() == "") {$(this).val("");}});
    $.get('db.php',{data:'initial'},function(obj){
        $.each(obj,function(key,value){
            if (key === "rows") {
                processRows(value);
            } else {
                var sel = $('select[name="' + key + '"');
                $.each(value,function(i,tuple){
                    sel.append($('<option>',{value:tuple[0],text:tuple[1]}));
                });
            }
        });
    },'json');
    $('form').validate({
        submitHandler : function(form) {
            $.post('db.php', {
                data:'submit',
                contents:form.contents.value,
                date:form.date.value,
                person:parseInt(form.person.value,10),
                shift:parseInt(form.shift.value,10),
                specialty:parseInt(form.specialty.value,10),
                received:form.received.value,
                urgent:+form.urgent.checked,
                required:+form.required.checked,
                repeat:+form.repeat.checked
            }, function(obj) {
                processRows(obj.rows);
                $('fieldset.vary input:not([type="submit"])').val('').removeAttr('checked');
                $('#contents').focus();
            }, 'json');
            return false;
        }
    });
});
