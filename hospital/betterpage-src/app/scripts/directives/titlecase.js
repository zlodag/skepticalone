'use strict';

/**
 * @ngdoc directive
 * @name betterpageApp.directive:titleCase
 * @description
 * # titleCase
 */
angular.module('betterpageApp')
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
});
