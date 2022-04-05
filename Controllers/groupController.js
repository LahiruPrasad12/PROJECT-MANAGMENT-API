const catchAsync = require('../Utils/catchAsync');
const AppError = require('../Utils/appError');
const Filters = require('../Utils/filters');
const FileUpload = require('../Utils/fileUpload');
const multer = require('multer');
const Group = require('../Models/groupModel');
const User = require('../Models/userModel');



//get all groups
exports.getAllGroups = catchAsync(async (req, res, next) => {
    const Respond = new Filters(Group.find(), req.query).filter().sort().limitFields().paginate();

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


exports.createGroup = catchAsync(async(req,res,next)=>{
    const newGroup = await Group.create(req.body)
    await User.findByIdAndUpdate(req.user.id, { groupID: newGroup.id })
    res.status(200).json({
        status: 'success',
        data: {
            group: newGroup
        }
    });
})

//Assign student to group
exports.assignGroup = catchAsync(async (req,res,next)=>{
    const user = await User.findOne({ email: req.body.email , active:true });
    if(!user) return next(new AppError('Please enter valid email',402))
    user.groupID = req.user.groupID
    await user.save({ validateBeforeSave: false })
    res.status(200).json({
        status: 'success',
        
    });
})