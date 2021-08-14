/* Models */
const User = require("../models/user")

module.exports = function(app, io) {
    app.get("/", (req, res) => {
        io.on('connection', (socket) => {
            socket.on("signin_request", (form) => {
<<<<<<< HEAD
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
=======
                var message;

                if (form.username != "" && form.password != "") {
                    User.findOne({
                        where: {
                            username: form.username,
                            password: form.password
                        }
                    }).then((user) => {
                        if (user) {
                            req.session.user = user

                            global.isLogged = true

                            message = "success"
                        } else {
                            message = "error"
                        }

                        socket.emit("signin_response", message)
                    })
                } else {
                    message = "empty"
                    socket.emit("signin_response", message)
                }
            })
            
>>>>>>> 39aee3551220e544014c9c854e705a02ed6cb4bf
            // socket.on('disconnect', () => {
            //     console.log('user disconnected')
            // })
        })

        res.render("signin")
    })
}