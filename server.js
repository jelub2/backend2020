// server.js
const express     = require('express');
const app         = express();
const port        = process.env.PORT || 3000;
const fs          = require('fs');
const bodyParser  = require('body-parser')
const routes      = require('./routes/routes')
const db          = require('./models/mongodb')
const User        = require('./models/user')
const Activity    = require('./models/activity')

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
