const express = require('express');
const router = express.Router();

//đây là đối tượng khởi tạo
const searchController = require('../app/controllers/searchControllers')

// newsController.index
// router.get('/course', searchController.show)
router.get('/course', searchController.search)
router.get('/course/coin', searchController.coin)
router.get('/course/:key', searchController.category)

module.exports = router;   