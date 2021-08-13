const express = require('express')
const router = express.Router()

router.get('/', function (req, res) {
    if (req.session.user) {
        res.render("dashboard", {
            user: req.session.user
        })
    } else {
        res.redirect("/")
    }
})

module.exports = router