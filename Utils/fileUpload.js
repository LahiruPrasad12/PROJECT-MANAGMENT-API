const multer = require('multer');

exports.setPath = (path)=>  multer.diskStorage({
    destination: (req, file, next) => {
      next(null, `${path}`);
    },
    filename: (req, file, next) => {
      const ext = file.mimetype.split('/')[1];
      next(null, `user-${req.user.id}-${Date.now()}.${ext}`);
    }
});

exports.ImageFilter =(type)=> (req, file, next) => {
    if (file.mimetype.startsWith(`${type}`)) {
      next(null, true);
    } else {
      next(new AppError('Not an image! Please upload only images.', 400), false);
    }
};