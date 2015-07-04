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
    .controller('PageController', ['betterpageModel','$scope',function(betterpageModel,$scope) {
            $scope.model = betterpageModel;
            $scope.display = '';
            $scope.overflow = false;
            $scope.prevpage = {
                msg: '',
                beep: null,
                private: null
            };
        }])
    .controller('LogController', ['$http','$scope',function($http,$scope,pagelog) {
            
            $scope.headers = ['Timestamp','To','Message','Caller','Phone','Within (mins)','Patient','NHI','Ward','Bed','Why','Details'];
            $scope.rows = [];
            $scope.fetched = false;
            $scope.active = false;
            $scope.toggle = function(){
                $scope.active = !$scope.active;
                if ($scope.active && !$scope.fetched) {
                    $http.get('pagelog_provider.php').success(function(rows){
                        $scope.rows = rows;
                        $scope.fetched = true;
                    });
                }
            };
        }]);
})();
