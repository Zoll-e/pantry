const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require('fs');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/recipe");
  },
  fileFilter(req, file, cb) {
    cb(undefined, true); // continue with upload
  },

  filename: function (req, file, cb) {
    if (!file.originalname.match(/\.(jpeg|jpg|png|mp4)$/)) {
      cb(new Error("only upload files with jpg or jpeg format."));
    } else {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  },
});

var upload = multer({ storage: storage });

// Upload a picture
router.post(
  "/",
  upload.single("picture"),
  async (req, res) => {
    try {
      res.status(200).send(req.file.path);
    } catch (error) {
      res.status(500).send({
        upload_error: "Error while uploading file...Try again later.",
      });
    }
  },
  (error, req, res, next) => {
    if (error) {
      res.status(500).send({
        upload_error: error.message,
      });
    }
  }
);

//clear
router.delete("/*", async (req, res) => {
  var route = req.params[0];
  try {
    fs.unlinkSync(route);
  } catch (error) {
    res.status(400).send({ get_error: "Error while getting photo." });
  }
});

module.exports = router;
