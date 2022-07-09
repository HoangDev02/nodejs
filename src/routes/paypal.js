const express = require('express');
const router = express.Router();
const paypalController = require('../app/controllers/paypalControllers')

router.get('/checkout', paypalController.show )
router.post('/pay',paypalController.createPaypal)
router.get('/cancle', paypalController.create)
router.get('/success', paypalController.Pay)
router.get('/cancel', paypalController.Cancelled);



module.exports = router;   

