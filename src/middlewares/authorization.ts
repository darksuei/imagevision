import { FastifyRequest, FastifyReply } from "fastify";
import { userRepository } from '../app';
const { validateApiKey } = require('../utils/utils')

const authMiddleware = async (request: FastifyRequest, reply: FastifyReply) => {
    const apiKey = request.headers['x-api-key'] as string;
    console.log(apiKey)

    userRepository.then ( async (userRepository) => {
        const isValidKey = await validateApiKey(userRepository, apiKey);
        
        switch (true) {
            case !apiKey:
              reply.code(401).send({ error: 'Please specify an API key.' });
              break;
            case !isValidKey:
              reply.code(401).send({ error: 'Invalid API key.' });
              break;
          }
    })
};

export default authMiddleware;