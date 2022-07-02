const express = require('express');
const router = express.Router();

//đây là đối tượng khởi tạo
const MeController = require('../app/controllers/MeController')
const checkAuthenticated = require('../app/middlewares/checkAuthenticated')

// newsController.index

router.get('/stored/courses',checkAuthenticated.checkAuthenticated, MeController.StoredCourses),
router.get('/trash/courses', MeController.trashCourses)

module.exports = router;   