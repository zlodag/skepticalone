'use strict';

describe('Service: betterpageModel', function () {

  // load the service's module
  beforeEach(module('betterpageApp'));

  // instantiate service
  var betterpageModel, betterpageReasons;
  beforeEach(
	inject(function (_betterpageModel_) {
            betterpageModel = _betterpageModel_;
  	})
        );
  beforeEach(
        inject(function (_betterpageReasons_) {
            betterpageReasons = _betterpageReasons_;
        })
        );

    describe('Betterpage message generator', function() {
        it('generates an appropriate page message', function() {
            betterpageModel.data = {
                ptpage : false,
                caller: 'Janey Spriggs',
                phone: '0279876543',
                patient: 'Sprocket the Rocket',
                nhi : 'ABC1234',
                ward: 'A4',
                bed: '14',
                reply : true,
                within : 5,
                why: "Regular Meds",
                details: 'Can you please chart morphine?',
                contents : 'Please get back to me urgently...'
            };
            betterpageModel.generateMsg();
            expect(betterpageModel.msg).toEqual('Please get back to me urgently...');
            betterpageModel.data.ptpage = true;
            betterpageModel.generateMsg();
            expect(betterpageModel.msg).toEqual('0279876543<5m(Janey Spriggs) ABC1234(Sprocket the Rocket)[A4-14] Regular Meds (Can you please chart morphine?)');
        });
    });

});
