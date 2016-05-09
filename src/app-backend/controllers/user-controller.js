module.exports = function(injector) {
    injector
        .run(function (apiRouter, UserDao, Security) {
            apiRouter.get("/users", Security.authorDetails, function (req, res) {
                UserDao.find({}, function (err, users) {
                    res.json(users);
                })
            })
        }
    )
};