angular.module('betterpageMain')
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
                reply: false,
                private: false,
                ptpage: this.data.ptpage
            };            
            var no = parseInt(getParams.no, 10);
            if (no) {
                this.data.no = no;
            }
            for (list = ['patient','nhi','ward','bed'], i = 0; i < list.length; i++) {
                var key = list[i];
                if (getParams[key]) {this.data[key] = getParams[key];}
            }
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
})
.factory('betterpageSubmit', ['$http', function betterpageSubmitFactory($http) {
        return function(items) {
            var submiturl = './submit.php', 
            pageurl = 'http://10.134.0.150/cgi-bin/npcgi';
            if (confirm('Send this page from the intranet?')) {
                var win = window.open(pageurl + '?bp=' + items.bp + '&no=' + items.no + '&msg=' + encodeURIComponent(items.msg), '_blank');
                if (!win) {
                    alert('Please allow popups for this function to succeed');
                }
            }
            return $http.post(submiturl, items);
        };
}]);