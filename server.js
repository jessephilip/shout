// import express
const express = require ("express");

// set up express
const app = express();

// import up body-parser
const bodyParser = require ("body-parser");

// serve static files
app.use(express.static("public"));

// set up body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// import routes
require ("./utilities/routing/html-routes.js")(app);

// set up port for server
const PORT = process.env.PORT || 3000;

// run server
app.listen(PORT, () => {
	console.log("Shout listening on PORT:" + PORT);
});
