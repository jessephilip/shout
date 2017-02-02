// Include React
import React from "react";

// import twitter helper
import helper from "../../../utilities/helpers/helper.js";

// import SideBarItems
import SideBarItems from "./sidebaritems.js";

// Creating a network box component. this checkbox will determine which social networks receive a post.
export default class SideLists extends React.Component {

    constructor() {
        super();
        this.state = {
            numbers: [1, 2, 3, 4, 5],
			messages: []
        };
		this.getTweets = this.getTweets.bind(this);
		this.getClicked = this.getClicked.bind(this);
    }

	setTweets() {
		this.getTweets().then( (tweets) => {
			// console.log(tweets);
			this.setState({messages: tweets});
		});
	}

	getTweets() {
		return new Promise( (resolve, reject) => {
			helper.getTweets("jessematherne", function(result) {
				// console.log(result);
				 resolve(result.data);
			});

		});
	}

	getClicked(e) {

		switch (e.target.getAttribute("value")) {

			case "twitter":
				// console.log("twittering");
				this.setTweets();
			break;

			default:
				console.log("Error in switch statement.");

		}
	}

    render() {
        return (
            <section id="sideBarContent">
				<SideBarItems messages={this.state.messages} clicked={this.getClicked}/>
            </section>
        );
    }
}
