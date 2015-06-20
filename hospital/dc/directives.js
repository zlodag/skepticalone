var app = angular.module('dcDirectives', ['dcData'])
.directive('dcPrescriptions', function() {
    return {
        restrict: 'A',
        link: function(scope) {
            scope.getSig = function() {
                return this.drug.status.short === 'cont' ? this.drug.admission : this.drug.discharge;
            };
        }
    };
})
.directive('dcMedications', ['initFactory',function(initFactory) {
    return {
        restrict: 'A',
        link: function(scope) {
            scope.drugs = initFactory.drugs;
            scope.newDrug = function() {
                scope.drugs.push({
                    rx: '',
                    admission: '',
                    discharge: '',
                    mitte: '',
                    status: {
                        label: 'Continued',
                        short: 'cont'
                    },
                    include: true
                });
            };
            scope.drugStatusList = [
                {
                    label: 'Continued',
                    short: 'cont'
                }, 
                {
                    label: 'Stopped',
                    short: 'stop'
                }, 
                {
                    label: 'Changed',
                    short: 'change'
                }, 
                {
                    label: 'New',
                    short: 'new'
                }, 
            ];
            scope.drugNames = [
                'paracetamol', 
                'aspirin', 
                'amlodipine', 
                'atenolol', 
                'atorvastatin', 
                'azithromycin', 
                'diazepam', 
                'codeine', 
                'amoxicillin', 
                'allopurinol'
            ];
        }
    };
}])
.directive('dcCalendar', function() {
    return {
        restrict: 'A',
        link: function(scope) {
            scope.isOpened = false;
            scope.openCalendar = function($event) {
                $event.preventDefault();
                $event.stopPropagation();
                scope.isOpened = true;
            }
        }
    };
});