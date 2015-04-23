function ucwords(str) {
    return str.replace(/(^([a-zA-Z\p{M}]))|([ -][a-zA-Z\p{M}])/g, function(s) {return s.toUpperCase();});
}
function calculate() {
    var context = $('#choice').val(),
    c = $('#preview>code.' + context),
    n = $('#preview>label>span'),
    msg = c.children('span:visible').text(),
    len = msg.length,
    toolarge = len > 128;
    n.text(len).toggleClass('invalid', toolarge);
    c.toggleClass('invalid', toolarge);
    $('form.' + context + ' input[type="submit"]').prop('disabled', toolarge).val(toolarge ? 'Character limit exceeded!' : 'Send');
    return !toolarge;
}
function update() {
    var t = $(this),
    name = t.attr('name');
    if (name == 'ward' || name == 'bed') {
        var ward = $('#ward').val().toUpperCase(),
        bed = $('#bed').val().toUpperCase(),
        locationspan = $('span.location');
        if (ward !== "" || bed !== "") {
            locationspan.text('['+ward+'-'+bed+'] ');
        } else {
            locationspan.text("");
        }
    } else {
        var str = t.val();
        switch (name) {
            case 'details':
                if (str !== "") {str = ' (' + str + ')';} break;
            case 'within':
                if (str !== "" && t.valid()) {str = '<' + parseInt(str, 10) + 'm';} else {str = "";} break;
            case 'nhi':
                if (str !== "") {str = ' ' + str.toUpperCase();} break;
            case 'caller':
            case 'patient':
                if (str !== "") {str = '(' + ucwords(str) + ')';} break;
        }
        $('span.' + name).text(str);
    }
    $('span.within').toggle($('#reply').prop('checked'));
    calculate();
}

$(function() {
    'use strict';
    var pagename = window.location.pathname.match(/\/([^\/]*?)(?:\.html)*$/)[1],
    tuples = window.location.search.substring(1).split('&'),
    params = {};
    for (var i = 0; i < tuples.length; i++) {
        var tuple = tuples[i].split('=');
        params[tuple[0]] = tuple[1];
    }
    if ('msg' in params) {$('#choice').val('otherpage'); $("#contents").val(decodeURIComponent(params.msg));}
    else {
        if ('no' in params && params.no.match(/^20[0-9]{3}$/)) {$("#to,#to_other").val(params.no);} else {$("#to,#to_other").val(20);}
        if ('patient' in params) {$("#patient").val(decodeURIComponent(params.patient));}
        if ('nhi' in params && params.nhi.match(/^[a-zA-Z]{3}[0-9]{4}$/)) {$("#nhi").val(params.nhi);}
        if ('ward' in params && params.ward.match(/^[a-zA-Z0-9]{1,3}$/)) {$("#ward").val(params.ward);}
        if ('bed' in params && params.bed.match(/^[a-zA-Z0-9]{1,3}$/)) {$("#bed").val(params.bed);}
    }

    $('#caller,#phone,#within,#patient,#nhi,#ward,#bed,#details,#to_other,#contents').keyup(update).keyup();
    $('#why').change(update).change();
    $('#reply').click(function() {$('[for="within"]').toggle(this.checked);}).click(update);
    $('#choice').change(function() {
        var context = '.' + $(this).val(), 
        toggles = $('form,code,#outcome label');
        toggles.filter(context).show();
        toggles.not(context).hide();
        calculate();
    }).change();

    $.validator.addMethod("pattern", 
        function(value, element, param) {return this.optional(element) || param.regexp.test(value);}, 
        function(param, element) {return "<em>" + $('label.info[for="' + element.id + '"]').text() + "</em> " + param.errorstr;}
    );
    $.validator.addMethod("pager", 
        function(value, element, param) {return this.optional(element) || /^20[0-9]{3}$/.test(value);},
        "Pager number must be 20 followed by 3 digits"
    );
    $.validator.addMethod("nhi", 
        function(value, element, param) {return this.optional(element) || /^[a-zA-Z]{3}[0-9]{4}$/.test(value);},
        "Please enter a valid NHI number"
    );
    
    $('form').each(function() {
        $(this).validate({
            rules: {
                to: {required: true,pager: true},
                caller: {required: true,minlength: 2},
                phone: {required: true,digits:true,rangelength: [5,11]},
                within: {required: '#reply:checked', range: [1,99]},
                patient: {required: true,minlength: 2},
                nhi: {required: true,nhi: true},
                ward: {required: true, rangelength: [1,3]},
                bed: {required: true, rangelength: [1,3]},
                why: {required: true},
                to_other: {required: true,pager: true},
                contents: {required: true,maxlength: 128}
            },
            errorPlacement: function(error, element) {
                var p = element.closest('div'), 
                d = p.next('div.errors');
                if (d.length === 0) {
                    d = $('<div>').addClass("errors").insertAfter(p);
                }
                d.prepend(error);
            },
            submitHandler: function(form) {
                $.ajax("submit.php", {
                    method: "POST",
                    datatype: "json",
                    data: { 
                        //formname: form.className,
                        no: $(form).find('fieldset:first-child>div>input').val(),
                        msg: $('#preview>code.' + form.className +'>span:visible').text()
                    },
                    success: function(json) {
                        var valid = json.ok,
                        c = form.className,
                        outcome = $('#outcome>div').empty();
                        if (valid) {
                            outcome.append(
                            $('<label>', {'class': c,text: "Successful submission of form!"}), 
                            $('<code>', {'class': c,text: "###:" + json.page})
                            );
                            if (c == "ptpage") {alert("If you requested a review of a patient, please ensure that the notes and chart are in the office.");}
                        } else {
                            for (var i = 0; i < json.errors.length; i++) {
                                var error = json.errors[i];
                                outcome.append($('<label>', {"class": c + " error","for": error[0],html: error[1]}));
                            }
                        }
                    }
                });
            }
        });
    });
});
