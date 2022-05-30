const User = require('../Models/userModel');
const Document = require('../Models/documentModel');
const AppError = require('../Utils/appError');
const catchAsync = require('../Utils/catchAsync');
const Filters = require('../Utils/filters');
const FileUpload = require('../Utils/fileUpload');
const multer = require('multer');



/**Upload a document */

const multerStorage = FileUpload.setPath('public/pdf/admin')
const multerFilter = FileUpload.FileTypeFilter('application')

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
});

exports.document = upload.single('doc');


//upload document
exports.uploadDocument = catchAsync(async (req, res, next) => {
    try {
        const { name, ownerType, ownerId } = req.body;
        const url = req.file.filename
        const obj = new Document({
            name, url, ownerType, ownerId
        })
        const newDocument = await Document.create(obj);
        res.status(200).json({
            status: 'success',
            data: {
                user: newDocument
            }
        });
    } catch (e) {

    }
});

//get all users
exports.getAllUsers = catchAsync(async (req, res, next) => {
    const Respond = new Filters(User.find({active:true}).select('+active'), req.query).filter().sort().limitFields().paginate();

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

    console.log(req.body)
    // Filtered out unwanted fields names that are not allowed to be updated
    const filteredBody = filterObj(req.body, 'role');

    // Update user document
    const updatedUser = await User.findByIdAndUpdate(req.body.staff_id, filteredBody, {
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

exports.getAlRoles = catchAsync(async (req, res, next) => {
    const Respond = await User.find();
    console.log(Respond)
    let group = groupBy('role',Respond)

    // SEND RESPONSE
    res.status(200).json({
        status: 'success',
        results: group.length,
        data: {
            group
        }
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


function groupBy(key, array) {
    const result = [];
    for (let i = 0; i < array.length; i++) {
        let added = false;
        for (let j = 0; j < result.length; j++) {
            if (result[j][key] === array[i][key]) {
                result[j].items.push(array[i]);
                added = true;
                break;
            }
        }
        if (!added) {
            const entry = { items: [] };
            entry[key] = array[i][key];
            entry.items.push(array[i]);
            result.push(entry);
        }
    }
    return result;
}