const express = require('express');
const router = express.Router();
const {
  uploadImageOCR,
  uploadMathPixAPI,
} = require('../controllers/uploadController');
const { uploadImageHandler } = require('../middleware/uploadHandler');
const { PATH } = require('../constants/paths');

router.post(
  '/',
  uploadImageHandler(PATH.UPLOADS).single('image'),
  uploadImageOCR
);

router.post(
  '/mathpix',
  uploadImageHandler(PATH.UPLOADS).single('image'),
  uploadMathPixAPI
);

module.exports = router;
