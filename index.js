/* Config .env */
require("dotenv").config()

/* Express */
const express = require("express")
const app = express()
const port = 3000

const session = require("express-session")

/* Routes */
const signin = require("./app/signin")
const dashboard = require("./app/dashboard")

/* Set Global Config */
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

/* Start Routes */
app.use("/", signin)
app.use("/dashboard", dashboard)

app.get('*', function (req, res) {
    res.status(400).render("not_found", {
        statusCode: res.statusCode
    })
})

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})