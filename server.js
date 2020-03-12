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

// configure body-parser to use Post requests
app
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json());

 app.
  post('/register',  (req,res) => {

    // save User with promises
   const userFormat = {
     name: req.body.name,
     email: req.body.email,
     password: req.body.password
   }

   async function runCode () {
     const user = new User(userFormat) //add user
     const doc = await user.save()
     console.log(doc)
     // drop collection await User.deleteMany({})
   }

   runCode()
     .catch(error => { console.log(error)})

     res.redirect('/register')
 })

 app
  .post('/activiteiten',  (req,res) => {

    // save Activity with promises
   const activityFormat = {
     activity_title: req.body.activity_title,
     org_name: req.body.org_name,
     date: req.body.date
   }

   async function runCode () {
     const activity = new Activity(activityFormat) //add user
     const doc = await activity.save()
     // drop collection await Activity.deleteMany({})
   }

   runCode()
     .catch(error => { console.log(error)})

     res.redirect('/activiteiten')
 })

//set up the port for localhost
  app.listen(port, () => {
    console.log(port + " is the way to go")
  })
