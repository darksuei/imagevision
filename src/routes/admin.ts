import Fastify, { FastifyRequest, FastifyReply, FastifyPluginCallback } from 'fastify'
import { userRepository } from '../app';
import authMiddleware from '../middlewares/authorization';

const adminHandler: FastifyPluginCallback = (fastify, opts, next) => {

     fastify.get('/users', { preHandler: authMiddleware }, async (request, reply) => {
        
        await userRepository.then( async(data) => {
            const response = await data.find();
            reply.send(response)
        })
    })
    next();
} 

export default adminHandler