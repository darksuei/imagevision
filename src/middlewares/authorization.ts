import { FastifyRequest, FastifyReply } from "fastify";
import { userRepository } from '../app';
const { validateApiKey } = require('../utils/utils')

const authMiddleware = async (request: FastifyRequest, reply: FastifyReply) => {
    const apiKey = request.headers['x-api-key'] as string;
    console.log(apiKey)

    userRepository.then ( async (userRepository) => {
        const isValidKey = await validateApiKey(userRepository, apiKey);
        if (!apiKey || !isValidKey) {
            reply.code(401).send({ error: 'Unauthorized' });
          }
    })
};

export default authMiddleware;