const catchAsync = require('../Utils/catchAsync');
const Topic = require('../Models/researchTopicModel');



exports.createTopics = catchAsync(async (req, res, next) => {
    const newTopic = await Topic.create(req.body)
    res.status(200).json({
        status: 'success',
        data: {
            group: newTopic
        }
    });
})