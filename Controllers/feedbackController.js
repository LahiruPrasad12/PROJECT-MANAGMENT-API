const catchAsync = require("../Utils/catchAsync");
const feedBack = require("../Models/feedBackModel");


exports.sendFeedback = catchAsync(async (req, res, next) => {
  req.body.sender_id = req.user._id
  await feedBack.create(req.body);

  res.status(200).json({
    status: "success",
    data: "feedback send successfully"
  });
});
