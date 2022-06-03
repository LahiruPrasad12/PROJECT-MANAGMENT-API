const express = require('express');
const download = require('../Controllers/fileDownloadController');
const authController = require("../Controllers/authController");

const router = express.Router();

router.get('/topicDoc', authController.protect, download.downloadTopicDocument);
router.get('/signing', authController.login);

module.exports = router;