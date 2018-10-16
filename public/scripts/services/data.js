'use strict';

angular.module('app')
  .service('dataService', function ($http) {
    this.helloWorld = function () {
      console.log("This is the data service's method!!");
      // other logic...
    };


    this.getTodos = function (callback) {
      $http.get(window.location.protocol + '//' + window.location.host + '/toDo')
        .then(callback)
        // other logic...
    };

    this.deleteTodo = function (callback, data) {
      console.log("The " + todo.name + " todo has been deleted!")
      $http.delete(window.location.protocol + '//' + window.location.host + '/delete' + data._id)
        .then(callback);
      // other logic...
    };

    this.editTodos = function (data, callback) {
      $http.put(window.location.protocol + '//' + window.location.host + '/edit', data)
        .then(callback);
      // other logic...
    };


    this.addTodo=function(callbaclk, data){
      data.date = new Date();
           $http.post(window.location.protocol + '//' + window.location.host + '/insert',data)
       .then(callbaclk);

   };
  });