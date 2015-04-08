function ucwords(str) {
  return str.replace(/(^([a-zA-Z\p{M}]))|([ -][a-zA-Z\p{M}])/g,
  	function(s){
  	  return s.toUpperCase();
	});
}
function calculate() {
    var a = $(this),
    name = a.attr('name'),
    str = a.val();
    switch(name) {
        case 'details':
            if (str !== "") {str = ' (' + str + ')';}
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
    var c = $('#preview>code'),
    n = c.text().length - 4,
    toolarge = n>128;
    $('#preview label>span').text(n);
    $('input[type="submit"]').prop('disabled', toolarge);
    $('#preview>code, #preview>code+label>span').toggleClass('invalid', toolarge);
}
$(function () {
    $('[name=details]').placeholder();
    $.validator.addMethod("pattern", function(value, element, param) {return new RegExp("^(?:" + param + ")$").test(value);}, "Invalid format");
    $('#ptpage').validate({
        debug: true,
        rules:{
            to: {required: true, pattern: '20[0-9]{3}'},
            caller: {required: true, minlength: 2},
            phone: {required: true, pattern: '[0-9]{5,11}'},
            patient: {required: true, minlength: 2},
            nhi: {required: true, pattern: '[A-Z]{3}[0-9]{4}'},
            ward: {required: true, pattern: '[0-9A-Z]{1,3}'},
            bed: {required: true, pattern: '[0-9A-Z]{1,3}'},
            why: {required: true},
            details: {}
        },
        messages:{
            to: {pattern: '<em>Pager</em> must be 20 followed by 3 digits'},
            caller: {minlength: '<em>Name</em> must contain at least 2 characters'},
            phone: {pattern: '<em>Phone</em> must contain 5 to 11 digits'},
            patient: {minlength: '<em>Name</em> must contain at least 2 characters'},
            nhi: {pattern: '<em>NHI</em> must be a valid NHI number'},
            ward: {pattern: '<em>Ward</em> must contain 1 to 3 characters'},
            bed: {pattern: '<em>Bed</em> must contain 1 to 3 characters'}
        },
        errorPlacement: function(error,element) {
            error.appendTo(element.parent());
        }
    });
    $('form input:not(#to)[type!="submit"]').each(calculate).keyup(calculate);
    $('#why').each(calculate).change(calculate);
});
