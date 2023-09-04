import Fastify from 'fastify'
import {config} from 'dotenv'
import imageRecognitionHandler from './routes/imageRoute'
import { AppDataSource } from '../typeormconfig'
import { Users } from './entities/Users'
import { databaseConnection } from './utils/dbConnection'
import apiKeyHandler from './routes/apiKey'

export const userRepository = databaseConnection(Users);

config()

const PORT = process.env.PORT as number|undefined

const fastify = Fastify({
    logger: true
})

fastify.register(apiKeyHandler, { prefix: '/api'})
fastify.register(imageRecognitionHandler, { prefix: '/api'})

fastify.get('/*', (req, reply) => {
    return reply.status(200).send({
        status : "Success",
        message : "Welcome to image vision API!",
        documentation_url: "https://github.com/Suei43/imagevision",
        author: "Suei",
        note: "Make a POST request to /api/image-classification to classify an image. You can use the confidenceThreshold query parameter to specify the confidence threshold for the classification. The default value is 0.1. You can also upload multiple images at once by using the multiple attribute in the file input field."
    })
})

const start = async () => {
    try{
        fastify.listen({ 
            port: PORT || 3000,
            host: '0.0.0.0'
         })
        fastify.log.info(`Server running: ${fastify.server.address}`)
    }catch(error){
        fastify.log.error(error)
    }
}

start()
