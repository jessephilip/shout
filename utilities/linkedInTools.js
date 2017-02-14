// import User model
const User = require("./models/user.js");

// import request
const request = require("request");

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

                // get linkedin Access Token
                let accessToken = userResult.credentials.linkedin.accessToken;

                // check for the existance of the linkedin access token
                if (!accessToken) {

                    // if the linkedin access token does not exist, return error advising user to authorize linkedin.
                    let error = new Error("LinkedIn Access Token Not Acquired. User must grant access to LinkedIn.");
                    reject(error);

                } else {
                    // if linkedin access token exists, continue

                    // variable to contain the headers in the request
                    // contains: authorization, content-type, x-li-format
                    let headers = {};

                    // add authorization token to header
                    headers["authorization"] = "Bearer " + accessToken;

                    // add these two objects for json body
                    headers["Content-Type"] = "application/json";
                    headers["x-li-format"] = "json";

                    // prepare body for linkedin message
                    let body = {};

                    // get comment if it exists and put in the body
                    if (restObject.hasOwnProperty("comment"))
                        body["comment"] = restObject["comment"];

                    // content portion of the body to be sent to the request
                    let content = {
                        // the main shout field will go to the title of the article
                        "title": title
                    };

                    // side panels to be filled out
                    if (restObject.hasOwnProperty("description"))
                        content["description"] = restObject["description"];
                    if (restObject.hasOwnProperty("submitted-url"))
                        content["submitted-url"] = restObject["submitted-url"];
                    if (restObject.hasOwnProperty("submitted-image-url"))
                        content["submitted-image-url"] = restObject["submitted-image-url"];

                    // add content to the body object
                    body["content"] = content;

                    // visibility portion of the headers to be sent to the request
                    let visibility = {
                        "code": restObject.visibility
                    };

                    // add visibility to the headers object
                    body["visibility"] = visibility;

                    // set up options for post request to post linkedin message
                    var options = {
                        method: 'POST',
                        url: "https://api.linkedin.com/v1/people/~/shares?format=json",
                        headers: headers,
                        body: body,
                        json: true
                    };

                    // console.log("options: ", options);

                    // perform request for bearer token
                    request(options, function(error, response, body) {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(body);
                        }
                    });
                }
            });
        });
    }
}
