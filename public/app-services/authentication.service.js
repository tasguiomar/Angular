angular.module('app').service('AutenticationService', function($http,$localStorage) {

    this.login= function(name,password,callback){

        $http.post(window.location.protocol +'//'+ window.location.host + '/api/login', { name: name, password: password })
        .then(callback);

    
    }

    // ver o exemplo do login 
        
    this.register= function(data,callback){
        $http.post(window.location.protocol +'//'+ window.location.host + '/api/register', data)
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
