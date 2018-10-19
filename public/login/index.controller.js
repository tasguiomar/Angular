
    angular.module('app').controller('Login.IndexController',
    function ($scope, AutenticationService, $location) {

        $scope.login = function (user) {
            AutenticationService.login(user.name, user.password, function (response) {
                if (response.data.token) {
                    $location.path('/toDo')
                    AutenticationService.SetCredentials(response.data);
                } else {
                    $scope.error="Invalid name or password!";
                    $scope.success=false;
                }
            })
        }

        $scope.register = function (data) {
            AutenticationService.register(data, function (response) {
                console.log(response)
                if(!response.data.sucess){
                    $scope.error="Email already in use!";
                    $scope.success=false;  
                }else{
                    $scope.error=false;
                    $scope.success="Accout created successfully!"
                }
            })
        }
    })