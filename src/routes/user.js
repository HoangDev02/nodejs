const express = require('express')
const router = express.Router()


const userController = require('../app/controllers/Usercontrollers')
const checkAuthenticated = require('../app/middlewares/checkAuthenticated')



router.get('/update',checkAuthenticated.checkAuthenticated, userController.show)
router.put('/:id', userController.update)


module.exports = router;