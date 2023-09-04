import Fastify, { FastifyPluginCallback } from 'fastify';
const { hash } =  require('bcrypt');
import { databaseConnection } from '../utils/dbConnection';


const fastify = Fastify();

const apiKeyHandler: FastifyPluginCallback = async (fastify, opts, next) => {
    const userRepository = await databaseConnection;

    fastify.get('/authenticate', (request, reply) => {
        reply.code(200).send({
            message: "Success",
            note: "Send a POST request to this url with your email address and password to generate an api key.",
            format: {
                email: "JohnDoe@Happy.com",
                password: "xyz123"
            }
        })
    })

    fastify.post('/authenticate', (request, reply) => {
        const email = (request.body as { email: string }).email;
        const password = (request.body as { password: string }).password;
        console.log(email, password)
        
        hash(password, process.env.SALT_ROUNDS).then((hash: string) => {
            console.log(hash)

            const user = {
                email, hash
            }

            // userRepository.save(user)
        });
    })

}

export default apiKeyHandler
