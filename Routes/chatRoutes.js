const express = require("express");
const chatController = require("../Controllers/chatControllers");
const authController = require("../Controllers/authController");

const router = express.Router();

router.route("/").post(authController.protect, chatController.accessChat);
router.route("/").get(authController.protect, chatController.fetchChats);
router
  .route("/chatGroup")
  .post(authController.protect, chatController.createGroupChat);
router.route("/rename").put(authController.protect, chatController.renameGroup);
router
  .route("/groupremove")
  .put(authController.protect, chatController.removeFromGroup);
router
  .route("/groupadd")
  .put(authController.protect, chatController.addToGroup);

module.exports = router;
