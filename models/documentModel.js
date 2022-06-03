const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
    message: {
        type: String,
    },
    url: {
        type: String,
        required: [true, 'Please url'],
    },
    receiverType: {
        type: String,
        enum: ['admin', 'student','panel','staff'],
        default: 'admin',
    },
    receiverID: {
        type: String,
    },
    senderID:{
        type: String,
        required: [true, 'Please provide a sender id'],
    },
    active: {
        type: Boolean,
        default: true,
        select: false
    },
    Type: {
        type: String,
        enum: ['document', 'topic-doc','presentation','final-thesis'],
        default: 'topic-doc'

    },
});

const Document = mongoose.model('Documents', documentSchema);
module.exports = Document;