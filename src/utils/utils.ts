const { createHash } = require('crypto')

const generateApiKey = (key:string) => {

    const apiKey: string = createHash('sha-256').update(key).digest('hex');

    return apiKey;
}

module.exports = {
    generateApiKey
}