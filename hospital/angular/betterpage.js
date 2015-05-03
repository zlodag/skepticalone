(function() {
    var app = angular.module('betterpage', [])
    .config(['$locationProvider',function($locationProvider) {
        $locationProvider.html5Mode(true);
    }])
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
    .directive('pageForm', function() {
        return {
            restrict: 'A',
            templateUrl: 'pageform.html',
            controllerAs: 'page',
            controller: ['$http', '$scope','$location', function($http, $scope, $location) {
                    this.reasons = [
                        {label: "ADDS 3",value: "adds3",group: "High ADDS - specify why"}, 
                        {label: "ADDS 4",value: "adds4",group: "High ADDS - specify why"}, 
                        {label: "ADDS 5+",value: "adds5plus",group: "High ADDS - specify why"}, 
                        {label: "Pain",value: "pain",group: "Concern"}, 
                        {label: "Wound",value: "wound",group: "Concern"}, 
                        {label: "Clarify plan",value: "plan",group: "Concern"}, 
                        {label: "Fluids",value: "fluids",group: "Medication"}, 
                        {label: "Pain relief",value: "analgesia",group: "Medication"}, 
                        {label: "Anti-emetic",value: "antiemetic",group: "Medication"}, 
                        {label: "Sleeping pill",value: "sleep",group: "Medication"}, 
                        {label: "Laxatives",value: "laxatives",group: "Medication"}, 
                        {label: "Regular Meds",value: "regmeds",group: "Medication"}, 
                        {label: "IV line",value: "iv_line",group: "Task"}, 
                        {label: "Consent",value: "consent",group: "Task"}, 
                        {label: "Discharge papers",value: "discharge",group: "Task"}, 
                        {label: "Rechart",value: "rechart",group: "Task"}, 
                        {label: "Inform (no response needed)",value: "inform",group: "Other - specify below"}, 
                        {label: "Call urgently!",value: "call_urgent",group: "Other - specify below"}, 
                        {label: "Come urgenly!",value: "come_urgent",group: "Other - specify below"}, 
                        {label: "None of the above",value: "custom",group: "Other - specify below"}
                    ];
                    this.choices = [
                        {label: "Page about a patient",value: "ptpage"}, 
                        {label: "Page about something else",value: "otherpage"}
                    ];
                    this.get = $location.search();
                    this.initial = angular.extend({
                        caller: '',
                        phone: '',
                        reply:false,
                        within: '',
                        why: '',
                        details: '',
                        contents: ''
                    },{
                        no: parseInt(this.get.no ,10) || 20,
                        patient: this.get.patient ? decodeURIComponent(this.get.patient) : '',
                        nhi: this.get.nhi,
                        ward: this.get.ward,
                        bed: this.get.bed
                    });
                    this.form = angular.extend({choice:'ptpage'},this.initial);
                    var me = this;
                    this.display = function() {
                        var form = me.form;
                        if (form.choice === 'ptpage') {
                            return (form.phone || "")+ 
                            (form.reply && form.within ? "<" + form.within + "m" : "") + 
                            (form.caller ? "(" + form.caller + ")" : "") + 
                            (form.nhi ? " " + form.nhi : "") + 
                            (form.patient ? "(" + form.patient + ")" : "") + 
                            ((form.ward || form.bed) ? "[" + ( form.ward || "") + "-" + ( form.bed || "") + "]" : "") + 
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
                        var betterform = $scope.betterform;
                        if (betterform.$invalid || me.overflow()) {
                            angular.forEach($scope.betterform.$error, function(type) {
                                angular.forEach(type, function (field) {
                                    field.$setDirty();
                                });
                            });
                            return false;
                        }
                        $http.post('submit.php', {no:me.form.no, msg:me.display()})
                        .success(function(data) {
                            if (data.ok) {
                                me.prevpage = data.page;
                                if (me.form.choice === 'ptpage') {
                                    alert("If you requested a review of a patient, please ensure that the notes and chart are in the office.");
                                }
                                angular.extend(me.form, me.initial);
                                $scope.betterform.$setPristine();
                            }
                        });
                    };
                    this.prevpage = '';
                }]
        };
    });
})();
