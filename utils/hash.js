const { rejects } = require('assert')
const crypto = require('crypto')
const { resolve } = require('path')

module.exports.generatePasswordHash = (password) => {
    return new Promise((resolve, reject) => {
        try {
            // const salt = crypto.randomBytes(16).toString('hex')
            const salt = 'secretsaltexample'
            const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString('hex')
            resolve(hash)
        } catch (error) {
            reject(error)
        }
    })
}

module.exports.verifyPaswordHash = (password) => {
    return new Promise((resolve, reject) => {
        try {
            const salt = 'secretsaltexample'
            const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString('hex')
            resolve(hash)
        } catch(error) {
            reject(error)
        }
    })
}
