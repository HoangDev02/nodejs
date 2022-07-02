if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const path = require('path');
const express = require('express');

const morgan = require('morgan');
const handlebars = require('express-handlebars');
const methodOverride = require('method-override')
const db = require('./config/db')
const cors = require('cors')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const http = require('http');
const SortMiddleware = require('./app/middlewares/sortMiddlewares')

const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const route = require('./routes')


db.connect();
dotenv.config();

const app =express();
const port = 3000
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(express.urlencoded({
  extended: true
}));

app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(methodOverride('_method'))


app.use(morgan('combined'))


app.engine('hbs', 
  handlebars.engine({
  extname: '.hbs',
  helpers: {
    sum : (a,b) => a+b,
    sortable: (filed, sort) => {
      const sortType = filed === sort.column ? sort.type: 'default'
      const icons = {
        default: 'bx bx-sort',
        asc:'bx bx-sort-up',
        desc:'bx bx-sort-down'
      }
      const types = {
        default: 'desc',
        asc: 'desc',
        desc:'asc'
      }

      const icon = icons[sortType]
      const type = types[sortType]
      return `<a href="?_sort&column=${filed}&type=${type}">
      <span class="${icon}"></span>
      </a>
      `
    }
  }
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resource', 'views'));


app.use(SortMiddleware)



app.use(cors())
app.use(cookieParser())
app.use(express.json())


route(app);



app.listen(port, () => {
  
  console.log(`Example app listening on port ${port}`)
})