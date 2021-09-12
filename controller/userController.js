const { promisify } = require('util')
const db = require('../config/db')
const asyncQuery = promisify(db.query).bind(db)
const { generateToken } = require('../middleware/jwt')
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
    console.log(req.user)
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

exports.delete = async (req, res, next) => {
  try {
    const body = req.body
    const { error, value } = userSchema.deleteById.validate({
      Id: body.Id
    })

    if (error) 
      res.status(406).json({
        status: false,
        key: error.details[0].context.key,
        message: error.details[0].message
      })
    else {
      const delUser = await asyncQuery(`CALL user_delete(${value.Id})`)
      
      if (delUser.affectedRows > 0) {
        res.json({
          status: true,
          message: `Delete User Berhasil.`
        })
      } else {
        res.json({
          status: false,
          message: `Delete User Gagal.`
        })
      }
    }
  }
  catch (error) {
    console.log(`Error,${new Date()},${error.message}`)
    next(`Error,${error.message}`)
  }
}

exports.update = async (req, res, next) => {
  try {
    const body = req.body
    const { error, value } = userSchema.update.validate({
      Id: body.Id,
      Password: body.Password
    })

    if (error) 
      res.status(406).json({
        status: false,
        key: error.details[0].context.key,
        message: error.details[0].message
      })
    else {
      const updateUser = await asyncQuery(`CALL user_update(${value.Id}, ${value.Password})`)
      
      if (updateUser.affectedRows > 0) {
        res.json({
          status: true,
          message: `Update User Berhasil.`
        })
      } else {
        res.json({
          status: false,
          message: `Update User Gagal.`
        })
      }
    }
  }
  catch (error) {
    console.log(`Error,${new Date()},${error.message}`)
    next(`Error,${error.message}`)
  }
}

exports.login = async (req, res, next) => {
  try {
    const body = req.body
    const { error, value } = userSchema.login.validate({
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
      const login = await asyncQuery(`CALL user_login('${value.Email}','${value.Password}')`)
      const token = await generateToken(login[0])

      if (login[0].length > 0) {
        res.status(200).json({
          status: true,
          message: `Login Succeded.`,
          token: token
        })
      } else {
        res.status(401).json({
          status: true,
          message: `Login Failed.`
        })
      }
    }
  }
  catch (error) {
    console.log(`Error,${new Date()},${error.message}`)
    next(`Error,${error.message}`)
  }
}