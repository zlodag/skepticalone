function ucwords(str) {
    return str.replace(/(^([a-zA-Z\p{M}]))|([ -][a-zA-Z\p{M}])/g, 
    function(s) {
        return s.toUpperCase();
    });
}
function calculate() {
    var a = $(this), 
    name = a.attr('name'), 
    str = a.val(), 
    context = $('select[name=choice]').val();
    switch (name) {
        case 'details':
            if (str !== "") {
                str = ' (' + str + ')';
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
    $('form.' + context + ' input[type="submit"]').prop('disabled', toolarge);
    $('#preview>code, #preview>code+label>span').toggleClass('invalid', toolarge);
}
$(function() {
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
                    type:"POST",
                    url:"submit.php",
                    data:{formname:form.className},
                    datatype:"json",
                    success: function(json,statustxt,xhr,jqform) {
                        var valid = json.ok,
                        c = jqform.attr('class'),
                        outcome = $('#outcome>div').empty();
                        if (valid) {
                            outcome.prepend(
                                $('<label>', {'class':c, text:"Successful submission of form!"}),
                                $('<code>', {'class':c, text:"###:" + json.page})
                                );
                            if (c == "ptpage") {
                                var pagename = /\/([^\/]*?)(\.html)*$/.exec(window.location.pathname)[1];
                                if (pagename == 'slim1') {
                                    outcome.prepend($('<label>', {'class':c + " message", text:"If you requested a review of a patient, please ensure that the notes and chart are in the office."}));
                                } else if (pagename == 'slim2') {
                                    alert("If you requested a review of a patient, please ensure that the notes and chart are in the office.");
                                }
                            }
                        } else {
                            for (var i = 0; i < json.errors.length; i++) {
                                var error = json.errors[i];
                                outcome.prepend($('<label>',{"class":c + " error", "for":error[0], html: error[1]}));
                            }
                        }
                    }
                });
            },
            rules: {
                to: {required: true,pattern: '20[0-9]{3}'},
                caller: {required: true,minlength: 2},
                phone: {required: true,pattern: '[0-9]{5,11}'},
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
                error.appendTo(element.parent());
            }
        });
    });
    $('form input[name!=to][type!=submit], form textarea').keyup(calculate).keyup();
    $('select').change(calculate).change();
});
