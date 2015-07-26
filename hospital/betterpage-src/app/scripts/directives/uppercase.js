'use strict';

/**
 * @ngdoc directive
 * @name betterpageApp.directive:upperCase
 * @description
 * # upperCase
 */
angular.module('betterpageApp')
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
