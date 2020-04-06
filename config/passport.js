const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const User = require('../models/user')

module.exports = (passport) => {
  passport
    .use( new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, (email, password, done) => {
        User.findOne({email:email})
        .then(user => {
          if(!user){
            return done( null, false, {message: 'Email is not registered'} )
          }

          let result = bcrypt.compareSync(password, user.password)
            if(result == true){
              return done(null, user)
            } else {
              return done(null, false, {message: 'Password incorrect'})
            }
          })
        }))

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user)
    })
  })
}
