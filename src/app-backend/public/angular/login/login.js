"use strict";

(function () {

    angular.module("tlctf.login", [
        "ui.router"
    ])

        .config(["$stateProvider", function ($stateProvider) {

            $stateProvider
                .state('login', {
                    url: '/login',
                    templateUrl: "angular/login/login.html",
                    controller: "login.ctrl"
                })
            ;
        }])

        .controller("login.ctrl", function($scope, Security, $state) {
            $scope.user = {};
            $scope.login = function () {
                Security.login($scope.user).then(function () {
                    $state.go("manager-contest");
                }, function () {
                    $scope.user.password = "";
                    $scope.error = true;
                })
            }
        })

    ;

})();