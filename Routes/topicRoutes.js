const express = require("express");
const topicController = require("../Controllers/topicController");
const authController = require("../Controllers/authController");
const router = express.Router();

router.route("/")
  .get(topicController.getTopics)
  .post(authController.protect, authController.checkGroup(), topicController.document, topicController.registerTopicToPanel);

router.route("/supervisor-submission")
  .get(topicController.getTopics)
  .post(authController.protect, authController.checkGroup(), topicController.submitTopicToSupervisor);

router.route("/co-supervisor-submission")
  .post(authController.protect, authController.checkGroup(), topicController.submitTopicToCoSupervisor);

router.route("/panel-submission")
  .post(authController.protect, authController.checkGroup(), topicController.document, topicController.registerTopicToPanel);

router.route("/staff")
  .post(authController.protect, topicController.getStaff);

router.route("/my-topic")
  .get(authController.protect,topicController.getMyTopic)
module.exports = router;