(function(){
    var app = angular.module('audit', []);
    app.directive('databaseTable', function() {
        return {
            restrict: 'E',
            templateUrl: 'database.html',
            controllerAs: 'db',
            controller: ['$http',function($http){
                var self = this;
                self.rows = [];
                $http.post('db.php', {str:'rows'}).success(function(obj){
                    self.rows = obj;
                });
                self.headers = ['ID', 'Entered by','Specialty','Shift','Date','Exact text','Time','Urg?','Req?','Rpt?'];
            }]
        };
    });
    app.directive('newItem', function(){
        return {
            restrict: 'E',
            templateUrl: 'newitem.html',
            controllerAs: 'new',
            controller: ['$http','$scope','$filter',function($http,$scope,$filter){
                var self = this;
                self.submit = function() {
                    $http.post('db.php', {str: 'submit', params: {
                        person: self.entry.person ? self.entry.person[0] : 0,
                        specialty: self.entry.specialty ? self.entry.specialty[0] : 0,
                        shift: self.entry.shift ? self.entry.shift[0] : 0,
                        date: $filter('date')(self.entry.date, "yyyy-MM-dd"),
                        contents: self.entry.contents,
                        received: self.entry.checked ? $filter('date')(self.entry.received, "HH:mm") : null,
                        urgent: self.entry.urgent,
                        required: self.entry.required,
                        repeat: self.entry.repeat
                    }}).success(function(obj){
                        if (obj === 1) {
                            angular.extend(self.entry,{contents:'',urgent:false,required:false,repeat:false,checked:true,received:''});
                            $scope.newpage.$setPristine();
                            document.getElementById('contents').focus();
                            $http.post('db.php', {str:'rows', since: $scope.db.rows[0][0]}).success(function(obj){
                                for (var i= obj.length - 1; i >= 0 ; i--) {
                                    $scope.db.rows.unshift(obj[i]);
                                }
                            });
                        }
                    });
                };
                self.entry = {
                    checked:true
                };
                self.data = {
                    person: [],
                    specialty: [],
                    shift: []
                };
                $http.post('db.php', {str:'initial'}).success(function(obj){self.data = obj;});
            }]
        };
    });

})();
