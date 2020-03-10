
const mongoose    = require('mongoose');

//Connect with MongoDB
require('dotenv').config()
const mongoDB = process.env.MONGODB_URI //mongoDB URL in .env file

mongoose.connect(mongoDB, {useNewUrlParser:true, useUnifiedTopology: true})

//check Connection
const db = mongoose.connection
db.once('open', _ => {
  console.log('Database connected:', 'url')
})
db.on('error', err => {
  console.error('connection error:', 'url')
})
