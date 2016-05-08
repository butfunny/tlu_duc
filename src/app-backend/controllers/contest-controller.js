module.exports = function(injector) {
    injector
        .run(function (apiRouter, ContestDao, Security) {
            apiRouter.post("/contest", Security.authorDetails, function (req, res) {
                ContestDao.create(req.body, function (err, contest) {
                    res.json(contest);
                })
            });


            apiRouter.get("/contest", Security.authorDetails, function (req, res) {
                ContestDao.find({}, function (err, totalContest) {
                    res.json(totalContest);
                })
            })
        })
};