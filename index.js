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
const signin = require("./app/signin")
const signout = require("./app/signout")
const dashboard = require("./app/dashboard")
const notFound = require("./app/not-found")

/* Start Routes */
signin(app, io)
signout(app)
dashboard(app, io)
notFound(app)

server.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})