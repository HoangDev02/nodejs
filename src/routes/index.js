
const MeRouter = require('./me')
const courseRouter = require('./courses')

const siteRouter = require('./site')

const shoping = require('./shoping')
const auth = require('./auth')
const user = require('./user')

const search = require('./search')

function route(app) {
    app.use('/me', MeRouter); 
    app.use('/courses', courseRouter);
    
    app.use('/', siteRouter);
    app.use('/search',search)
    app.use('/shoping',shoping )
 
    //trang chính để đăng nhập
    app.use('/auth',auth)
    app.use('/user', user)

}



module.exports = route;