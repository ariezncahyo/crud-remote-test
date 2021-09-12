const express = require('express')
const router = express.Router()

const { userController } = require('./controller')
const { generateToken, authMiddleware} = require('./middleware/jwt')

router.get('/', (req, res, next) => {
    res.send(`Welcome, ${new Date()}`)
})

router.post('/register', userController.register)
router.post('/login', userController.login)

router.use('/users', authMiddleware)
router.get('/users', userController.getAll)
router.delete('/users/delete', userController.delete)
router.put('/users/update', userController.update)

router.get('*', function(req, res){
    res.status(404).send(`404 Error Not Found.`)
})

module.exports = { router }