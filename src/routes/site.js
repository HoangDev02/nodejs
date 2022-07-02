const express = require('express');
const router = express.Router();

//đây là đối tượng khởi tạo
const SiteController = require('../app/controllers/SiteController')


router.get('/', SiteController.index)



module.exports = router;
