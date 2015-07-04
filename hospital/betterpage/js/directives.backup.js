angular.module('betterpageMain')
.directive('betterpageForm', [
    'betterpageStatic',
    'betterpageSubmit',
function(
    betterpageStatic,
    betterpageSubmit
) {
    function link(scope) {
        //scope.model = betterpageModel;
        scope.static = betterpageStatic;
        scope.$watchCollection(function(scope){return scope.model.data;}, function() {
            var items = scope.model.itemize();
            scope.PageCtrl.display = items.msg;
            scope.PageCtrl.overflow = (items.msg.length > scope.static.charLimit);
            //scope.temp = newValue;
        });
        scope.resetPage = function() {
            scope.model.resetItems();
            scope.betterform.$setUntouched();
            scope.betterform.$setPristine();
        };
        //scope.$on("$routeChangeSuccess", function(event, next, current) {
            //scope.model.resetItems();
        //});
        scope.submitPage = function() {
                if (scope.PageCtrl.overflow) {return false;}
                if (scope.betterform.$invalid) {
                    angular.forEach(scope.betterform.$error, function(type) {
                        angular.forEach(type, function(field) {
                            field.$setTouched();
                            field.$setDirty();
                        });
                    });
                    return false;
                }
                var items = scope.model.itemize();
                items.bp = items.ptpage ? betterpageStatic.reasons[items.why].beep : 1;
                console.log(items);
                var promise = betterpageSubmit(items);
                if (promise) {
                    promise.success(function(data, status, headers, config) {
                        if (data.ok) {
                            scope.PageCtrl.prevpage = {
                                bp: config.data.bp,
                                msg: config.data.msg,
                                private: config.data.private
                            };
                            scope.resetPage();
                            if (config.data.ptpage) {
                                alert("If you requested a review of a patient, please ensure that the notes and chart are in the office.");
                            }
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
.directive('betterpageLog', function($location) {
    return {
        restrict: 'E',
        templateUrl: 'pagelog.html',
        controller: 'LogController'
    };
})
.directive('resendPage', ['$location', function($location) {
    return {
        restrict: 'A',
                        /*
        controller: ['betterpageModel','$scope',function(betterpageModel,$scope){
            $scope.resend = function(){
                betterpageModel.data.contents = $scope.page.msg;
            };
        }],
        link: function(scope, element) {
            element.on('click',function(){
                scope.resend();
                scope.$apply(function() {
                    var ptpage = scope.page.nhi ? true : false,
                    params = {ptpage: ptpage};
                    if (ptpage) {
                        params.reply = scope.page.within ? true : false;
                        params = angular.extend(params, scope.page);
                        delete params.msg;
                        delete params.ts;
                    } else {
                        params.no = scope.page.no;
                        params.contents = scope.page.msg;
                    }
                    $location.path('/').search(params);
                });
            });
        }
                */
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