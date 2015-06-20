describe('Prescriptions', function() {
    beforeEach(module('dcFilters'));
    beforeEach(inject(function(_$filter_){
        // The injector unwraps the underscores (_) from around the parameter names when matching
        rxFilter = _$filter_('rxFilter');
        validFilter = _$filter_('validFilter');

        drugs = [
                {
                    rx: '',
                    admission: '',
                    discharge: '',
                    mitte: '',
                    status: {
                        label: '',
                        short: ''
                    },
                    include: false
                }
                
            ];
    }));
    it('handles invalid and initial data', function() {
        expect(validFilter()).toEqual([]);
        expect(validFilter('')).toEqual([]);
        expect(validFilter([])).toEqual([]);
        expect(rxFilter(validFilter(drugs))).toEqual([]);
    });
    it('handles requirements for valid prescriptions', function() {
        drugs[0].rx = 'amiodarone';
        drugs[0].admission = '300mg po mane';
        drugs[0].discharge = '100mg po mane';
        drugs[0].mitte = '2 weeks';
        drugs[0].include = true;
        expect(rxFilter(validFilter(drugs))).toEqual([]);
        var drug = drugs[0],
        discerner = function(drug,status,list) {
            drug.status.short = status;
            if (status === "stop") {
                expect(rxFilter(validFilter([drug])).length).toEqual(0);
            } else {
                expect(rxFilter(validFilter([drug])).length).toEqual(1);
            }
            for (var i = 0,p,copy; i < list.length; i++) {
                copy = angular.copy(drug);
                p = list[i];
                switch(p) {
                    case 'rx':
                    case 'admission':
                    case 'discharge':
                    case 'mitte':
                        copy[p] = ''; break;
                    case 'include':
                        copy.include = false; break;
                }
                expect(rxFilter(validFilter([copy])).length).toEqual(0);
            }
        };
        discerner(drug,'change',['rx','admission','discharge','mitte','include']);
        discerner(drug,'new',['rx','discharge','mitte','include']);
        discerner(drug,'cont',['rx','admission','mitte','include']);
        discerner(drug,'stop',[]);
    });
});
