// server.js
const express     = require('express');
const app         = express();
const port        = process.env.PORT || 3000;
const fs          = require('fs');
const bodyParser  = require('body-parser')
const mongoose    = require('mongoose');
const routes      = require('./routes/routes')


//Connect with MongoDB
require('dotenv').config()

const mongoDB = process.env.MONGODB_URI //mongoDB URL in .env file

mongoose.connect(mongoDB, {useNewUrlParser:true, useUnifiedTopology: true})

//check Connection
const db = mongoose.connection
db.once('open', _ => {
  console.log('Database connected:', 'url')
})
db.on('error', err => {
  console.error('connection error:', 'url')
})


app
  .set('view engine', 'ejs')//set the view template engine to ejs

app
  .use(express.json())
  .use('/static', express.static('static')) //static files
  .use('/assets', express.static('assets')) // assets folder
  .use('/', routes) //routes

//set up the port for localhost
  app.listen(port, () => {
    console.log(port + " is the way to go")
  })
