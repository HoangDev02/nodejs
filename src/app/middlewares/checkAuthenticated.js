const user = require('../models/User')
const middlewares = {
    checkAuthenticated : async (req, res, next) => {
    if (req.isAuthenticated()) {
      return next()
    }
  
    res.redirect('/auth/login')
  },
  
   checkNotAuthenticated : async (req, res, next) => {
    if (req.isAuthenticated()) {
      return res.redirect('/')
    }
    next()
  }
  
}

module.exports = middlewares
