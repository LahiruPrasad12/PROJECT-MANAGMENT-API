const express = require('express');
const authController = require('../Controllers/authController');
const router = express.Router();

router.post('/signup', authController.signup);
router.post('/signing', authController.login);
router.post('/forget-password', authController.forgotPassword);
router.patch('/reset-password/:token', authController.resetPassword);
router.patch('/update-password', authController.updatePassword);

module.exports = router;