const Courses = require('../models/Course');

const {mutipleMongooseToObject} = require('../../unitl/mongoose.js')

const  SearchControllers = {
    show: async (req,res, next) => {
      Courses.find({})
      .then(courses =>  {
        res.render('search/stored-Search', {
          courses : mutipleMongooseToObject(courses),
     
        })
      })
      .catch(error => next(error))
    } ,
    search: async(req,res,next) => {
      // var courses = Coures.find({})
      const search =  req.query.search.split(',')
      try {
            const list = await Promise.all((search || []).map(course=> {
              return Courses.countDocuments({course: course})
          }))
          res.status(200).render('search/stored-Search')
      } catch (err) {
          next(err)
      }
    }
    
} 

module.exports =  SearchControllers   