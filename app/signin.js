const express = require("express")
const router = express.Router()

/* Form */
const multer = require("multer")
const {
    body,
    validationResult
} = require('express-validator')

/* Models */
const User = require("../models/user")

router.get("/", async function (req, res) {
    req.session.destroy()

    global.isLogged = false

    res.render("signin")
})

router.post(
    "/signin",
    multer().none(),
    body("username").notEmpty(),
    body("password").notEmpty(),
    async function (req, res) {
        const errors = validationResult(req)

        if (errors.isEmpty()) {
            var user = await User.findOne({
                where: {
                    username: req.body.username,
                    password: req.body.password
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
                    message: "fail"
                }))
            }
        } else {
            res.send(JSON.stringify({
                message: "error"
            }))
        }
    }
)

router.get("/signout", async function (req, res) {
    req.session.destroy()

    global.isLogged = false

    res.redirect("/")
})

module.exports = router