const catchAsync = require("../Utils/catchAsync");
const feedBack = require("../Models/feedBackModel");
const User = require("../Models/userModel");


exports.sendFeedback = catchAsync(async (req, res, next) => {
  req.body.sender_id = req.user._id
  await feedBack.create(req.body);

  res.status(200).json({
    status: "success",
    data: "feedback send successfully"
  });
});

exports.getFeedback = catchAsync(async (req, res, next) => {
  let respond = await feedBack.find({receiver_id:req.user.groupID});

  res.status(200).json({
    status: "success",
    data: respond
  });
});
