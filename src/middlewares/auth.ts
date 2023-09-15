import { Request, Response, NextFunction } from 'express';
import { userRepository } from '../index';
const { validateApiKey } = require('../utils/utils');

const authMiddleware = async (request: Request, response: Response, next: NextFunction) => {
    const apiKey = request.headers['x-api-key'] as string;
    console.log(apiKey);

    try {
        const userRepositoryInstance = await userRepository;
        const isValidKey = await validateApiKey(userRepositoryInstance, apiKey);

        switch (true) {
            case !apiKey:
                return response.status(401).json({ error: 'Please specify an API key.' });
            case !isValidKey:
                return response.status(401).json({ error: 'Invalid API key.' });
        }
        
        // If the API key is valid, continue to the next middleware or route handler
        next();
    } catch (error) {
        // Handle errors here
        console.error(error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
};

export default authMiddleware;
