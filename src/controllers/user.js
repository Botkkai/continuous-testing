const db = require('../dbClient')

module.exports = {
  create: (user, callback) => {
    // Check parameters
    if(!user.username)
      return callback(new Error("Wrong user parameters"), null)
    // Create User schema
    const userObj = {
      firstname: user.firstname,
      lastname: user.lastname,
    }

    // Save to DB
    // TODO check if user already exists
    db.hgetall(user.username, (err, res) => {
      if (err) {
        return callback(err, null)
      }
      if(res != null)
      { 
        callback(new Error("User already exists!"), null) // Return callback
      }
      else
      {
        db.hmset(user.username, userObj, (err, res) => {
          if (err) return callback(err, null)
          callback(null, res) // Return callback
        })
      }
    })
  },
  get: (username, callback) => {
    // TODO create this method
    if(!username)
      return callback(new Error("Wrong user parameters"), null)

    db.hgetall(username, (err, res) => {
        if (err) return callback(err, null)
        if(res != null)
        {
          callback(null, res) // Return callback
        }
        else
        {
          callback(new Error("Unknwon user"), null) // Return callback
        }
    })
  }
}
