(function() {
    "use strict";
    var app = angular.module('dcsummary', ['ui.bootstrap', 'ui.tree', 'medicationsModule', 'prescriptionsModule']);
    app.controller('dcCtrl', ['$scope', function($scope) {
            $scope.users = {
                doctor: {
                    name: 'John Watson',
                    isPrescriber: true,
                    mcnz: 12345
                },
                nurse: {
                    name: 'Jean Ratched',
                    isPrescriber: false
                },
                physio: {
                    name: 'Bruce Banner',
                    isPrescriber: false
                }
            };
            $scope.currentUser = $scope.users.doctor;
            $scope.date = new Date();
            $scope.patient = {
                name: {first: 'Eric Arthur',last: 'Blair'},
                address: ['221b Baker Street', 'Fairfield', 'Hamilton 3214', 'New Zealand'],
                phone: '027 999 4321',
                dob: new Date(1957, 1, 10),
                nhi: 'LKJ1234'
            };
            var duration = moment.duration(new Date() - $scope.patient.dob), 
            i = Math.floor(duration.asYears());
            if (i >= 2) {
                $scope.patient.age = i + ' years';
            } 
            else {
                i = Math.floor(duration.asMonths());
                if (i >= 3) {
                    $scope.patient.age = i + ' months';
                } 
                else {
                    i = Math.floor(duration.asWeeks());
                    if (i >= 2) {
                        $scope.patient.age = i + ' weeks';
                    } 
                    else {
                        i = Math.floor(duration.asDays());
                        if (i === 1) {
                            $scope.patient.age = '1 day';
                        } 
                        else {
                            $scope.patient.age = i + ' days';
                        }
                    }
                }
            }
            $scope.gp = {
                name: 'Dr G P Smith',
                address: ['1600 Pennsylvania Avenue', 'Flagstaff', 'Hamilton 3210', 'New Zealand'],
                phone: '07 555 1234',
                fax: '07 432 7654'
            };
            $scope.hospital = {
                name: 'Waikato Hospital',
                address: [
                    'Pembroke Street', 
                    'Private Bag 3200', 
                    'Hamilton 3240', 
                    'New Zealand'
                ]
            };
            $scope.admission = {
                clinician: 'Blue Team',
                service: 'General Medicine',
                ward: 'A2',
                admission_date: new Date(2015, 4, 23),
                discharge_date: new Date(),
                los: function() {
                    var days = Math.floor(moment.duration($scope.admission.discharge_date - $scope.admission.admission_date).asDays());
                    return days === 1 ? '1 day' : days + ' days';
                }
            };
            
            $scope.calendar = {
                opened: false,
                options: {
                    formatYear: 'yy',
                    startingDay: 1,
                    showWeeks: 'false',
                    maxMode: 'day'
                }
            };
            $scope.open = function($event) {
                $event.preventDefault();
                $event.stopPropagation();
                
                $scope.calendar.opened = true;
            };
            
            $scope.functions = {
                newItem: function(listname) {
                    $scope.diagnoses[listname].push({str: '',extras: []});
                },
                newSubItem: function(scope) {
                    scope.$modelValue.extras.push({str: ''});
                    scope.expand();
                },
                conditionalRemove: function(scope, minlength) {
                    if (scope.$parentNodesScope.$modelValue.length > minlength) {
                        scope.removeNode();
                    } else {
                        scope.$modelValue.str = '';
                        scope.$modelValue.extras = [];
                    }
                }
            };
            $scope.diagnoses = {
                current: [
                    {
                        str: 'NSTEMI',
                        extras: [
                            {str: 'TIMI 3'}, 
                            {str: 'PCI to RCA'}
                        ]
                    }, 
                    {
                        str: 'AKI',
                        extras: []
                    }, 
                    {
                        str: 'UTI',
                        extras: [
                            {str: 'Multi-resistant E. coli'}
                        ]
                    }
                
                ],
                background: [
                    {
                        str: 'Ischaemic heart disease',
                        extras: [
                            {str: 'STEMI 2007, PCI to LAD'}, 
                            {str: 'NSTEMI 2009'}
                        ]
                    }, 
                    {
                        str: 'Congestive heart failure',
                        extras: [
                            {str: 'LVEF 30% 2009'}
                        ]
                    }, 
                    {
                        str: 'COPD',
                        extras: [
                            {str: 'FEV1 30% predicted 2010'}, 
                            {str: 'Ex-smoker, 80 pack-year smoking history'}
                        ]
                    }, 
                    {
                        str: 'Type 2 diabetes',
                        extras: [
                            {str: 'diet-controlled'}
                        ]
                    }, 
                    {
                        str: 'Chronic kidney disease stage IV',
                        extras: [
                            {str: 'baseline creatinine 150'}
                        ]
                    }, 
                    {
                        str: 'Obstructive sleep apnoea',
                        extras: [
                            {str: 'unable to tolerate BIPAP'}
                        ]
                    }, 
                    {
                        str: 'Dyslipidaemia',
                        extras: []
                    }, 
                    {
                        str: 'Depression',
                        extras: []
                    }, 
                    {
                        str: 'Bilateral total knee joint replacement',
                        extras: []
                    }, 
                    {
                        str: 'Osteoarthritis',
                        extras: []
                    }, 
                    {
                        str: 'Previous septic arthritis L elbow 2003',
                        extras: []
                    }
                ]};
            $scope.presentation = "Came to hospital via ambulance.\nChest crackles heard.\nCT head performed.";
            $scope.progress = "Treated for common cold.\nDeveloped acute psychosis.\nSettled with IV fluids.";
            $scope.plan = "Started metformin.\nNot to drive for 6 months.\nOncology follow up in 2 years.";
            $scope.advice = "Keep well hydrated.\nAvoid fatty foods.";
            $scope.drugs = [
                {
                    rx: 'prednisone',
                    admission: '5mg PO mane',
                    discharge: '',
                    mitte: '',
                    status: 'cont',
                    include: false
                }, 
                {
                    rx: 'amoxicillin',
                    admission: '500mg PO TDS',
                    discharge: '',
                    mitte: '',
                    status: 'stop',
                    include: true
                }, 
                {
                    rx: 'allopurinol',
                    admission: '300mg PO mane',
                    discharge: '600mg PO mane',
                    mitte: '2 weeks',
                    status: 'change',
                    include: true
                }, 
                {
                    rx: 'thyroxine',
                    admission: '',
                    discharge: '50mcg PO mane',
                    mitte: '2 weeks',
                    status: 'new',
                    include: true
                }
            ];
            $scope.specialAuthority = [
                {
                    name: 'Ticagrelor',
                    number: 123456789,
                    expiry: 'June 2015'
                }, 
                {
                    name: 'Enoxaparin',
                    number: 759472542,
                    expiry: 'May 2017'
                }, 
                {
                    name: 'peg-GCSF',
                    number: 649845623,
                    expiry: 'Lifetime'
                }
            ];
        }]);
})();
