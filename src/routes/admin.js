const express = require('express')
const router = express.Router()
const adminController = require('../app/controllers/adminController')

router.get('/home', adminController.index)



module.exports = router;