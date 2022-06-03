const catchAsync = require('../Utils/catchAsync');
const AppError = require('../Utils/appError');
const Filters = require('../Utils/filters');
const FileUpload = require('../Utils/fileUpload');
const multer = require('multer');
const Group = require('../Models/groupModel');
const User = require('../Models/userModel');
const Topic = require('../Models/topicModel');
const Document = require('../Models/documentModel');
const sendEmail = require('../Utils/email');
const ColumnFilter = require('../Utils/updateColumnFilter');
const asyncHandler = require("express-async-handler");

const multerStorage = FileUpload.setPath('public/documents/topicdocument')
const multerFilter = FileUpload.FileTypeFilter('application')

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
});

exports.document = upload.single('doc');

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
exports.registerTopicToPanel = catchAsync(async (req, res, next) => {
    const { topic_id, panel_member_id } = req.body;
    req.body.state = 'pane_member_pending'
    const userExists = await User.exists({ _id: panel_member_id });
    if(userExists){
        const filteredBody = filterObj(req.body, 'state', 'panel_member_id');


        let obj = {
            url:req.file.filename,
            type:'student',
            receiverID:req.user.groupID,
            receiverType:'panel',
            senderID:panel_member_id
        }
        const saveDoc = await Document.create(obj)
        console.log(filteredBody)
        const updatedTopic= await Topic.findByIdAndUpdate(topic_id, filteredBody, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            status: 'success',
            data: {
                user: updatedTopic
            }
        });
    }else {
        res.status(400).json({
            data:'please select valid panel member'
        });
    }
})

exports.submitTopicToSupervisor = catchAsync(async (req, res, next) => {

    const { name, category_id, supervisorID } = req.body;
    req.body.state = 'supervisorPending'
    const userExists = await User.exists({ _id: supervisorID });
    if(userExists){
        const obj = new Topic({
            name, category_id, supervisorID
        })
        obj.groupID = req.user.groupID
        const newDocument = await Topic.create(obj);
        res.status(200).json({
            status: 'success',
            data: {
                user: newDocument
            }
        });
    }else {
        res.status(400).json({
            data:'please select valid supervisor'
        });
    }

})

exports.submitTopicToCoSupervisor = catchAsync(async (req, res, next) => {

    const { topic_id,co_supervisorID } = req.body;
    req.body.state = 'co_supervisorPending'
    const filteredBody = filterObj(req.body, 'state', 'co_supervisorID');
    const userExists = await User.exists({ _id: co_supervisorID });
    if(userExists){
        const updatedTopic= await Topic.findByIdAndUpdate(topic_id, filteredBody, {
            new: true,
            runValidators: true
        });
        res.status(200).json({
            status: 'success',
            data: {
                user: updatedTopic
            }
        });
    }else {
        res.status(400).json({
            data:'please select valid co-supervisor'
        });
    }



})

exports.getStaff = catchAsync(async (req, res, next) => {
    const Respond = new Filters(User.find({researchFileId:req.body.category_id}), req.query).filter().sort().limitFields().paginate();

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

exports.getMyTopic = catchAsync(async (req, res, next) => {
    const Respond = new Filters(Topic.find({groupID:req.user.groupID}), req.query).filter().sort().limitFields().paginate();

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

//filter and return column that needed to be updated
const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach(el => {
        if (allowedFields.includes(el)) newObj[el] = obj[el];
    });
    return newObj;
};