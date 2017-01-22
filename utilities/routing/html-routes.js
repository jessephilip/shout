// import path
const path = require ("path");

module.exports = (app) => {

	// route for the homepage
	app.get("/", (req, res) => {
		res.sendFile(path.join(__dirname + "/../../public/index.html"));
	});

}
