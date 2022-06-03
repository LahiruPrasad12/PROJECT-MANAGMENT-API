const Document = require("../Models/documentModel");
const catchAsync = require("../Utils/catchAsync");
const AppError = require("../Utils/appError");
const User = require("../Models/userModel");
const Topic = require("../Models/topicModel");

exports.uploadDocuments = catchAsync(async (req, res, next) => {

  try {
    let document = {
      receiverType: "panel",
      senderID: req.user.groupId,
      url: req.file.filename
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