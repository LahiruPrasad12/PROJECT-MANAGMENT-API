const express = require('express');
const topicController = require('../Controllers/topicController');
const authController = require('../Controllers/authController')
const router = express.Router();

router.route('/')
    .get(topicController.getTopics)
    .post(authController.protect, authController.checkGroup(),topicController.document, topicController.registerTopic)

module.exports = router;