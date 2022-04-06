const express = require('express');
const topicController = require('../Controllers/topicController');
const authController = require('../Controllers/authController')
const router = express.Router();

router.route('/')
    .get(authController.protect, authController.restrictTo('admin'), topicController.getTopics)
    .patch(authController.protect, authController.checkGroup(), groupController.registerTopic)

module.exports = router;