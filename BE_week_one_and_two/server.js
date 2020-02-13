// server.js

const express = require('express')
const app = express();
const port = 3000;
const path = require('path');

app
  .set('view engine', 'ejs')//set the view engine to ejs
  .get('/', (req, res) => res.render('pages/index'))//index_page
  .get('/about', (req,res)=> res.render('pages/about'))//about_page
  .listen(port)
 //  .use('/', express.static(path.join(__dirname + '/static')))
 //  .get('/', (req,res) => res.send('hello world'))
 //  .get('/about', (req,res) => res.send('hello about'))
 //  .use('/audio', express.static(__dirname + '/audio'))
 //  .use('/images', express.static(__dirname + '/images'))
 // // app.get('/activities', (req,res) => res.send('activiteiten'))
 // // app.get('*', (req,res) => res.status(404).send("This is my 404 page"))


console.log(port + " is the way to go")
