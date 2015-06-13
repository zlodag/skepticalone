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
            pr: 'rectally',
            pv: 'vaginally',
            subcut: 'subcutaneously',
            im: 'intramuscularly',
            iv: 'intravenously',
            sublingual: 'under the tongue',
        },
        frequency: {
            daily: 'daily',
            mane: 'in the morning',
            
            nocte: 'at night',
            bd: 'two times a day',
            tds: 'three times a day',
            qid: 'four times a day',
            prn: 'as required'
        }
    };
    angular.extend(maps.route, {
        o: maps.route.po,
        sc: maps.route.subcut,
        sl: maps.route.sublingual
    });
    angular.extend(maps.frequency, {
        od: maps.frequency.daily,
        bid: maps.frequency.bd,
        bds: maps.frequency.bd,
        tid: maps.frequency.tds,
        qds: maps.frequency.qid
    });
    var allmaps = angular.extend({}, maps.route, maps.frequency, maps.unit), 
    timeunits = {h: 'hour',d: 'day',m: 'month'};
    angular.extend(timeunits, {
        '/24': timeunits.h,
        '/7': timeunits.d,
        '/12': timeunits.m
    });
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
            .replace(/[^\/]+/g, function(match) {
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
