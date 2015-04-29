(function(){
    var app = angular.module('audit', []);
    app.directive('databaseTable', function() {
        return {
            restrict: 'E',
            templateUrl: 'database.html',
            controllerAs: 'db',
            controller: ['$http',function($http){
                var self = this;
                self.indices = [];
                self.rows = [];
                $http.post('db.php', {str:'rows'}).success(function(obj){
                    var indices = [];
                    for (var i=0; i < 10; i++) {
                        indices.push(i);
                    }
                    self.indices = indices;
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
            controller: ['$http',function($http){
                this.data = {
                    person: [],
                    specialty: [],
                    shift: []
                };
                var self = this;
                $http.post('db.php', {str:'initial'}).success(function(obj){self.data = obj;});
            }]
        };
    });

})();
