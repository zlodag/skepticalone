angular.module('betterpageMain')
.directive('betterpageMain', function() {
    return {
        restrict: 'A',
        controller: ['betterpageModel','betterpageCharLimit',function(betterpageModel,betterpageCharLimit) {
            var PageCtrl = this;
            PageCtrl.model = betterpageModel;
            PageCtrl.display = '';
            PageCtrl.charLimit = betterpageCharLimit;
            PageCtrl.update = function(){
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
        controller: ['$scope', 'betterpageChoices','betterpageReasons', function($scope, betterpageChoices, betterpageReasons) {
            var FormCtrl = this;
            FormCtrl.choices = betterpageChoices;
            FormCtrl.reasons = betterpageReasons;
            FormCtrl.reset = function(){
                $scope.PageCtrl.model.resetItems();
                $scope.betterform.$setUntouched();
                $scope.betterform.$setPristine();
            };
            FormCtrl.send = function(){
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
.directive('formInput', function() {
    var data = {
                no: {t: 'Pager', e: '<input required betterpage-no />'},
                caller: {t: 'Name', e: '<input title-case ng-minlength="2" required />'},
                phone: {t: 'Phone', e: '<input ng-pattern="/^[0-9]+$/" required />'},
                reply: {t: 'Response required?', e: '<input type="checkbox" />'},
                within: {t: 'within', e: '<input type="number" ng-required="data.reply" min="1" max="99" ng-pattern="/^[0-9]+$/" />'},
                patient: {t: 'Name', e: '<input title-case ng-minlength="2" required />'},
                nhi: {t: 'NHI', e: '<input upper-case ng-pattern="/^[A-Z]{3}[0-9]{4}$/" required />'},
                ward: {t: 'Ward', e: '<input upper-case ng-maxlength="3" required />'},
                bed: {t: 'Bed', e: '<input upper-case ng-maxlength="3" required />'},
                why: {e: '<select ng-options="reason as reason group by extra.group for (reason,extra) in reasons" required><option value="" selected>Reason for page</option></select>'},
                details: {e: '<input placeholder="Specify (optional)" />'},
                contents: {e: '<textarea required></textarea>'},
                'private': {t: 'Do not log this page', e: '<input type="checkbox"/>'}
            };
    return {
        restrict: 'E',
        templateUrl: 'forminput.html',
        require: ['^^betterpageMain','^^betterpageForm'],
        scope: {reference:'@'},
        compile: function compile(tElement, tAttrs) {
            var target = tElement.children().children().eq(1),
            reference = tAttrs.reference,
            params = data[reference],
            target.append(
                angular.element(params.e)
                .prop('id',reference)
                .attr({
                    name:reference,
                    'class': 'form-control',
                    'ng-model':'data[reference]'
                })
                .append(params.c)
            );
            return function(scope, element, attrs, controllers) {
                scope.data = controller[0].model.data;
                scope.reasons = controller[1].reasons;
                scope.formItem = element.children().children().eq(1).children().controller('ngModel');
                scope.width = angular.isDefined(attrs.half) ? 1/2 : 1;
                scope.title = data[attrs.reference].t;
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
            }
            controller.$validators.pagerNumbers = function(modelValue) {
                if (angular.isUndefined(modelValue)) {return;}
                for (var i=0;i<modelValue.length;i++) {
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
