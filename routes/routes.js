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

//routes
routes //check client req for fun
  .use((req, res, next) => {
    // console.log('Time: ', Date.now())
    console.log(req.method + " " + req.originalUrl)
    next()
  })

routes// GET method
  .get('/',             parseLocalData/*(req, res) => /*{res.render('pages')}*/)
  .get('/user/:id',     (req, res) => {res.render('pages/users')})
  .get('/about',        (req, res) => {res.render('pages/about')})
  .get('/login',     (req, res) => {res.render('pages/login')})
  .get('/register',     (req, res) => {res.render('pages/register')})
  .get('/activiteiten', activityData)
  .get('/activiteiten/:_id', parseActivityDetail)
  .get('/nieuwe_activiteit/', (req, res) => {res.render('pages/nieuwe_activiteit')})
  .get('/users',        parseUserData)

routes// POST method
  .post('/register', register)
  .post('/login', login)
  .post('/activiteiten', newActivity)

routes
  .post('/activiteiten/*',  updateActivity)

routes
  .post('/activiteiten/:_id', deleteActivity)

// GET method functions

function parseActivityDetail (req,res) {
      let activiteit = Activity.find({_id: req.params})
        .then((activiteit) => {
        try {
            res.render('pages/activiteitendetail', {activiteit, link:"/activiteiten/"+req.params._id} )
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
  const {name, email, password, password2} = req.body
  let errors = []

  if(!name || !email || !password || !password2) {
    errors.push({ msg: 'not all fields are filled in'})
  }

  if(password !== password2){
    errors.push({msg: 'Paswords do not match'})
    }

    if(password.length < 6 ) {
      errors.push({msg: 'Password must be at least 6 characters'})
    }

    if(errors.length > 0){
      res.render('pages/register', {
        errors, name, email
      })
    } else

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

          console.log(newUser.password)
          
          const hash = bcrypt.hashSync(newUser.password, 10)
          newUser.password = hash
          console.log(newUser)
          console.log(newUser.password)
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
   .catch((err) => {
     console.log(err);
   })
}

// Source:
// Henri. E. (2019) building-restful-apis-with-node-js-and-express. geraadpleegd op 24-3-2020 via https://www.linkedin.com/learning/building-restful-apis-with-node-js-and-express/create-delete-endpoint?u=2132228.
// PUT method functions

function updateActivity(req, res){
console.log("update")
Activity.findOneAndUpdate({_id: req.params._id}, req.body, {new: true, useFindAndModify: false}, (err, activity) => {
    if (err){
      res.send(err)
    }
    (req,res) => res.redirect('/activiteiten')
})};

//DELETE method
function deleteActivity(req, res){
  console.log(req.body)
  Activity.deleteOne({_id: req.params._id}, (err, activity) => {
      if (err){
        res.send(err)
      }
      res.json({ message: 'succesfully deleted contact'})
  })
};

//End of source Henri. E.

module.exports = routes;
