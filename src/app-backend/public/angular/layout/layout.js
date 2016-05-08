"use strict";

(function () {

    angular.module("tlctf.layout", [
    ])
        .directive("layOut", function() {
            return {
                restrict: "A",
                controller: function ($scope, User, Security) {
                    $scope.User = User;
                    $scope.logout= function () {
                        Security.logout();
                    }
                }
            };
        })

        .directive("headerLayout", function() {
            return {
                restrict: "E",
                templateUrl: "angular/layout/header-layout.html",
                link: function (elem, attrs, $scope) {
                    $('.button-collapse').sideNav();
                }
            };
        })
    ;

})();