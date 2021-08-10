const express = require('express')
const router = express.Router()

/* Models */
const user = require("../models/user")

router.get('/', async function (req, res) {
    let users = await user.findAll() 

    res.render("home", {
        users: users
    })
})

module.exports = router