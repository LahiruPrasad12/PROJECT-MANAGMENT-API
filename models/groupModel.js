const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please confirm your password'],
    },
    researchState: {
        type: String,
        enum: ['No', 'Draft','Pending','Active','Decline'],
        default: 'No'
    },
    researchTopic:String,
    feedBack:String
});

const Group = mongoose.model('Groups', groupSchema);
module.exports = Group;