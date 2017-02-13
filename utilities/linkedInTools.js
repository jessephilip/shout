// import User model
const User = require("./models/user.js");

module.exports = {

    /* ---------- AUTHORIZATION TOOLS ---------- */

    /* ---------- LinkedIn NewsFeed TOOLS ---------- */

    // will share new message to user's linkedin feed. Creates a Promise.
    share(username, title, restObject) {
        return new Promise((resolve, reject) => {

            // first get access token and secret for user
            User.findOne({
                username: username
            }, (err, userResult) => {
                // console.log("userResult: ", userResult);

                // get linkedin Access Token
                let accessToken = userResult.credentials.linkedin.accessToken;

                // check for the existance of the linkedin access token
                if (!accessToken) {

                    // if the linkedin access token does not exist, return error advising user to authorize linkedin.
                    let error = new Error("LinkedIn Access Token Not Acquired. User must grant access to LinkedIn.");
                    reject(error// if linkedin access token exists, continue
                    );
                } else {

                    // gather pieces of message
                    // TODO: let the user know what pieces are what when multiple windows pop up for a linkedin message

                    let content = {
                        // the main shout field will go to the title of the article
                        title: title
                    };

                    // create object for visibility
                    let visibility = {
                        code: restObject.visibility
                    };

                    // side panels to be filled out
                    if (restObject.hasOwnProperty("description"))
                        content.description = restObject.description;
                    if (restObject.hasOwnProperty("url"))
                        content["submitted-url"] = restObject.url;
                    if (restObject.hasOwnProperty("image"))
                        content["submitted-image-url"] = restObject.image;
                    if (restObject.hasOwnProperty("comment"))
                        content.comment = restObject.comment;

                    let postURL = "https://api.linkedin.com/v1/people/~/shares?";

                    // temporary resolve
                    resolve(postURL);

                    // twitter.statuses("update", {
                    // 	status: message
                    // }, accessToken, accessTokenSecret, function(error, data, response) {
                    // 	if (error) {
                    // 		// something went wrong
                    // 		if (error) {
                    // 			console.log("statuses update error: ", error)
                    // 			reject(error);
                    // 		}
                    // 	} else {
                    // 		// data contains the data sent by twitter
                    // 		resolve(data);
                    // 	}
                }
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
                            console.log("getTimeline error: ", error);
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
