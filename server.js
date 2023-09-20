const express = require('express')
const mongo = require('./classes/mongo')
const router = require('./controllers/router')
const app = express()

app.use("/",router)

mongo.init()

app.listen(3000, console.log("Server is listening on http://localhost:3000"))


