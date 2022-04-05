const Group = require('../Models/groupModel');
const catchAsync = require('../Utils/catchAsync');
const AppError = require('../Utils/appError');
const Filters = require('../Utils/filters');
const FileUpload = require('../Utils/fileUpload');
const multer = require('multer');


exports.createGroup = catchAsync(async(req,res,next)=>{
    const newGroup = await Group.create(req.body)
    res.status(200).json({
        status: 'success',
        data: {
            group: newGroup
        }
    });
})