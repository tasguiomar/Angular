'use strict';

angular.module('app')
  .service('dataService', function ($http) {
    this.helloWorld = function () {
      console.log("This is the data service's method!!");
      // other logic...
    };


    this.getTodos = function (callback) {
      $http.get('http://localhost:8000/todos')
        .then(callback)
        // other logic...
    };

    this.deleteTodo = function (callback, data) {
      console.log("The " + todo.name + " todo has been deleted!")
      $http.delete('http://localhost:8000/delete/' + data._id)
        .then(callback);
      // other logic...
    };

    this.editTodos = function (data, callback) {
      $http.put('http://localhost:8000/edit/', data)
        .then(callback);
      // other logic...
    };


    this.addTodo=function(callbaclk, data){
      data.date = new Date();
           $http.post('http://localhost:8000/insert/',data)
       .then(callbaclk);

   };
  });