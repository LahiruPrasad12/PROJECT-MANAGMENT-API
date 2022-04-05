const express = require('express');
const userController = require('../Controllers/userController');
const authController = require('../Controllers/authController');
const router = express.Router();

//This resource-route used for update their dtails
router.route('/')
    .patch(authController.protect, userController.uploadUserPhoto, userController.updateMe)
    .delete(authController.protect, userController.deleteMe)


//This api route used for groupworks
router.route('/group')
    .patch(authController.protect, userController.uploadUserPhoto, userController.updateMe)
    .delete(authController.protect, userController.deleteMe)


module.exports = router;