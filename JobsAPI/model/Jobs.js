const mongoose = require('mongoose')

const JobsSchema = new mongoose.Schema({
    company:{
        type: String,
        required: [true, 'Enter a company name'],
        maxlength: 50
    },
    position:{
        type: String,
        required: [true, 'Enter a position'],
        maxlength: 50 
    },
    status:{
        type: String,
        enum: ['pending', 'interview', 'declined'],
        default: 'pending'
    },
    createdBy:{
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide a user']
    }}, { timestamps: true }
)

module.exports = mongoose.model('Job', JobsSchema)