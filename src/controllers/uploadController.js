const asyncHandler = require('../middleware/asyncHandler');
const Tesseract = require('tesseract.js');
const { PATH } = require('../constants/paths');
const path = require('path');
const fs = require('fs');
const http = require('http');
const imageToURI = require('image-to-uri');

//@desc   Upload image for OCR
//@route  POST /upload
exports.uploadImageOCR = asyncHandler(async (req, res, next) => {
  try {
    const image = req.file.filename;

    const resolvedPath = path.resolve(PATH.UPLOADS, image);

    Tesseract.recognize(resolvedPath, 'eng', {
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

//@desc   Upload image to MathPIX API
//@route  POST /upload/mathpix
exports.uploadMathPixAPI = asyncHandler(async (req, res, next) => {
  const image = req.file.filename;

  const resolvedPath = path.resolve(PATH.UPLOADS, image);

  imageBase64 = imageToURI(resolvedPath);

  const body = JSON.stringify({
    src: imageBase64,
    formats: ['text', 'data', 'html'],
    data_options: {
      include_asciimath: true,
      include_latex: true,
    },
  });

  const options = {
    hostname: process.env.API_HOST,
    path: process.env.API_PATH,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(body),
      APP_ID: process.env.APP_ID,
      APP_KEY: process.env.APP_KEY,
    },
  };

  http
    .request(options, (httpres) => {
      let data = [];
      httpres.on('data', (d) => {
        data.push(d.toString());
      });
      httpres.on('end', () => {
        // return res.status(200).json({
        //   jsonData,
        // });
        console.log(JSON.stringify(data));
      });
    })
    .on('error', console.error)
    .end(body);
});
