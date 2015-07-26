'use strict';

/**
 * @ngdoc directive
 * @name betterpageApp.directive:buttonPanel
 * @description
 * # buttonPanel
 */
angular.module('betterpageApp')
.directive('buttonPanel', ['betterpageCharLimit',function(betterpageCharLimit){
    return {
        restrict: 'E',
        templateUrl: 'views/buttonpanel.html',
        scope:true,
        link: function(scope){
            scope.showSend = function(){return scope.form.$valid;};
            scope.overflow = function(){return (scope.model.msg.length > betterpageCharLimit);};
        }
    };
}]);
