describe('Medications', function() {
    beforeEach(module('medicationsModule'));
    beforeEach(inject(function(_$filter_){
        // The injector unwraps the underscores (_) from around the parameter names when matching
        friendlyRx = _$filter_('friendlyRx');
    }));
    it('handles invalid input', function() {
        expect(friendlyRx('')).toEqual('…');
        expect(friendlyRx(undefined)).toEqual('…');
        expect(friendlyRx()).toEqual('…');
    });
    it('handles "q-expressions"', function() {
        expect(friendlyRx('q8h')).toEqual('every 8 hours');
        expect(friendlyRx('q8/24')).toEqual('every 8 hours');
        expect(friendlyRx('q8')).toEqual('every 8');
        expect(friendlyRx('q1-2/24')).toEqual('every 1-2 hours');
        expect(friendlyRx('q1-2/24/prn')).toEqual('every 1-2 hours/as required');
        expect(friendlyRx('q1.5h')).toEqual('every 1.5 hours');   
    });
    it('handles alternative abbreviations', function() {
        expect(friendlyRx('sc')).toEqual('subcutaneously');
    });
    it('handles singulars', function() {
        expect(friendlyRx('1 tab')).toEqual('1 tablet');
        expect(friendlyRx('1mg')).toEqual('1 milligram');
    });
    it('handles plurals', function() {
        expect(friendlyRx('3 caps')).toEqual('3 capsules');
        expect(friendlyRx('5tabs')).toEqual('5 tablets');
        expect(friendlyRx('2L')).toEqual('2 litres');
    });
    it('handles punctuation in doses', function() {
        expect(friendlyRx('8-10mg')).toEqual('8-10 milligrams');
        expect(friendlyRx('147.5mg')).toEqual('147.5 milligrams');
    });
    it('ignores dots in phrases', function() {
        expect(friendlyRx('p.r.n.')).toEqual('as required');
    });
    it('ignores dates', function() {
        expect(friendlyRx('until 6/12/15')).toEqual('until 6/12/15');
    });
    it('handles "1mg PO Q.I.D./PRN"', function() {
        expect(friendlyRx('1mg PO Q.I.D./PRN')).toEqual('1 milligram orally four times a day/as required');
    });
    it('handles "1mg PO q4H/PRN"', function() {
        expect(friendlyRx('1mg PO q4H/PRN')).toEqual('1 milligram orally every 4 hours/as required');
    });
});
