angular.module('app').service('config', function($http, $rootScope) {

    this.getUser= function(callback){
        $http.get(window.location.protocol + '//' + window.location.host + '/user')
        .then(callback);
    }
        
    this.updateUser= function(callback, data){
        $http.put(window.location.protocol + '//' + window.location.host + '/user',data)
        .then(callback);
    }
});