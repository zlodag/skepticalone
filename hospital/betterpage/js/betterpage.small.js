(function() {
    "use strict";
    angular.module('betterpageMain', ['ngMessages'])
    .config(['$compileProvider', '$locationProvider', 
        function($compileProvider, $locationProvider) {
            $compileProvider.debugInfoEnabled(false);
            $locationProvider.html5Mode({
                enabled: true,
                requireBase: false
            });
        }
    ])
    .factory('betterpageModel', ['betterpageParams', 'betterpageSubmit', 'betterpageReasons', function betterpageModelFactory(betterpageParams, betterpageSubmit, betterpageReasons) {
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
                this.data = angular.extend({
                    reply: false,
                    private: false,
                    ptpage: this.data.ptpage
                }, betterpageParams);
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
            var model = {
                data: {ptpage: true},
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
                angular.forEach(getParams.no.split(';'), function(str) {
                    if (/^20[0-9]{3}$/.test(str)) {
                        numbers.push(parseInt(str, 10));
                    }
                });
            }
            getParams.no = numbers;
            var within = parseInt(getParams.within, 10);
            if (within) {
                getParams.within = within;
            } else {
                delete getParams.within;
            }
            return getParams;
        }])
    .factory('betterpageSubmit', ['$http', function betterpageSubmitFactory($http) {
            return function(items) {
                var submiturl = './submit.php', 
                pageurl = 'http://10.134.0.150/cgi-bin/npcgi';
                //Test feature
                if (confirm('Attempt to send this page via the intranet?')) {
                    var popup = window.open(pageurl + '?bp=' + items.bp + '&no=' + items.no + '&msg=' + encodeURIComponent(items.msg), '_blank');
                    if (!popup) {
                        alert('Please allow popups for this function to succeed');
                    }
                }
                return $http.post(submiturl, items);
            };
        }])
    .constant('betterpageReasons', {
        // 1: no clinical concern, 2: low 3: medium 4: high priority concern
        "ADDS 3": {beep: 2,group: "High ADDS - specify why"},
        "ADDS 4": {beep: 3,group: "High ADDS - specify why"},
        "ADDS 5+": {beep: 4,group: "High ADDS - specify why"},
        "Pain": {beep: 2,group: "Concern"},
        "Short of breath": {beep: 3,group: "Concern"},
        "Nausea": {beep: 2,group: "Concern"},
        "Urinary retention": {beep: 2,group: "Concern"},
        "Wound": {beep: 2,group: "Concern"},
        "Clarify plan": {beep: 1,group: "Concern"},
        "Fluids": {beep: 1,group: "Medication"},
        "Sleeping pill": {beep: 1,group: "Medication"},
        "Laxatives": {beep: 1,group: "Medication"},
        "Regular Meds": {beep: 1,group: "Medication"},
        "IV line/bloods": {beep: 1,group: "Task"},
        "Review result": {beep: 1,group: "Task"},
        "Admit": {beep: 1,group: "Task"},
        "Discharge": {beep: 1,group: "Task"},
        "Rechart": {beep: 1,group: "Task"},
        "Consent": {beep: 1,group: "Task"},
        "Inform": {beep: 1,group: "Other - specify below"},
        "Call urgently!": {beep: 4,group: "Other - specify below"},
        "Review urgently!": {beep: 4,group: "Other - specify below"},
        "Custom": {beep: 1,group: "Other - specify below"}
    })
    .constant('betterpageCharLimit', 128)
    .constant('betterpageChoices', {
        "Page about a patient": true,
        "Page about something else": false
    })
    .constant('betterpageHeaders', ['Timestamp', 'To', 'Caller', 'Phone', 'Within (mins)', 'Patient', 'NHI', 'Ward', 'Bed', 'Why', 'Details', ''])
    .directive('betterpageMain', function() {
        return {
            restrict: 'A',
            controller: ['betterpageModel', 'betterpageCharLimit', function(betterpageModel, betterpageCharLimit) {
                    var PageCtrl = this;
                    PageCtrl.model = betterpageModel;
                    PageCtrl.display = '';
                    PageCtrl.charLimit = betterpageCharLimit;
                    PageCtrl.update = function() {
                        var items = PageCtrl.model.itemize();
                        PageCtrl.display = items.msg;
                        PageCtrl.overflow = (items.msg.length > PageCtrl.charLimit);
                    };
                    PageCtrl.prevpage = {
                        no: [],
                        msg: '',
                        bp: null,
                        private: null
                    };
                }],
            controllerAs: 'PageCtrl'
        };
    })
    .directive('betterpageForm', function() {
        return {
            restrict: 'E',
            templateUrl: 'form.html',
            link: function(scope, element, attrs, controllers) {
                scope.$watchCollection('PageCtrl.model.data', scope.PageCtrl.update);
            },
            controller: ['$scope', 'betterpageChoices', 'betterpageReasons', function($scope, betterpageChoices, betterpageReasons) {
                    var FormCtrl = this;
                    FormCtrl.choices = betterpageChoices;
                    FormCtrl.reasons = betterpageReasons;
                    FormCtrl.reset = function() {
                        $scope.PageCtrl.model.resetItems();
                        $scope.betterform.$setUntouched();
                        $scope.betterform.$setPristine();
                    };
                    FormCtrl.send = function() {
                        $scope.PageCtrl.model.send().success(function(data, status, headers, config) {
                            if (data.ok) {
                                $scope.PageCtrl.prevpage = config.data;
                                FormCtrl.reset();
                            /*
                        if (config.data.ptpage) {
                            alert("If you requested a review of a patient, please ensure that the notes and chart are in the office.");
                        }
                        */
                            }
                        });
                    };
                }],
            controllerAs: 'FormCtrl'
        };
    })
    .directive('betterpagePreview', function() {
        return {
            restrict: 'E',
            templateUrl: 'preview.html'
        };
    })
    .directive('betterpageOutcome', function() {
        return {
            restrict: 'E',
            templateUrl: 'outcome.html'
        };
    })
    .directive('betterpageLog', function() {
        return {
            restrict: 'E',
            templateUrl: 'pagelog.html',
            controller: ['$http', 'betterpageModel', 'betterpageHeaders', function($http, betterpageModel, betterpageHeaders) {
                    var LogCtrl = this;
                    LogCtrl.reset = function() {
                        LogCtrl.rows = [];
                        LogCtrl.hours = 8;
                        LogCtrl.filterText = '';
                        LogCtrl.fetched = false;
                        LogCtrl.active = false;
                        LogCtrl.pending = false;
                    };
                    LogCtrl.reset();
                    LogCtrl.refresh = function() {
                        LogCtrl.pending = true;
                        $http.get('pagelog_provider.php', {params: {hours: LogCtrl.hours}}).success(function(rows) {
                            LogCtrl.rows = rows;
                            LogCtrl.pending = false;
                            LogCtrl.timestamp = new Date();
                            LogCtrl.active = true;
                        });
                    };
                    LogCtrl.toggle = function() {
                        LogCtrl.active = !LogCtrl.active;
                        if (LogCtrl.active && !LogCtrl.fetched) {
                            LogCtrl.refresh();
                            LogCtrl.fetched = true;
                        }
                    };
                    LogCtrl.copy = function(data) {
                        betterpageModel.data = data;
                        LogCtrl.active = false;
                    };
                    LogCtrl.headers = betterpageHeaders;
                }],
            controllerAs: 'LogCtrl'
        };
    })
    .directive('betterpageNo', function() {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, element, attrs, controller) {
                controller.$formatters = [function(value) {
                        return value.join(' ');
                    }];
                controller.$parsers.push(function(viewValue) {
                    var list = [];
                    if (viewValue) {
                        angular.forEach(viewValue.split(' '), function(value) {
                            if (/^[0-9]+$/.test(value)) {
                                list.push(parseInt(value, 10));
                            } else if (value) {
                                list.push(value);
                            }
                        });
                    }
                    return list;
                });
                controller.$validators.allNumbers = function(modelValue) {
                    if (angular.isUndefined(modelValue)) {
                        return;
                    }
                    for (i = 0; i < modelValue.length; i++) {
                        if (typeof modelValue[i] !== 'number') {
                            return false;
                        }
                    }
                    return true;
                }
                controller.$validators.pagerNumbers = function(modelValue) {
                    if (angular.isUndefined(modelValue)) {
                        return;
                    }
                    for (i = 0; i < modelValue.length; i++) {
                        var value = modelValue[i];
                        if (typeof value !== 'number' || value < 20000 || value >= 30000) {
                            return false;
                        }
                    }
                    return true;
                }
            
            }
        };
    })
    .directive('titleCase', function() {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, element, attrs, controller) {
                controller.$parsers.push(function(str) {
                    return str.replace(/(^([a-z]))|([ -][a-z])/g, function(s) {
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
            link: function(scope, element, attrs, controller) {
                controller.$parsers.push(function(str) {
                    return str.toUpperCase();
                });
            }
        };
    });
})();