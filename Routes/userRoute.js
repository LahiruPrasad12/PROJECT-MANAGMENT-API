const express = require('express');
const userController = require('../Controllers/userController');
const authController = require('../Controllers/authController');
const router = express.Router();

router.get('/', authController.protect, authController.restrictTo('admin'), userController.getAllUsers);
router.patch('/', authController.protect, userController.updateMe);
router.delete('/', authController.protect, userController.deleteMe);

module.exports = router;