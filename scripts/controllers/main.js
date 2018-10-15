angular.module('app', [])
      .controller('mainCtrl', function ($scope, dataService) {
        $scope.addTodo = function () {
          var todo = {
            name: "New todo."
          };
          $scope.todos.unshift(todo);
        };

        $scope.helloWorld = dataService.helloWorld;

        dataService.getTodos(function (response) {
          console.log(response.data);
          $scope.todos = response.data;
        });

        $scope.deleteTodo = function (todo, $index) {
          dataService.deleteTodo(todo);
          $scope.todos.splice($index, 1);
        };

        $scope.saveTodos = function () {
          var filteredTodos = $scope.todos.filter(function (todo) {
            if (todo.edited) {
              return todo;
            };
          });
          dataService.saveTodos(filteredTodos);
        };

        $scope.filterFunction = function(element) {
            return element.name.match(/^Ma/) ? true : false;
        };


        $scope.logout = function () {
          autenticationService.ClearCredentials();
          $location.path('/');
        };
      })