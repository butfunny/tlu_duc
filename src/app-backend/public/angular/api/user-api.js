"use strict";

(function () {

    angular.module("tlctf.api.user-api", [
    ])
        .factory("userApi", function(Api) {
            return {
                getUsers: function () {
                    return Api.get("/api/users");
                }
            };
        })
    ;

})();