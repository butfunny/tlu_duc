"use strict";

(function () {

    angular.module("tlctf.manager-user", [
        "ui.router"
    ])

        .config(["$stateProvider", function ($stateProvider) {

            $stateProvider
                .state('manager-user', {
                    url: '/manager-user',
                    templateUrl: "/angular/manager-user/manager-user.html",
                    controller: "manager-user.ctrl"
                })
            ;
        }])

        .controller("manager-user.ctrl", function($scope, userApi) {
            userApi.getUsers().then(function (resp) {
                $scope.users = resp.data;
            })
        })

    ;

})();