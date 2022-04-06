const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please Enter name'],
        unique: true,
        lowercase: true,
    },
    state: {
        type: String,
        enum: ['supervisorPending', 'co-supervisorPending', 'approved','decline'],

    },
    url: {
        type: String,
        required: [true, 'Please upload document'],
    },
    researchFieldID:{
        type: String,
        required: [true, 'Please select research filed'],
    },
    supervisorID:{
        type: String,
        required: [true, 'Please select supervisor'],
    },
    groupID:{
        type: String,
        required: [true, 'Please provide group id'],
    },
    co_supervisorID:String,
});

const Topic = mongoose.model('Topic', topicSchema);
module.exports = Topic;