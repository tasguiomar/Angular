angular.module('app').service('autentication', function($http,$localStorage) {

    this.register= function(callback, data){
        $http.post('http://localhost:8000/register', data)
        .then(callback);
    }
    this.login= function(callback,email,password){
        $http.post('http://localhost:8000/login', { email: email, password: password })
        .then(callback);
    }
    this.SetCredentials = function(data){
        $http.defaults.headers.common['Authorization'] = 'Bearer ' + data.token;

        $localStorage.currentUser = { 
            user: data.user.name, 
            token: data.token,
        };
    }
    this.ClearCredentials = function(){
        $http.defaults.headers.common.Authorization = '';
        delete $localStorage.currentUser;

    }
});