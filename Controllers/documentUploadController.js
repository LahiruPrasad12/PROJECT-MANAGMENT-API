const Document = require("../Models/documentModel");
const catchAsync = require("../Utils/catchAsync");
const AppError = require("../Utils/appError");
const User = require("../Models/userModel");
const Topic = require("../Models/topicModel");
const FileUpload = require("../Utils/fileUpload");
const multer = require("multer");


const multerStorage = FileUpload.setPath("public/documents/document");
const multerFilter = FileUpload.FileTypeFilter("application");

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

exports.document = upload.single("doc");


exports.uploadDocuments = catchAsync(async (req, res, next) => {

  try {
    console.log(req.user.groupID);
    let topic = await Topic.find({ groupID: req.user.groupID });
    console.log(topic);
    if (topic) {
      let document = {
        receiverType: "staff",
        senderID: req.user.groupID,
        url: req.file.filename,
        receiverID: topic[0].supervisorID,
        Type: "document"
      };
      await Document.create(document);
      res.status(200).json({
        data: document
      });
    } else {
      res.status(401).json({
        data: "you don't have group yet"
      });
    }


  } catch (e) {
    res.status(400).json({
      data: e.message
    });
  }
});

exports.uploadPresentation = catchAsync(async (req, res, next) => {

  try {
    let topic = await Topic.find({ groupID: req.user.groupID });
    console.log(topic);
    if (topic) {
      let document = {
        receiverType: "panel",
        senderID: req.user.groupID,
        url: req.file.filename,
        receiverID: topic[0].panel_member_id,
        Type: "presentation"
      };
      await Document.create(document);
      res.status(200).json({
        data: document
      });
    } else {
      res.status(401).json({
        data: "you don't have group yet"
      });
    }


  } catch (e) {
    res.status(400).json({
      data: e.message
    });
  }
});

exports.uploadFinalThesis = catchAsync(async (req, res, next) => {

  try {
    console.log(req.user.groupID);
    let topic = await Topic.find({ groupID: req.user.groupID });
    console.log(topic);
    if (topic) {
      let document = {
        receiverType: "staff",
        senderID: req.user.groupID,
        url: req.file.filename,
        receiverID: topic[0].supervisorID,
        Type: "final-thesis"
      };
      await Document.create(document);
      res.status(200).json({
        data: document
      });
    } else {
      res.status(401).json({
        data: "you don't have group yet"
      });
    }


  } catch (e) {
    res.status(400).json({
      data: e.message
    });
  }
});

exports.markingSchema = catchAsync(async (req, res, next) => {

  try {
    let document = {
      receiverType: "all",
      senderID: req.user._id,
      url: req.file.filename,
      Type: "marking-schema"
    };
    await Document.create(document);
    res.status(200).json({
      data: document
    });


  } catch (e) {
    res.status(400).json({
      data: e.message
    });
  }
});