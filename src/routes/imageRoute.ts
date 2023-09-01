import Fastify, { FastifyPluginCallback, FastifyRequest } from 'fastify';
const multipart = require('fastify-multipart')
const fastifyMulter = require('fastify-multer')
const sharp = require('sharp');
const detectObject = require('../utils/detection');
const {join} = require('path');

const fastify = Fastify()
fastify.register(multipart)
fastify.register(fastifyMulter.contentParser)

let upload = fastifyMulter({ dest: 'public/' });

const imageRecognitionHandler: FastifyPluginCallback = async (fastify, opts, next) => {

  fastify.get('/image-classification', async (req:any, reply) => {
    const processedImageBuffer = await processImage(join(__dirname,'../../public/download.jpeg'));
    const imageClassification = await detectObject(
      processedImageBuffer,
      0.1
    );
    reply.code(200).send({
      message: 'Image classification successful',
      classification: imageClassification,
    });
  })

  fastify.post('/image-classification', {preHandler: upload.single('image')}, async(req: any, reply) => {
    const body = req.body 
    if (req.file && !body.files)
    return reply.code(400).send({ error: 'Please upload an image.' });

  // If user specifies a confidence threshold, check if it is between 0 and 1
    if (body.confidenceThreshold) {
      if (body.confidenceThreshold < 0 || body.confidenceThreshold > 1) {
        return reply
          .code(400)
          .send({ error: 'Confidence threshold must be between 0 and 1' });
      }
    }

    try {
      if (body.file) {
        // If a single image is uploaded, process and detect objects in it
        const processedImageBuffer = await processImage(req.file.path);
        const imageClassification = await detectObject(
          processedImageBuffer,
          body.confidenceThreshold || 0.1
        );
        reply.code(200).send({
          message: 'Image classification successful',
          fileName: body.file.originalname,
          classification: imageClassification,
        });
      }
      else if (body.files && body.files.length > 0) {
        // If multiple images are uploaded, process and detect objects in each of them
        const results = [];
        for (const file of body.files) {
          const processedImageBuffer = await processImage(file.path);
          const imageClassification = await detectObject(
            processedImageBuffer,
            body.confidenceThreshold || 0.1
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