angular.module('betterpageMain')
.factory('betterpageModel', ['betterpageParams','betterpageSubmit', 'betterpageReasons',function betterpageModelFactory(betterpageParams,betterpageSubmit,betterpageReasons) {
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
            var data = this.data;
            data.no = [];
            delete data.caller;
            delete data.phone;
            data.reply = false;
            delete data.within;
            delete data.patient;
            delete data.nhi;
            delete data.ward;
            delete data.bed;
            delete data.why;
            delete data.details;
            data.private = false;
            delete data.contents;
            angular.extend(data, betterpageParams);
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
        function send() {
            var items = this.itemize();
            items.bp = items.ptpage ? (betterpageReasons[items.why].beep) : 1;
            return betterpageSubmit(items);
        }
        var initialData = {
            ptpage:true
        };
        var model = {
            data: angular.copy(initialData),
            resetItems: resetItems,
            itemize: itemize,
            generateMsg: generateMsg,
            send: send
        };
        model.resetItems();
        return model;
    }])
.factory('betterpageParams', ['$location', function betterpageParamsFactory($location) {
        var getParams = $location.search(),
        numbers = [];
        if (angular.isDefined(getParams.no)) {
            angular.forEach(getParams.no.split(';'),function(str){
                if (/^20[0-9]{3}$/.test(str)) {numbers.push(parseInt(str,10));}
            });
        }
        getParams.no = numbers;
        var within = parseInt(getParams.within, 10);
        if (within) {getParams.within = within;} else {delete getParams.within;}
        return getParams;
}])
.factory('betterpageSubmit', ['$http', function betterpageSubmitFactory($http) {
        return function(items) {
            var submiturl = './submit.php',
            pageurl = 'http://10.134.0.150/cgi-bin/npcgi';
            //Test feature
            if (confirm('Attempt to send this page via the intranet?')) {
                var popup = window.open(pageurl + '?bp=' + items.bp + '&no=' + items.no + '&msg=' + encodeURIComponent(items.msg), '_blank');
                if (!popup) {alert('Please allow popups for this function to succeed');}
            }
            return $http.post(submiturl, items);
        };
}])
.value('betterpageReasons', {
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
})
.value('betterpageCharLimit', 128)
.value('betterpageTextInputs',{
    no: {t: 'Pager', i:'phone', a: {'betterpage-no':''}},
    caller: {t: 'Name', i:'user', a: {'title-case':'','ng-minlength':2}},
    phone: {t: 'Phone', i:'phone-alt', a:{'ng-pattern':/^[0-9]+$/}},
    within: {t: 'within', i:'time', a: {'ng-required':'data.reply', 'ng-pattern':/^[0-9]+$/,min:1,max:99}, extra:'minutes'},
    patient: {t: 'Name', i:'user', a: {'title-case':'','ng-minlength':2}},
    nhi: {t: 'NHI', i: 'tag', a: {'upper-case':'','ng-pattern':/^[A-Z]{3}[0-9]{4}$/}},
    ward: {t: 'Ward', i:'home', a: {'upper-case':'','ng-maxlength':3}},
    bed: {t: 'Bed', i:'bed', a: {'upper-case':'','ng-maxlength':3}},
    details: {t: 'Specify (optional)', i: 'comment', a: {}},
    contents: {t: 'Message', i:'comment', a: {}}
})
.value('betterpageHeaders', ['Timestamp','To','Caller','Phone','Within (mins)','Patient','NHI','Ward','Bed','Why','Details','']);