const express = require('express');
const userController = require('../Controllers/userController');
const authController = require('../Controllers/authController');
const router = express.Router();

router.route('/')
    .get(authController.protect, authController.restrictTo('user'), userController.getAllUsers)
    .patch(authController.protect, userController.uploadUserPhoto, userController.updateMe)
    .delete(authController.protect, userController.deleteMe)

module.exports = router;