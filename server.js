// server.js
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const fs = require('fs');
const bodyParser = require('body-parser')
const data = require('./views/data.json')

//serve the static folder, including CSS, JS
//and the assets folder with images
app
  .use('/static', express.static('static'))
  .use('/assets', express.static('assets'))
  .set('view engine', 'ejs')//set the view engine to ejs

//routes
app //check client request for fun
  .use((req, res, next) => {
    console.log('Time: ', Date.now())
    console.log(req.method + " " + req.originalUrl)
    next()
  })

app// define routes
  .get('/', parseData/*(req, res) => /*{res.render('pages')}*/)
  .get('/about', (req, res) => {res.render('pages/about')})
  .get('/activiteiten', (req, res) => {res.render('pages/activiteiten')})
  .get('/register', (req, res) => {res.render('pages/register')})

function parseData(req, res){
  res.render('pages', {activiteiten: data});
}

//set up the port for localhost
  app.listen(port, () => {
    console.log(port + " is the way to go")
  })
