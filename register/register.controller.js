  'use strict'

      angular
        .module('app')
        .controller('RegisterController', Controller);

    function Controller() {
        var vm = this;

        initController();

        function initController() {
        }
    }

    app.controller("RegisterController", function($scope, $routeParams){
        $scope.initController=$routeParams.initController
    })

