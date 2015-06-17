(function() {
    var submiturl = './submit.php', 
    pageurl = 'http://10.134.0.150/cgi-bin/npcgi';
    
    "use strict";
    var app = angular.module('betterpage', ['ngMessages'])
    .directive('titleCase', function() {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, element, attrs, ngModel) {
                ngModel.$parsers.push(function(str) {
                    return str.replace(/(^([a-zA-Z\p{M}]))|([ -][a-zA-Z\p{M}])/g, function(s) {
                        return s.toUpperCase();
                    });
                });
            }
        };
    })
    .directive('upperCase', function() {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, element, attrs, ngModel) {
                ngModel.$parsers.push(function(str) {
                    return str.toUpperCase();
                });
            }
        };
})
    .controller('pageCtrl', ['$http', '$scope', function($http, $scope) {
            this.reasons = [
                {label: "ADDS 3", beep: 1, group: "High ADDS - specify why"}, 
                {label: "ADDS 4", beep: 1, group: "High ADDS - specify why"}, 
                {label: "ADDS 5+", beep: 1, group: "High ADDS - specify why"}, 
                {label: "Pain", beep: 2, group: "Concern"},
                {label: "Short of breath", beep: 2, group: "Concern"},
                {label: "Nausea", beep: 2, group: "Concern"},
                {label: "Urinary retention", beep: 2, group: "Concern"}, 
                {label: "Wound", beep: 2, group: "Concern"}, 
                {label: "Clarify plan", beep: 2, group: "Concern"}, 
                {label: "Fluids", beep: 3, group: "Medication"}, 
                {label: "Sleeping pill", beep: 3, group: "Medication"}, 
                {label: "Laxatives", beep: 3, group: "Medication"}, 
                {label: "Regular Meds", beep: 3, group: "Medication"}, 
                {label: "IV line/bloods", beep: 4, group: "Task"},
                {label: "Review result", beep: 4, group: "Task"},
                {label: "Admit", beep: 4, group: "Task"}, 
                {label: "Discharge", beep: 4, group: "Task"}, 
                {label: "Rechart", beep: 4, group: "Task"},
                {label: "Consent", beep: 4, group: "Task"}, 
                {label: "Inform", beep: 5, group: "Other - specify below"}, 
                {label: "Call urgently!", beep: 5, group: "Other - specify below"}, 
                {label: "Review urgently!", beep: 5, group: "Other - specify below"}, 
                {label: "Custom", beep: 5, group: "Other - specify below"}
            ];
            this.choices = [
                {label: "Page about a patient",value: "ptpage"}, 
                {label: "Page about something else",value: "otherpage"}
            ];
            this.prevpage = {
                msg: '',
                beep: null,
                private: null
            };
            this.get = {};
            var queries = window.location.search.substring(1).split("&");
            for (var i = 0; i < queries.length; i++) {
                var temp = queries[i].split('=');
                this.get[temp[0]] = decodeURIComponent(temp[1]);
            }
            this.initial = angular.extend({
                caller: '',
                phone: null,
                reply: false,
                within: null,
                why: '',
                details: '',
                contents: '',
                private: false
            }, {
                no: parseInt(this.get.no, 10) || null,
                patient: this.get.patient,
                nhi: this.get.nhi,
                ward: this.get.ward,
                bed: this.get.bed
            });
            this.form = angular.extend({choice: 'ptpage'}, this.initial);
            var me = this;
            this.display = function() {
                var form = me.form;
                if (form.choice === 'ptpage') {
                    return (form.phone || "") + 
                    (form.reply && form.within ? "<" + form.within + "m" : "") + 
                    (form.caller ? "(" + form.caller + ")" : "") + 
                    (form.nhi ? " " + form.nhi : "") + 
                    (form.patient ? "(" + form.patient + ")" : "") + 
                    ((form.ward || form.bed) ? "[" + (form.ward || "") + "-" + (form.bed || "") + "]" : "") + 
                    (form.why ? " " + form.why.label : "") + 
                    (form.details ? " (" + form.details + ")" : "");
                } else if (form.choice === 'otherpage') {
                    return form.contents || '';
                }
            };
            this.overflow = function() {
                return me.display().length > 128;
            };
            this.submit = function() {
                var betterform = $scope.betterform, 
                msg = me.display(),
                beep = me.form.choice === 'ptpage' ? me.form.why.beep : 1,
                number = parseInt(me.form.no, 10);
                if (betterform.$invalid || me.overflow()) {
                    angular.forEach($scope.betterform.$error, function(type) {
                        angular.forEach(type, function(field) {
                            field.$setDirty();
                        });
                    });
                    return false;
                }
                $http.post(submiturl, angular.extend({msg:msg, bp:beep}, me.form, {why:me.form.why.label}))
                .success(function(data) {
                    if (data.ok) {
                        //alert(urlstring);
                        if (!document.addEventListener) { //using Internet Explorer <= 8...
                            window.open(pageurl + '?bp=' + beep + '&no=' + number + '&msg=' + encodeURIComponent(msg));
                        } else {
                            $http.get(pageurl, {params: {bp: beep, no:number, msg:msg}});
                        };
                        me.prevpage = data.page;
                        if (me.form.choice === 'ptpage') {
                            alert("If you requested a review of a patient, please ensure that the notes and chart are in the office.");
                        }
                        angular.extend(me.form, me.initial);
                        $scope.betterform.$setPristine();
                    }
                });
            };
        }]);
})();
