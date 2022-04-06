const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please Enter name'],
        unique: true,
        lowercase: true,
    }
});

const Topic = mongoose.model('Topics', topicSchema);
module.exports = Topic;