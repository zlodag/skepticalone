'use strict';

/**
 * @ngdoc directive
 * @name betterpageApp.directive:customInput
 * @description
 * # customInput
 */
angular.module('betterpageApp')
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
                    angular.element('<ng-messages-include>').attr('src','views/errormessages.html')
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
}]);
