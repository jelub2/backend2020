// Sources:
// https://medium.com/edureka/node-js-mongodb-tutorial-fa80b60fb20c
// https://www.freecodecamp.org/news/mongoose101/

const mongoose    = require('mongoose');

//mongoose Schema (String, Number, Boolean, Array, Date, ObjectId)
const activitySchema = new mongoose.Schema({
  activity_title: {
    type: String,
  },
  org_name: {
    type: String,
  },
  date: {
    type: Date
  }
})

  const Activity = mongoose.model('Activity', activitySchema);

  module.exports = Activity
