const express = require("express");
const userController = require("../Controllers/userController");
const authController = require("../Controllers/authController");
const adminController = require("../Controllers/adminController");
const router = express.Router();

//This resource-route used for update their details
router.route("/")
  .patch(authController.protect, userController.uploadUserPhoto, userController.updateMe)
  .delete(authController.protect, userController.deleteMe)
  .get(authController.protect, adminController.getAllUsers);


//This api route used for group works
router.route("/group")
  .patch(authController.protect, userController.uploadUserPhoto, userController.updateMe)
  .delete(authController.protect, userController.deleteMe);


module.exports = router;