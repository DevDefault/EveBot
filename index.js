/* Config .env */
require("dotenv").config()

/* Set Globals */
global.year = (new Date()).getFullYear()

/* Express */
const express = require("express")
const app = express()
const port = 3000

// const reload = require("reload")

/* Socket io */
const server = require('http').createServer(app)
const io = require('socket.io')(server)

/* Assets */
app.use("/assets", express.static(__dirname + "/theme/assets"))

/* Template Egine */
app.set("view engine", "ejs")
app.set("views", "theme/views")

/* Session */
const session = require("express-session")
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
}))

/* Parsing form */
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

/* Routes */
require("./app/signin")(app, io)
require("./app/signout")(app)
require("./app/dashboard")(app, io)
require("./app/not-found")(app)

server.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})