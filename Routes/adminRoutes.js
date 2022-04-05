const express = require('express');
const adminController = require('../Controllers/adminController');
const authController = require('../Controllers/authController');
const router = express.Router();

//This api-resource route for update and delete specific student
router.route('/')
    .get(authController.protect, authController.restrictTo('admin'), adminController.getAllUsers)
    .post(authController.protect, authController.restrictTo('admin'), adminController.uploadDocument);

//This api-resource route for update and delete specific student
router.route('/:id')
    .delete(authController.protect,authController.restrictTo('admin'), adminController.deleteUser)
    .patch(authController.protect,authController.restrictTo('admin'), adminController.updateUser);
router.route('/document')
    .post(authController.protect,adminController.document, adminController.uploadDocument)


module.exports = router;