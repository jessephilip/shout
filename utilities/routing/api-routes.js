// import twitter connection
const client = require("../connections/twitter.js");

// export routes to go to server.js
module.exports = (app) => {

    // twitter GET routes
    app.get("/getTweets", (req, res) => {

		// use the twitter api to get the current user's tweets
        client.get('statuses/user_timeline', req.params, (error, tweets, response) => {
			res.send(tweets);

        });
    });
}
