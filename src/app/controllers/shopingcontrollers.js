const Coures = require('../models/Course');
const {mutipleMongooseToObject} = require('../../unitl/mongoose')
class shopingController {
    index(req, res, next) {
   
        Coures.find({})
        .then(courses =>  {
          res.render('courses/Stored-Shoping', {
            courses : mutipleMongooseToObject(courses)
          })
        })
        .catch(error => next(error))
     
        // res.render('HOME')
    }
}

module.exports = new shopingController();