// import twitterAPI
const twitterAPI = require("node-twitter-api");

// setup twitterAPI
let twitter = new twitterAPI({consumerKey: process.env.TWITTER_CONSUMER_KEY, consumerSecret: process.env.TWITTER_CONSUMER_SECRET, callback: process.env.HOME + "/twitterCallback"});

// import User model
const User = require("./models/user.js");

module.exports = {

    /* ---------- AUTHORIZATION TOOLS ---------- */

    twitterGetRequestToken: () => {

        // set up promise that uses node-twitter-api to get request token for authentication process
        return new Promise(function(resolve, reject) {

            // use node-twitter-api to get request token for authentication process
            twitter.getRequestToken(function(error, requestToken, requestTokenSecret, results) {
                if (error) {
                    reject(error);
                } else {
                    const token = {
                        requestToken: requestToken,
                        requestTokenSecret: requestTokenSecret
                    };

                    // return temporary request tokens
                    resolve(token);
                }
            });

        });

    },

    twitterGetAccessToken: (requestToken, requestTokenSecret, oauth_verifier) => {

        // make function return a promise for chaining abilities
        return new Promise(function(resolve, reject) {

            // using temporary tokens and oauth verification, get access tokens and secrets
            twitter.getAccessToken(requestToken, requestTokenSecret, oauth_verifier, function(error, accessToken, accessTokenSecret, results) {
                if (error) {
                    console.log("Twitter get access token error: ", error);
                    reject(error);
                } else {

                    // find user based on temporary token and, once successful, save access token and secret to the database
                    User.findOneAndUpdate({
                        "temp.token": requestToken
                    }, {
                        $set: {
                            "credentials.twitter.accessToken": accessToken,
                            "credentials.twitter.accessTokenSecret": accessTokenSecret
                        }
                    }, {
                        new: true
                    }, (err, updated) => {
                        if (err) {
                            console.log(err);
                            reject(error);
                        } else {
                            console.log(updated);
                            resolve(updated);
                        }
                    });

                }

            });
        });
    },

    /* ---------- TWITTER FEED TOOLS ---------- */

    // will post new message to user's twitter feed. Promise.
    newStatus(username, message) {
        return new Promise((resolve, reject) => {

            // first get access token and secret for user
            User.findOne({
                username: username
            }, (err, userResult) => {
                // console.log("userResult: ", userResult);

                let accessToken = userResult.credentials.twitter.accessToken;
                let accessTokenSecret = userResult.credentials.twitter.accessTokenSecret;

                twitter.statuses("update", {
                    status: message
                }, accessToken, accessTokenSecret, function(error, data, response) {
                    if (error) {
                        // something went wrong
                        if (error) {
                            reject(error);
                        }
                    } else {
                        // data contains the data sent by twitter
                        resolve(data);
                    }
                });
            });
        });
    },

    // username is the user's login name with Shout. screenName is the user's handle with TWitter
    getUserTimeline(username) {
        return new Promise((resolve, reject) => {

            // first get access token and secret for user
            User.findOne({
                username: username
            }, (err, userResult) => {
                // console.log("userResult: ", userResult);

                let accessToken = userResult.credentials.twitter.accessToken;
                let accessTokenSecret = userResult.credentials.twitter.accessTokenSecret;

				let screen_name = userResult.credentials.twitter.screen_name;

                twitter.getTimeline("user", {
                    screen_name: screen_name
                }, accessToken, accessTokenSecret, function(error, data, response) {
                    if (error) {
                        // something went wrong
                        if (error) {
                            reject(error);
                        }
                    } else {
                        // data contains the data sent by twitter
                        resolve(data);
                    }
                });
            });
        });
    },

    // username is user's registered username with Shout. Returns a promise.
    getAccountDetails(username) {
        return new Promise((resolve, reject) => {

            // using user's name, find the user's access token and secret in the MongoDb database
            User.findOne({
                username: username
            }, (err, userResult) => {
                if (err) {
                    console.log("get account details errored on finding user by user name: ", err);
                } else {
                    console.log("userResult: ", userResult);

                    // variables to hold the access token and secret
                    let accessToken = userResult.credentials.twitter.accessToken;
                    let accessTokenSecret = userResult.credentials.twitter.accessTokenSecret;

                    // get user's account information
                    twitter.verifyCredentials(accessToken, accessTokenSecret, function(error, data, response) {
                        if (error) {
                            //something was wrong with either accessToken or accessTokenSecret
                            //start over with Step 1
                            console.log("Twitter Verify Credentials Error: ", error);
                        } else {
                            //data contains the user-data described in the official Twitter-API-docs
                            //you could e.g. display his screen_name
                            console.log(`User's screen name: ${data.screen_name}`);

                            // save user's screen_name to database
                            User.findOneAndUpdate({
                                username: username
                            }, {
                                $set: {
                                    "credentials.twitter.screen_name": data.screen_name
                                }
                            }, {
                                new: true
                            }, (err, updated) => {
                                if (err) {
                                    console.log(err);
                                    reject(error);
                                } else {
                                    console.log(updated);
                                    resolve(updated);
                                }
                            });

                        }
                    });
                }
            });
        });
    }
}
