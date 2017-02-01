const request = require("request");
const OAuth = require("oauth-1.0a");
const crypto = require ("crypto");

var oauth = OAuth({
    consumer: {
        key: process.env.TWITTER_CONSUMER_KEY,
        secret: process.evn.TWITTER_CONSUMER_SECRET
    },
    signature_method: 'HMAC-SHA1',
    hash_function: function(base_string, key) {
        return crypto.createHmac('sha1', key).update(base_string).digest('base64');
    }
});

var request_data = {
    url: 'https://api.twitter.com/oauth/request_token',
    method: 'POST',
    data: {
        oauth_callback: 'http://localhost:3000/'
    }
};
