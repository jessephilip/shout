// the below is a collection of objects with information about each social network available in the program

// export the object
module.exports = {

    // linkedin
    linkedin: {
        name: "LinkedIn",
        icon: "fa fa-linkedin-square fa-2x",
        checkBoxId: "linkedInBox",
		authorize: (username) => {
			axios.post("/authorizeLinkedIn", {username: username}).then( (authorizeResult) => {
				console.log("/authorizeLinkedIn success: ", authorizeResult);
			}).catch( (authorizeError) => {
				console.log("/authorizeLinkedIn error: ", authorizeError);
			});
		}

    },

    // twitter
    twitter: {
        name: "Twitter",
        icon: "fa fa-twitter-square fa-2x",
        checkBoxId: "twitterBox",
		authorize: (username) => {
			axios.post("/authorizeTwitter", {username: username}).then( (authorizeResult) => {
				console.log("/authorizeTwitter success: ", authorizeResult);
				window.open("https://api.twitter.com/oauth/authorize?oauth_token=" + authorizeResult.data.temp.token);
			}).catch( (authorizeError) => {
				console.log("/authorizeTwitter error: ", authorizeError);
			});
		}
    },

    // facebook
    facebook: {
        name: "Facebook",
        icon: "fa fa-facebook-square fa-2x",
        checkBoxId: "facebookBox",
		authorize: (username) => {
			axios.post("/authorizeFacebook", {username: username}).then( (authorizeResult) => {
				console.log("/authorizeFacebook success: ", authorizeResult);
			}).catch( (authorizeError) => {
				console.log("/authorizeFacebook error: ", authorizeError);
			});
		}
    },

	// google plus
    googleplus: {
        name: "Google Plus",
        icon: "fa fa-google-plus-square fa-2x",
        checkBoxId: "googleplusBox",
		authorize: (username) => {
			axios.post("/authorizeGooglePlus", {username: username}).then( (authorizeResult) => {
				console.log("/authorizeGooglePlus success: ", authorizeResult);
			}).catch( (authorizeError) => {
				console.log("/authorizeGooglePlus error: ", authorizeError);
			});
		}
    },

	// pinterest
    pinterest: {
        name: "Pinterest",
        icon: "fa fa-pinterest-square fa-2x",
        checkBoxId: "pinterestBox",
		authorize: (username) => {
			axios.post("/authorizePinterest", {username: username}).then( (authorizeResult) => {
				console.log("/authorizePinterest success: ", authorizeResult);
			}).catch( (authorizeError) => {
				console.log("/authorizePinterest error: ", authorizeError);
			});
		}
    },

	// instagram
    instagram: {
        name: "Instagram",
        icon: "fa fa-instagram fa-2x",
        checkBoxId: "instagramBox",
		authorize: (username) => {
			axios.post("/authorizeInstagram", {username: username}).then( (authorizeResult) => {
				console.log("/authorizeInstagram success: ", authorizeResult);
			}).catch( (authorizeError) => {
				console.log("/authorizeInstagram error: ", authorizeError);
			});
		}
    },

	// tumblr
    tumblr: {
        name: "Tumblr",
        icon: "fa fa-tumblr-square fa-2x",
        checkBoxId: "tumblrBox",
		authorize: (username) => {
			axios.post("/authorizeTumblr", {username: username}).then( (authorizeResult) => {
				console.log("/authorizeTumblr success: ", authorizeResult);
			}).catch( (authorizeError) => {
				console.log("/authorizeTumblr error: ", authorizeError);
			});
		}
    }
}
