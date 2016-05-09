"use strict";

(function () {

    angular.module("tlctf.api.question-type-api", [
    ])
        .factory("questionTypeApi", function(Api) {
            return {
                getQuestionsType: function () {
                    return Api.get("/api/questions-type");
                },
                createQuestionType : function (qt) {
                    return Api.post("/api/question-type", qt);
                },
                updateQuestionType : function (id, newData) {
                    return Api.put("/api/question-type/" + id, newData);
                },
                removeQuestionType: function (id) {
                    return Api.delete("/api/question-type/" + id);
                }
            };
        })
    ;

})();