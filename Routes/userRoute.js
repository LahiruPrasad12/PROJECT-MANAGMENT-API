const express = require('express');
const userController = require('../Controllers/userController');
const authController = require('../Controllers/authController');
const router = express.Router();

router.get('/', authController.protect, authController.restrictTo('admin'), userController.getAllUsers);

module.exports = router;