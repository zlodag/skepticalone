angular.module('betterpageData', ['betterpageFilters'])
.factory('formhandler', ['$http', function formhandlerFactory($http) {
    return function(data) {
        if (data.ok) {
            //alert(urlstring);
            if (!document.addEventListener) { //using Internet Explorer <= 8...
                window.open(pageurl + '?bp=' + beep + '&no=' + this.no + '&msg=' + encodeURIComponent(msg));
            } else {
                $http.get(pageurl, {params: {bp: beep,no: this.no,msg: msg}});
            }
            ;
            //$scope.prevpage = data.page;
            if (this.ptpage) {
                alert("If you requested a review of a patient, please ensure that the notes and chart are in the office.");
            }
            //angular.extend($scope.data, $scope.initial);
            return true;
        } else {
            return false;
        }
    };
}])
.factory('betterpageModel', ['betterpageGeneratorFilter', function betterpageModelFactory(betterpageGeneratorFilter) {
    var getParams = {};
    var queries = window.location.search.substring(1).split("&");
    for (var i = 0; i < queries.length; i++) {
        var temp = queries[i].split('=');
        getParams[temp[0]] = decodeURIComponent(temp[1]);
    }
    var initial = {
        charLimit: 128,
        ptpage: true,
        reset: function() {
            this.reply = false;
            this.private = false;
            delete this.no;
            delete this.phone;
            delete this.caller;
            delete this.within;
            delete this.patient;
            delete this.nhi;
            delete this.ward;
            delete this.bed;
            delete this.why;
            delete this.details;
            delete this.contents;
            var no = parseInt(getParams.no, 10);
            if (no) {
                this.no = no;
            }
            if (getParams.patient) {
                this.patient = getParams.patient;
            }
            if (getParams.nhi) {
                this.nhi = getParams.nhi;
            }
            if (getParams.ward) {
                this.ward = getParams.ward;
            }
            if (getParams.bed) {
                this.bed = getParams.bed;
            }
            return this;
        },
        get bp() {
            return (this.ptpage && this.why) ? this.why.beep : 1;
        },
        get msg() {
            return betterpageGeneratorFilter(this);
        },
        get params() {
            var params = {
                no: this.no,
                ptpage: this.ptpage
            };
            if (this.ptpage) {
                params.phone = this.phone;
                params.caller = this.caller;
                params.reply = this.reply;
                params.within = this.within;
                params.patient = this.patient;
                params.nhi = this.nhi;
                params.ward = this.ward;
                params.bed = this.bed;
                params.why = this.why ? this.why.label : undefined;
                params.details = this.details;
                params.private = false;
            } else {
                params.contents = this.contents;
                params.private = this.private;
            }
            return params;
        }
    };
    return initial.reset();
}])
.factory('betterpageSubmit', ['$http', function betterpageSubmitFactory($http) {
    return function(betterform, data) {
        var msg = data.msg;
        if (betterform.$invalid || msg.length > 128) {
            angular.forEach(betterform.$error, function(type) {
                angular.forEach(type, function(field) {
                    field.$setTouched();
                });
            });
            return false;
        }
        var submiturl = './submit.php', 
        pageurl = 'http://10.134.0.150/cgi-bin/npcgi', 
        beep = data.bp, 
        params = data.params;
        if (confirm('Send this page from the intranet?')) {
            var win = window.open(pageurl + '?bp=' + beep + '&no=' + params.no + '&msg=' + encodeURIComponent(msg), '_blank');
            if (!win) {alert('Please allow popups for this function to succeed');}
        }
        return $http.post(submiturl, angular.extend({msg: msg,bp: beep}, params));
    };
}])
.constant('betterpageChoices', [
    {label: "Page about a patient",value: true}, 
    {label: "Page about something else",value: false}
])
.constant('betterpageReasons', [
    {label: "ADDS 3",beep: 1,group: "High ADDS - specify why"}, 
    {label: "ADDS 4",beep: 1,group: "High ADDS - specify why"}, 
    {label: "ADDS 5+",beep: 1,group: "High ADDS - specify why"}, 
    {label: "Pain",beep: 2,group: "Concern"}, 
    {label: "Short of breath",beep: 2,group: "Concern"}, 
    {label: "Nausea",beep: 2,group: "Concern"}, 
    {label: "Urinary retention",beep: 2,group: "Concern"}, 
    {label: "Wound",beep: 2,group: "Concern"}, 
    {label: "Clarify plan",beep: 2,group: "Concern"}, 
    {label: "Fluids",beep: 3,group: "Medication"}, 
    {label: "Sleeping pill",beep: 3,group: "Medication"}, 
    {label: "Laxatives",beep: 3,group: "Medication"}, 
    {label: "Regular Meds",beep: 3,group: "Medication"}, 
    {label: "IV line/bloods",beep: 4,group: "Task"}, 
    {label: "Review result",beep: 4,group: "Task"}, 
    {label: "Admit",beep: 4,group: "Task"}, 
    {label: "Discharge",beep: 4,group: "Task"}, 
    {label: "Rechart",beep: 4,group: "Task"}, 
    {label: "Consent",beep: 4,group: "Task"}, 
    {label: "Inform",beep: 5,group: "Other - specify below"}, 
    {label: "Call urgently!",beep: 5,group: "Other - specify below"}, 
    {label: "Review urgently!",beep: 5,group: "Other - specify below"}, 
    {label: "Custom",beep: 5,group: "Other - specify below"}
]);