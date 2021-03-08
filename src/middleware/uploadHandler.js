const path = require('path');
const multer = require('multer');
const { PATH } = require('../constants/paths');
const ErrorResponse = require('../utils/errorResponse');

exports.uploadImageHandler = (imgPath, size = 1024 * 1024 * 10) => {
  const storage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, imgPath);
    },
    filename: (req, file, callback) => {
      callback(null, file.originalname);
    },
  });

  const filter = (req, file, callback) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      callback(null, true);
    } else {
      callback(new ErrorResponse('File type is not supported!', 403), false);
    }
  };

  const upload = multer({
    storage: storage,
    limits: { fileSize: size },
    fileFilter: filter,
  });

  return upload;
};
