module.exports = {
    startServer: function(){

        var express = require('express');
        var app = express();
        var bodyParser = require('body-parser');

        var http = require('http').Server(app);
        var config = require('../../config');

        app.use(function (req, res, next) {
            res.set("Access-Control-Allow-Origin" , "*");
            res.set("Access-Control-Allow-Credentials", "true");
            res.set("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE");
            res.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, set-cookie, Authorization");
            res.set("Access-Control-Expose-Headers", "Set-Cookie");
            next();
        });

        app.use(express.static(__dirname + '/public'));

        var injector = require("../../common/injector").createInjector();

        injector.value("httpApp", app);

        //injector server backend js start

        require("../../dao/contest-dao.js")(injector);

        require("../../dao/question-dao.js")(injector);

        require("../../dao/question-type-dao.js")(injector);

        require("../../dao/user-admin-dao.js")(injector);

        require("../../dao/user-dao.js")(injector);

        require("./controllers/api-router.js")(injector);

        require("./controllers/contest-controller.js")(injector);

        require("./controllers/question-controller.js")(injector);

        require("./controllers/question-type-controller.js")(injector);

        require("./controllers/security-controller.js")(injector);

        require("./controllers/user-controller.js")(injector);

        require("./security/security.js")(injector);

        //injector server backend js end


        injector.runAll();


        var port = config.serverPort.backEnd;

        http.listen(port, function () {
            console.log("Server back end running in port: " + port);
        });


    }
};