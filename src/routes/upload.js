const express = require('express');
const router = express.Router();
const { uploadImageOCR } = require('../controllers/uploadController');
const { uploadImageHandler } = require('../middleware/uploadHandler');
const { PATH } = require('../constants/paths');

router.post(
  '/',
  uploadImageHandler(PATH.UPLOADS).single('image'),
  uploadImageOCR
);

module.exports = router;
