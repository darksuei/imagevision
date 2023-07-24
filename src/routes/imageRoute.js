const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const tf = require('@tensorflow/tfjs-node');

const router = express.Router();
let upload = multer({ dest: 'uploads/' })

router.post('/recognition', upload.single('image'), async (req, res)=>{
    try{
        const imagePath = req.file.path;
        const processedImage = await sharp(imagePath).resize(224, 224).toBuffer();


        res.status(200).json({ message: "Image received." })
    }catch(err){
        console.error(err)
        res.status(500).json({ message: "Image recognition failed." })
    }
})

module.exports = router;