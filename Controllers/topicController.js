const catchAsync = require('../Utils/catchAsync');
const AppError = require('../Utils/appError');
const Filters = require('../Utils/filters');
const FileUpload = require('../Utils/fileUpload');
const multer = require('multer');
const Group = require('../Models/groupModel');
const User = require('../Models/userModel');
const Topic = require('../Models/topicModel');
const sendEmail = require('../Utils/email');
const ColumnFilter = require('../Utils/updateColumnFilter');



//get all topics
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
});




//Register Topic
exports.registerTopic = catchAsync(async (req, res, next) => {
    if (req.group.researchState === 'No' || req.group.researchState === 'Decline') {
        req.body.researchState = 'Draft'
        const updateGroup = await Group.findByIdAndUpdate(req.user.groupID, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json({
            status: 'success',
            updated_group: updateGroup
        })
    }else{
        next(new AppError('You alredy have submitted the research topic',408))
    }

})