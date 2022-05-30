const Group = require('../Models/groupModel');
const catchAsync = require('../Utils/catchAsync');
const Filters = require("../Utils/filters");
const Topic = require("../Models/topicModel");

exports.getSupervisorRequest = catchAsync(async (req, res, next) => {
  const Respond = await Topic.find({supervisorID:req.user._id})
  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: Respond.length,
    data: {
      Respond
    }
  });
});

exports.getCoSupervisorRequest = catchAsync(async (req, res, next) => {
  const Respond = await Topic.find({supervisorID:req.user._id})
  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: Respond.length,
    data: {
      Respond
    }
  });
});


exports.acceptOrDeclineTopic = catchAsync(async (req, res, next) => {
  const { topic_id, status } = req.body;
  const group = await Topic.findById(topic_id)
  group.state = status
   group.save()

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: `${status} topic`,
  });
});

