/* Config .env */
require("dotenv").config()

/* Express */
const express = require("express")
const app = express()
const port = 3000

/* Socket io */
const server = require('http').createServer(app)
const io = require('socket.io')(server)

const session = require("express-session")

/* Routes */
const signin = require("./app/signin")
const dashboard = require("./app/dashboard")
const multer = require("multer")

/* Set Globals */
global.year = (new Date()).getFullYear()

/* Assets */
app.use("/assets", express.static(__dirname + "/theme/assets"))

/* Session */
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
}))

/* Template Egine */
app.set("view engine", "ejs")
app.set("views", "theme/views")

/* Parsing form */
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

/* Models */
const User = require("./models/user")

/* Start Routes */
app.get("/", function (req, res) {
    io.on('connection', (socket) => {
        socket.on("signin_request", (form) => {
            User.findOne({
                where: {
                    username: form.username,
                    password: form.password
                }
            }).then((user) => {
                var message;
                if (user) {
                    req.session.user = user

                    global.isLogged = true

                    message = "success"
                } else {
                    message = "error"
                }

                socket.emit("signin_response", message)
            })
        })

        // socket.on('disconnect', () => {
        //     console.log('user disconnected')
        // })
    })

    res.render("signin")
})

app.get("/dashboard", (req, res) => {
    if (global.isLogged) {
        res.render("dashboard", {
            user: req.session.user
        })
    } else {
        res.redirect("/")
    }
})

app.get("/signout", (req, res) => {
    req.session.destroy()

    global.isLogged = false

    res.redirect("/")
})

app.get('*', function (req, res) {
    res.status(400).render("not_found", {
        statusCode: res.statusCode
    })
})

server.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})