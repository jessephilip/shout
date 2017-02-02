// import twitterAPI
const twitterAPI = require("node-twitter-api");

// setup twitterAPI
let twitter = new twitterAPI({consumerKey: process.env.TWITTER_CONSUMER_KEY, consumerSecret: process.env.TWITTER_CONSUMER_SECRET, callback: "http://localhost:3000/twitterCallback"});

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

        twitter.getAccessToken(requestToken, requestTokenSecret, oauth_verifier, function(error, accessToken, accessTokenSecret, results) {
            if (error) {
                console.log(error);
            } else {
                //store accessToken and accessTokenSecret somewhere (associated to the user)
                //Step 4: Verify Credentials belongs here
                User.findOneAndUpdate({
                    "temp.token": requestToken
                }, {
                    $set: {
                        accessTokens: {
                            twitter: {
                                accessToken: accessToken,
                                accessTokenSecret: accessTokenSecret
                            }
                        }
                    }
                }, {
                    new: true,
                    upsert: true
                }, (err, updated) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(updated);
                    }
                });

            }

        });
    },

    /* ---------- TWITTER FEED TOOLS ---------- */

    // will post new message to user's twitter feed. Promise.
    newStatus(username, message) {
        return new Promise((resolve, reject) => {

            // first get access token and secret for user
            User.findOne({username: username}, (err, userResult) => {
                console.log("userResult: ", userResult);

				let accessToken = userResult.accessTokens.twitter.accessToken;
				let accessTokenSecret = userResult.accessTokens.twitter.accessTokenSecret;

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
    }
}
