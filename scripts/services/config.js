angular.module('app').service('config', function($http, $rootScope) {

    this.getUser= function(callback){
        $http.get('http://localhost:8000/user')
        .then(callback);
    }
        
    this.updateUser= function(callback, data){
        $http.put('http://localhost:8000/user',data)
        .then(callback);
    }

});