angular.module('betterpageMain')
.factory('betterpageModel', ['$location', function betterpageModelFactory($location) {
        function generateMsg() {
            var data = this.data;
            if (data.ptpage) {
                return (data.phone || "") + 
                (data.reply && data.within ? "<" + data.within + "m" : "") + 
                (data.caller ? "(" + data.caller + ")" : "") + 
                (data.nhi ? " " + data.nhi : "") + 
                (data.patient ? "(" + data.patient + ")" : "") + 
                ((data.ward || data.bed) ? "[" + (data.ward || "") + "-" + (data.bed || "") + "]" : "") + 
                (data.why ? " " + data.why : "") + 
                (data.details ? " (" + data.details + ")" : "");
            } else {
                return data.contents || '';
            }
        }
        function resetItems() {
            var getParams = $location.search();
            var no = parseInt(getParams.no, 10);
            if (no) {getParams.no = no;}
            var within = parseInt(getParams.within, 10);
            if (within) {getParams.within = within;}
            this.data = angular.extend({
                reply: false,
                private: false,
                ptpage: this.data.ptpage
            },getParams);
        }
        function itemize() {
            var params = {
                no: this.data.no,
                ptpage: this.data.ptpage,
                msg: this.generateMsg()
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
                params.why = this.data.why;
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
    }])
.constant('betterpageStatic', {
    charLimit: 128,
    choices: {
        "Page about a patient":true,
        "Page about something else":false
    },
    reasons: {
        // 1: no clinical concern, 2: low 3: medium 4: high priority concern
        "ADDS 3":{beep: 2,group: "High ADDS - specify why"}, 
        "ADDS 4":{beep: 3,group: "High ADDS - specify why"}, 
        "ADDS 5+":{beep: 4,group: "High ADDS - specify why"},
        "Pain":{beep: 2,group: "Concern"}, 
        "Short of breath":{beep: 3,group: "Concern"}, 
        "Nausea":{beep: 2,group: "Concern"}, 
        "Urinary retention":{beep: 2,group: "Concern"}, 
        "Wound":{beep: 2,group: "Concern"}, 
        "Clarify plan":{beep: 1,group: "Concern"}, 
        "Fluids":{beep: 1,group: "Medication"}, 
        "Sleeping pill":{beep: 1,group: "Medication"}, 
        "Laxatives":{beep: 1,group: "Medication"}, 
        "Regular Meds":{beep: 1,group: "Medication"}, 
        "IV line/bloods":{beep: 1,group: "Task"}, 
        "Review result":{beep: 1,group: "Task"}, 
        "Admit":{beep: 1,group: "Task"}, 
        "Discharge":{beep: 1,group: "Task"}, 
        "Rechart":{beep: 1,group: "Task"}, 
        "Consent":{beep: 1,group: "Task"}, 
        "Inform":{beep: 1,group: "Other - specify below"}, 
        "Call urgently!":{beep: 4,group: "Other - specify below"}, 
        "Review urgently!":{beep: 4,group: "Other - specify below"}, 
        "Custom":{beep: 1,group: "Other - specify below"}
    },
    headers: ['Timestamp','To','Caller','Phone','Within (mins)','Patient','NHI','Ward','Bed','Why','Details','']
});