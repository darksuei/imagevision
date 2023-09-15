import express, {Request, Response} from 'express';
const app = express();
require('dotenv').config()

const imageRouter = require('./routes/imageRoute');

app.use('/api', imageRouter);
app.use('/public', express.static('public'));

app.get('*', (req:Request, res:Response)=>{

    const response = {
        status : "Success",
        message : "Welcome to image vision API!",
        documentation_url: "https://github.com/darksuei/imagevision",
        author: "Suei",
        note: "Make a POST request to /api/image-classification to classify an image. You can use the confidenceThreshold query parameter to specify the confidence threshold for the classification. The default value is 0.1. You can also upload multiple images at once by using the multiple attribute in the file input field."
    }
    

    res.status(200).json(response);
})

app.listen(process.env.PORT || 3000, ()=>{
    console.log(`Server is running on port http://localhost:${process.env.PORT || 3000}`)
})

module.exports = app;