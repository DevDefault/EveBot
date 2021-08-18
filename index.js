/* Config .env */
require("dotenv").config()

/* Set Globals */
global.year = (new Date()).getFullYear()

/* Express */
const express = require("express")
const app = express()
const port = 3000

/* Whatsapp API */
// const wpp = require("venom-bot")

/* Socket io */
const server = require('http').createServer(app)
const io = require('socket.io')(server)

/* Session */
const session = require("express-session")

/* Template Egine */
app.set("view engine", "ejs")
app.set("views", "theme/views")

/* Assets */
app.use("/assets", express.static(__dirname + "/theme/assets"))

/* Session */
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
}))

/* Parsing Form */
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

/* Routes */
const signin = require("./src/app/signin")
const dashboard = require("./src/app/dashboard")
const signout = require("./src/app/signout")
const notFound = require("./src/app/not-found")

// wpp.create().then((client) => {
    /* Start Routes */
    signin(app, io)
    dashboard(app, io)
    signout(app)
    notFound(app)
// }).catch((error) => {
//     console.log(error)
// })

server.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})