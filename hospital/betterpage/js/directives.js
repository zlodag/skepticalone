angular.module('betterpage')
.controller('betterpageController',['$scope','betterpageModel','betterpageServer','betterpageQuiet',function($scope,betterpageModel,betterpageServer,betterpageQuiet){
    $scope.model = betterpageModel;
    $scope.$watchCollection('model.data',function(){
        $scope.model.generateMsg();
    });
    $scope.reset = function(){
        $scope.model.resetItems();
        $scope.form.$setUntouched();
        $scope.form.$setPristine();
    };
    $scope.send = function(){
        var items = $scope.model.itemize();
        betterpageServer.save(items, function(prevpage) {
            $scope.model.prevpage = prevpage;
            $scope.reset();
        });
        //This might fail due to CORS
        betterpageQuiet.get({bp:items.bp,no:items.no.join(';'),msg:items.msg});
        //Workaround with an intrusive popup:
        if (confirm('Attempt to send this page via the intranet?')) {
            var pageurl = 'http://10.134.0.150/cgi-bin/npcgi',
            popup = window.open(pageurl + '?bp=' + items.bp + '&no=' + encodeURIComponent(items.no.join(';')) + '&msg=' + encodeURIComponent(items.msg), '_blank');
            if (!popup) {alert('Please allow popups for this function to succeed');}
        }
    };
}])
.directive('betterpageForm', function() {
    return {
        restrict: 'E',
        templateUrl: 'form.html'
    };
})
.directive('buttonPanel', ['betterpageCharLimit',function(betterpageCharLimit){
    return {
        restrict: 'E',
        templateUrl: 'buttonPanel.html',
        scope:true,
        link: function(scope, iElement, iAttrs){
            scope.showSend = function(){return scope.form.$valid;};
            scope.overflow = function(){return (scope.model.msg.length > betterpageCharLimit)};
        }
    };
}])
.directive('customInput', ['betterpageCustomInputs','betterpageReasons', function(betterpageCustomInputs,betterpageReasons) {
    return {
        restrict: 'E',
        scope: true,
        compile: function (tElement, tAttrs) {
            var reference = tAttrs.reference,
            params = betterpageCustomInputs[reference],
            container, input;
            tElement.addClass('form-group');
            switch(params.type) {
                case 'text':
                    container = angular.element('<div>');
                    tElement.append(container);
                    container.addClass('input-group').append(
                        angular.element('<span>').addClass('input-group-addon').append(
                            angular.element('<span>').addClass('glyphicon glyphicon-' + params.icon)
                        )
                    );
                    if (reference === 'respond') {
                        container.addClass('btn-group');
                        input = '<button type="button" class="btn btn-block btn-default" ng-class="{active: model.data.reply}" ng-click="model.data.reply = !model.data.reply">Response required?</button>';
                    } else {
                        input = angular.element('<input>')
                        .prop({
                            type:'text',
                            placeholder: params.title,
                            })
                        .attr(params.attr);
                    }
                    break;
                case 'select':
                    container = tElement;
                    var optionStrings = {
                        ptpage:'bool as label for (label,bool)',
                        why:'reason as reason group by extra.group for (reason,extra)'
                    };
                    input = angular.element('<select>').attr('ng-options',optionStrings[reference] + ' in options');
                    if (reference === 'why') {
                        input.append('<option value="" selected>Reason for page</option>');
                    }
                    break;
            }
            container.append(input);
            if (reference === 'within') {
                input.prop('type','number');
                container
                    .attr('ng-show','model.data.reply')
                    .append('<span class="input-group-addon">minutes</span>');
            }
            if (reference !== 'respond') {
                input.prop({
                    id:reference,
                    required:(reference === 'within' || reference === 'details') ? false : true,
                })
                .attr({
                    name:reference,
                    'ng-model':'model.data.' + reference,
                    'class':'form-control'
                });
                var messages = angular.element('<ng-messages>').attr({for:'error','ng-show':'hasError'}).append(
                    angular.element('<ng-messages-include>').attr('src','errorMessages.html')
                );
                tElement.append(messages);
                return function(scope, iElement, iAttrs){
                    var reference = iAttrs.reference,
                    formRef = scope.form[reference];
                    scope.title = params.title;
                    scope.error = formRef.$error;
                    scope.reference = reference;
                    scope.$watch(function(){
                        return(formRef.$invalid && formRef.$touched);
                    },function(bool){
                        scope.hasError = bool;
                        if (bool) {iAttrs.$addClass('has-error');}
                        else {iAttrs.$removeClass('has-error');}
                    });
                    switch(reference) {
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
                };
            }
        }
    };
}])
.directive('betterpagePreview', ['betterpageCharLimit',function(betterpageCharLimit) {
    return {
        restrict: 'E',
        templateUrl: 'preview.html',
        scope: true,
        link: function(scope) {
            scope.charLimit = betterpageCharLimit;
        }
    };
}])
.directive('betterpageOutcome', function() {
    return {
        restrict: 'E',
        templateUrl: 'outcome.html'
    };
})
.directive('betterpageLog',function() {
    return {
        restrict: 'E',
        templateUrl: 'pagelog.html',
        scope: {},
        controller: ['betterpageModel','betterpageServer',function(betterpageModel,betterpageServer) {
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
                LogCtrl.timestamp = new Date();
                LogCtrl.requestHours = angular.copy(LogCtrl.hours);
                LogCtrl.active = true;
                LogCtrl.pending = true;
                betterpageServer.query({hours: LogCtrl.hours},function(rows){
                    LogCtrl.rows = rows;
                    LogCtrl.pending = false;
                    LogCtrl.fetched = true;
                });
            };
            LogCtrl.toggle = function() {
                LogCtrl.active = !LogCtrl.active;
                if (LogCtrl.active && !LogCtrl.fetched) {
                    LogCtrl.refresh();
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
                    if (typeof value !== 'number' || value < 20000 || value >= 21000) {return false;}
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
