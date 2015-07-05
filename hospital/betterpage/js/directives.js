angular.module('betterpageMain')
.directive('betterpageForm', function() {
    return {
        restrict: 'E',
        templateUrl: 'form.html',
        link: function(scope) {
            scope.$watchCollection('model.data', scope.update);
        },
        controller: ['$scope', 'betterpageReasons', function($scope, betterpageReasons) {
                $scope.reasons = betterpageReasons;
                $scope.send = function(){
                    $scope.model.send().success(function(data, status, headers, config) {
                        if (data.ok) {
                            $scope.prevpage.replace(config.data);
                            $scope.reset();
                            if (config.data.ptpage) {
                                alert("If you requested a review of a patient, please ensure that the notes and chart are in the office.");
                            }
                        }
                    });
                };
            }]
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
.directive('betterpageLog', ['betterpageModel', function(betterpageModel) {
    return {
        restrict: 'E',
        templateUrl: 'pagelog.html',
        scope: true,
        controller: ['$http', '$scope', function($http, $scope) {
                $scope.reset = function() {
                    $scope.rows = [];
                    $scope.hours = 8;
                    $scope.filterText = '';
                    $scope.fetched = false;
                    $scope.active = false;
                    $scope.pending = false;
                };
                $scope.toggle = function() {
                    $scope.active = !$scope.active;
                    if ($scope.active && !$scope.fetched) {
                        $scope.pending = true;
                        $http.get('pagelog_provider.php', {params: {hours: $scope.hours}}).success(function(rows) {
                            $scope.rows = rows;
                            $scope.fetched = true;
                            $scope.pending = false;
                        });
                    }
                };
                $scope.buttonText = function() {
                    if ($scope.pending) {
                        return 'Pending...';
                    }
                    if ($scope.active) {
                        return 'Hide';
                    } 
                    else {
                        return 'Show';
                    }
                };
                $scope.copy = function(data) {
                    betterpageModel.data = data;
                    $scope.active = false;
                };
                $scope.reset();
            }]
    };
}])
.directive('betterpageNo', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attrs, controller) {
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
                for (i=0;i<modelValue.length;i++) {
                    if (typeof modelValue[i] !== 'number') {return false;}
                }
                return true;
            }
            controller.$validators.pagerNumbers = function(modelValue) {
                for (i=0;i<modelValue.length;i++) {
                    var value = modelValue[i];
                    if (typeof value !== 'number' || value < 20000 || value >= 30000) {return false;}
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
})
.directive('betterpageReset', function() {
    return {
        restrict: 'A',
        require: ['betterpageReset','^form'],
        scope: true,
        controller: ['betterpageModel', function(betterpageModel){
            this.model = betterpageModel;
        }],
        link: function(scope, element, attrs, controllers) {
            element.on('click', function() {
                scope.$apply(function(){
                    controllers[0].model.resetItems();
                    controllers[1].$setUntouched();
                    controllers[1].$setPristine();
                });
            });
        }
    };
});
