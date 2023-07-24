const express = require('express');
const app = express();
require('dotenv').config()

const imageRoute = require('./routes/imageRoute');

app.use('/api', imageRoute);

app.get('/',(req, res)=>{
    res.send("Hello there")
})

app.listen(process.env.PORT || 3000, ()=>{
    console.log(`Server is running on port ${process.env.PORT}.`)
})