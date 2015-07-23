/**
 * @license BetterPage v1.1.0
 * (c) 2015 Edward Ganly & Thomas Wong
 * 
 */
(function() {
    "use strict";
    angular.module('betterpage', ['ngResource','ngMessages'])
    .config(
        ['$compileProvider', '$locationProvider',
            function ($compileProvider, $locationProvider) {
                $compileProvider.debugInfoEnabled(true);
                $locationProvider.html5Mode({
                  enabled: true,
                  requireBase: false
                });
            }
        ])
})();