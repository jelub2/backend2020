const express   = require('express');
const routes    = express.Router();
const fs          = require('fs');
const bodyParser  = require('body-parser')
const data      = require('../views/data.json') //local data in JSON
const User      = require('../models/user')
const Activity  = require('../models/activity')

// configure body-parser to use Post requests
routes
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json());

//routes
routes //check client request for fun
  .use((req, res, next) => {
    // console.log('Time: ', Date.now())
    console.log(req.method + " " + req.originalUrl)
    next()
  })

routes// define routes
  .get('/',             parseLocalData/*(req, res) => /*{res.render('pages')}*/)
  .get('/user/:id',     (req, res) => {res.render('pages/users')})
  .get('/about',        (req, res) => {res.render('pages/about')})
  .get('/inlog',        (req, res) => {res.render('pages/inlog')})
  .get('/register',     (req, res) => {res.render('pages/register')})
  .get('/activiteiten', parseActivityData)
  .get('/activiteiten/:_id', parseAcitivityDetail)
  .get('/nieuwe_activiteit/', (req, res) => {res.render('pages/nieuwe_activiteit')})
  .get('/users',        parseUserData)

routes
  .post('/register', register)
  .post('/activiteiten', newActivity)

// GET method functions


  async function parseAcitivityDetail (req,res) {
      const activiteit = await Activity.find({_id: req.params})

      res.render('pages/activiteitendetail', { activiteit:activiteit} )
    }

  function parseLocalData (req, res){ //load data from data.json
      res.render('pages', {activiteiten: data});
  }

  async function parseUserData (req, res){//Load data from users into /users
    const users = await User.find({});

    try{
      res.render('pages/users', {users: users})
    } catch (err) {
      res.status(500).send(err);
    }
  }

  async function parseActivityData (req, res){//Load data from activities into /activities
    let title = req.query.title
    let activiteiten;
    console.log(title)

    if (!req.query.title){
       activiteiten = await Activity.find({})//.limit(4);
    } else{
       activiteiten = await Activity.find({activity_title: title})
    }

    try{
      res.render('pages/activiteiten', {activiteiten: activiteiten})
    } catch (err) {
      res.status(500).send(err);
    }
  }

//POST-method Functions

function register (req,res){

    // save User with promises
   const userFormat = {
     name: req.body.name,
     email: req.body.email,
     password: req.body.password
   }

console.log(userFormat)

   async function runCode () {
     const user = new User(userFormat) //add user
     const doc = await user.save()
     console.log(doc)
     // drop collection await User.deleteMany({})
   }

   runCode()
     .catch(error => { console.log(error)})

     res.redirect('/register')
  }

function newActivity(req, res){

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
}
module.exports = routes;
