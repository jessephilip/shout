// import twitter connection
const client = require("../connections/twitter.js");
const User = require("../models/user.js");

// export routes to go to server.js
module.exports = (app) => {

	// database GET routes

	app.get("/getUser", (req, res) => {
		console.log("/getUser reached", req.query.user);
		let params = req.query.user;
		User.find({name: params.name}, function(error, results) {
			if (error || results.data.length === 0) {
				res.send("error");
			}
			else {
				res.send(results);
			}
		});
	});

	// database POST routes
	app.post("/createUser", (req, res) => {
		console.log("/createUser reached", req.body);
		res.end();
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
