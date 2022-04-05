const express = require('express');
const userController = require('../Controllers/userController');
const authController = require('../Controllers/authController');
const router = express.Router();

router.route('/')
    .get(authController.protect, authController.restrictTo('admin'), userController.getAllUsers)
    .delete(authController.protect, userController.deleteUser)
router.delete('/:id', authController.resetPassword);
module.exports = router;