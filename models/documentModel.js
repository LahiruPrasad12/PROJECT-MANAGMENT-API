const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    url: {
        type: String,
    },
    ownerType: {
        type: String,
        enum: ['admin', 'student'],
        default: 'admin'
    },
    ownerId: {
        type: String,
    }
});

const Document = mongoose.model('Documents', documentSchema);
module.exports = Document;