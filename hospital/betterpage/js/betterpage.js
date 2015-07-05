/**
 * @license BetterPage v1.0.0
 * (c) 2015 Edward Ganly & Thomas Wong
 * 
 */
(function() {
    "use strict";
    angular.module('betterpageMain', ['ngMessages'])
    .config(
        ['$compileProvider', '$locationProvider',
            function ($compileProvider, $locationProvider) {
                $compileProvider.debugInfoEnabled(false);
                $locationProvider.html5Mode({
                  enabled: true,
                  requireBase: false
                });
            }
        ])
})();