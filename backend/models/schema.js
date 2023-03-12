const mongoose = require('mongoose')

const demoSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please Enter Value for name']
    },
    path: {
        type: String
    },
    fileName: {
        type: String
    }
})

module.exports = mongoose.model('FileSchema', demoSchema)