angular.module('betterpageMain')
.directive('betterpageMain', function() {
    return {
        restrict: 'A',
        require:'betterpageMain',
        link: function(scope, element, attrs, controller) {
            scope.$watchCollection(function(){return controller.model.data;}, function(){
                var items = controller.model.itemize();
                controller.display = items.msg;
                controller.overflow = (items.msg.length > controller.charLimit);
            });
        },
        controller: ['betterpageModel','betterpageCharLimit',function(betterpageModel,betterpageCharLimit) {
            this.model = betterpageModel;
            this.display = '';
            this.charLimit = betterpageCharLimit;
            this.prevpage = {
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
        templateUrl: 'form.html'
    };
})
.directive('buttonPanel', function(){
    return {
        restrict: 'E',
        templateUrl: 'buttonPanel.html',
        require: ['^^form','^^betterpageMain'],
        link: function(scope, iElement, iAttrs, controllers){
            var Form = controllers[0], PageCtrl = controllers[1];
            scope.reset = function(){
                PageCtrl.model.resetItems();
                //Form.$setUntouched();
                //Form.$setPristine();
            };
            scope.send = function(){
                PageCtrl.model.send().success(function(data, status, headers, config) {
                    if (data.ok) {
                        PageCtrl.prevpage = config.data;
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
        require: ['ngModel','^^betterpageMain'],
        link: function(scope, iElement, iAttrs, controllers){
            scope.$watch(function(){
                return (controllers[0].$invalid && controllers[0].$touched);
            },function(bool){
                scope.displayError = bool;
            })
            scope.data = controllers[1].model.data;
        }
    };
}])
.directive('textInput', ['betterpageTextInputs', function(betterpageTextInputs) {
    return {
        restrict: 'E',
        templateUrl: 'textInput.html',
        scope: {reference:'@'},
        compile: function compile(tElement, tAttrs) {
            var reference = tAttrs.reference,
            container = tElement.children().eq(0),
            params = betterpageTextInputs[reference],
            element = container.children().eq(0);
            if (reference === 'within') {
                container.attr('ng-show','data.reply');
            }
            element.prop({
                type:(reference === 'within' ? 'number' : 'text'),
                id:reference,
                required:(reference === 'within' || reference === 'details') ? false : true,
                placeholder: params.t,
                })
            .attr(angular.extend({
                name:reference,
                'ng-model':'data.' + reference
            },params.a));
            container.prepend(
                angular.element('<span>').addClass('input-group-addon').append(
                    angular.element('<span>').addClass('glyphicon glyphicon-' + params.i)
                )
            );
            if ('extra' in params) {
                container.append(
                    angular.element('<span>').addClass('input-group-addon').text(params.extra)
                );
            }
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
        scope: {reference:'@'},
        compile: function compile(tElement, tAttrs) {
            var reference = tAttrs.reference,
            element = tElement.children().children().eq(0);
            element.prop({
                id: reference
            })
            .attr({
                name: reference,
                'ng-model':'data.'+reference,
                'ng-options': optionStrings[reference] + ' in options'
            });
            if (reference === 'why') {
                element.append(angular.element('<option>').val("").prop('selected',true).text('Reason for page'));
            }
            return function(scope, iElement, iAttrs, controllers) {
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
        templateUrl: 'responseRequired.html',
        require: '^^betterpageMain',
        scope:{},
        link: function(scope, iElement, iAttrs, controller){
            scope.data = controller.model.data;
            iElement.find('button').on('click', function(){
                scope.$apply(function(){
                    scope.data.reply = !scope.data.reply;
                });
            });
        }
    };
})
.directive('formInput', function() {
    return {
        restrict: 'E',
        templateUrl: 'forminput.html',
        require: ['^^betterpageMain','^^betterpageForm'],
        scope: {reference:'@',width:'='},
        compile: function compile(tElement, tAttrs) {
            var target = tElement.children().eq(0),
            reference = tAttrs.reference,
            params = data[reference];
            return function(scope, element, attrs, controllers) {
                scope.data = controllers[0].model.data;
                scope.reasons = controllers[1].reasons;
                scope.choices = controllers[1].choices;
                scope.formItem = element.children().children().eq(1).controller('ngModel');
                scope.title = data[attrs.reference].t;
                scope.icon = data[attrs.reference].i;
            };
        }
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
        controller: ['$http', 'betterpageModel','betterpageHeaders',function($http, betterpageModel, betterpageHeaders) {
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
            controller.$formatters = [function(value){
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
});
