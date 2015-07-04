(function() {
    "use strict";
    angular.module('betterpageMain', ['ngMessages','ngRoute'])
    .config(
        ['$compileProvider','$routeProvider', '$locationProvider',
            function ($compileProvider,$routeProvider, $locationProvider) {
                $compileProvider.debugInfoEnabled(false);

                /*
                $locationProvider.html5Mode({
                  enabled: false
                  //requireBase: false
                });
                */
                $routeProvider.when('/', {
                    controller: 'PageController',
                    controllerAs: 'PageCtrl',
                    template: '<betterpage-form></betterpage-form><betterpage-preview></betterpage-preview><betterpage-outcome></betterpage-outcome>',
                    resolve: {
                        model: ['betterpageModel',function(betterpageModel) {return betterpageModel;}]
                    }
                });
                $routeProvider.when('/pagelog', {
                    controller: 'LogController',
                    templateUrl: 'pagelog.html',
                    resolve: {
                      pagelog: ['$http',function($http) {return $http.get('pagelog_provider.php');}]
                    }
                });
            }
        ])
    .controller('PageController', ['model',function(model) {
            this.model = model;
            this.display = '';
            this.overflow = false;
            this.prevpage = {
                msg: '',
                beep: null,
                private: null
            };
        }])
    .controller('LogController', ['$http','$scope','pagelog',function($http,$scope,pagelog) {
            
            $scope.headers = ['Timestamp','To','Message','Caller','Phone','Within (mins)','Patient','NHI','Ward','Bed','Why','Details'];
            $scope.rows = pagelog.data;
            /*
            $http.get('pagelog_provider.php').success(function(rows){
                $scope.rows = rows;
            });
            */
        }]);
})();
