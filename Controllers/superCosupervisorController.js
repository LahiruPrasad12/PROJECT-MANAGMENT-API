const Group = require("../Models/groupModel");
const catchAsync = require("../Utils/catchAsync");
const Filters = require("../Utils/filters");
const Topic = require("../Models/topicModel");
const Document = require("../Models/documentModel");

exports.getSupervisorRequest = catchAsync(async (req, res, next) => {
  const Respond = await Topic.find({ supervisorID: req.user._id });
  // SEND RESPONSE
  res.status(200).json({
    status: "success",
    results: Respond.length,
    data: {
      Respond,
    },
  });
});

exports.getCoSupervisorRequest = catchAsync(async (req, res, next) => {
  const Respond = await Topic.find({ supervisorID: req.user._id });
  // SEND RESPONSE
  res.status(200).json({
    status: "success",
    results: Respond.length,
    data: {
      Respond,
    },
  });
});

exports.acceptOrDeclineTopic = catchAsync(async (req, res, next) => {
  try {
    const { topic_id, status } = req.body;
    const group = await Topic.findById(topic_id);
    if (status === "decline") {
      const document = await Document.find({ senderID: group._id });
      if (document) {
        document.active = false;
        document.save();
      }
    }
    group.state = status;
    group.save();

    // SEND RESPONSE
    res.status(200).json({
      status: "success",
      results: `${status} topic`,
    });
  } catch (e) {
    res.status(500).json({
      status: 500,
      results: e.message,
    });
  }
});
