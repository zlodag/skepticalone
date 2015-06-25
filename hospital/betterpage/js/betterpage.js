(function() {
    "use strict";
    angular.module('betterpageMain', ['ngMessages'])
    .controller('PageController', [
        'betterpageModel', 
        'betterpageReasons', 
        'betterpageChoices', 
        'betterpageSubmit', 
        '$window', 
        '$scope', 
        function(
        betterpageModel, 
        betterpageReasons, 
        betterpageChoices, 
        betterpageSubmit, 
        $window,
        $scope
        ) {
            $scope.reasons = betterpageReasons;
            $scope.choices = betterpageChoices;
            $scope.data = betterpageModel;
            $scope.reset = function() {
                $scope.data.reset();
                $scope.betterform.$setUntouched();
            }
            $scope.submitPage = function() {
                var promise = betterpageSubmit($scope.betterform, $scope.data);
                if (promise) {
                    promise.success(function(data, status, headers, config) {
                        if (!data.ok) {return false;}
                        $scope.prevpage = {
                            beep: config.data.bp,
                            msg: config.data.msg,
                            private: config.data.private
                        };
                        $scope.reset();
                        if (config.data.ptpage) {
                            alert("If you requested a review of a patient, please ensure that the notes and chart are in the office.");
                        }
                    });
                }
            };
            $scope.display = '';
            $scope.overflow = false;
            $scope.$watch('data.params', function() {
                $scope.display = $scope.data.msg;
                $scope.overflow = ($scope.display.length > $scope.data.charLimit);
            }, true);
            $scope.prevpage = {
                msg: '',
                beep: null,
                private: null
            };
            $scope.logs = function(){
                $window.location.href='logs.php';
            };
        }]);
})();
