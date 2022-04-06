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

const multerStorage = FileUpload.setPath('public/pdf/admin')
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
exports.registerTopic = catchAsync(async (req, res, next) => {
        const { name, state, researchFieldID,supervisorID } = req.body;
        const url = req.file.filename
        const obj = new Topic({
            name,url, state, researchFieldID,supervisorID
        })
        obj.groupID = req.user.groupID
        const newDocument = await Topic.create(obj);
        res.status(200).json({
            status: 'success',
            data: {
                user: newDocument
            }
        });
   
})