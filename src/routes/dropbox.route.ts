import Fastify, { FastifyPluginCallback } from 'fastify';
import authMiddleware from '../middlewares/authorization';
import { uploadFileDbx } from '../utils/dropbox';
const fastifyMulter = require('fastify-multer');
const multipart = require('@fastify/multipart');

const fastify = Fastify();


fastify.register(multipart)
fastify.register(fastifyMulter.contentParser)

let upload = fastifyMulter({ dest: 'public/' });


const dropboxHandler: FastifyPluginCallback = (fastify, opts, next) => {
    fastify.get('/save', (req,reply) => {
        reply.code(200).send({
            message: "Please send a post request with your image to this route for recognition",
            params: {
                duration: "Amount of days to keep the image before discarding [optional, default = 1]"
            }
        })
    })

    fastify.post('/save', { preHandler: [ authMiddleware, upload.single('image')] }, (req: any,reply) => {
        uploadFileDbx(req.file.originalname, `/public/${req.file.filename}` )
    })
    next();
}

export default dropboxHandler;