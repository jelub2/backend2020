// server.js
const express       = require('express')
const app           = express();
const flash         = require('connect-flash')
const session       = require('express-session')
const expressLayout = require('express-ejs-layouts')
const passport      = require('passport')
const port          = process.env.PORT || 3000;
const bodyParser    = require('body-parser')
const mongoose      = require('mongoose');
const routes        = require('./routes/routes')

//Connect with MongoDB
require('dotenv').config()
const mongoDB = process.env.MONGODB_URI //mongoDB URL in .env file
mongoose.connect(mongoDB, {useNewUrlParser:true, useUnifiedTopology: true, useFindAndModify: false})

//check Connection
const db = mongoose.connection
db.once('open', _ => {
  console.log('Database connected:', 'url')
})
db.on('error', err => {
  console.error('connection error:', 'url')
})

//passport config
require('./config/passport')(passport)

app
  .set('view engine', 'ejs')//set the view template engine to ejs

app
  .use(express.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(
    session({
    secret:'secret',
    resave: false,
    saveUninitialized: true,
  })
)
  .use(passport.initialize())
  .use(passport.session())
  .use(flash())
  .use((req, res, next) => {
    res.locals.success_msg  = req.flash('success_msg')
    res.locals.error_msg    = req.flash('error_msg')
    res.locals.error        = req.flash('error')
    next()
  })
  .use('/', routes) //routes
  .use('/static', express.static('static')) //static files
  .use('/assets', express.static('assets')) // assets folder
//set up the port for localhost

  app.listen(port, () => {
    console.log(port + " is the way to go")
  })
