const user = require('../models/User')
const {mongooseToObject} = require('../../unitl/mongoose')
const {mutipleMongooseToObject} =  require('../../unitl/mongoose')
const  userControllers = {
  show: async(req,res,next) => {
    user.findOne({})
      .then(users =>  res.render('informationUser/updateUser', {
        users: mongooseToObject(users)
      }))
      .catch(next)
   
  },
  
  update: async(req,res,next) =>{
    try {
      await user.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
      res.status(200).render('informationUser/updateUser')

  } catch (err) {
      next(err)
  }
}
  
}
module.exports = userControllers;