module.exports = function(app) {
	app.get("/signout", async function (req, res) {
	    req.session.destroy()

	    global.isLogged = false

	    res.redirect("/")
	})
}