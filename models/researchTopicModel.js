const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please Enter name'],
        unique: true,
        lowercase: true,
    }
});

const TopicCategory = mongoose.model('TopicCategory', topicSchema);
module.exports = TopicCategory;