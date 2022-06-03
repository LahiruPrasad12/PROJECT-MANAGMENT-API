const express = require('express');
const document = require('../Controllers/documentUploadController');
const authController = require('../Controllers/authController');
const download = require("../Controllers/fileDownloadController");
const router = express.Router();


router.post('/document', authController.protect, document.document, document.uploadDocuments);
router.post('/presentation', authController.protect, document.document, document.uploadPresentation);
router.post('/final-thesis', authController.protect, document.document, document.uploadFinalThesis);
module.exports = router;