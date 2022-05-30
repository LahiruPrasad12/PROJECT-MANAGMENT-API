const express = require('express');
const groupController = require('../Controllers/groupController');
const authController = require('../Controllers/authController')
const router = express.Router();

router.route('/')
    .get(authController.protect, authController.restrictTo('admin'), groupController.getAllGroups)
    .post(authController.protect, groupController.createGroup)
    .patch(authController.protect,  authController.checkGroup(),groupController.assignGroup)

router.route('/register-topic')
    .patch(authController.protect, authController.checkGroup(), groupController.registerTopic)

router.route('/group-members')
  .get(authController.protect, authController.checkGroup(), groupController.groupUsers)

module.exports = router;