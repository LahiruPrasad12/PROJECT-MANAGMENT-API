const catchAsync = require("../Utils/catchAsync");
const AppError = require("../Utils/appError");
const Topic = require("../Models/topicModel");
const Document = require("../Models/documentModel");

exports.downloadTopicDocument = catchAsync(async (req, res, next) => {
  try{
    console.log('ava')
    console.log(req.user._id)
    const Respond = await Document.find({receiverID:req.user._id});
    console.log(Respond[0].url)
    // SEND RESPONSE
    res.download(`public/documents/topicdocument/${Respond[0].url}`)
  }catch (e) {
    res.status(500).json({
      status: 500,
      results: e.message
    });
  }
});