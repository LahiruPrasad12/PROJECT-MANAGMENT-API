const mongoose = require('mongoose');

const feedBackSchema = new mongoose.Schema({

  sender_id: {
    type: String,
    required: [true, 'Please Enter sender id'],
  },
  type: {
    type: String,
    enum: ['group', 'single','panel'],
    required: [true, 'Please give message type'],
  },
  receiver_id: {
    type: String,
    required: [true, 'Please give receiver id'],
  },
  message: {
    type: String,
    required: [true, 'Please Enter message'],
  },

});

const Feedback = mongoose.model('Feedback', feedBackSchema);
module.exports = Feedback;