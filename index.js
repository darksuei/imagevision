const express = require('express');
const app = express();
require('dotenv').config()

const imageRouter = require('./src/routes/imageRoute');

app.use('/api', imageRouter);
app.use('/public', express.static('public'));

app.get('/api',(req, res)=>{
    res.json({"message":"Welcome to image classification API",
                "type": "success",
                "documentation_url": "https://github.com/Suei43/imagevision",
                "author": "Suei",
                "note": "Make a POST request to /api/image-classification to classify an image. You can use the confidenceThreshold query parameter to specify the confidence threshold for the classification. The default value is 0.1. You can also upload multiple images at once by using the multiple attribute in the file input field."})
})

app.listen(process.env.PORT || 3000, ()=>{
    console.log(`Server is running on port https://localhost:${process.env.PORT || 3000}`)
})

module.exports = app;