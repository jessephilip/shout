// import mongoose
const mongoose = require("mongoose");

// create schema
let userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true

    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    userCreated: {
        type: Date,
        default: Date.now
    }
});

// compile schema into model
let user = mongoose.model("User", userSchema);

module.exports = user;
