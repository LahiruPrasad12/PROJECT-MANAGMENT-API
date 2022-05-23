const express = require('express');
const feedback = require("../Controllers/feedbackController");
const authController = require("../Controllers/authController");
const router = express.Router();


router.route('/')
  .get(authController.protect, feedback.getFeedback)
  .post(authController.protect, feedback.sendFeedback)

module.exports = router;