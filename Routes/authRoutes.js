const express = require('express');
const authController = require('../Controllers/authController');
const router = express.Router();

router.post('/signup', authController.signup);
router.post('/signing', authController.login);
router.post('/forget-password', authController.forgotPassword);
router.patch('/reset-password/:token', authController.resetPassword);
router.get('/current-user', authController.protect, authController.currentUser);
router.patch('/update-password', authController.protect, authController.updatePassword);
router.get('/logout', authController.protect, authController.logout);

module.exports = router;