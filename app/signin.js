/* Models */
const User = require("../models/user")

module.exports = function(app, io) {
    app.get("/", (req, res) => {
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
}