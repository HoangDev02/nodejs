const express = require('express');
const router = express.Router();

//đây là đối tượng khởi tạo
const CourseController = require('../app/controllers/shopingcontrollers')
const checkAuthenticated = require('../app/middlewares/checkAuthenticated')


router.get('/',checkAuthenticated.checkAuthenticated ,CourseController.index)

module.exports = router