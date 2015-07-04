angular.module('betterpageMain')
.directive('betterpageForm', function() {
    return {
        restrict: 'E',
        templateUrl: 'form.html',
        controller: ['$scope', function($scope) {
            $scope.update = function() {
                var items = $scope.model.itemize();
                $scope.display = items.msg;
                $scope.overflow = (items.msg.length > $scope.static.charLimit);
            };
            $scope.reset = function() {
                $scope.model.resetItems();
                $scope.betterform.$setUntouched();
                $scope.betterform.$setPristine();
            };
            $scope.$watchCollection('model.data', $scope.update);
        }]
    };
})
.directive('betterpagePreview', function() {
    return {
        restrict: 'E',
        templateUrl: 'preview.html'
    };
})
.directive('betterpageLog', function() {
    return {
        restrict: 'E',
        templateUrl: 'pagelog.html',
        controller: ['$http','$scope',function($http,$scope) {
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
        }]
    };
})
.directive('copyPage', ['$location', function($location) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.on('click',function(){
                scope.$apply(function() {
                    scope.model.data = scope.page.data;
                    scope.$parent.active = false;
                });
            });
        }
    };
}]);