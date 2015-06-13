var app = angular.module('medicationsModule', ['ngAnimate', 'ui.bootstrap'])
.directive('dcMedications', function() {
    return {
        restrict: 'A',
        require: '^dcCtrl',
        controller: ['$scope', 'rxFactory', function($scope, rxFactory) {
                $scope.parse = rxFactory;
                $scope.newDrug = function() {
                    $scope.drugs.push({
                        rx: '', 
                        admission: '',
                        discharge: '',
                        mitte: '',
                        status: 'cont',
                        include: true
                    });
                };
                $scope.drugStatusList = [
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
                $scope.drugNames = [
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
            }]
    };
})
.filter('drugsStartingWith', function() {
    return function(items, startswith) {
        var matching_items = [];
        if (items && startswith) {
            for (var i = 0; i < items.length; i++) {
                if (RegExp('^' + startswith, 'i').test(items[i])) {
                    matching_items.push(items[i]);
                }
            }
            return matching_items.sort();
        } 
        else {
            return items;
        }
    }
})
.factory('rxFactory', function() {
    var maps = {
        unit: {
            g: 'gram',
            mg: 'milligram',
            mcg: 'microgram',
            ng: 'nanogram',
            tab: 'tablet',
            cap: 'capsule'
        },
        route: {
            po: 'orally',
            get o(){return this.po;},
            pr: 'rectally',
            pv: 'vaginally',
            subcut: 'subcutaneously',
            get sc(){return this.subcut;},
            im: 'intramuscularly',
            iv: 'intravenously',
            sublingual: 'under the tongue',
            get sl(){return this.sublingual;},
            neb: 'nebulised',
            top: 'to the skin'
        },
        frequency: {
            daily: 'daily',
            get od(){return this.daily;},
            mane: 'in the morning',
            get am(){return this.mane;},
            pm: 'in the afternoon',
            midi: 'at midday',
            nocte: 'at night',
            bd: 'twice a day',
            get bid(){return this.bd;},
            get bds(){return this.bd;},
            tds: 'three times a day',
            get tid(){return this.tds;},
            qid: 'four times a day',
            get qds(){return this.qid;},
            prn: 'as required',
            stat: 'immediately'
        }
    };
    var allmaps = angular.extend({}, maps.route, maps.frequency, maps.unit), 
    timeunits = {
        h: 'hour',
        get '/24'(){return this.h;},
        d: 'day',
        get '/7'(){return this.d;},
        m: 'month',
        get '/12'(){return this.m;}
    };
    return function(str) {
        if (str === undefined)
            return '…';
        var each = str.split(' ');
        var final = [];
        for (var i = 0; i < each.length; i++) {
            final.push(each[i]
            .replace(/(q?)([\d-]+)(\/(?:24|7|12)|h|d|m)(?!\w)/gi, function(match, q, n, u) {
                u = u.toLowerCase();
                var single = (n === "1");
                return (q ? 'every ' : '') + 
                (single ? timeunits[u] : n + ' ' + timeunits[u] + 's');
            })
            .replace(/[\w]+/g, function(match) {
                var stripped = match.replace(/\./g, '').toLowerCase();
                if (allmaps.hasOwnProperty(stripped)) {
                    return allmaps[stripped];
                }
                return match;
            })
            );
        }
        return final.join(' ');
    };
});
