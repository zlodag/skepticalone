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
.directive('betterpageLog', ['betterpageModel', function(betterpageModel) {
    return {
        restrict: 'E',
        templateUrl: 'pagelog.html',
        scope: true,
        controller: ['$http','$scope',function($http,$scope) {
            $scope.reset = function() {
                $scope.rows = [];
                $scope.hours = 8;
                $scope.filterText = '';
                $scope.fetched = false;
                $scope.active = false;
                $scope.pending = false;
            };
            $scope.toggle = function(){
                $scope.active = !$scope.active;
                if ($scope.active && !$scope.fetched) {
                    $scope.pending = true;
                    $http.get('pagelog_provider.php',{params:{hours: $scope.hours}}).success(function(rows){
                        $scope.rows = rows;
                        $scope.fetched = true;
                        $scope.pending = false;
                    });
                }
            };
            $scope.buttonText = function (){
                if ($scope.pending){return 'Pending...';}
                if ($scope.active){return 'Hide';}
                else {return 'Show';}
            };
            $scope.copy = function(data) {
                betterpageModel.data = data;
                $scope.active = false;
            };
            $scope.reset();
        }]
    };
}]);