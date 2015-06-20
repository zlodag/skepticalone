angular.module('dcMain')
.controller('dcPreview', ['$scope', 'initFactory', '$modal', function($scope, initFactory, $modal) {
        $scope.animationsEnabled = false;
        $scope.open = function(size) {
            var modalInstance = $modal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'preview.html',
                controller: 'ModalInstanceCtrl',
                size: size,
                resolve: {
                    details: function() {
                        return {
                            date: $scope.$parent.date,
                            user: $scope.$parent.user,
                            patient: $scope.$parent.patient,
                            gp: $scope.$parent.gp,
                            hospital: $scope.$parent.hospital,
                            admission: $scope.$parent.admission,
                            diagnoses: $scope.$parent.diagnoses,
                            presentation: $scope.$parent.presentation,
                            progress: $scope.$parent.progress,
                            plan: $scope.$parent.plan,
                            advice: $scope.$parent.advice,
                            specialAuthority: $scope.$parent.specialAuthority,
                            drugs: initFactory.drugs
                        };
                    }
                }
            });
        };
    }])

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.
.controller('ModalInstanceCtrl', ['$scope', '$modalInstance', 'details', function($scope, $modalInstance, details) {
        $scope.details = details;
        $scope.diagnosisList = [
            ['current','Diagnoses'],
            ['background','Background']
        ];
        $scope.fieldsList = [
            ['presentation','Presentation'],
            ['progress','Inpatient progress'],
            ['plan','Plan']
            //['advice','Advice to patient']
        ];
        $scope.getSig = function() {
                return this.drug.status.short === 'cont' ? this.drug.admission : this.drug.discharge;
            };
        $scope.ok = function() {
            $modalInstance.close();
        };
    }]);
