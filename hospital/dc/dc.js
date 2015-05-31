(function() {
    "use strict";
    var app = angular.module('dcsummary', ['ui.tree']);
    app.controller('prefill', ['$scope', function($scope) {
        $scope.patient = {
            name : {first: 'Eric Arthur', last: 'Blair'},
            address : ['221b Baker Street', 'Bader', 'Hamilton'],
            dob : '31/04/1956',
            nhi : 'LKJ1234'
        };
        $scope.admission = {
            clinician : 'Blue Team',
            service : 'General Medicine',
            Ward : 'A2',
            admission_date : new Date(2015,5,23),
            discharge_date : new Date()
        };
        $scope.hospital = {
            name: 'Waikato Hospital',
            address : ['Pembroke Street', 'Hamilton']
        };
    }]);
    app.controller('body', ['$scope', function($scope) {
        $scope.diagnoses = [{str:'',extras:[]}];
        $scope.newSubItem = function(scope) {
            scope.$modelValue.extras.push({str: ''});
            scope.expand();
        };
        $scope.newItem = function() {
            $scope.diagnoses.push({str: '',extras:[]});
        };
        $scope.conditionalRemove = function(scope) {
            if ($scope.diagnoses.length > 1) {
                scope.remove();
            } else {
                $scope.diagnoses = [{str:'',extras:[]}];
            }
        };

    }]);
})();
