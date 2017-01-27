// import mongoose
const mongoose = require ("mongoose");

// create schema
let userSchema = mongoose.Schema({
	name: String
});

// compile schema into model
let user = mongoose.model("User", userSchema);

module.exports = user;
