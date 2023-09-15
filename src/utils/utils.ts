const { createHash } = require('crypto')

const generateApiKey = (key:string) => {

    const apiKey: string = createHash('sha-256').update(key).digest('hex');

    return apiKey;
}

const validateApiKey = async (userRepository: any, key:string) => {
        const user = await userRepository.findOne({
            where: {
            API_KEY: key,
            },
        });
        return user ? true : false    
}

module.exports = {
    generateApiKey,
    validateApiKey
}