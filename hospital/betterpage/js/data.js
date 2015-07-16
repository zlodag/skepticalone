angular.module('betterpage')
.factory('betterpageModel', ['betterpageParams','betterpageReasons','betterpageSubmit',function betterpageModelFactory(betterpageParams,betterpageReasons,betterpageSubmit) {
        var initialData = {
            ptpage:true
        };
        function resetItems() {
            this.data = angular.extend({
                ptpage:this.data.ptpage,
                no:[],
                reply:false,
                private:false
            },betterpageParams);
        }
        function generateMsg() {
            var data = this.data;
            if (data.ptpage) {
                this.msg = (data.phone || "") + 
                (data.reply && data.within ? "<" + data.within + "m" : "") + 
                (data.caller ? "(" + data.caller + ")" : "") + 
                (data.nhi ? " " + data.nhi : "") + 
                (data.patient ? "(" + data.patient + ")" : "") + 
                ((data.ward || data.bed) ? "[" + (data.ward || "") + "-" + (data.bed || "") + "]" : "") + 
                (data.why ? " " + data.why : "") + 
                (data.details ? " (" + data.details + ")" : "");
                this.bp = data.why ? betterpageReasons[data.why].beep : 1;
            } else {
                this.msg = data.contents || '';
                this.bp = 1;
            }
        }
        function itemize() {
            this.generateMsg();
            var params = {
                no: this.data.no,
                ptpage: this.data.ptpage,
                msg: this.msg,
                bp: this.bp,
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
            return betterpageSubmit(this.itemize());
        }
        var model = {
            data: initialData,
            resetItems: resetItems,
            generateMsg: generateMsg,
            itemize: itemize,
            send: send
        };
        model.resetItems();
        model.generateMsg();
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
                var popup = window.open(pageurl + '?bp=' + items.bp + '&no=' + encodeURIComponent(items.no.join(';')) + '&msg=' + encodeURIComponent(items.msg), '_blank');
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
    phone: {t: 'Phone', i:'phone-alt', a:{'ng-pattern':/^[0-9]+$/},errors:[]},
    within: {t: 'within', i:'time', a: {'ng-required':'model.data.reply', 'ng-pattern':/^[0-9]+$/,min:1,max:30}, extra:'minutes',errors:[]},
    patient: {t: 'Name', i:'user', a: {'title-case':'','ng-minlength':2}},
    nhi: {t: 'NHI', i: 'tag', a: {'upper-case':'','nhi':''}},
    ward: {t: 'Ward', i:'home', a: {'upper-case':'','ng-maxlength':3}},
    bed: {t: 'Bed', i:'bed', a: {'upper-case':'','ng-maxlength':3}},
    details: {t: 'Specify (optional)', i: 'comment', a: {}},
    contents: {t: 'Message', i:'comment', a: {}}
})
.value('betterpageCustomInputs',{
    //text
    no: {type:'text',title: 'Pager', icon:'phone', attr: {'betterpage-no':''}},
    caller: {type:'text',title: 'Name', icon:'user', attr: {'title-case':'','ng-minlength':2}},
    phone: {type:'text',title: 'Phone', icon:'phone-alt', attr:{'ng-pattern':/^[0-9]+$/}},
    within: {type:'text',title: 'within', icon:'time', attr: {'ng-required':'model.data.reply', 'ng-pattern':/^[0-9]+$/,min:1,max:30}},
    patient: {type:'text',title: 'Name', icon:'user', attr: {'title-case':'','ng-minlength':2}},
    nhi: {type:'text',title: 'NHI', icon: 'tag', attr: {'upper-case':'','nhi':''}},
    ward: {type:'text',title: 'Ward', icon:'home', attr: {'upper-case':'','ng-maxlength':3}},
    bed: {type:'text',title: 'Bed', icon:'bed', attr: {'upper-case':'','ng-maxlength':3}},
    details: {type:'text',title: 'Specify (optional)', icon: 'comment', attr: {}},
    contents: {type:'text',title: 'Message', icon:'comment', attr: {}},
    respond:{type:'text',icon:'earphone'},
    //select
    ptpage:{type:'select'},
    why:{type:'select'}
});