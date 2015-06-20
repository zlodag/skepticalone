var app = angular.module('dcData', [])
.factory('initFactory', [function initFactory() {
        var dict = {
            now: new Date(),
            gp: {
                name: 'Dr G P Smith',
                address: ['1600 Pennsylvania Avenue', 'Flagstaff', 'Hamilton 3210', 'New Zealand'],
                phone: '07 555 1234',
                fax: '07 432 7654'
            },
            hospital: {
                name: 'Waikato Hospital',
                address: [
                    'Pembroke Street', 
                    'Private Bag 3200', 
                    'Hamilton 3240', 
                    'New Zealand'
                ]
            },
            admission: {
                clinician: 'Blue Team',
                service: 'General Medicine',
                ward: 'A2',
                admission_date: new Date(2015, 4, 23),
                discharge_date: new Date(),
                get los() {
                    var days = Math.floor(moment.duration(this.discharge_date - this.admission_date).asDays());
                    return days === 1 ? '1 day' : days + ' days';
                }
            },
            diagnoses: {
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
                ]},
            presentation: "Came to hospital via ambulance.\nChest crackles heard.\nCT head performed.",
            progress: "Treated for common cold.\nDeveloped acute psychosis.\nSettled with IV fluids.",
            plan: "Started metformin.\nNot to drive for 6 months.\nOncology follow up in 2 years.",
            advice: "Keep well hydrated.\nAvoid fatty foods.",
            drugs: [
                {
                    rx: 'prednisone',
                    admission: '5mg PO mane',
                    discharge: '',
                    mitte: '',
                    status: {
                        label: 'Continued',
                        short: 'cont'
                    },
                    include: false
                }, 
                {
                    rx: 'amoxicillin',
                    admission: '500mg PO TDS',
                    discharge: '',
                    mitte: '',
                    status: {
                        label: 'Stopped',
                        short: 'stop'
                    },
                    include: true
                }, 
                {
                    rx: 'allopurinol',
                    admission: '300mg PO mane',
                    discharge: '600mg PO mane',
                    mitte: '2 weeks',
                    status: {
                        label: 'Changed',
                        short: 'change'
                    },
                    include: true
                }, 
                {
                    rx: 'thyroxine',
                    admission: '',
                    discharge: '50mcg PO mane',
                    mitte: '2 weeks',
                    status: {
                        label: 'New',
                        short: 'new'
                    },
                    include: true
                }
            ],
            specialAuthority: [
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
            ],
            patient: {
                name: {first: 'Eric Arthur',last: 'Blair'},
                address: ['221b Baker Street', 'Fairfield', 'Hamilton 3214', 'New Zealand'],
                phone: '027 999 4321',
                dob: new Date(1957, 1, 10),
                nhi: 'LKJ1234'
            }
        };
        
        
        var duration = moment.duration(dict.now - dict.patient.dob), 
        i = Math.floor(duration.asYears());
        if (i >= 2) {
            dict.patient.age = i + ' years';
        } else {
            i = Math.floor(duration.asMonths());
            if (i >= 3) {
                dict.patient.age = i + ' months';
            } 
            else {
                i = Math.floor(duration.asWeeks());
                if (i >= 2) {
                    dict.patient.age = i + ' weeks';
                } 
                else {
                    i = Math.floor(duration.asDays());
                    if (i === 1) {
                        dict.patient.age = '1 day';
                    } 
                    else {
                        dict.patient.age = i + ' days';
                    }
                }
            }
        }
        var users = {
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
        dict.user = users.doctor;
        return dict;
    }
]);
