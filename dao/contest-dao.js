
module.exports = function(injector) {
    var mongoose = require('mongoose');
    var schema = new mongoose.Schema({
        name: String,
        introContest: String,
        startTime: Date,
        endTime: Date,
        created: {type: Date, default: Date.now}
    });

    var urlDao = mongoose.model('contest', schema);

    injector
        .value("ContestDao", urlDao)
    ;
};