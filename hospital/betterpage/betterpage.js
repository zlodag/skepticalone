$(function() {
    function ucwords(str) {
        return str.replace(/(^([a-zA-Z\p{M}]))|([ -][a-zA-Z\p{M}])/g, 
        function(s) {
            return s.toUpperCase();
        });
    }
    function calculate() {
        var checked = (pagename == "wong" || pagename == "wong2") && $('#reply').prop('checked'), 
        a = $(this), 
        name = a.attr('name'), 
        str = a.val(), 
        context = $('select[name=choice]').val();
        switch (name) {
            case 'details':
                if (str !== "") {
                    str = ' (' + str + ')';
                }
                break;
            case 'within':
                if (str !== "") {
                    str = '<' + parseInt(str, 10) + 'm';
                }
                break;
            case 'nhi':
            case 'ward':
            case 'bed':
                str = str.toUpperCase();
                break;
            case 'caller':
            case 'patient':
                str = ucwords(str);
                break;
        }
        $('span.' + name).text(str);
        var c = $('#preview>code.' + context), 
        n = c.text().length - 4, 
        toolarge = n > 128;
        $('#preview>label>span').text(n);
        if (pagename == 'wong') {
            $('span.within,span.phone').toggle(checked);
        } 
        else if (pagename == 'wong2') {
            $('span.within').toggle(checked);
        }
        $('form.' + context + ' input[type="submit"]').prop('disabled', toolarge);
        $('#preview>code, #preview>code+label>span').toggleClass('invalid', toolarge);
    }
    
    var pagename = window.location.pathname.match(/\/([^\/]*?)(?:\.html)*$/)[1], 
    get_to = window.location.search.match(/to=(20[0-9]{3})/), 
    get_patient = window.location.search.match(/patient=([^&]*)/), 
    get_nhi = window.location.search.match(/nhi=([a-zA-Z]{3}[0-9]{4})/), 
    get_ward = window.location.search.match(/ward=([a-zA-Z0-9]{1,3})/), 
    get_bed = window.location.search.match(/bed=([a-zA-Z0-9]{1,3})/), 
    f, d;
    if (get_to) {
        get_to = get_to[1];
    } else {
        get_to = "20";
    }
    if (get_patient) {
        get_patient = decodeURIComponent(get_patient[1]);
    } else {
        get_patient = null;
    }
    if (get_nhi) {
        get_nhi = get_nhi[1];
    } else {
        get_nhi = null;
    }
    if (get_ward) {
        get_ward = get_ward[1];
    } else {
        get_ward = null;
    }
    if (get_bed) {
        get_bed = get_bed[1];
    } else {
        get_bed = null;
    }
    $("#to").val(get_to);
    $("#patient").val(get_patient);
    $("#nhi").val(get_nhi);
    $("#ward").val(get_ward);
    $("#bed").val(get_bed);
    
    if (pagename == "wong" || pagename == "wong2") {
        f = $('form.ptpage fieldset:nth-child(2)');
        d = f.children('div:first');
        var label = $('<label>', {'for': 'reply','class': 'info',text: 'Response required?'}), 
        checkbox = $('<input>', {id: "reply",name: "reply",type: "checkbox"}).click(function() {
            var t = $(this), 
            toggled;
            if (pagename == "wong") {
                toggled = t.parent().nextAll('div.toggle, div.toggle+div.errors');
            } 
            else if (pagename == "wong2") {
                toggled = $('input[type=checkbox]').next().add(t.parent().next('div.errors'));
            }
            toggled.toggle(t.prop('checked'));
        }).click(calculate), 
        within = $('<label>', {'for': 'within','class': 'info'}).append('within', $('<input>', {id: 'within',name: 'within'}), 'mins');
        if (pagename == "wong") {
            d.append(checkbox, label);
            f.append($('<div>').addClass('toggle').append(
            d.children('label[for=phone]'), 
            d.children('#phone'), 
            within
            ).hide());
        } else if (pagename == "wong2") {
            f.append($('<div>').append(label, checkbox, within.addClass('toggle').hide()));
        }
    }
    $('select[name=choice]').change(function() {
        var context = '.' + $(this).val(), 
        toggles = $('form,code,#outcome label');
        toggles.filter(context).show();
        toggles.not(context).hide();
    }
    ).change();
    $('[name=details]').placeholder();
    $.validator.addMethod("pattern", function(value, element, param) {
        return new RegExp("^(?:" + param + ")$").test(value);
    }, "Invalid format");
    $('form').each(function() {
        $(this).validate({
            submitHandler: function(form) {
                $(form).ajaxSubmit({
                    type: "POST",
                    url: "submit.php",
                    data: {formname: form.className,pagename: pagename},
                    datatype: "json",
                    success: function(json, statustxt, xhr, jqform) {
                        var valid = json.ok, 
                        c = jqform.attr('class'), 
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
    $('form input[name!=to][type!=submit], form textarea').keyup(calculate).keyup();
    $('select').change(calculate).change();
});