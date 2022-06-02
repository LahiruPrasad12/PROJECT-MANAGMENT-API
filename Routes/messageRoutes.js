const express = require("express");
const {
  allMessages,
  sendMessage,
} = require("../Controllers/messageControllers");
const  authController  = require("../Controllers/authController");

const router = express.Router();

router.route("/:chatId").get( allMessages);
router.route("/").post(authController.protect, sendMessage);

module.exports = router;
