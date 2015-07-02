angular.module('betterpageMain')
.directive('pageLogs', ['$window', function($window) {
    return {
        restrict: 'A',
        link: function(scope, element) {
            element.on('click',function(){
                $window.location.href='logs.php';
            });
        }
    };
}])
.directive('betterpageForm', [
    'betterpageStatic',
    'betterpageSubmit',
    'betterpageModel',
function(
    betterpageStatic,
    betterpageSubmit,
    betterpageModel
) {
    function link(scope) {
        scope.static = betterpageStatic;
        scope.model = betterpageModel;
        scope.$watchCollection(function(scope){return scope.model.data;}, function() {
            var items = scope.model.itemize();
            scope.PageCtrl.display = items.msg;
            scope.PageCtrl.overflow = (items.msg.length > scope.static.charLimit);
            //scope.temp = newValue;
        });
        scope.reset = function() {
            scope.model.resetItems();
            scope.betterform.$setUntouched();
        };
        scope.submit = function() {
                var items = scope.model.itemize();

                if (scope.betterform.$invalid || items.msg.length > 128) {
                    angular.forEach(scope.betterform.$error, function(type) {
                        angular.forEach(type, function(field) {
                            field.$setTouched();
                        });
                    });
                    return false;
                }

                var promise = betterpageSubmit(items);
                if (promise) {
                    promise.success(function(data, status, headers, config) {
                        if (!data.ok) {return false;}
                        scope.PageCtrl.prevpage = {
                            bp: config.data.bp,
                            msg: config.data.msg,
                            private: config.data.private
                        };
                        scope.reset();
                        if (config.data.ptpage) {
                            alert("If you requested a review of a patient, please ensure that the notes and chart are in the office.");
                        }
                    });
                }
            };
        
    }

    return {
        restrict: 'E',
        templateUrl: 'form.html',
        link: link
    };
}])
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