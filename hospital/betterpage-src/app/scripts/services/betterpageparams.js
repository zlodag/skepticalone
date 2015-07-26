'use strict';

/**
 * @ngdoc service
 * @name betterpageApp.betterpageParams
 * @description
 * # betterpageParams
 * Factory in the betterpageApp.
 */
angular.module('betterpageApp')
.factory('betterpageParams', ['$location', function betterpageParamsFactory($location) {
        var getParams = $location.search(),
        numbers = [];
        if (angular.isDefined(getParams.no)) {
            angular.forEach(getParams.no.split(';'),function(str){
                if (/^20[0-9]{3}$/.test(str)) {numbers.push(parseInt(str,10));}
            });
        }
        getParams.no = numbers;
        var within = parseInt(getParams.within, 10);
        if (within) {getParams.within = within;} else {delete getParams.within;}
        return getParams;
}]);
