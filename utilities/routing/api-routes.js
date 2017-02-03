// import twitter connection
const client = require("../connections/twitter.js");

// import Mongoose User Schema
const User = require("../models/user.js");

// import axios
const axios = require("axios");

// import custom tools functions
const twitterTools = require("../twitterTools.js");

// import express' request module
const request = require("request");

// import opn
const opn = require("opn");

// export routes to go to server.js
module.exports = (app) => {

    // database GET routes

    // login route.
    app.get("/getUser", (req, res) => {

        // login parameters are passed in the header, so parse them out into variables.
        let username = req.headers.username;
        let password = req.headers.password;

        // use Mongoose's find function to search for the username passed from the client.
        User.find({
            username: username
        }, function(error, results) {

            // TODO: check out status codes for appropriate codes for custom errors
            // if User.find returns an error, handle that error.
            if (error) {
                console.log(`Error. Error in finding user ${username}.`, error);
                res.status(501).send(`Error. Error in finding user ${username}.` // if User.find is successful, but does not find a user by that name, handle that pseduo-error
                );
            } else if (results.length == 0) {
                console.log(`Error. User ${name} not found`);
                res.status(502).send(`Error. User ${name} not found` // if User.find is successful, but the password supplied by the client does not match the returned password, handle that pseudo-error
                );
            } else if (results[0].password !== password) {
                console.log("Error. Password is incorrect.");
                res.status(503).send(`Error. Password is incorrect.` // if no errors or pseudo-errors send positive response to the client
                );
            } else {
                res.send(results);
            }
        });
    });

    // database POST routes

    // route to create user
    app.post("/createUser", (req, res) => {
        console.log("/createUser reached", req.body);

        // capture the object sent by the client
        let params = req.body;

        // check password and Confirmation
        console.log(`User Password: ${params.password}. Confirmation Password: ${params.confirm}.`);

        // check that the user's password and the confirmed password match
        if (params.password == params.confirm) {

            // create newUser using User Schema
            let newUser = new User({username: params.username, password: params.password});

            // save newUser to the MongoDb database
            newUser.save((error, newUserResult) => {
                if (error) {
                    console.log(`Error creating user ${params.username}.`, error);
                    res.send(error);
                } else {
                    console.log(`Success ${params.username} created.`);
                    res.send(newUserResult);
                }
            });
        } else {
            console.log("else reached. password and confirmation signup.");
            res.send("Error. Password and Confirmation do not match.");
        }

    });

    // twitter GET routes
    app.get("/getTweets", (req, res) => {
		console.log("/getTweets hit");

		let username = req.headers.username;

		// get user's home timeline
		twitterTools.getUserTimeline(username).then(timeline => {
			console.log("/getTweets results: ", timeline);
			res.send(timeline);
		}).catch(timelineError => {
			console.log("/getTweets error", error);
			res.send(timelineError);
		});
    });

    // twitter POST routes
    app.post("/tweet", (req, res) => {

		// console.log("/tweet hit");

		// get username from client
        let username = req.body.username;
		let message = req.body.message;

		twitterTools.newStatus(username, message).then(result => {
			res.send(result);
		}).catch(error => {
			res.send(error);
		});
    });

    /* ---------- AUTHORIZE ROUTES ---------- */

    // authorize linkedin
    app.post("/authorizeLinkedIn", (req, res) => {

        // get username passed in arguments
        let username = req.body.username;

        console.log("/authorizeLinkedIn username: ", username);

        res.end();
    });

    // authorize facebook
    app.post("/authorizeFacebook", (req, res) => {

        // get username passed in arguments
        let username = req.body.username;

        console.log("/authorizeFacebook username: ", username);

        res.end();
    });

    // authorize Instagram
    app.post("/authorizeInstagram", (req, res) => {

        // get username passed in arguments
        let username = req.body.username;

        console.log("/authorizeInstagram username: ", username);

        res.end();
    });

    // TWITTER ROUTES

    app.get("/twitterCallback", (req, res) => {
        let tokens = {
            oauth_token: req.query.oauth_token,
            oauth_verifier: req.query.oauth_verifier
        };

        // use oauth_token to find its matching secret
        User.findOne({
            "temp.token": tokens.oauth_token
        }, (err, secret) => {
            if (err) {
                console.log("Error looking up user by temp.token: ", err);
            } else {
                // console.log("secret token", secret.temp.secret);
				// capture user's shout username
				let username = secret.username;
                twitterTools.twitterGetAccessToken(secret.temp.token, secret.temp.secret, tokens.oauth_verifier).then(result => {
					twitterTools.getAccountDetails(username).then(details => {
					return details;
					});

				})

            }
        });

    });

    // sign in with twitter
    app.post("/authorizeTwitter", (req, res) => {

        // get username passed in arguments
        let username = req.body.username;

        // get and save temporary token to database
        twitterTools.twitterGetRequestToken().then((tokens) => {
            // console.log(tokens);

            // using User model. Update model with temporary tokens from authentication request
            User.findOneAndUpdate({
                username: username
            }, {
                $set: {
                    temp: {
                        token: tokens.requestToken,
                        secret: tokens.requestTokenSecret
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

                    // use opn to open web browser. allows user to authorize Shout with twitter.
                    opn("https://api.twitter.com/oauth/authorize?oauth_token=" + tokens.requestToken);

                    res.end();
                }
            });
        }).catch((useNodeError) => {
            console.log("useNodeError: ", useNodeError);
        });
    });

    // authorize Google Plus
    app.post("/authorizeGooglePlus", (req, res) => {

        // get username passed in arguments
        let username = req.body.username;

        console.log("/authorizeGooglePlus username: ", username);

        res.end();
    });

    // authorize Pinterest
    app.post("/authorizePinterest", (req, res) => {

        // get username passed in arguments
        let username = req.body.username;

        console.log("/authorizePinterest username: ", username);

        res.end();
    });

    // authorize tumblr
    app.post("/authorizeTumblr", (req, res) => {

        // get username passed in arguments
        let username = req.body.username;

        console.log("/authorizeTumblr username: ", username);

        res.end();
    });
}
