module.exports = {
    startServer: function(){

        var express = require('express');
        var app = express();
        var bodyParser = require('body-parser');

        var http = require('http').Server(app);
        var config = require('../../config');


        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: true}));

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

        //require("./server/src/app-frontend/controller/aaa-controller.js")(injector);

        injector.runAll();

        //require("./server/controllers/controllers")(app, io);

        var port = config.serverPort.frontEnd;

        http.listen(port, function () {
            console.log("Server front end running in port: " + port);
        });


    }
};