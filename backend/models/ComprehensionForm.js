const mongoose = require('mongoose');

const ComprehensionFormSchema = new mongoose.Schema({
    passage: {
        type : String,
        required: true,
    },
    mcqQuestions: {
        type: [{
            question: {
                type: String,
                required: true,
            },
            options: {
                type:["String"],
                required: true,
            },
            correctOption : {
                type: Number,
                required: true,
            }
        }]
    }
})

module.exports = mongoose.model('ComprehensionForm', ComprehensionFormSchema);