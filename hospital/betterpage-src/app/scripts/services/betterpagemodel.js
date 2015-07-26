'use strict';

/**
 * @ngdoc service
 * @name betterpageApp.betterpageModel
 * @description
 * # betterpageModel
 * Factory in the betterpageApp.
 */
angular.module('betterpageApp')
.factory('betterpageModel', ['betterpageParams','betterpageReasons',function betterpageModelFactory(betterpageParams,betterpageReasons) {
    var model = {
        data:  {
            ptpage:true
        },
        resetItems: function() {
            this.data = angular.extend({
                ptpage:this.data.ptpage,
                no:[],
                reply:false,
                private:false
            },betterpageParams);
        },
        generateMsg: function() {
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
        },
        itemize: function() {
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
    };
    model.resetItems();
    model.generateMsg();
    return model;
}]);
