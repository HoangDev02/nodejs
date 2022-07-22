const user = require('../../app/models/User')
const bcrypt = require('bcrypt')

const authcontroller = {
    register: async (req,res,next) =>  {
        res.render('account/register')
    },

    login: async (req,res,next) => {
        res.render('account/login')
    },

    isRegister : async (req, res,next) => {
        try {
          const salt = await bcrypt.genSalt(10);
          const hashed = await bcrypt.hash(req.body.password, salt);
          
           const newusers= new user({
              username: req.body.username,
              email: req.body.email,
              password: hashed,
          })
            await newusers.save()
          
            return res.status(200).redirect('/auth/login')
        }catch(err){
        //   res.redirect('/auth/register')
          next(err)
        }
      
      
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