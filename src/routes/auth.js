const express = require('express')
const router = express.Router()
const passport = require('passport')
const authController = require('../app/controllers/Authcontrollers')
const bcrypt = require('bcrypt')
const initializePassport = require('../app/middlewares/passport-config')
const User = require( "..//app/models/User")
const checkAuthenticated = require('../app/middlewares/checkAuthenticated')

router.get('/register',checkAuthenticated.checkNotAuthenticated,authController.register)
router.get('/login' ,checkAuthenticated.checkNotAuthenticated,authController.login)

router.post('/register',async (req, res) => {
    try {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(req.body.password, salt);
    
     const newusers= new User({
        username: req.body.username ,
        email: req.body.email,
        password: hashed,
    })
      await newusers.save()
    
      return res.status(200).redirect('/auth/login')
  }catch(err){
    res.redirect('/auth/register')
  }


})

initializePassport(
  passport,
  email => User.find(user => user.email === email),
  id => User.find(user => user._id === id)
)
router.post('/login', checkAuthenticated.checkNotAuthenticated ,passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/auth/login',
    failureFlash: true
  }))

router.delete('/logout', authController.logout)

module.exports = router