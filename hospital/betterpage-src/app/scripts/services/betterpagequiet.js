'use strict';

/**
 * @ngdoc service
 * @name betterpageApp.betterpageQuiet
 * @description
 * # betterpageQuiet
 * Factory in the betterpageApp.
 */
angular.module('betterpageApp')
.factory('betterpageQuiet', ['$resource', function($resource){
    return $resource('http://10.134.0.150/cgi-bin/npcgi');
}]);
