import {Router, Request, Response} from 'express';
import apiKeyController from '../controllers/apiKeyController';

const router: Router = Router();

router.get('/auth', (req: Request, res: Response) => {
    
    return res.status(200).json({
        message: "Success",
        note: "Send a POST request to this url with your email address and password to generate an api key.",
        format: {
            email: "JohnDoe@Happy.com",
            password: "xyz123"
        }
    })

});

router.post('/auth', apiKeyController)

module.exports = router;