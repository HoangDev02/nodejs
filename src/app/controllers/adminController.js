const Coures = require('../models/Course');
const Users = require('../models/User')
const {mutipleMongooseToObject} = require('../../unitl/mongoose')

const adminController = {
    index: async(req, res, next) => {
        Coures.find({})
        .then(courses =>  {
          res.render('HomeAdmin', {
            courses : mutipleMongooseToObject(courses),
          })
        })
        .catch(error => next(error))
      },
      //show users
      showUser: async(req,res,next)=> {
        Users.find({})
        .then(users => {
          res.render('users/Stored-Users', {
            users: mutipleMongooseToObject(users)
          })
        })
        .catch(error => next(error))
      },
      create: async(req,res,next) => {
        res.render('users/createUsers')
      },


       //get /stored/courses
    StoredCourses: async (req,res, next) => {
      let courseQuery = Coures.find({})
      
      //kt _sort => true  
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

    },
    //get /trash/courses 
    trashCourses: async(req,res,next) => {
      Coures.findDeleted({})
      .then(courses => res.render('me/trash-Courses',{
        courses: mutipleMongooseToObject(courses)
      }))
      .catch(next)
    },

    
   store: async(req,res,next) => {
    const formData = req.body
    const users = new Users(formData)
    users.save() 
    .then(() => res.redirect('/admin/user'))
    .catch(error => {
      next(error)
    });
   }

}

module.exports =  adminController;