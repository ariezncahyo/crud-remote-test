const { promisify } = require('util')
const db = require('../config/db')
const asyncQuery = promisify(db.query).bind(db)
const userSchema = require('../schema/userSchema')

exports.register = async (req, res, next) => {
  try {
    const body = req.body
    const { error, value } = userSchema.register.validate({
      Name: body.Name,
      JobTitle: body.JobTitle,
      Age: body.Age,
      Location: body.Location,
      Description: body.Description,
      Email: body.Email,
      Password: body.Password
    })
    
    if (error)
      res.status(406).json({
        status: false,
        key: error.details[0].context.key,
        message: error.details[0].message
      })
    else {
      const user = await asyncQuery(`CALL user_register(
        '${value.Name}',
        '${value.JobTitle}',
        ${value.Age},
        '${value.Location}',
        '${value.Description}',
        '${value.Email}',
        '${value.Password}'
      )`)
      
      if (user.affectedRows > 0) {
        res.json({
          status: true,
          message: `Registrasi Berhasil.`
        })
      } else {
        res.json({
          status: false,
          message: `Registrasi Gagal.`
        })
      }
    }
  }
  catch (error) {
    console.log(`Error,${new Date()},${error.message}`)
    next(`Error,${error.message}`)
  }
}

exports.getAll = async (req, res, next) => {
  try {
    const userAll = await asyncQuery(`CALL user_getAll()`)
    res.json({
      status: true,
      users: userAll[0]
    })
  }
  catch (error) {
    console.log(`Error,${new Date()},${error.message}`)
    next(`Error,${error.message}`)
  }
}

