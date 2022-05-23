const express = require("express");
const adminController = require("../Controllers/adminController");
const authController = require("../Controllers/authController");
const groupController = require("../Controllers/groupController");
const router = express.Router();

//This api-resource route for update and delete specific student
router.route("/")
  .get(authController.protect, authController.restrictTo("admin"), adminController.getAllUsers)
  .post(authController.protect, authController.restrictTo("admin"), adminController.uploadDocument)
  .patch(authController.protect, authController.restrictTo("admin"), adminController.updateUser);

//This api-resource route for update and delete specific student
router.route("/:id")
  .delete(authController.protect, authController.restrictTo("admin"), adminController.deleteUser);

router.route("/document")
  .post(authController.protect, adminController.document, adminController.uploadDocument);

router.route("/panel-members")
  .patch(authController.protect, authController.restrictTo("admin"), groupController.assignPannelGroup);

//get all roles
router.route("/roles")
  .get(authController.protect, authController.restrictTo("admin"), adminController.getAlRoles);


module.exports = router;