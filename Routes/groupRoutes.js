const express = require('express');
const groupController = require('../Controllers/groupController');
const authController = require('../Controllers/authController')
const router = express.Router();

router.route('/')
    .post(groupController.createGroup)

module.exports = router;