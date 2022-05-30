const catchAsync = require("../Utils/catchAsync");
const AppError = require("../Utils/appError");
const Filters = require("../Utils/filters");
const FileUpload = require("../Utils/fileUpload");
const multer = require("multer");
const Group = require("../Models/groupModel");
const User = require("../Models/userModel");
const sendEmail = require("../Utils/email");
const ColumnFilter = require("../Utils/updateColumnFilter");


//get all groups
exports.getAllGroups = catchAsync(async (req, res, next) => {
  const Respond = new Filters(Group.find(), req.query).filter().sort().limitFields().paginate();

  const filteredData = await Respond.query;

  // SEND RESPONSE
  res.status(200).json({
    status: "success",
    results: filteredData.length,
    data: {
      filteredData
    }
  });
});

//created group
exports.createGroup = catchAsync(async (req, res, next) => {
  const newGroup = await Group.create(req.body);
  await User.findByIdAndUpdate(req.user.id, { groupID: newGroup.id });
  res.status(200).json({
    status: "success",
    data: {
      group: newGroup
    }
  });
});


//Assign student to group
exports.assignGroup = catchAsync(async (req, res, next) => {
  console.log(req.body.email)
  req.body.email.forEach((email)=>{
    console.log(email)
  })
  const user = await User.findOne({ email: req.body.email, active: true });

  //Check whether user is exists or user doesn't have a group
  if (!user) return next(new AppError("Please enter valid email", 406));
  if (user.groupID) return next(new AppError("This user already have an account", 404));

  user.groupID = req.user.groupID;
  const group = await Group.findById(req.user.groupID);
  await user.save({ validateBeforeSave: false });


  try {
    await sendEmail({
      email: req.body.email,
      subject: "Congratulations!!",
      message: `You have been assign to ${group.name} by ${req.user.name}`
    });

    res.status(200).json({
      status: "success",
      message: "invitation has been sent"
    });

  } catch (err) {
    return next(
      new AppError("There was an error sending the email. Try again later!"),
      500
    );
  }


  res.status(200).json({
    status: "success"

  });
});

//Assign panel member to group
exports.assignPannelGroup = catchAsync(async (req, res, next) => {
  const group = await Group.findById(req.body.group_id);
  const panel_member = await User.findById(req.body.panel_member_id);

  //Check whether user is exists or user doesn't have a group
  if (!group) return next(new AppError('Please select valid group', 406))
  if (group.panel_member_id) return next(new AppError("This group already have an panel member", 404));

  console.log(panel_member)
  //Check whether user is exists or user doesn't have a group
  if (!panel_member) return next(new AppError('Please select valid panel member', 406))
  if (panel_member.role !== 'Panel-Member') return next(new AppError("Who is not a panel member", 404));

  group.panel_member_id = req.body.panel_member_id;
  group.save();


  try {
    await sendEmail({
      email: panel_member.email,
      subject: "Congratulations!!",
      message: `You have been assign to ${group.name} by ${req.user.name}`
    });

    res.status(200).json({
      status: "success",
      message: "invitation has been sent"
    });

  } catch (err) {
    return next(
      new AppError("There was an error sending the email. Try again later!"),
      500
    );
  }


  res.status(200).json({
    status: "success"

  });
});

//Register Topic
exports.registerTopic = catchAsync(async (req, res, next) => {
  if (req.group.researchState === "No" || req.group.researchState === "Decline") {
    req.body.researchState = "Draft";
    const updateGroup = await Group.findByIdAndUpdate(req.user.groupID, req.body, {
      new: true,
      runValidators: true
    });
    res.status(200).json({
      status: "success",
      updated_group: updateGroup
    });
  } else {
    next(new AppError("You alredy have submitted the research topic", 408));
  }

});


exports.groupUsers = catchAsync(async (req, res, next) => {
  const Respond = new Filters(User.find({ groupID: req.user.groupID }), req.query).filter().sort().limitFields().paginate();

  const filteredData = await Respond.query;

  // SEND RESPONSE
  res.status(200).json({
    status: "success",
    results: filteredData.length,
    data: {
      filteredData
    }
  });
});