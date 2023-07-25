const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const tf = require('@tensorflow/tfjs-node');
const detectObject = require('../detection');

const router = express.Router();
let upload = multer({ dest: 'uploads/' })

router.post('/recognition', upload.single('image'), async (req, res) => {
    if (!req.file)
      return res.status(400).json({ error: 'Please upload an image' });
  
    const processedImageBuffer = await sharp(req.file.path)
    .resize(224, 224)
    .toFormat('jpeg')
    .toBuffer();

    detectObject(processedImageBuffer)
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