const Courses = require('../models/Course');

const {mutipleMongooseToObject} = require('../../unitl/mongoose.js')

const  SearchControllers = {
    show: async (req,res, next) => {
      Courses.find({})
      .then(course =>  {
        res.render('search/stored-Search', {
          course : mutipleMongooseToObject(course),
     
        })
      })
      .catch(error => next(error))
    } ,

    //[get] search/course/:key
    search: async(req,res,next) => {
        Courses.find(
        {
            "$or":[
                {name:{$regex:req.params.key}},
                {course:{$regex:req.params.key}}
            ]
        })
        .then(course => {
          res.render('search/stored-Search', {
            course : mutipleMongooseToObject(course),
       
          })
        })
        .catch(error => next(error))

}
    
} 

module.exports =  SearchControllers   