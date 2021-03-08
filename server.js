const express = require("express");
const app = express();
const multer = require("multer");
const Tesseract = require("tesseract.js");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, res, callback) => {
    callback(null, "./uploads");
  },
  filename: (req, res, callback) => {
    callback(null, res.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.single("image"), (req, res) => {
  console.log(req.file);

  try {
    Tesseract.recognize(`uploads/${req.file.filename}`, "eng", {
      logger: (m) => console.log(m),
    }).then(({ data: { text } }) => {
      return res.json({
        message: text,
      });
    });
  } catch (err) {
    console.error(err);
  }
});

const port = 5000 || process.env.PORT;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use(express.static(path.join(__dirname, "public")));
