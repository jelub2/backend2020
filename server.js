// server.js
const express     = require('express');
const app         = express();
const port        = process.env.PORT || 3000;
const fs          = require('fs');
const bodyParser  = require('body-parser')
const data        = require('./views/data.json')

//serve the static folder, including CSS, JS
//and the assets folder with images
app
  .use('/static', express.static('static'))
  .use('/assets', express.static('assets'))
  .set('view engine', 'ejs')//set the view engine to ejs
  .use(express.json())

// configure body-parser to use Post requests
app
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json());

//routes
app //check client request for fun
  .use((req, res, next) => {
    // console.log('Time: ', Date.now())
    console.log(req.method + " " + req.originalUrl)
    next()
  })

app// define routes
  .get('/', parseData/*(req, res) => /*{res.render('pages')}*/)
  .get('/user/:id',(req, res) => { //Playing around with ID's in URL
    console.log('req id = ' + req.params.id )
    res.render('pages/about')
  })
  .get('/about', (req, res) => {res.render('pages/about')})
  .get('/activiteiten', (req, res) => {res.render('pages/activiteiten')})
  .get('/inlog', (req, res) => {res.render('pages/inlog')})
  .get('/register', (req, res) => {res.render('pages/register')})

function parseData(req, res){
  res.render('pages', {activiteiten: data});
}

// Let's post some things
app
  .post('/', (req, res) => {
    let name = req.body.name;
    let password = req.body.password;
    console.log(name + password)
  })



//set up the port for localhost
  app.listen(port, () => {
    console.log(port + " is the way to go")
  })
