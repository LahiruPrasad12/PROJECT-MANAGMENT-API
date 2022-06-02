const catchAsync = require('../Utils/catchAsync');
const Topic = require('../Models/researchTopicModel');
const Filters = require("../Utils/filters");



exports.createTopics = catchAsync(async (req, res, next) => {
    const newTopic = await Topic.create(req.body)
    res.status(200).json({
        status: 'success',
        data: {
            group: newTopic
        }
    });
})

exports.getTopics = catchAsync(async (req, res, next) => {
    const Respond = new Filters(Topic.find(), req.query).filter().sort().limitFields().paginate();

    const filteredData = await Respond.query;

    // SEND RESPONSE
    res.status(200).json({
        status: 'success',
        results: filteredData.length,
        data: {
            filteredData
        }
    });
})

