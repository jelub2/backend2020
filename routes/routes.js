const express   = require('express');
const routes    = express.Router();
const data      = require('../views/data.json') //local data in JSON
const User      = require('../models/user')
const Activity  = require('../models/activity')


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
  .get('/users',        parseUserData)
  .get('/activiteiten/:_id', parseAcitivityDetail)

async function parseAcitivityDetail (req,res) {



    const activiteit = await Activity.find({_id: req.params})

    res.render('pages/activiteitendetail', { activiteit:activiteit} )
  }


function parseLocalData (req, res){
  res.render('pages', {activiteiten: data});
}

//Load data from users into /users
async function parseUserData (req, res){
  const users = await User.find({});

  try{
    res.render('pages/users', {users: users})
  } catch (err) {
    res.status(500).send(err);
  }
}
//Load data from activities into /activities
async function parseActivityData (req, res){

  const activiteiten = await Activity.find({}).limit(4);

  console.log(activiteiten.length)
  try{
    res.render('pages/activiteiten', {activiteiten: activiteiten})
  } catch (err) {
    res.status(500).send(err);
  }
}

module.exports = routes;