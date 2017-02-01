// import twitterAPI
var twitterAPI = require("node-twitter-api");

module.exports = {

    useNodeTWitter: () => {

        return new Promise(function(resolve, reject) {
            var twitter = new twitterAPI({consumerKey: process.env.TWITTER_CONSUMER_KEY, consumerSecret: process.env.TWITTER_CONSUMER_SECRET, callback: "http://localhost:3000"});

            twitter.getRequestToken(function(error, requestToken, requestTokenSecret, results) {
                if (error) {
                    reject(error);
                } else {

                    const token = {
                        requestToken: requestToken,
                        requestTokenSecret: requestTokenSecret
                    };

                    resolve(token);

                }
            });

        });

    }

}
