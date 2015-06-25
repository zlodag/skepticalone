angular.module('betterpageMain')
.filter('betterpageGenerator', function() {
    return function(data) {
        if (data.ptpage) {
            return (data.phone || "") + 
            (data.reply && data.within ? "<" + data.within + "m" : "") + 
            (data.caller ? "(" + data.caller + ")" : "") + 
            (data.nhi ? " " + data.nhi : "") + 
            (data.patient ? "(" + data.patient + ")" : "") + 
            ((data.ward || data.bed) ? "[" + (data.ward || "") + "-" + (data.bed || "") + "]" : "") + 
            (data.why ? " " + data.why.label : "") + 
            (data.details ? " (" + data.details + ")" : "");
        } else {
            return data.contents || '';
        }
    };
});