const express = require('express');
const adminController = require('../Controllers/adminController');
const authController = require('../Controllers/authController');
const router = express.Router();

router.route('/')
    .get(authController.protect, adminController.getAllUsers)

module.exports = router;