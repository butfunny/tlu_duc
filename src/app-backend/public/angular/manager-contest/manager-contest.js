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
            $('.modal-trigger').leanModal();

            function refresh () {
                contestApi.getContest().then(function (resp) {
                    $scope.allContest = resp.data;
                });
            }

            refresh();

            $scope.editContest = function (c) {
                $scope.contest = angular.copy(c);
                $('#modal1').openModal();
            };


            $scope.contest = {};

            $scope.openCreateContestModal = function () {
                $scope.contest = {};
                $('#modal1').openModal();
            };

            function convertDate(date) {
                var from = date.split("/");
                if (from.length == 3) return new Date(from[2], from[1] - 1, from[0]);
                return date;
            }

            $scope.updateContest = function () {
                $scope.contest.startTime = convertDate($scope.contest.startTime);
                $scope.contest.endTime = convertDate($scope.contest.endTime);
                contestApi.editContest($scope.contest._id, $scope.contest).then(function () {
                    refresh();
                    $('#modal1').closeModal();
                })
            };

            $scope.createContest = function () {
                $scope.contest.startTime = convertDate($scope.contest.startTime);
                $scope.contest.endTime = convertDate($scope.contest.endTime);
                contestApi.createContest($scope.contest).then(function (resp) {
                    refresh();
                });

                $('#modal1').closeModal();
            };

            $scope.deleteContest = function (c) {
                if (window.confirm("Xoá " + c.name + " thật?")) {
                    contestApi.removeContest(c._id).then(function () {
                        _.remove($scope.allContest, function (contest) {
                            return c._id == contest._id;
                        })
                    })
                }
            };
        })

    ;

})();