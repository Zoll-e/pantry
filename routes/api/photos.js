const express = require('express');
const multer = require('multer');
const Photo = require('../../model/Photo');
const router = express.Router();

const upload = multer({
  limits: {
    fileSize: 16000000 // max file size 1MB = 1000000 bytes
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpeg|jpg|png)$/)) {
      cb(new Error('only upload files with jpg or jpeg format.'));
    }
    cb(undefined, true); // continue with upload
  }
});

// Upload a photo
router.post(
  '/',
  upload.single('photo'),
  async (req, res) => {
    try {
      const photo = new Photo(req.body);
      const file = req.file.buffer;
      photo.photo = file;

      await photo.save();
      res.status(201).json({ _id: photo._id });
    } catch (error) {
      res.status(500).send({
        upload_error: 'Error while uploading file...Try again later.'
      });
    }
  },
  (error, req, res, next) => {
    if (error) {
      res.status(500).send({
        upload_error: error.message
      });
    }
  }
);

// Get all photos
router.get('/photos', async (req, res) => {
  try {
    const photos = await Photo.find({});
    res.send(photos);
  } catch (error) {
    res.status(500).send({ get_error: 'Error while getting list of photos.' });
  }
});

// Get photo by id
router.get('/:id', async (req, res) => {
  try {
    const result = await Photo.findById(req.params.id);
    res.set('Content-Type', 'image/jpeg');
    res.send(result.photo);
  } catch (error) {
    res.status(400).send({ get_error: 'Error while getting photo.' });
  }
});

module.exports = router;
