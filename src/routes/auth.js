const express = require('express')
const router = express.Router()
const passport = require('passport')
const authController = require('../app/controllers/Authcontrollers')
const initializePassport = require('../app/middlewares/passport-config')
const checkAuthenticated = require('../app/middlewares/checkAuthenticated')
const User = require('../app/models/User')


router.get('/register',checkAuthenticated.checkNotAuthenticated,authController.register)
router.get('/login' ,checkAuthenticated.checkNotAuthenticated,authController.login)

router.post('/register',authController.isRegister)

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

  //logout fage
router.delete('/logout', authController.logout)

module.exports = router