const mongoose = require('mongoose');

const ClozeFormSchema = new mongoose.Schema({
    preview : {
        type : String,
        required : true
    },
    questionSentence : {
        type : String,
        required : true
    },
    options : {
        type: ["String"],
        required : true
    }
})

module.exports = mongoose.model('ClozeForm', ClozeFormSchema);