const { promisify } = require('util')
const db = require('../config/db')
const asyncQuery = promisify(db.query).bind(db)

exports.register = async (req, res, next) => {
  try {
    console.log(asyncQuery)
    res.json({
      status: true,
      data: "Register"
    })
  }
  catch (error) {
    console.log(`Error: , ${error.message}`)
    next(`Error: , ${error.message}`)
  }
}