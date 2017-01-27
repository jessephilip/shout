// import axios
const axios = require("axios");

// get the texts of my tweets
module.exports = {

    // database GET routes
    getUser: (userObject, callback) => {

		let config = {
			headers: {
				name: userObject.name,
				password: userObject.password
			}
		};

        axios.get("/getUser", config).then((result) => {
            callback(result);
        }).catch((error) => {
            callback(error);
        });
    },

    // database POST routes

    createUser: (userObject, callback) => {
        axios.post("/createUser", userObject).then((result) => {
            callback(result);
        }).catch((error) => {
            callback(error);
        });
    },

    // create promise to return tweets object
    getTweets: (screenName, callback) => {
        axios.get("/getTweets").then((result) => {
            callback(result);
        }).catch((error) => {
            callback(error);
        });
    },

    createTweet: (msg, callback) => {
        axios.post("/tweet", {msg: msg}).then((result) => {
            callback(result);
        }).catch((error) => {
            callback(error);
        });

    }
}
