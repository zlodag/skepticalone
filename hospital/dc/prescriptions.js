var app = angular.module('prescriptionsModule', [])
.directive('dcPrescriptions', function() {
    return {
        restrict: 'A',
        require: '^dcCtrl',
        controller: ['$scope',function($scope) {
            $scope.getSig = function(drug) {
                return drug.status === 'cont' ? drug.admission : drug.discharge;
            };
        }]
    };
})
.filter('rxFilter', function() {
    return function(items) {
        var matching_items = [];
        for (var i = 0; i < items.length; i++) {
            var drug = items[i];
            if (
            !drug.include ||
            !drug.mitte ||
            !drug.rx ||
            drug.status === 'stop' ||
            (drug.status === 'cont' && !drug.admission) ||
            (drug.status === 'change' && (!drug.admission || !drug.discharge)) ||
            (drug.status === 'new' && !drug.discharge)) {
                continue;
            }
            matching_items.push(drug);
        }
        return matching_items;
    };
});
