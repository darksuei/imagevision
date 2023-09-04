import Fastify, { FastifyPluginCallback } from 'fastify';
import { userRepository } from '../app';
const { config } = require('dotenv')
const { hash } =  require('bcrypt');
const { generateApiKey } = require('../utils/utils')

config();

const fastify = Fastify();

const apiKeyHandler: FastifyPluginCallback = async (fastify, opts, next) => {

    fastify.get('/auth', (request, reply) => {
        reply.code(200).send({
            message: "Success",
            note: "Send a POST request to this url with your email address and password to generate an api key.",
            format: {
                email: "JohnDoe@Happy.com",
                password: "xyz123"
            }
        })
    })

    fastify.post('/auth', (request, reply) => {
        const email = (request.body as { email: string }).email;
        const password = (request.body as { password: string }).password;
        console.log("DETAILS: ",email, password)
        
        hash(password, Number(process.env.SALT_ROUNDS)).then((hash: string) => {
            const API_KEY = generateApiKey(hash)
            const user = {
                email,
                password: hash,
                API_KEY
            }
            
            userRepository.then( data => {
                data.save(user)
            })
            reply.code(201).send({
                message: "Success",
                User: user
            })

        });
    })

}

export default apiKeyHandler
