const asyncHandler = require('../middleware/asyncHandler');
const Tesseract = require('tesseract.js');
const { PATH } = require('../constants/paths');

//@desc   Upload image for OCR
//@route  POST /upload
exports.uploadImageOCR = asyncHandler(async (req, res, next) => {
  try {
    Tesseract.recognize(`${PATH.UPLOADS}/${req.file.filename}`, 'eng', {
      logger: (proc) => console.log(proc),
    }).then(({ data: { text } }) => {
      return res.json({
        message: text,
      });
    });
  } catch (err) {
    console.error(err);
  }
});
