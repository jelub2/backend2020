console.log("runt ie?");

const express = require('express')
const app = express();
const port = 3000;

app.get('/', (req,res) => res.send('hello world'))
app.get('/about', (req,res) => res.send('hello about'))
app.get('/contact', (req,res) => {
app.get('/activities', (req,res) => {
console.log("still working hehe")
res.status(300).send('activiteiten');
})
res.write('<h1>hello contact</h1>')
});
app.get('*', (req,res) => {
res.status(404).send("404 page");
console.log("I always should be at the end, otherwise I will be annoying")
});

app.listen(port, () => console.log( 'example app listenng on port $[port]!'))
