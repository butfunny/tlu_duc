"use strict";

(function () {

    angular.module("tlctf.manager-contest", [
        "ui.router"
    ])

        .config(["$stateProvider", function ($stateProvider) {

            $stateProvider
                .state('manager-contest', {
                    url: '/manager-contest',
                    templateUrl: "/angular/manager-contest/manager-contest.html",
                    controller: "manager-contest.ctrl"
                })
            ;
        }])

        .controller("manager-contest.ctrl", function ($scope, contestApi) {
            $('.modal-trigger').leanModal(
                {
                    complete: function () {
                        $scope.contest = {}
                    }
                }
            );

            contestApi.getContest().then(function (resp) {
                $scope.allContest = resp.data;
                $(".dropdown-button").dropdown();
            });


            $scope.contest = {};

            $scope.openCreateContestModal = function () {
                $('#modal1').openModal();
            };

            function convertDate(date) {
                var from = date.split("/");
                return new Date(from[2], from[1] - 1, from[0]);
            }

            $scope.createContest = function () {
                $scope.contest.startTime = convertDate($scope.contest.startTime);
                $scope.contest.endTime = convertDate($scope.contest.endTime);
                contestApi.createContest($scope.contest).then(function (resp) {
                    console.log(resp.data);
                });

                $('#modal1').closeModal();
            }
        })

    ;

})();