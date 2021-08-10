const express = require('express')
const router = express.Router()

/* Models */
const User = require("../models/user")

router.get('/', async function (req, res) {
    if (req.session.user) {
        res.render("dashboard", {
            user: req.session.user
        })
    } else {
        res.redirect("/")
    }
})

module.exports = router