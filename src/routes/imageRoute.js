const express = require('express');
const router = express.Router();

router.get('/recognition',(req, res)=>{
    res.json({ message: 'Image recognition endpoint' });
})

module.exports = router;