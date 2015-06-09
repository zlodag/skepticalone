var app = angular.module('calculator', []);
app.factory('friendlyRx', function () {
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
            subcut: 'subcutaneous',
            im: 'intramuscular',
            iv: 'intravenous',
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
        sc: maps.route.subcut
    });
    angular.extend(maps.frequency, {
        od: maps.frequency.daily,
        bid: maps.frequency.bd,
        tid: maps.frequency.tds,
        qds: maps.frequency.qid
    });
    return function (str) {
        var strings = str.split(' ');
        var full = {
            amount: strings.shift(),
            unit: null,
            route: null,
            frequency: strings.pop(),
            prn: false
        };
        
        var endsWithPRN = full.frequency && full.frequency.match(/^(.*?).?prn$/i);
        if (endsWithPRN) {
            full.prn = true;
            full.frequency = endsWithPRN[1] || strings.pop();
        }

        if (full.amount.match(/^[0-9\.]+$/)) {
            full.unit = strings.shift();
        } else {
            var n = full.amount.match(/^([0-9\.]+)(.+)$/);
            if (n) {
                full.amount = n[1];
                full.unit = n[2];
            }
        }
        full.route = strings.join(' ');

        for (var key in full) {
            if (full[key]) {
                var string = full[key].toLowerCase(),
                    suffix = '';
                if (key === "unit" && string.slice(-1) === 's') {
                    string = string.slice(0,-1); suffix = 's';
                }
                if (key != "amount" && string in maps[key]) {
                    full[key] = maps[key][string] + suffix;
                }
            }
        }
        return {
            str: [full.amount, full.unit, full.route, full.frequency].join(' '),
            full: full
        };
    };
});
app.controller('drugCtrl', ['$scope', 'friendlyRx', function ($scope, friendlyRx) {
    $scope.str = '1g po qid';
    $scope.parsed = function () {
        return friendlyRx($scope.str);
    };
}]);
