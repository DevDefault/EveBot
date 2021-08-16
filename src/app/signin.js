/* Models */
const User = require("../models/user")

module.exports = function(app, io) {
    app.get("/", (req, res) => {
        io.on('connection', (socket) => {
            socket.on("signin_send", (form) => {
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
                        
                        socket.emit("signin_receive", message)
                    })
                } else {
                    message = "empty"
                    
                    socket.emit("signin_receive", message)
                }
            })

            // socket.on('disconnect', () => {
            //     console.log('user disconnected')
            // })
        })

        res.render("signin")
    })
}