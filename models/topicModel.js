const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please Enter name'],
    },
    state: {
        type: String,
    enum: ['supervisorPending', 'supervisorAccept','co_supervisorPending','co_supervisorAccept','pane_member_pending','panel-approved', 'approved','decline'],
        default: 'supervisorPending'

    },
    category_id:{
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
    panel_member_id:String,
});

const Topic = mongoose.model('Topic', topicSchema);
module.exports = Topic;