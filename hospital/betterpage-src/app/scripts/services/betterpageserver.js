'use strict';

/**
 * @ngdoc service
 * @name betterpageApp.betterpageServer
 * @description
 * # betterpageServer
 * Factory in the betterpageApp.
 */
angular.module('betterpageApp')
.factory('betterpageServer', ['$resource', function($resource){
    return $resource('server.php');
}]);
