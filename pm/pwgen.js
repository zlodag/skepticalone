function lpCreatePass(length, upper, lower, digits, special, mindigits, ambig, reqevery)
{
  if (typeof(length) == 'undefined')
    length = 8 + Math.random();
  if(length > 256) {
    // prevent someone from crashing the page with slow javascript accidentally
    length = 256;
    document.getElementById("length").value = 256;
  }
  if(mindigits > 256) {
     mindigits=256;
  }
  if (typeof(upper) == 'undefined')
    upper = true;
  if (typeof(lower) == 'undefined')
    lower = true;
  if (typeof(digits) == 'undefined')
    digits = true;
  if (typeof(special) == 'undefined')
    special = false;
  if (typeof(mindigits) == 'undefined')
    mindigits = 0;
  if (typeof(ambig) == 'undefined')
    ambig = false;
  if (typeof(reqevery) == 'undefined')
    reqevery = true;

  var minlower = 0;
  var minupper = 0;
  var minspecial = 0;
  if (reqevery) {
    minlower = minupper = minspecial = 1;
  }

  var positions = new Array();
  if (lower && minlower > 0) {
    for (var i = 0; i < minlower; i++) {
      positions[positions.length] = 'L';
    }
  }
  if (upper && minupper > 0) {
    for (var i = 0; i < minupper; i++) {
      positions[positions.length] = 'U';
    }
  }
  if (digits && mindigits > 0) {
    for (var i = 0; i < mindigits; i++) {
      positions[positions.length] = 'D';
    }
  }
  if (special && minspecial > 0) {
    for (var i = 0; i < minspecial; i++) {
      positions[positions.length] = 'S';
    }
  }
  while (positions.length < length) {
    positions[positions.length] = 'A';
  }
  positions.sort(function() { return Math.random() * 2 - 1; });

  // Been burned a few times by this providing special characters...
  var chars = "";
  var lowerchars = "abcdefghjkmnpqrstuvwxyz";
  if (!ambig) {
    lowerchars += 'ilo';
  }
  if (lower) {
    chars += lowerchars;
  }
  var upperchars = "ABCDEFGHJKMNPQRSTUVWXYZ";
  if (!ambig) {
    upperchars += 'ILO';
  }
  if (upper) {
    chars += upperchars;
  }
  var digitchars = "23456789";
  if (!ambig) {
    digitchars += '10';
  }
  if (digits)
    chars += digitchars;
  var specialchars = "!@#$%^&*";
  if (special)
    chars += specialchars;
  var pass = "";
  for(var x=0;x<length;x++)
  {
    var usechars;
    switch (positions[x]) {
      case 'L': usechars = lowerchars;   break;
      case 'U': usechars = upperchars;   break;
      case 'D': usechars = digitchars;   break;
      case 'S': usechars = specialchars; break;
      case 'A': usechars = chars;        break;
    }
    var i = Math.random() *  (usechars.length - 1);
    pass += usechars.charAt(i);
  }
  return pass;
}

function dogenerate(){

  var length = document.getElementById('length').value;
  var upper = document.getElementById('upper').checked;
  var lower = document.getElementById('lower').checked;
  var digits = document.getElementById('digits').checked;
  var special = document.getElementById('special').checked;
  var mindigits = document.getElementById('mindigits').value;
  var ambig = document.getElementById('ambig').checked;
  var reqevery = document.getElementById('reqevery').checked;
  var el = document.getElementById('password');
  el.value = "";
  for (i = 0; i < 5; i++) {
      el.value += lpCreatePass(length, upper, lower, digits, special, mindigits, ambig, reqevery) + '\n';
  }
}

function initiate() {
    document.getElementById("pwgen").addEventListener("submit", dogenerate);
    dogenerate();
}

window.onload = initiate;
