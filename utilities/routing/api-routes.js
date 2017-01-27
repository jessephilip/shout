// import twitter connection
const client = require("../connections/twitter.js");
const User = require("../models/user.js");

// export routes to go to server.js
module.exports = (app) => {

	// database GET routes

	app.get("/getUser", (req, res) => {
		let name = req.headers.name;
		let password = req.headers.password;
		User.find({name: name}, function(error, results) {
			console.log(`Attempted Password: ${password}. User Password: ${results[0].password}`);

			if (error) {
				console.log(`Error. Error in finding user ${name}.`, error);
				res.status(500).send(`Error. Error in finding user ${name}.`, error);
			}

			else if (results.length == 0) {
				console.log(`Error. User ${name} not found`);
				res.status(500).send(`Error. User ${name} not found`);
			}

			else if (results[0].password !== password) {
				console.log("Error. Password is incorrect.");
				res.status(500).send(`Error. Password is incorrect.`);
			}

			// if no errors or pseudo-errors send positive response
			else {
				res.status(200).send(results);
			}
		});
	});

	// database POST routes

	//TODO: handle error if non-unique username is attempted
	app.post("/createUser", (req, res) => {
		console.log("/createUser reached", req.body);
		let params = req.body;
		if (params.password == params.confirm) {
			let newUser = new User({name: params.name, password: params.password});
			newUser.save( (error, newUserResult) => {
				if (error) {
					res.status(500).send(`Error creating user ${params.name}.`, error);
				}
				else {
					console.log(`Success ${params.name} created.`);
					res.send(`Success ${params.name} created.`, newUserResult);
				}
			});
		}
		else {
			res.status(500).send("Password and Confirmation do not match.");
		}

	});


    // twitter GET routes
    app.get("/getTweets", (req, res) => {

		// use the twitter api to get the current user's tweets
        client.get('statuses/user_timeline', req.params, (error, tweets, response) => {
			res.send(tweets);

        });
    });

	// twitter POST routes
	app.post("/tweet", (req, res) => {

		console.log(req.body);

		//use the twitter api to post a tweet
		client.post("statuses/update", {status: req.body.msg}, (error, tweet, response) => {
			if (error) console.log(error);
			else {
				console.log("response", response);
				res.send(tweet);
			}
		});
	});
}
