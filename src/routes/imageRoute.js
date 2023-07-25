const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const detectObject = require('../detection');

const router = express.Router();
let upload = multer({ dest: 'uploads/' })

router.post('/recognition', upload.single('image'), async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: 'Please upload an image' });
    }

    detectObject(req.file.path)
    .then((imageClassification) => {
      res.status(200).json({
        message: 'Image classification successful',
        classification: imageClassification,
      });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ error: 'Something went wrong.' });
    });
});

module.exports = router;