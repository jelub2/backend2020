// npm packages
const express     = require('express')
const routes      = express.Router()
const bodyParser  = require('body-parser')
const bcrypt      = require('bcryptjs')
const passport    = require('passport')
const mongoose    = require('mongoose')
// own files
const data        = require('../views/data.json') //local data in JSON
const User        = require('../models/user')
const Activity    = require('../models/activity')
const { ensureAuthenticated } = require('../config/auth')

routes// GET methods
  .get('/',                   parseLocalData/*(req, res) => /*{res.render('pages')}*/)
  .get('/profile',            ensureAuthenticated, (req, res) => {console.log(req.user);res.render('pages/profile', {user: req.user})})
  .get('/profile-edit',       ensureAuthenticated, (req, res) => {console.log(req.user);res.render('pages/profile-edit', {user: req.user})})
  .get('/user/:id',           ensureAuthenticated,    (req, res) => {console.log(req.user);res.render('pages/users', {user: req.user})})
  .get('/about',              (req, res) => {res.render('pages/about')})
  .get('/login',              (req, res) => {res.render('pages/login')})
  .get('/logout',             logout)
  .get('/register',           (req, res) => {res.render('pages/register')})
  .get('/activiteiten',       ensureAuthenticated, activityData)
  .get('/activiteiten/:_id',  ensureAuthenticated, parseActivityDetail)
  .get('/nieuwe_activiteit/', ensureAuthenticated,  (req, res) => {res.render('pages/nieuwe_activiteit'), {user:req.user}})
  .get('/users',              ensureAuthenticated, parseUserData)

routes// POST methods
  .post('/register', register)
  .post('/login', login)
  .post('/activiteiten', newActivity)
  .post('/profile-edit', profileEdit)
  .post('/delete', deleteProfile)

// GET method functions

function parseActivityDetail (req,res) {
      let activiteit = Activity.find({_id: req.params})
        .then((activiteit) => {
        try {
            res.render('pages/activiteitendetail', {activiteit, link:"/activiteiten/"+req.params._id, user: req.user})
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

  if (typeof title == 'undefined'){
    var activiteiten = Activity.find({});
  } else{
    var activiteiten = Activity.find({activity_title: title})
}

  activiteiten
    .then((activiteiten) => {
      try{
        res.render('pages/activiteiten', {activiteiten: activiteiten, user: req.user})
      } catch (err) {
        res.status(500).send(err);
      }
})}

//POST-method Functions
function register (req,res){
  const {name, email, password, password2} = req.body
  let errors = []

  if(!name || !email || !password || !password2) {
    errors.push({ msg: 'Not all fields are filled in'})
  }

  if(password !== password2){
    errors.push({msg: 'Passwords do not match'})
    }

  if(password.length < 6 ) {
    errors.push({msg: 'Password must be at least 6 characters'})
  }

  if(errors.length > 0){
    res.render('pages/register', {
      errors, name, email
    })
  }

    User.findOne({ email: email}) // check if user already exists by e-mail
       .then(user => {
         errors.push({msg: 'Email is already registered'})
         if(user){
           res.render('pages/register', {
             errors, name, email
          })} else {
              const newUser = new User({
               name,
               email,
               password
          })

          const hash = bcrypt.hashSync(newUser.password, 10)
          newUser.password = hash
          newUser.save()
            .then( user => {
                req.flash('success_msg', 'You are now registered and can log in')
                  res.redirect('login')
                })
            }
        })
  }

 function login (req, res, next) {
   passport.authenticate('local', {
     successRedirect: '/activiteiten',
     failureRedirect: '/login',
     failureFlash: true
   })(req, res, next)
}

function logout(req,res) {
  req.logout()
  req.flash('success_msg', 'You are logged out')
  res.redirect('login')
}

function newActivity(req, res){

 const activityFormat = new Activity({
   _id: mongoose.Types.ObjectId(),
   activity_title: req.body.activity_title,
   org_name: req.body.org_name,
   date: req.body.date
 })

  activityFormat.save()
  .then((result) => {
    res.redirect('activiteiten')
    })
   .catch((err) => {
   })
}

function profileEdit (req,res){
  const {id, name, email, password, password2} = req.body
  const defEmail = req.user.email
  let errors = []

  let userDB = User.findOne({email: defEmail})
  .then( userDB => {
    let passCheck = bcrypt.compareSync(password, userDB.password)
    if(passCheck){
      User.updateOne({_id: userDB.id},
        { $set:
          {
            name: name,
            email: email
          }},
        () => {
        res.redirect('profile')
      })} else{
      errors.push({msg: 'Password incorrect'})
      res.render('pages/profile-edit', { user:userDB, errors})
    }
  }
  )
}

//DELETE method
function deleteProfile(req, res){
  console.log(req.user)
  User.deleteOne({_id: req.user.id}, (err, user) => {
      if (err){
        res.send(err)
      }
      res.redirect('/')
  })
};

//End of source Henri. E.

module.exports = routes;
