const express = require("express");
const topicController = require("../Controllers/researchTopicController");
const authController = require("../Controllers/authController");
const router = express.Router();

router.route("/")
  .post(topicController.createTopics)
  .get(topicController.getTopics);

module.exports = router;