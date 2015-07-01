angular.module('betterpageMain')
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
.factory('betterpageModel', function betterpageModelFactory() {
        var getParams = {};
        var queries = window.location.search.substring(1).split("&");
        for (var i = 0; i < queries.length; i++) {
            var temp = queries[i].split('=');
            getParams[temp[0]] = decodeURIComponent(temp[1]);
        }
        function generateMsg() {
            var data = this.data;
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
        }
        function resetItems() {
            this.data = {
                ptpage: this.data.ptpage,
                reply: false,
                private: false,
                };
                /*
                delete this.data.no;
                delete this.data.phone;
                delete this.data.caller;
                delete this.data.within;
                delete this.data.patient;
                delete this.data.nhi;
                delete this.data.ward;
                delete this.data.bed;
                delete this.data.why;
                delete this.data.details;
                delete this.data.contents;
                */
                var no = parseInt(getParams.no, 10);
                if (no) {
                    this.data.no = no;
                }
                if (getParams.patient) {
                    this.data.patient = getParams.patient;
                }
                if (getParams.nhi) {
                    this.data.nhi = getParams.nhi;
                }
                if (getParams.ward) {
                    this.data.ward = getParams.ward;
                }
                if (getParams.bed) {
                    this.data.bed = getParams.bed;
                }
                //return this.data;
        }
        function itemize() {
            var params = {
                no: this.data.no,
                ptpage: this.data.ptpage,
                msg: this.generateMsg(),
                bp: (this.data.ptpage && this.data.why) ? this.data.why.beep : 1
            };
            if (this.data.ptpage) {
                params.phone = this.data.phone;
                params.caller = this.data.caller;
                params.reply = this.data.reply;
                params.within = this.data.within;
                params.patient = this.data.patient;
                params.nhi = this.data.nhi;
                params.ward = this.data.ward;
                params.bed = this.data.bed;
                params.why = this.data.why ? this.data.why.label : undefined;
                params.details = this.data.details;
                params.private = false;
            } else {
                params.contents = this.data.contents;
                params.private = this.data.private;
            }
            return params;
        }
        var model = {
            data: {ptpage:true},
            resetItems: resetItems,
            itemize: itemize,
            generateMsg: generateMsg
        };
        model.resetItems();
        return model;
    })
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
                if (!win) {
                    alert('Please allow popups for this function to succeed');
                }
            }
            return $http.post(submiturl, angular.extend({msg: msg,bp: beep}, params));
        };
    }])
.constant('betterpageStatic', {
    charLimit: 128,
    choices: [
        {label: "Page about a patient",value: true}, 
        {label: "Page about something else",value: false}
    ],
    reasons: [
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
    ]
});