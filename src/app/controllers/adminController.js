const Coures = require('../models/Course');

const {mutipleMongooseToObject} = require('../../unitl/mongoose')
class adminController {

 

    index(req, res, next) {
        //hiển thị màng hình
        Coures.find({})
        .then(courses =>  {
          res.render('HomeAdmin', {
            courses : mutipleMongooseToObject(courses),
          })
        })
        .catch(error => next(error))

      }

}

module.exports = new adminController;