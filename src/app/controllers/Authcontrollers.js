const user = require('../../app/models/User')
const authcontroller = {
    register: async (req,res,next) =>  {
        res.render('account/register')
    },

    login: async (req,res,next) => {
        res.render('account/login')
    },
    logout: async (req,res,next) => {
        req.logout(function(err) {
            if (err) { return next(err); 
            }
        res.redirect('/auth/login');
          });
    },
    
  
}

module.exports =  authcontroller;