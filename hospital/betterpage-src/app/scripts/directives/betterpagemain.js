'use strict';

/**
 * @ngdoc directive
 * @name betterpageApp.directive:betterpageMain
 * @description
 * # betterpageMain
 */
angular.module('betterpageApp')
.directive('betterpageMain', function() {
    return {
        restrict: 'E',
        controller: ['$scope','betterpageModel','betterpageServer','betterpageQuiet',function($scope,betterpageModel,betterpageServer,betterpageQuiet){
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
            };
        }]
    };
});
