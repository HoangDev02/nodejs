const express = require('express')
const router = express.Router()
const adminController = require('../app/controllers/adminController')

router.get('/home', adminController.index)
router.get('/user', adminController.showUser)
router.get('/create', adminController.create)
router.post('/store', adminController.store)
router.get('/stored/courses',adminController.StoredCourses),
router.get('/trash/courses', adminController.trashCourses)

module.exports = router;