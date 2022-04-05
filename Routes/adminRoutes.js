const express = require('express');
const adminController = require('../Controllers/adminController');
const authController = require('../Controllers/authController');
const router = express.Router();

router.route('/')
    .get(authController.protect, authController.restrictTo('admin'), adminController.getAllUsers)
    .post(authController.protect, authController.restrictTo('admin'), adminController.uploadDocument);

router.route('/:id')
    .delete(authController.protect,authController.restrictTo('admin'), adminController.deleteUser)
    .patch(authController.protect,authController.restrictTo('admin'), adminController.updateUser);
router.route('/document')
    .post(adminController.document, adminController.uploadDocument)
    .patch(authController.protect,authController.restrictTo('admin'), adminController.updateUser);


module.exports = router;