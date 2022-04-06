const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please Enter name'],
        unique: true,
        lowercase: true,
    },
    researchState: {
        type: String,
        enum: ['No', 'Draft','Pending','Active','Decline'],
        default: 'No'
    },
    researchFileId:Number,
    researchTopic:String,
    supervisorFeedBack:String,
    co_supervisorFeedBack:String
});

const Group = mongoose.model('Groups', groupSchema);
module.exports = Group;