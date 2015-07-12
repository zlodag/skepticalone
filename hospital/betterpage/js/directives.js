angular.module('betterpageMain')
.directive('betterpageForm', function() {
    return {
        restrict: 'E',
        templateUrl: 'form.html',
        controller: ['$scope','betterpageModel','betterpageCharLimit',function($scope,betterpageModel,betterpageCharLimit){
            $scope.model = betterpageModel;
            $scope.charLimit = betterpageCharLimit;
        }],
        link: function(scope, iElement, iAttrs){
            scope.$watchCollection('model.data',function(){
                scope.display = scope.model.generateMsg();
            });
        },
    };
})
.directive('buttonPanel', function(){
    return {
        restrict: 'E',
        templateUrl: 'buttonPanel.html',
        require:'^^form',
        scope:true,
        link: function(scope, iElement, iAttrs, formCtrl){
            scope.showSend = function(){return formCtrl.$valid;};
            scope.overflow = function(){return (scope.display.length > scope.charLimit)};
            scope.reset = function(){
                scope.model.resetItems();
                formCtrl.$setUntouched();
                formCtrl.$setPristine();
            };
            scope.send = function(){
                scope.model.send().success(function(data, status, headers, config) {
                    if (data.ok) {
                        scope.model.prevpage = config.data;
                        scope.reset();
                        /*
                        if (config.data.ptpage) {
                            alert("If you requested a review of a patient, please ensure that the notes and chart are in the office.");
                        }
                        */
                    }
                });
            };
        }
    };
})
.directive('validLink', ['betterpageModel',function(betterpageModel){
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, iElement, iAttrs, ngModel){
            scope.error = ngModel.$error;
            scope.$watch(function(){return(ngModel.$invalid && ngModel.$touched);},function(bool){
                scope.displayError = bool;
            })
        }
    };
}])
.directive('textInput', ['betterpageTextInputs', function(betterpageTextInputs) {
    return {
        restrict: 'E',
        templateUrl: 'textInput.html',
        scope: true,
        compile: function (tElement, tAttrs) {
            var reference = tAttrs.reference,
            container = tElement.children().eq(0),
            params = betterpageTextInputs[reference];
            if (reference === 'within') {container.attr('ng-show','model.data.reply');}
            container.children().eq(0).children().addClass('glyphicon-' + params.i);
            container.children().eq(1)
            .prop({
                type:(reference === 'within' ? 'number' : 'text'),
                id:reference,
                required:(reference === 'within' || reference === 'details') ? false : true,
                placeholder: params.t,
                })
            .attr(angular.extend({
                name:reference,
                'ng-model':'model.data.' + reference
            },params.a));
            if ('extra' in params) {container.append(angular.element('<span>').addClass('input-group-addon').text(params.extra));}
            return function(scope, iElement, iAttrs){
                scope.title = params.t;
            };
        }
    };
}])
.directive('selectInput', ['betterpageReasons',function(betterpageReasons) {
    var optionStrings = {
        ptpage:'bool as label for (label,bool)',
        why:'reason as reason group by extra.group for (reason,extra)'
    }
    return {
        restrict: 'E',
        templateUrl: 'selectInput.html',
        scope: true,
        compile: function (tElement, tAttrs) {
            var reference = tAttrs.reference,
            element = tElement.children().children().eq(0);
            element.prop({
                id: reference
            })
            .attr({
                name: reference,
                'ng-model':'model.data.'+reference,
                'ng-options': optionStrings[reference] + ' in options'
            });
            if (reference === 'why') {
                element.append(angular.element('<option>').val("").prop('selected',true).text('Reason for page'));
            }
            return function(scope, iElement, iAttrs) {
                switch(iAttrs.reference) {
                    case 'ptpage':
                        scope.options = {
                            "Page about a patient":true,
                            "Page about something else":false
                        };
                        break;
                    case 'why':
                        scope.options = betterpageReasons;
                        break;
                }
            }
        }
    };
}])
.directive('responseRequiredInput', function() {
    return {
        restrict: 'E',
        templateUrl: 'responseRequired.html'
    };
})
.directive('betterpagePreview', function() {
    return {
        restrict: 'E',
        templateUrl: 'preview.html'
    };
})
.directive('betterpageOutcome', ['betterpageCharLimit',function(betterpageCharLimit) {
    return {
        restrict: 'E',
        templateUrl: 'outcome.html'
    };
}])
.directive('betterpageLog',function() {
    return {
        restrict: 'E',
        templateUrl: 'pagelog.html',
        scope: {},
        controller: ['$http', 'betterpageModel',function($http, betterpageModel) {
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
                        LogCtrl.requestHours = angular.copy(LogCtrl.hours);
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
        }],
        controllerAs: 'LogCtrl'
    };
})
.directive('betterpageNo', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attrs, controller) {
            controller.$formatters = [function(value){
                if(value) {return value.join(' ');}
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
                if (angular.isUndefined(modelValue)) {return;}
                for (var i=0;i<modelValue.length;i++) {
                    if (typeof modelValue[i] !== 'number') {return false;}
                }
                return true;
            };
            controller.$validators.pagerNumbers = function(modelValue) {
                if (angular.isUndefined(modelValue)) {return;}
                for (var i=0;i<modelValue.length;i++) {
                    var value = modelValue[i];
                    if (typeof value !== 'number' || value < 20000 || value >= 30000) {return false;}
                }
                return true;
            };
        }
    };
})
.directive('titleCase', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attrs, controller) {
            element.addClass("text-capitalize");
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
            element.addClass("text-uppercase");
            controller.$parsers.push(function(str) {
                return str.toUpperCase();
            });
        }
    };
})
.directive('nhi', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attrs, controller) {
            controller.$validators.nhi = function(modelValue) {
                return controller.$isEmpty(modelValue) || /^[A-Z]{3}[0-9]{4}$/.test(modelValue);
            };
        }
    };
});
