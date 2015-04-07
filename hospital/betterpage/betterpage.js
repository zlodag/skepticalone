function ucwords(str) {
  return str.replace(/(^([a-zA-Z\p{M}]))|([ -][a-zA-Z\p{M}])/g,
  	function(s){
  	  return s.toUpperCase();
	});
}
function calculate() {
    var a = $(this),
    id = a.prop('id'),
    str = a.val();
    switch(id) {
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
    $('span.' + id).text(str);
    var c = $('#preview>code'),
    n = c.text().length - 4,
    toolarge = n>128;
    $('#preview label>span').text(n);
    $('input[type="submit"]').prop('disabled', toolarge);
    $('#preview>code, #preview>code+label>span').toggleClass('invalid', toolarge);
}
$(function () {
    $('form input:not(#to)[type!="submit"]').each(calculate).keyup(calculate);
    $('#why').each(calculate).change(calculate);
});
