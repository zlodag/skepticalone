'use strict';

/**
 * @ngdoc directive
 * @name betterpageApp.directive:betterpagePreview
 * @description
 * # betterpagePreview
 */
angular.module('betterpageApp')
.directive('betterpagePreview', ['betterpageCharLimit',function(betterpageCharLimit) {
    return {
        restrict: 'E',
        templateUrl: 'views/preview.html',
        scope: true,
        link: function(scope) {
            scope.charLimit = betterpageCharLimit;
        }
    };
}]);
