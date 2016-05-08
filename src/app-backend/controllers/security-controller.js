var jwt = require('jsonwebtoken');
var crypto = require('crypto');


module.exports = function(injector) {
    injector
        .run(function(apiRouter, Security, UserAdminDao) {
            apiRouter.post("/security/check-token" ,function (req, res) {

                if (req.headers.authorization == null) {
                    res.status(401).end();
                    return;
                }

                var token = req.headers.authorization.replace(/^Bearer /, '');
                jwt.verify(token, /* jwtSecret */  '23f34g1234yg1345yg13', function (err, decodedAuth) {
                    UserAdminDao.findOne({_id: decodedAuth._id}, function (err, user) {
                        if (user == null) {
                            res.status(401).end();
                        } else {
                            res.send({user: decodedAuth});
                        }
                    });
                });
            });


            var createSecurityToken = function (userData) {
                return jwt.sign(userData, /* jwtSecret */ '23f34g1234yg1345yg13',{
                    expiresIn: 1440
                });
            };

            apiRouter.post("/login", function (req, res) {
                UserAdminDao.findOne({username: req.body.username, password: crypto.createHash('md5').update("123123").digest("hex")}, function (err, user) {
                    if (user != null) {
                        var token = createSecurityToken(user);
                        res.send({user: user, token: token});
                    } else {
                        res.send({error: true});
                    }
                })
            })
        })
    ;
};