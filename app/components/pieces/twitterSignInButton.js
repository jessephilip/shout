// Include React
import React from "react";

// Creating a network box component. this checkbox will determine which social networks receive a post.
export default class TwitterSignInButton extends React.Component {

    constructor() {
        super();
        this.state = {};
        this.authorizeTwitter = this.authorizeTwitter.bind(this);
    }

    authorizeTwitter() {

		// get username from localStorage
		let username = localStorage.getItem("shoutUserNameLS");

        axios.post("/authorizeTwitter", {username: username}).then((result) => {
            console.log(result);

        }).catch((error) => {
            console.log(error);
        });
    }

    render() {
        return (
            <div>
                <button id="twitterSignInButton" className="btn" onClick={this.authorizeTwitter}>Sign in with Twitter</button>
            </div>
        );
    }
}
