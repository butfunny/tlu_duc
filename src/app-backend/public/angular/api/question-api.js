"use strict";

(function () {

    angular.module("tlctf.api.question-api", [
    ])
        .factory("questionApi", function(Api) {
            return {
                getQuestions: function () {
                    return Api.get("/api/questions");
                },
                createQuestion : function (qt) {
                    return Api.post("/api/question", qt);
                },
                updateQuestion : function (id, newData) {
                    return Api.put("/api/question/" + id, newData);
                },
                removeQuestion: function (id) {
                    return Api.delete("/api/question/" + id);
                }
            };
        })
    ;

})();