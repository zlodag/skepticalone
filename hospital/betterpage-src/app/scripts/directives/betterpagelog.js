'use strict';

/**
 * @ngdoc directive
 * @name betterpageApp.directive:betterpageLog
 * @description
 * # betterpageLog
 */
angular.module('betterpageApp')
.directive('betterpageLog',function() {
    return {
        restrict: 'E',
        templateUrl: 'views/pagelog.html',
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
});
