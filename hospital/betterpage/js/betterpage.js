(function() {
    "use strict";
    angular.module('betterpageMain', ['ngMessages'])
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
    .controller('PageController', ['betterpageModel','betterpageStatic','$scope',function(betterpageModel,betterpageStatic,$scope) {
            $scope.model = betterpageModel;
            $scope.static = betterpageStatic;
            $scope.display = '';
            $scope.overflow = false;
            $scope.update = function(){
                var items = $scope.model.itemize();
                $scope.display = items.msg;
                $scope.overflow = (items.msg.length > betterpageStatic.charLimit);
            };
            $scope.prevpage = {
                msg: '',
                bp: null,
                private: null,
                replace: function(data){
                    this.msg = data.msg;
                    this.bp = data.bp;
                    this.private = data.private;
                }
            };
        }])
})();
