import { Request, Response } from 'express';
const { hash } =  require('bcrypt');
const { generateApiKey } = require('../utils/utils')
import { userRepository } from '../index'

const apiKeyController = (req:Request,res:Response) => {
    console.log(req.body)
    const email = (req.body as { email: string }).email;
    const password = (req.body as { password: string }).password;
    if(!email || !password) return res.status(400).json({
        message: "Error",
        note: "Please provide an email and password in the request body."
    })
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
        res.status(201).json({
            message: "Success",
            User: user
        })

    });
}

export default apiKeyController;