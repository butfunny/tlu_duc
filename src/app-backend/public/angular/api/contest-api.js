"use strict";

(function () {

    angular.module("tlctf.api.contest-api", [
    ])
        .factory("contestApi", function(Api) {
            return {
                getContest: function () {
                  return Api.get("/api/contest");
                },
                createContest : function (contest) {
                    return Api.post("/api/contest", contest);
                },
                editContest : function (id, newData) {
                    return Api.put("/api/contest/" + id, newData);
                },
                removeContest: function (id) {
                    return Api.delete("/api/contest/" + id);
                }
            };
        })
    ;

})();