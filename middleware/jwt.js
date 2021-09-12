const jwt = require('jsonwebtoken')
const secret = process.env.APP_SECRET

const jwtConfig = {
    expiresIn: '1d' // Expires in 1 days
}

const generateToken = (data, options = jwtConfig) => {
    return new Promise((resolve, reject) => {
        try {
            resolve(jwt.sign({ data: data }, secret, options))
        } catch(error) { reject(error) }
    })
}

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.status(401).json({ status: false, message: `Token Required.`})

    jwt.verify(token, secret, (err, user) => {
        if (err) res.status(403).json({ status: false, message: `Error while verify token.`})
        req.user = user 
        next()
    })
}

module.exports = { generateToken, authMiddleware }
