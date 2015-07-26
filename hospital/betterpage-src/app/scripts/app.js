'use strict';

/**
 * @name BetterPage
 * @version 1.1.1
 * @license (c) 2015 Edward Ganly & Thomas Wong
 * # betterpageApp
 *
 * Main module of the application.
 */
angular.module('betterpageApp', [
    'ngMessages',
    'ngResource'
  ])
.config(
['$compileProvider', '$locationProvider',
    function ($compileProvider, $locationProvider) {
	$compileProvider.debugInfoEnabled(false);
	$locationProvider.html5Mode({
	  enabled: true,
	  requireBase: false
	});
    }
]);
