
module.exports = function(injector) {
    var mongoose = require('mongoose');
    var schema = new mongoose.Schema({
        username: String,
        password: String,
        created: {type: Date, default: Date.now}
    });

    var urlDao = mongoose.model('user_admin', schema);

    injector
        .value("UserAdminDao", urlDao)
    ;
};