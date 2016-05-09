module.exports = function(injector) {
    injector
        .run(function (apiRouter, QuestionTypeDao, Security) {
            apiRouter.get("/questions-type", Security.authorDetails, function (req, res) {
                QuestionTypeDao.find({}, function (err, questionsType) {
                    res.json(questionsType);
                })
            });

            apiRouter.post("/question-type", Security.authorDetails, function (req, res) {
                QuestionTypeDao.create(req.body, function (err, questionType) {
                    res.json(questionType);
                })
            });

            apiRouter.put("/question-type/:qtid", Security.authorDetails, function (req, res) {
                delete req.body._id;
                QuestionTypeDao.update({_id : req.params.qtid}, req.body, function (err) {
                    res.end();
                })
            });

            apiRouter.delete("/question-type/:qtid", Security.authorDetails, function (req, res) {
                QuestionTypeDao.remove({_id: req.params.qtid}, function (err) {
                    res.end();
                })
            })
        }
    )
};