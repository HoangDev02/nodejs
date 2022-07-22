const Coures = require('../models/Course');

const {mutipleMongooseToObject} = require('../../unitl/mongoose')
class SiteController {

    index(req, res, next) {
        //hiển thị màng hình
        Coures.find({})
        .then(courses =>  {
          res.render('home', {
            courses : mutipleMongooseToObject(courses),
        
          })
        })
        .catch(error => next(error))

      }
      

}

module.exports = new SiteController;