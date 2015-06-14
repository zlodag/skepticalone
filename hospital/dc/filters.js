var app = angular.module('dcFilters', [])
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
.filter('friendlyRx', function() {
    var maps = {
        unit: {
            u: 'unit',
            g: 'gram',
            mg: 'milligram',
            mcg: 'microgram',
            ng: 'nanogram',
            l: 'litre',
            ml: 'mL',
            ul: 'microlitre',
            tab: 'tablet',
            cap: 'capsule'
        },
        route: {
            po: 'orally',
            get o() {
                return this.po;
            },
            pr: 'rectally',
            pv: 'vaginally',
            subcut: 'subcutaneously',
            get sc() {
                return this.subcut;
            },
            im: 'intramuscularly',
            iv: 'intravenously',
            sublingual: 'under the tongue',
            get sl() {
                return this.sublingual;
            },
            neb: 'nebulised',
            top: 'to the skin'
        },
        frequency: {
            daily: 'daily',
            get od() {
                return this.daily;
            },
            mane: 'in the morning',
            get am() {
                return this.mane;
            },
            pm: 'in the afternoon',
            midi: 'at midday',
            nocte: 'at night',
            bd: 'twice a day',
            get bid() {
                return this.bd;
            },
            get bds() {
                return this.bd;
            },
            tds: 'three times a day',
            get tid() {
                return this.tds;
            },
            qid: 'four times a day',
            get qds() {
                return this.qid;
            },
            prn: 'as required',
            stat: 'immediately'
        },
        terms: {
            max: 'maximum',
            min: 'minimum'
        }
    };
    var allmaps = angular.extend({}, maps.route, maps.frequency, maps.unit, maps.terms), 
    timeunits = {
        h: 'hour',
        get '/24'() {
            return this.h;
        },
        d: 'day',
        get '/7'() {
            return this.d;
        },
        m: 'month',
        get '/12'() {
            return this.m;
        }
    };
    return function(str) {
        if (!str)
            return '…';
        var each = str.split(' ');
        var final = [];
        for (var i = 0; i < each.length; i++) {
            final.push(each[i]
            .replace(/(q?)([\d-]+)(h|d|m|\/(?:24|7|12)(?!\/\d))?(?!\w)/gi, function(match, q, n, u) {
                var single = true;
                if (u) {
                    u = u.toLowerCase();
                }
                if (single && n !== "1") {
                    single = false;
                }
                validunit = timeunits.hasOwnProperty(u), 
                arr = [];
                if (q) {
                    arr.push('every');
                }
                if (n) {
                    arr.push(n);
                }
                if (validunit) {
                    arr.push(timeunits[u] + (single ? '' : 's'));
                }
                return arr.join(' ');
            })
            .replace(/([\d-]*)([a-zA-Z\.]+)/g, function(match, n, w, s) {
                var stripped = w.replace(/\./g, '').toLowerCase();
                if (allmaps.hasOwnProperty(stripped)) {
                    var p = allmaps[stripped], 
                    single = true;
                } else if (stripped.substr(-1) === "s" && allmaps.hasOwnProperty(stripped.slice(0, -1))) {
                    var p = allmaps[stripped.slice(0, -1)], 
                    single = false;
                } else {
                    return match;
                }
                var str = '';
                if (n) {
                    if (single && n !== '1') {
                        single = false;
                    }
                    str += n + ' ';
                }
                if (single && s === 's') {
                    single = false;
                }
                str += p + (single ? '' : 's');
                return str;
            })
            );
        }
        return final.join(' ');
    };
})
.filter('rxFilter', function() {
    return function(items) {
        if (!Array.isArray(items)) {
            return [];
        }
        var matching_items = [];
        for (var i = 0; i < items.length; i++) {
            var drug = items[i];
            if (drug.rx && drug.include && drug.mitte && (
            (drug.status === 'cont' && drug.admission) || 
            (drug.status === 'new' && drug.discharge) || 
            (drug.status === 'change' && drug.admission && drug.discharge)
            )) {
                matching_items.push(drug);
            }
        }
        return matching_items;
    };
});