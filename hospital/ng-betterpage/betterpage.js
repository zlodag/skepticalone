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
                {label: "ADDS 3",group: "High ADDS - specify why"}, 
                {label: "ADDS 4",group: "High ADDS - specify why"}, 
                {label: "ADDS 5+",group: "High ADDS - specify why"}, 
                {label: "Pain",group: "Concern"},
                {label: "Nausea",group: "Concern"},
                {label: "Urinary retention",group: "Concern"}, 
                {label: "Wound",group: "Concern"}, 
                {label: "Clarify plan",group: "Concern"}, 
                {label: "Fluids",group: "Medication"}, 
                {label: "Sleeping pill",group: "Medication"}, 
                {label: "Laxatives",group: "Medication"}, 
                {label: "Regular Meds",group: "Medication"}, 
                {label: "IV line/bloods",group: "Task"},
                {label: "Review result",group: "Task"},
                {label: "Admit",group: "Task"}, 
                {label: "Discharge",group: "Task"}, 
                {label: "Rechart",group: "Task"},
                {label: "Consent",group: "Task"}, 
                {label: "Inform",group: "Other - specify below"}, 
                {label: "Call urgently!",group: "Other - specify below"}, 
                {label: "Review urgently!",group: "Other - specify below"}, 
                {label: "Custom",group: "Other - specify below"}
            ];
            this.choices = [
                {label: "Page about a patient",value: "ptpage"}, 
                {label: "Page about something else",value: "otherpage"}
            ];
            this.prevpage = '';
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
                contents: ''
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
                    (form.why ? " " + form.why : "") + 
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
                msg = me.display();
                if (betterform.$invalid || me.overflow()) {
                    angular.forEach($scope.betterform.$error, function(type) {
                        angular.forEach(type, function(field) {
                            field.$setDirty();
                        });
                    });
                    return false;
                }
                $http.post(submiturl, angular.extend({msg:msg},me.form))
                .success(function(data) {
                    if (data.ok) {
                        //alert(urlstring);
                        if (!document.addEventListener) { //using Internet Explorer <= 8...
                            window.open(pageurl + '?bp=1&no=' + parseInt(me.form.no, 10) + '&msg=' + encodeURIComponent(msg));
                        } else {
                            $http.get(pageurl, {params: {bp:1, no:parseInt(me.form.no, 10), msg:msg}});
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
