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
            });

            apiRouter.put("/contest/:cid", Security.authorDetails, function (req, res) {
                delete req.body._id;
                ContestDao.update({_id: req.params.cid}, req.body, function () {
                    res.end();
                })
            });

            apiRouter.delete("/contest/:cid", Security.authorDetails, function (req, res) {
                ContestDao.remove({_id: req.params.cid}, function () {
                    res.end();
                })
            })
        })
};