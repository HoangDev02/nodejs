const express = require('express')
const router = express.Router()


const userController = require('../app/controllers/Usercontrollers')
const checkAuthenticated = require('../app/middlewares/checkAuthenticated')



router.get('/:id/edit', userController.edit)
router.post('/handle-form-actions', userController.handleFormActions)

router.delete('/:id', userController.destroy)
router.delete('/:id/force', userController.forcedestroy)



module.exports = router;