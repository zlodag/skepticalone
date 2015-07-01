(function() {
    "use strict";
    angular.module('betterpageMain', ['ngMessages'])
    .controller('PageController', function() {
            this.display = '';
            this.overflow = false;
            this.prevpage = {
                msg: '',
                beep: null,
                private: null
            };
        });
})();
