
const MeRouter = require('./me')
const courseRouter = require('./courses')

const siteRouter = require('./site')

const card = require('./card')
const auth = require('./auth')
const user = require('./user')
const admin = require('./admin')
const paypal = require('./paypal')
const search = require('./search')

function route(app) {
    app.use('/me', MeRouter); 
    app.use('/courses', courseRouter);
    
    app.use('/', siteRouter);
    app.use('/search',search)
    app.use('/card',card )
    app.use('/', paypal)
    //trang chính để đăng nhập
    app.use('/auth',auth)
    app.use('/user', user)
    app.use('/admin',admin)

}



module.exports = route;