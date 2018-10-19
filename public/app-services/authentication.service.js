angular.module('app').service('AutenticationService', function($http,$localStorage) {

    this.login= function(name,password,callback){

        console.log(name)
        console.log(password)

        $http.post(window.location.protocol +'//'+ window.location.host + '/login', { name: name, password: password })
        .then(callback);
    
    }
        
    this.register= function(data,callback){
        $http.post(window.location.protocol +'//'+ window.location.host + '/login', data)
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
