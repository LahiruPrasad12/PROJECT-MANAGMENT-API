const express = require('express');
const superVisor = require('../Controllers/superCosupervisorController');
const authController = require('../Controllers/authController')
const router = express.Router();

router.route('/')
  .patch(authController.protect,authController.restrictTo("supervisor","Co-supervisor"),superVisor.acceptOrDeclineTopic)

router.route('/supervisor')
  .get(authController.protect,authController.restrictTo("supervisor"),superVisor.getSupervisorRequest)
  // .post(authController.protect,authController.restrictTo("supervisor","Co-supervisor"),superVisor.registerTopicToPanel)

router.route('/co-supervisor')
  .get(authController.protect,authController.restrictTo("Co-supervisor"),superVisor.getCoSupervisorRequest)


module.exports = router;