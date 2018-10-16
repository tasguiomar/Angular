angular.module('app')
.directive('todos', function() {
  return {
    templateUrl: 'toDo/index.html',
    controller: 'mainCtrl',
    replace: true
  }
})