// import mongoose
const mongoose = require ("mongoose");

// create schema
let userSchema = mongoose.Schema({
	name: string;
});

// compile schema into model
let user = mongoose.model("User", userSchema);
