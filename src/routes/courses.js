const express = require('express');
const router = express.Router();

//đây là đối tượng khởi tạo
const CourseController = require('../app/controllers/CourseController')
const checkAuthenticated = require('../app/middlewares/checkAuthenticated')
// const checkTeacher = require('../app/middlewares/teacherMiddlewares')
// newsController.index
router.get('/create' ,CourseController.create)
router.post('/store', CourseController.store)
router.get('/:id/edit', CourseController.edit)
router.post('/handle-form-actions', CourseController.handleFormActions)
router.put('/:id', CourseController.update)
router.patch ('/:id/restore', CourseController.restore)
router.delete('/:id', CourseController.destroy)
router.delete('/:id/force', CourseController.forcedestroy)


router.get('/:slug', CourseController.show)

module.exports = router;   