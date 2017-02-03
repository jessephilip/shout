// import dotenv
require ("dotenv").config();

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
require ("./utilities/routing/api-routes.js")(app);

// import mongoose
const mongoose = require ("mongoose");

// setup mongoose connection
mongoose.connect("mongodb://<dbuser>:<dbpassword>@ds139869.mlab.com:39869/heroku_b0xgmkts");
const db = mongoose.connection;

// handle error upon connection
db.on("error", console.error.bind(console, "database connection error"));

// open connection to database
db.once("open", () => {
	console.log("Database connected.");
});

// set up port for server
const PORT = process.env.PORT || 3000;

// run server
app.listen(PORT, () => {
	console.log("Shout listening on PORT:" + PORT);
});
