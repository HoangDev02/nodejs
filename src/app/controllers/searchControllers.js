const Courses = require('../models/Course')

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
    category: async(req,res,next) => {
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
    },
    coin: async(req,res,next) => {
      Courses.find(
        {
          //đk coin 250000 -> 500000
          coin : { $in : [250000, 500000]}
        }
      )
      .then(course => {
        res.render('search/stored-Search', {
          course : mutipleMongooseToObject(course),
     
        })
      })
      .catch(error => next()) 
    },
    search: async(req,res,next) => {
      Courses.find({
        "$or":[
          {name:{$regex:req.query.search}},
          {course:{$regex:req.query.search}}
         
      ]
      })
      .then(course => {
        res.render('search/stored-Search', {
          course : mutipleMongooseToObject(course),
        })
      })
      .catch(error => {
        next(error)
      }) 
      
    } 
        
} 

module.exports =  SearchControllers   