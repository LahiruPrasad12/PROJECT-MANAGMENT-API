const express = require('express');
const userController = require('../Controllers/userController');
const authController = require('../Controllers/authController');
const router = express.Router();

router.route('/')
    .get(authController.protect, authController.restrictTo('admin'), userController.getAllUsers)
router.delete('/:id',authController.protect,authController.restrictTo('admin'), authController.deleteUser);
module.exports = router;