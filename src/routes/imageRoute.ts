export {};
import express, {Request, Response} from 'express';
const multer = require('multer');
const sharp = require('sharp');
const detectObject = require('../utils/detection');
import authMiddleware from '../middlewares/auth';

const router = express.Router();
let upload = multer({ dest: 'public/' });

router.post('/image-classification', upload.single('image'), authMiddleware, async (req:any, res:Response) => {
  if (!req.file && !req.files)
    return res.status(400).json({ error: 'Please upload an image.' });

  // If user specifies a confidence threshold, check if it is between 0 and 1
  if (req.body.confidenceThreshold) {
    if (req.body.confidenceThreshold < 0 || req.body.confidenceThreshold > 1) {
      return res
        .status(400)
        .json({ error: 'Confidence threshold must be between 0 and 1' });
    }
  }

  try {
    if (req.file) {
      // If a single image is uploaded, process and detect objects in it
      const processedImageBuffer = await processImage(req.file.path);
      const imageClassification = await detectObject(
        processedImageBuffer,
        req.body.confidenceThreshold || 0.1
      );
      res.status(200).json({
        message: 'Image classification successful',
        fileName: req.file.originalname,
        classification: imageClassification,
      });
    } else if (req.files && req.files.length > 0) {
      // If multiple images are uploaded, process and detect objects in each of them
      const results = [];
      for (const file of req.files) {
        const processedImageBuffer = await processImage(file.path);
        const imageClassification = await detectObject(
          processedImageBuffer,
          req.body.confidenceThreshold || 0.1
        );
        results.push({
          id: file.filename,
          fileName: file.originalname,
          classification: imageClassification,
        });
      }
      res.status(200).json({
        message: 'Image classification successful',
        classifications: results,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err, message: 'Image classification failed' });
  }
});

async function processImage(imagePath:string) {
  let processedImageBuffer = await sharp(imagePath)
    .resize(224, 224)
    .toFormat('jpeg')
    .toBuffer();
  return processedImageBuffer;
}

module.exports = router;