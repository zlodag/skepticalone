'use strict';

/**
 * @ngdoc directive
 * @name betterpageApp.directive:betterpageForm
 * @description
 * # betterpageForm
 */
angular.module('betterpageApp')
.directive('betterpageForm', function() {
    return {
        restrict: 'E',
        templateUrl: 'views/form.html'
    };
});
