import Fastify, { FastifyPluginCallback } from 'fastify'
import { userRepository } from '../app';

const fastify = Fastify()

const adminHandler: FastifyPluginCallback = (fastify, opts, next) => {
     fastify.get('/users', async (request, reply) => {
        
        await userRepository.then( async(data) => {
            const response = await data.find();
            reply.send(response)
        })
    })
    next();
} 

export default adminHandler