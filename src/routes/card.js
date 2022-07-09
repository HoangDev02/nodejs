const express = require('express');
const router = express.Router();

//đây là đối tượng khởi tạo
const cardController = require('../app/controllers/cardcontrollers')
const checkAuthenticated = require('../app/middlewares/checkAuthenticated')


router.get('/',checkAuthenticated.checkAuthenticated ,cardController.show)
// router.get('/',cardController.createCard )
router.post('/',cardController.store )
module.exports = router