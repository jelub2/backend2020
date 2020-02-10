console.log("runt ie?");

const express = require('express')
const app = express();
const port = 3000;

app.get('/', (req,res) => res.send('hello world'));

console.log(__dirname + '/contact.html');
app.use('/', express.static(__dirname + '/static'));
app.use('/audio', express.static(__dirname + '/audio'));
app.use('/gif', express.static(__dirname + '/images'));
app.get('/about', (req,res) => res.send('hello about'));
app.get('/activities', (req,res) => res.send('activiteiten'));
app.get('*', (req,res) => res.status(404).send("This is my 404 page"));

app.listen(port, () => console.log( 'example app listening on port ' + port))
