const express = require('express')
const router = express.Router()

const { userController } = require('./controller')

router.get('/', (req, res, next) => {
    res.send(`Welcome, ${new Date()}`)
})

router.get('*', function(req, res){
    res.status(404).send(`404 Error Not Found.`)
})

module.exports = { router }