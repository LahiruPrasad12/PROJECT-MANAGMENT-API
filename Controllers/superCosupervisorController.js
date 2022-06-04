const Group = require("../Models/groupModel");
const catchAsync = require("../Utils/catchAsync");
const Filters = require("../Utils/filters");
const Topic = require("../Models/topicModel");
const Document = require("../Models/documentModel");
const User = require("../Models/userModel");

exports.getSupervisorRequest = catchAsync(async (req, res, next) => {
  const Respond = await Topic.find({
    supervisorID: req.user._id,
    state: { $eq: "supervisorPending" },
  });
  // SEND RESPONSE
  res.status(200).json({
    status: "success",
    results: Respond.length,
    data: {
      Respond,
    },
  });
});

exports.getPanelRequest = catchAsync(async (req, res, next) => {
  const Respond = await Topic.find({
    panel_member_id: req.user._id,
    state: { $eq: "pane_member_pending" },
  });

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
  const Respond = await Topic.find({
    co_supervisorID: req.user._id,
    state: { $eq: "co_supervisorPending" },
  });
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
    const topic = await Topic.findById(topic_id);
    console.log(topic);
    if (status === "decline" && req.user.role === "Panel-Member") {
      const document = await Document.find({
        senderID: topic.groupID,
        receiverType: { $eq: "panel" },
      });
      console.log(document);
      if (document) {
        document[0].active = false;
        document[0].save();
      }
    }
    topic.state = status;
    topic.save();

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

exports.getOurPanelMember = catchAsync(async (req, res, next) => {
  try {
    console.log(req.user.groupID);
    const panelMember = await User.find({
      groupID: req.user.groupID,
      role: { $eq: "Panel-Member" },
    });

    // SEND RESPONSE
    res.status(200).json({
      status: 200,
      results: panelMember,
    });
  } catch (e) {
    res.status(500).json({
      status: 500,
      results: e.message,
    });
  }
});
