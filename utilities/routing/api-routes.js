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

    // general

    // this function will return the client_id for a service
    app.get("/getClientId", (req, res) => {

        // get username
        let username = req.headers.username;

        // get program requested
        let id = req.headers.id;

        // console.log("id: ", id);

        switch (id) {

            case "linkedin":
                // find user by username in the database
                User.findOne({
                    username: username
                }, (err, user) => {
                    if (err)
                        throw err;
                    else {

                        // create temporary linkedin state
                        // variable to hold random string
                        let string = "";
                        for (var i = 0; i < 20; i++) {

                            // get random number between 65 and 90
                            let number = Math.floor(Math.random() * (90 - 65)) + 65;

                            // convert number to letter in ASCII chart
                            let char = String.fromCharCode(number);

                            // push letter to array
                            string += char;
                        }

                        // convert array into string
                        console.log("string: ", string);

                        user.temp.linkedInState = string;
                        user.save((err, updatedUser) => {
                            if (err) {
                                console.log("linkedin save state error: ", err);
                                // console.log(updatedUser);
                            } else {
                                res.send({id: process.env.LINKEDIN_CLIENT_ID, callback: process.env.LINKEDIN_CALLBACK, state: string});
                            }
                        });
                    }
                });
                break;

            case "twitter":
                res.send({id: process.env.TWITTER_CONSUMER_KEY, callback: process.env.TWITTER_CALLBACK});
                break;
            default:
                res.send("You are requesting an ID for a network not supported by Shout.");
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

    app.get("/linkedinCallback", (req, res) => {

        User.findOne({
            "temp.linkedInState": req.query.state
        }, (err, user) => {
            if (err)
                throw err;
            else {
                // console.log("linkedinCallback: ", user);

                var options = {
                    method: 'POST',
                    url: 'https://www.linkedin.com/oauth/v2/accessToken',
                    qs: {
                        grant_type: "authorization_code",
                        code: req.query.code,
                        client_id: process.env.LINKEDIN_CLIENT_ID,
                        client_secret: process.env.LINKEDIN_CLIENT_SECRET,
                        redirect_uri: process.env.LINKEDIN_CALLBACK
                    },
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    }
                };

                // perform request for bearer token
                request(options, function(error, response, body) {
                    if (error) {
                        throw new Error(error);
                    } else {
                        // console.log(body);
						let accessToken = body.substring(0, body.indexOf(","));
						let accessTokenArray = accessToken.split(":");
						accessToken = accessTokenArray[1];
						accessToken = accessToken.substring(1, accessToken.length-1);

						user.credentials.linkedin.accessToken = accessToken;
                        user.save( (errToken, updatedWithToken) => {
                            if (errToken)
                                throw errToken;
                            else {
								console.log(updatedWithToken);
                                res.send("success. please close this window.");
                            }
                        });

                    }
                });
            }
        });

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
                        res.send(details);
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
                    console.log("getRequestToken find user error: ", err);
                } else {
                    console.log("getRequestToken find user results: ", updated);

                    res.send(updated);
                }
            });
        }).catch((useNodeError) => {
            console.log("getRequestToken error: ", useNodeError);
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
