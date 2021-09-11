const mysql = require('mysql')
require('dotenv').config()

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DB,
    waitForConnections: true,
    connectionLimit: 2,
    queueLimit: 0,
    debug: process.env.DB_DEBUG == 'true'
}

const db = mysql.createConnection(dbConfig)

module.exports = db