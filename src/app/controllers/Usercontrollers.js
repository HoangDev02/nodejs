const User = require('../models/User')
const {mongooseToObject} = require('../../unitl/mongoose')
const  userControllers = {
  
 

  edit:(req,res, next) => {
    User.findByIdAndUpdate(req.params.id)
      .then(users =>  res.render('users/edit', {
        users: mongooseToObject(users)
      }))
      .catch(next)
   
  },

  //delete users
  destroy: async(req,res,next) => {
    User.findOneAndDelete({id: req.params.id})
      .then(() => res.redirect('back'))
      .catch(next)
  },
  forcedestroy: (req,res,next) => {
    User.deleteOne({_id: req.params.id})
    .then(() => res.redirect('back'))
    .catch(next)
  },
  handleFormActions: (req,res,next) => {
    switch(req.body.action){
      case 'delete':
        User.findOneAndDelete({_id: {$in: req.body.usersIds}})
        .then(() => res.redirect('back'))
        .catch(next)
        break;
      default:
        res.json({message: 'Action is  invaid!'})
    }
  }
  
}
module.exports = userControllers;