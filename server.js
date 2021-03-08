const { createVerify } = require("crypto");
const express = require("express");
const app = express();
const fs = require("fs");
const multer = require("multer");
const { TesseractWorker } = require("tesseract.js");
const worker = new TesseractWorker();

const storage = multer.diskStorage({
  destination: (req, res, callback) => {
    callback(null, "./uploads");
  },
  filename: (req, res, callback) => {
    callback(null, res.file);
  },
});

const port = 5000 | process.env.PORT;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
