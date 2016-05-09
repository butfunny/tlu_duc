module.exports = function(injector) {
    var mongoose = require('mongoose');
    var schema = new mongoose.Schema({
        username: String,
        password: String,
        email: String,
        name: String,
        created: {type: Date, default: Date.now},
        active: Boolean,
        active_code: String
    });

    var urlDao = mongoose.model('user', schema);

    injector
        .value("UserDao", urlDao)
    ;
};