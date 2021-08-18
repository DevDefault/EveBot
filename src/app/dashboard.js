module.exports = function(app, io) {
	app.get("/dashboard", (req, res) => {
		console.log(req.session)

	    if (req.session.user) {
	    	io.on('connection', (socket) => {})

	        res.render("dashboard", {
				title: "Dashboard",
	            user: req.session.user
	        })
	    } else {
	        res.redirect("/")
	    }
	})
}

