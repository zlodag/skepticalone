angular.module('betterpageMain')
.directive('betterpageForm', function() {
    return {
        restrict: 'E',
        controller: 'PageController',
        templateUrl: 'form.html'
    };
})
.directive('betterpagePreview', function() {
    return {
        restrict: 'E',
        templateUrl: 'preview.html'
    };
})
.directive('betterpageOutcome', function() {
    return {
        restrict: 'E',
        templateUrl: 'outcome.html'
    };
})
.directive('titleCase', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attrs, ngModel) {
            ngModel.$parsers.push(function(str) {
                return str.replace(/(^([a-zA-Z\p{M}]))|([ -][a-zA-Z\p{M}])/g, function(s) {
                    return s.toUpperCase();
                });
            });
        }
    };
})
.directive('upperCase', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attrs, ngModel) {
            ngModel.$parsers.push(function(str) {
                return str.toUpperCase();
            });
        }
    };
});