describe('Validate controller', function() {
    beforeEach(module('betterpageMain'));

    beforeEach(inject(function(_$filter_){
        betterpageGenerator = _$filter_('betterpageGenerator');
    }));

    describe('Betterpage message generator', function() {
        it('generates an appropriate page message', function() {
            var data = {
                ptpage : false,
                caller: 'Janey Spriggs',
                phone: '0279876543',
                patient: 'Sprocket the Rocket',
                nhi : 'ABC1234',
                ward: 'A4',
                bed: '14',
                reply : true,
                within : 5,
                why: {label: "Regular Meds",beep: 3,group: "Medication"},
                details: 'Can you please chart morphine?',
                contents : 'Please get back to me urgently...'
            };
            expect(betterpageGenerator(data)).toEqual('Please get back to me urgently...');
            data.ptpage = true;
            expect(betterpageGenerator(data)).toEqual('0279876543<5m(Janey Spriggs) ABC1234(Sprocket the Rocket)[A4-14] Regular Meds (Can you please chart morphine?)');
        });
    });
});
