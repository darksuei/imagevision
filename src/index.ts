import express, {Request, Response} from 'express';
const app = express();
const cors = require('cors');
import { AppDataSource } from '../ORMconfig';
import { Users } from './entities/Users'
import { databaseConnection } from './utils/database';
import bodyParser from 'body-parser';

const environment = process.env.NODE_ENV || 'development';
const envFileName = `.env.${environment}`;

require('dotenv').config({ path: envFileName })

const imageRouter = require('./routes/imageRoute');
const apiKeyRouter = require('./routes/apiKeyRoute');

export const userRepository = databaseConnection(Users);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use('/api', imageRouter);
app.use('/api', apiKeyRouter);
app.use('/public', express.static('public'));

app.get('*', (req:Request, res:Response)=>{

    const response = {
        status : "Success",
        message : "Welcome to image vision API!",
        documentation_url: "https://github.com/darksuei/imagevision",
        author: "Suei",
        note: "Make a POST request to /api/image-classification to classify an image. You can use the confidenceThreshold query parameter to specify the confidence threshold for the classification. The default value is 0.1. You can also upload multiple images at once by using the multiple attribute in the file input field."
    }
    

    return res.status(200).json(response);
})

app.listen(process.env.PORT || 3000, ()=>{
    console.log(`Server is running on port http://localhost:${process.env.PORT || 3000}`)
})

module.exports = app;