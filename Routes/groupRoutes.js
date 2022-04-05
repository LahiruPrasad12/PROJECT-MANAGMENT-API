const express = require('express');
const groupController = require('../Controllers/groupController');
const authController = require('../Controllers/authController')
const router = express.Router();

router.route('/')
    .get(authController.protect, authController.restrictTo('admin'), groupController.getAllGroups)
    .post(authController.protect, groupController.createGroup)
    .patch(groupController.asignGroup)

module.exports = router;