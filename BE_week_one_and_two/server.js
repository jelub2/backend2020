// server.js

const express = require('express')
const app = express();
const port = 3000;
const path = require('path');
const router = express.Router();

router.use((req,res,next) => {


  next();
})


// use router instead
router.get('/', (req, res) => res.render(path.join(__dirname + '/views/pages/index.ejs')));

router.get('/about', (req, res) => res.render(path.join(__dirname + '/views/pages/about.ejs')));

router.param('name', (req,res,next,name) => {
  if(name != 'jelmer'){
    name = "different"
  }

req.name = name;
next("Hello  " + name);
})

//route with parameter
router.get('/hello/:name', (req, res) => res.send('hello ' + name + '!'))

//Apply the routes
app.use('/', router);




app
  .set('view engine', 'ejs')//set the view engine to ejs
  .use('/contact', express.static(path.join(__dirname + '/static/contact.html')))//contactpage
  .use('/profile', express.static(path.join(__dirname + '/static/profile.html')))//contactpage
  .use('/mp3', express.static(path.join(__dirname + '/audio/sample.mp3')))//audio folder
  .use('/inception', express.static(__dirname + '/images/inception.gif'))
  .get('*', (req, res) => res.send('404'))//index_page


//set up the port for localhost
  app.listen(port)
//log into the terminal to see if everything is allright
console.log(port + " is the way to go")
