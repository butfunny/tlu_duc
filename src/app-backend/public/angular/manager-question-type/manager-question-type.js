"use strict";

(function () {

    angular.module("tlctf.manager-question-type", [
        "ui.router"
    ])

        .config(["$stateProvider", function ($stateProvider) {

            $stateProvider
                .state('manager-question-type', {
                    url: '/manager-question-type',
                    templateUrl: "/angular/manager-question-type/manager-question-type.html",
                    controller: "manager-question-type.ctrl"
                })
            ;
        }])

        .controller("manager-question-type.ctrl", function($scope, questionTypeApi) {
            $('.modal-trigger').leanModal();

            function refresh () {
                questionTypeApi.getQuestionsType().then(function (resp) {
                    $scope.questionsType = resp.data;
                });
            }

            refresh();

            $scope.editQt = function (q) {
                $scope.questionType = angular.copy(q);
                $('#modalQT').openModal();
            };


            $scope.questionType = {};

            $scope.openCreateQtModal = function () {
                $scope.questionType = {};
                $('#modalQT').openModal();
            };



            $scope.updateQt = function () {
                questionTypeApi.updateQuestionType($scope.questionType._id, $scope.questionType).then(function () {
                    refresh();
                    $('#modalQT').closeModal();
                })
            };

            $scope.createQt = function () {
                questionTypeApi.createQuestionType($scope.questionType).then(function (resp) {
                    refresh();
                });

                $('#modalQT').closeModal();
            };

            $scope.deleteQt = function (q) {
                if (window.confirm("Xoá " + q.name + " thật?")) {
                    questionTypeApi.removeQuestionType(q._id).then(function () {
                        _.remove($scope.questionsType, function (question) {
                            return q._id == question._id;
                        })
                    })
                }
            };
        })

    ;

})();