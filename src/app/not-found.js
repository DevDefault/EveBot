module.exports = function(app) {
	app.get('*', function(req, res) {
		res.status(400).render("not_found", {
			statusCode: res.statusCode
		})
	})
}