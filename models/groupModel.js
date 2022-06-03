const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please Enter name'],
        unique: true,
        uppercase: true,
    },
    topicID : String,
    panel_member_id : String,
});

const Group = mongoose.model('Groups', groupSchema);
module.exports = Group;