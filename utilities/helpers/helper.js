// import axios
const axios = require("axios");

// get the texts of my tweets
module.exports = {

    // database GET routes
    getUser: (userObject) => {

		let config = {
			headers: {
				name: userObject.name,
				password: userObject.password
			}
		};

        axios.get("/getUser", config).then((result) => {
            console.log(result);
        }).catch((error) => {
            console.log(error);
        });
    },

    // database POST routes

    createUser: (userObject) => {
        axios.post("/createUser", userObject).then((result) => {
            console.log(result);
        }).catch((error) => {
            console.log(error);
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
