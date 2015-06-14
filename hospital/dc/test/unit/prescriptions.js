describe('Prescriptions', function() {
    beforeEach(module('dcFilters'));
    beforeEach(inject(function(_$filter_){
        // The injector unwraps the underscores (_) from around the parameter names when matching
        rxFilter = _$filter_('rxFilter');
        drugs = [
            {
                rx: '',
                admission: '',
                discharge: '',
                mitte: '',
                status: '',
                include: false
            },
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
                mitte: '',
                status: 'change',
                include: true
            }, 
            {
                rx: 'thyroxine',
                admission: '',
                discharge: '',
                mitte: '2 weeks',
                status: 'new',
                include: true
            }
        ];
    }));
    it('handles invalid and initial data', function() {
        expect(rxFilter()).toEqual([]);
        expect(rxFilter('')).toEqual([]);
        expect(rxFilter([])).toEqual([]);
        expect(rxFilter(drugs)).toEqual([]);
    });
    it('handles requirements for valid prescriptions', function() {
        drugs[0].rx = 'amiodarone';
        drugs[0].admission = '300mg po mane';
        drugs[0].discharge = '100mg po mane';
        drugs[0].mitte = '2 weeks';
        drugs[0].include = true;
        expect(rxFilter(drugs).length).toEqual(0);
        var drug = drugs[0],
        discerner = function(drug,status,list) {
            drug.status = status;
            if (status === "stop") {
                expect(rxFilter([drug]).length).toEqual(0);
            } else {
                expect(rxFilter([drug]).length).toEqual(1);
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
                expect(rxFilter([copy]).length).toEqual(0);
            }
        };
        discerner(drug,'change',['rx','admission','discharge','mitte','include']);
        discerner(drug,'new',['rx','discharge','mitte','include']);
        discerner(drug,'cont',['rx','admission','mitte','include']);
        discerner(drug,'stop',[]);
    });
});
