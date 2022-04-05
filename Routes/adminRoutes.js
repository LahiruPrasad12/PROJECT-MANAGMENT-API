const express = require('express');
const userController = require('../Controllers/userController');
const authController = require('../Controllers/authController');
const router = express.Router();

router.route('/')
    .get(authController.protect, authController.restrictTo('admin'), userController.getAllUsers);

router.route('/:id')
    .delete(authController.protect,authController.restrictTo('admin'), authController.deleteUser)
    .patch(authController.protect,authController.restrictTo('admin'), authController.updateUser);


module.exports = router;