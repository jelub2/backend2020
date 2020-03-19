const express   = require('express');
const routes    = express.Router();
const fs          = require('fs');
const bodyParser  = require('body-parser')
const mongoose    = require('mongoose');
const format    = require('date-format')
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

routes// GET method
  .get('/',             parseLocalData/*(req, res) => /*{res.render('pages')}*/)
  .get('/user/:id',     (req, res) => {res.render('pages/users')})
  .get('/about',        (req, res) => {res.render('pages/about')})
  .get('/inlog',        (req, res) => {res.render('pages/inlog')})
  .get('/register',     (req, res) => {res.render('pages/register')})
  .get('/activiteiten', activityData)
  .get('/activiteiten/:_id', parseActivityDetail)
  .get('/nieuwe_activiteit/', (req, res) => {res.render('pages/nieuwe_activiteit')})
  .get('/users',        parseUserData)

routes// POST method
  .post('/register', register)
  .post('/activiteiten', newActivity)
  .post('/activiteitendetail', updateActivity)

// GET method functions

function parseActivityDetail (req,res) {

      let activiteit = Activity.find({_id: req.params})

      activiteit
      .then((result) => {
        try {
            res.render('pages/activiteitendetail', { activiteit: result} )
        }  catch (err) {
            res.status(500).send(err);
        }
      })
    }

function parseLocalData (req, res){

      const activiteiten = Activity.find({}).limit(3);

      activiteiten
        .then((result) => {
          try{
            res.render('pages/', {activiteiten: result})
          } catch (err) {
            res.status(500).send(err);
          }
        })

  }

function parseUserData (req, res){//Load data from users into /users
    const users =  User.find({});

    users
    .then((result) => {
    try{
      res.render('pages/users', {users: result})
    } catch (err) {
      res.status(500).send(err);
    }})
  }


  function activityData (req, res){//Load data from activities into /activities

  let title = req.query.title

  if (!req.query.title){
    var activiteiten = Activity.find({});
  } else{
    var activiteiten = Activity.find({activity_title: title})
}

  activiteiten
    .then( (activiteiten) => {
      try{
        res.render('pages/activiteiten', {activiteiten: activiteiten})
      } catch (err) {
        res.status(500).send(err);
      }
})}

//POST-method Functions

function register (req,res){

    // save User with promises
   const userFormat = new User({
     _id: mongoose.Types.ObjectId(),
     name: req.body.name,
     email: req.body.email,
     password: req.body.password
   })

    userFormat.save()
    .then((result) => {
      res.render('pages/')
      })
     .catch(err => {
       console.log(err);
     })
    }

function newActivity(req, res){

  // save Activity with promises
 const activityFormat = new Activity({
   _id: mongoose.Types.ObjectId(),
   activity_title: req.body.activity_title,
   org_name: req.body.org_name,
   date: req.body.date
 })

  activityFormat.save()
  .then((result) => {
    console.log(result);
    res.render('pages/about')
    })
   .catch(err => {
     console.log(err);
   })
     // drop collection await Activity.deleteMany({})
   }

function updateActivity(req, res){ // async function, because otherwise it would redirect before updating the tables

 }

module.exports = routes;
