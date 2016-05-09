
module.exports = function(injector) {
    var mongoose = require('mongoose');
    var schema = new mongoose.Schema({
        contest_id: String,
        question_type_id : String,
        name: String,
        question: String,
        answer: String,
        point: String,
        hint: [String],
        time: Number,
        created: {type: Date, default: Date.now}
    });

    var urlDao = mongoose.model('question', schema);

    injector
        .value("QuestionDao", urlDao)
    ;
};