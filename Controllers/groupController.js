const catchAsync = require('../Utils/catchAsync');
const AppError = require('../Utils/appError');
const Filters = require('../Utils/filters');
const FileUpload = require('../Utils/fileUpload');
const multer = require('multer');
const Group = require('../Models/groupModel');
const User = require('../Models/userModel');
const sendEmail = require('../Utils/email');
const ColumnFilter = require('../Utils/updateColumnFilter');



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

//created group
exports.createGroup = catchAsync(async (req, res, next) => {
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
exports.assignGroup = catchAsync(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email, active: true });

    //Check whether user is exists or user doesn't have an group
    if (!user) return next(new AppError('Please enter valid email', 406))
    if (user.groupID) return next(new AppError('This user already have an account', 404))

    user.groupID = req.user.groupID
    const group = await Group.findById(req.user.groupID)
    await user.save({ validateBeforeSave: false })


    try {
        await sendEmail({
            email: req.body.email,
            subject: 'Congratulations!!',
            message: `You have been assign to ${group.name} by ${req.user.name}`
        });

        res.status(200).json({
            status: 'success',
            message: 'invitation has been sent'
        });

    } catch (err) {
        return next(
            new AppError('There was an error sending the email. Try again later!'),
            500
        );
    }


    res.status(200).json({
        status: 'success',

    });
})



//Register Topic
exports.registerTopic = catchAsync(async (req, res, next) => {
    if (req.group.researchState === 'No' || req.group.researchState === 'Decline') {
        const filteredBody = ColumnFilter.filterObj(req.body, 'topicName', 'researchFileId');
        filteredBody.researchState = 'Draft'
        const updateGroup = await Group.findByIdAndUpdate(req.user.groupID, filteredBody, {
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