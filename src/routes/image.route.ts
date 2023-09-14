import Fastify, { FastifyPluginCallback } from 'fastify';
import authMiddleware from '../middlewares/authorization';
// const multipart = require('fastify-multipart')
const fastifyMulter = require('fastify-multer')
const sharp = require('sharp');
const detectObject = require('../utils/detection');

const fastify = Fastify()
// fastify.register(multipart)
fastify.register(fastifyMulter.contentParser)

let upload = fastifyMulter({ dest: 'public/' });

const imageRecognitionHandler: FastifyPluginCallback = async (fastify, opts, next) => {
  fastify.get('/image-recognition', (req,reply) => {
    reply.code(200).send({
      message: "Please send a post request with your image to this route for recognition",
      params: {
        confidenceThreshold: "A number between 0 and 1[optional, default = 0.1]"
      }
    })
  })

  fastify.post('/image-recognition', {preHandler: [ authMiddleware, upload.single('image')]}, async(req: any, reply) => {
    if (req.file && !req.files)
    return reply.code(400).send({ error: 'Please upload an image.' });

  
  // If user specifies a confidence threshold, check if it is between 0 and 1
  if (req.body.confidenceThreshold) {
      if (req.body.confidenceThreshold < 0 || req.body.confidenceThreshold > 1) {
        return reply
        .code(400)
        .send({ error: 'Confidence threshold must be between 0 and 1' });
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
        reply.code(200).send({
          message: 'Image classification successful',
          fileName: req.file.originalname,
          classification: imageClassification,
        });
      }
      else if (req.files && req.files.length > 0) {
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
        reply.code(200).send({
          message: 'Image classification successful',
          classifications: results,
        });
      }
    } catch (err) {
      console.log(err);
      reply.code(500).send({ error: err, message: 'Image classification failed' });
    }
  })

  next()
}

async function processImage(imagePath: any) {
  let processedImageBuffer = await sharp(imagePath)
    .resize(224, 224)
    .toFormat('jpeg')
    .toBuffer();
  return processedImageBuffer;
}

export default imageRecognitionHandler