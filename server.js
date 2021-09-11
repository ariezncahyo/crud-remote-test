const express = require('express')
const path = require('path')
const { router } = require('./router')

const app = express()
const port = process.env.PORT || 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(router)

// Listen
app.listen(port, () => {
    console.log(`Listen on port ${port}`)
})