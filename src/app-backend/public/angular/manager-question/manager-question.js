"use strict";

(function () {

    angular.module("tlftc.manager-question", [
        "ui.router"
    ])

        .config(["$stateProvider", function ($stateProvider) {

            $stateProvider
                .state('manager-question', {
                    url: '/manager-question',
                    templateUrl: "/angular/manager-question/manager-question.html",
                    controller: "manager-question.ctrl"
                })
            ;
        }])

        .controller("manager-question.ctrl", function($scope) {

        })

    ;

})();