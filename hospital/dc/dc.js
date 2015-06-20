(function() {
    "use strict";
    var app = angular.module('dcMain', ['ui.bootstrap', 'ui.tree', 'ngAnimate', 'dcData', 'dcFilters', 'dcDirectives'])
    .config(['datepickerConfig', 'datepickerPopupConfig', function(datepickerConfig, datepickerPopupConfig) {
            datepickerConfig.showWeeks = false;
            datepickerConfig.maxMode = 'day';
            datepickerConfig.startingDay = 1;
            datepickerPopupConfig.showButtonBar = false;
        }])
    .controller('dcController', ['$scope', 'initFactory', function($scope, initFactory) {
            $scope.date = initFactory.now;
            $scope.user = initFactory.user;
            $scope.patient = initFactory.patient;
            $scope.gp = initFactory.gp;
            $scope.hospital = initFactory.hospital;
            $scope.admission = initFactory.admission;
            $scope.diagnoses = initFactory.diagnoses;
            $scope.advice = initFactory.advice;
            $scope.presentation = initFactory.presentation;
            $scope.progress = initFactory.progress;
            $scope.plan = initFactory.plan;
            $scope.specialAuthority = initFactory.specialAuthority;
            $scope.functions = {
                newItem: function(listname) {
                    $scope.diagnoses[listname].push({str: '',extras: []});
                },
                newSubItem: function(scope) {
                    scope.$modelValue.extras.push({str: ''});
                    scope.expand();
                },
                conditionalRemove: function(scope, minlength) {
                    if (scope.$parentNodesScope.$modelValue.length > minlength) {
                        scope.removeNode();
                    } else {
                        scope.$modelValue.str = '';
                        scope.$modelValue.extras = [];
                    }
                }
            };
        }]);
})();
