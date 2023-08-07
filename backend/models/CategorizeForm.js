const mongoose = require('mongoose');

const CategorizeFormSchema = new mongoose.Schema({
    description : {
        type: String,
    },
    category: {
        type: [String],
        required: true,
    },
    solutions : {
        type: [{
            optionDescription: {
                type: String,
                required: true,
            },
            category: {
                type: String,
                required: true,
            }
        }]
    }
})

module.exports = mongoose.model('CategorizeForm', CategorizeFormSchema);