'use strict';

/**
 * @ngdoc directive
 * @name betterpageApp.directive:nhi
 * @description
 * # nhi
 */
angular.module('betterpageApp')
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
