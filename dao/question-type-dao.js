
module.exports = function(injector) {
    var mongoose = require('mongoose');
    var schema = new mongoose.Schema({
        name: String,
        created: {type: Date, default: Date.now}
    });

    var urlDao = mongoose.model('question_type', schema);

    injector
        .value("QuestionTypeDao", urlDao)
    ;
};