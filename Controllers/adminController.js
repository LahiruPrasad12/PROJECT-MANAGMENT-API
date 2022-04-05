const User = require('../Models/userModel');
const AppError = require('../Utils/appError');
const catchAsync = require('../Utils/catchAsync');
const Filters = require('../Utils/filters');


//get all users
exports.getAllUsers = catchAsync(async (req, res, next) => {
    const Respond = new Filters(User.find(),req.query).filter().sort().limitFields().paginate();
  
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

  

 //admin update user
 exports.updateUser = catchAsync(async (req, res, next) => {

    // Filtered out unwanted fields names that are not allowed to be updated
    const filteredBody = filterObj(req.body, 'name', 'email');
  
    // Update user document
    const updatedUser = await User.findByIdAndUpdate(req.params.id, filteredBody, {
      new: true,
      runValidators: true
    });
  
    res.status(200).json({
      status: 'success',
      data: {
        user: updatedUser
      }
    });
  });


//admin delete user
exports.deleteUser = catchAsync(async (req, res, next) => {
    await User.findByIdAndUpdate(req.params.id, { active: false });
  
    res.status(204).json({
      status: 'success',
      data: null
    });
  });
  

//filter and return column that needed to be updated
const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach(el => {
      if (allowedFields.includes(el)) newObj[el] = obj[el];
    });
    return newObj;
  };