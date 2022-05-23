const mongoose = require('mongoose');

const feedBackSchema = new mongoose.Schema({

  topicID : String,
  panel_member_id : String,
});

const Group = mongoose.model('Groups', groupSchema);
module.exports = Group;