'use strict';

/**
 * @ngdoc directive
 * @name betterpageApp.directive:betterpageOutcome
 * @description
 * # betterpageOutcome
 */
angular.module('betterpageApp')
.directive('betterpageOutcome', function() {
    return {
        restrict: 'E',
        templateUrl: 'views/outcome.html'
    };
});
