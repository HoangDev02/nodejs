const Coures = require('../models/Course');
const user = require('../models/User');
const {mutipleMongooseToObject} = require('../../unitl/mongoose')
class MeController {
    //[GET] / new
   
    //get /stored/courses
    StoredCourses(req,res, next) {
      let courseQuery = Coures.find({})
      
      if(req.query.hasOwnProperty('_sort')) {
        courseQuery= courseQuery.sort({
          [req.query.column]: req.query.type
        })
      }

      Promise.all([  courseQuery, Coures.countDocumentsDeleted()])
      .then(([courses,deleteCount]) => {
        res.render('me/Stored-Courses',{
          deleteCount, 
          courses: mutipleMongooseToObject(courses)
        })
      })
      .catch(next)

    }
    //get /trash/courses 
    trashCourses(req,res,next){
      Coures.findDeleted({})
      .then(courses => res.render('me/trash-Courses',{
        courses: mutipleMongooseToObject(courses)
      }))
      .catch(next)
    }

}

module.exports = new MeController();