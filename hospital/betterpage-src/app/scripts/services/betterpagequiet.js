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
    return $resource('http://netpager.waikato.health.govt.nz/cgi-bin/npcgi');
}]);
