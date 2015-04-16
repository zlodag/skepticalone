$(function() {
    'use strict';
    function ucwords(str) {
        return str.replace(/(^([a-zA-Z\p{M}]))|([ -][a-zA-Z\p{M}])/g, 
        function(s) {
            return s.toUpperCase();
        });
    }
    function calculate() {
        var name = $(this).attr('name'),
        str = $(this).val();
        if (name == 'ward' || name == 'bed') {
            var ward = $('#ward').val().toUpperCase(),
            bed = $('#bed').val().toUpperCase(),
            locationspan = $('span.location');
            if (ward !== "" && bed !== "") {
                locationspan.text('['+ward+'-'+bed+'] ');
            } else if (ward !== "") {
                locationspan.text('['+ward+'-] ');
            } else if (bed !== "") {
                locationspan.text('[-'+bed+'] ');
            } else {
                locationspan.text("");
            }
        } else {
            switch (name) {
                case 'details':
                    if (str !== "") {
                        str = ' (' + str + ')';
                    }
                    break;
                case 'within':
                    if (str !== "" && parseInt(str, 10)) {
                        str = '<' + parseInt(str, 10) + 'm';
                    } else {str = "";}
                    break;
                case 'nhi':
                    if (str !== "") {str = ' ' + str.toUpperCase();}
                    break;
                case 'caller':
                case 'patient':
                    if (str !== "") {
                        str = '(' + ucwords(str) + ')';
                    }
                    break;
            }
            $('span.' + name).text(str);
        }
        var checked = $('#reply').prop('checked'),
        context = $('#choice').val(),
        c = $('#preview>code.' + context),
        msg = c.text().slice(4),
        len = msg.length,
        toolarge = len > 128;
        $('span.within').toggle(checked);
        $('#preview>label>span').text(len);
        $('form.' + context + ' input[type="submit"]').prop('disabled', toolarge);
        $('#preview>code, #preview>code+label>span').toggleClass('invalid', toolarge);
    }
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

    $('#caller,#phone,#within,#patient,#nhi,#ward,#bed,#details,#to_other,#contents').keyup(calculate).keyup();
    $('#why').change(calculate).change();
    $('#reply').click(function() {$('[for="within"]').toggle(this.checked);}).click(calculate);
    $('#choice').change(function() {
        var context = '.' + $(this).val(), 
        toggles = $('form,code,#outcome label');
        toggles.filter(context).show();
        toggles.not(context).hide();
    }).change();

    $('#details').placeholder();

    $.validator.addMethod("pattern", function(value, element, param) {
        return new RegExp("^(?:" + param + ")$").test(value);
    }, "Invalid format");

    $('form').each(function() {
        $(this).validate({
            submitHandler: function(form) {
                $.ajax("submit.php", {
                    method: "POST",
                    datatype: "json",
                    data: { 
                        formname: form.className,
                        pagename: pagename,
                        msg: $('#preview>code.' + form.className ).text().slice(4)
                    },
                    success: function(json, statustxt, xhr) {
                        var valid = json.ok, 
                        c = form.className,
                        outcome = $('#outcome>div').empty();
                        if (valid) {
                            outcome.prepend(
                            $('<label>', {'class': c,text: "Successful submission of form!"}), 
                            $('<code>', {'class': c,text: "###:" + json.page})
                            );
                            if (c == "ptpage") {
                                if (pagename == 'slim1') {
                                    outcome.prepend($('<label>', {'class': c + " message",text: "If you requested a review of a patient, please ensure that the notes and chart are in the office."}));
                                } else if (pagename == 'slim2') {
                                    alert("If you requested a review of a patient, please ensure that the notes and chart are in the office.");
                                }
                            }
                        } else {
                            for (var i = 0; i < json.errors.length; i++) {
                                var error = json.errors[i];
                                outcome.append($('<label>', {"class": c + " error","for": error[0],html: error[1]}));
                            }
                        }
                    }
                });
            },
            rules: {
                to: {required: true,pattern: '20[0-9]{3}'},
                caller: {required: true,minlength: 2},
                phone: {required: (pagename == "wong" ? '#reply:checked' : true),pattern: '[0-9]{5,11}'},
                within: {required: (pagename == "wong" || pagename == "wong2" ? '#reply:checked' : false),pattern: '[0-9]{1,2}'},
                patient: {required: true,minlength: 2},
                nhi: {required: true,pattern: '[a-zA-Z]{3}[0-9]{4}'},
                ward: {required: true,pattern: '[0-9a-zA-Z]{1,3}'},
                bed: {required: true,pattern: '[0-9a-zA-Z]{1,3}'},
                why: {required: true},
                to_other: {required: true,pattern: '20[0-9]{3}'},
                contents: {required: true,maxlength: 128}
            },
            messages: {
                to: {
                    pattern: '<em>Pager</em> must be 20 followed by 3 digits',
                    required: '<em>Pager</em> is required'
                },
                caller: {
                    minlength: '<em>Name</em> must contain at least 2 characters',
                    required: '<em>Name</em> is required'
                },
                phone: {
                    pattern: '<em>Phone</em> must contain 5 to 11 digits',
                    required: '<em>Phone</em> is required'
                },
                within: {
                    pattern: '<em>Response time</em> must be 1 or 2 digits',
                    required: '<em>Response time</em> is required'
                },
                patient: {
                    minlength: '<em>Name</em> must contain at least 2 characters',
                    required: '<em>Name</em> is required'
                },
                nhi: {
                    pattern: '<em>NHI</em> must be a valid NHI number',
                    required: '<em>NHI</em> is required'
                },
                ward: {
                    pattern: '<em>Ward</em> must contain 1 to 3 characters',
                    required: '<em>Ward</em> is required'
                },
                bed: {
                    pattern: '<em>Bed</em> must contain 1 to 3 characters',
                    required: '<em>Bed</em> is required'
                },
                why: {
                    required: '<em>Reason for page</em> is required'
                },
                to_other: {
                    pattern: '<em>Pager</em> must be 20 followed by 3 digits',
                    required: '<em>Pager</em> is required'
                }
            },
            errorPlacement: function(error, element) {
                var p = element.closest('div'), 
                d = p.next('div.errors');
                if (d.length === 0) {
                    d = $('<div>').addClass("errors").insertAfter(p);
                }
                d.prepend(error);
            }
        });
    });
});
