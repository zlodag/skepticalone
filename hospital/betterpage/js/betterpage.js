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
    .controller('PageController', ['betterpageModel','betterpageStatic','$scope',function(betterpageModel,betterpageStatic,$scope) {
            $scope.model = betterpageModel;
            $scope.static = betterpageStatic;
            $scope.display = '';
            $scope.overflow = false;
            $scope.prevpage = {
                msg: '',
                beep: null,
                private: null
            };
        }])
})();
