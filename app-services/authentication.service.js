angular.module('app').service('AutenticationService', function($http,$localStorage) {

    this.login= function(email,password,callback){

        console.log(email)
        console.log(password)

        $http.post('http://localhost:8000/login', { email: email, password: password })
        .then(callback);
       

    }
        
    this.register= function(data,callback){
        $http.post('http://localhost:8000/login', data)
        
        .then(callback);
    }

    this.SetCredentials = function(data){
        $http.defaults.headers.common['Authorization'] = 'Bearer ' + data.token;

        $localStorage.currentUser = { 
            user: data.user.name, 
            token: data.token,
        };
    }
    });//so para fazer ultimo commit n