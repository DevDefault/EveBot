const express = require('express')
const router = express.Router()

/* Models */
const User = require("../models/user")

router.get('/', async function (req, res) {
    req.session.destroy()

    global.isLogged = false

    res.render("signin")
})

router.post('/signin', global.multer().none(), async function (req, res) {
    var username = req.body.username
    var password = req.body.password

    if (username != "" && password != "") {
        var user = await User.findOne({
            where: { 
                username: username, 
                password: password
            }
        })

        if (user) {
            req.session.user = user;
            global.isLogged = true;

            res.send(JSON.stringify({
                message: "success"
            }))
        } else {
            res.send(JSON.stringify({
                message: "error"
            }))
        }
    } else {
        res.send(JSON.stringify({
            message: "error"
        }))
    }
})

router.get('/signout', async function (req, res) {
    req.session.destroy()

    global.isLogged = false

    res.redirect("/")
})

module.exports = router