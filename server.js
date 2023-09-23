require('dotenv').config()
const PORT = process.env.PORT
const express = require('express')
const mongo = require('./classes/mongo')
const router = require('./controllers/router')
const app = express()

app.use("/",router)

mongo.init(process.env.MONGO_URI)

app.listen(PORT, console.log(`Server is listening on http://localhost:${PORT}`))


