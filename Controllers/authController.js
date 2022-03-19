const User = require('../Models/userModel');
const catchAsync = require('../Utils/catchAsync');

exports.signup = catchAsync(async (req,res,next)=>{
    const newUser = await User.create(req.body)
    res.status(201).json({
        data : newUser
    })
})