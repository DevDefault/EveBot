
module.exports = function(app, io) {
	app.get("/dashboard", (req, res) => {
	    if (global.isLogged) {
	    	var user = req.session.user

	    	io.on('connection', socket => 
	            socket.on("is_typing", bool => {
	            	socket.emit("is_typing", bool)
	            }) 

	            // socket.on('disconnect', () => {
	            //     console.log('user disconnected')
	            // })
	        )

	        res.render("dashboard", {
	            user: req.session.user
	        })
	    } else {
	        res.redirect("/")
	    }
	})
}

