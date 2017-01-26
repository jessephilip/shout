// import axios
const axios = require("axios");

// get the texts of my tweets
module.exports = {

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
