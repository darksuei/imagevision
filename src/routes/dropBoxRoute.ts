import { Router, Request, Response, NextFunction } from 'express';
import authMiddleware from '../middlewares/auth';
const { uploadFileDbx } = require('../utils/dropbox');
const multer = require('multer');

const router = Router();

let upload = multer({ dest: 'public/' });


router.get('/save', (request:Request,response:Response) => {

    response.status(200).json({
        message: "Please send a post request with your file for temporary storage. Don't forget to add your api-key as an [x-api-key] header. Dont have one? Make a GET request to /api/auth for more information.",
        note: "The file will be deleted after the time duration has been exceeded.",
        params: {
            duration: "Amount of days to keep the image before discarding [optional, default = 1]"
        }
    })

})

router.post('/save', authMiddleware, upload.single('image'), (request:any, response:Response, next:NextFunction) => {
    console.log(request.file.originalname, `/public/${request.file.filename}` )
    uploadFileDbx(request.file.originalname, `/public/${request.file.filename}` )
    return response.status(201).json({
        message: "File uploaded successfully!",
        fileName: request.file.originalname,
        fileID: request.file.filename
    })
})


module.exports = router;