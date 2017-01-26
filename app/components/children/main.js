//TODO: change the highlight color of the input field

// Include React
import React from "react";

// import networks
import networks from "../../../public/assets/javascript/networks.js";

// import twitter helper
import twitter_helper from "../../../utilities/helpers/twitter-helper.js";

// import CheckBox
import NetworkBox from "../pieces/networkbox.js";

// import Collapsible SideLists
import SideList from "../pieces/sidelists.js";

// Creating the Main component
export default class Main extends React.Component {

    // set up constructor
    constructor() {
        super();
        this.state = {
            postStatus: [],
            tweets: []
        };
        this.getTweets = this.getTweets.bind(this);
        this.tweet = this.tweet.bind(this);
        this.toggleNetworkState = this.toggleNetworkState.bind(this);
        this.shout = this.shout.bind(this);
		this.clearNetworksSelected = this.clearNetworksSelected.bind(this);
    }

    componentDidMount() {

		// give main shout input field the focus
		document.getElementById("mainShout").focus();
    }

    toggleNetworkState(newState, bool) {
        // console.log(newState, bool);
        let present = this.state.postStatus;
        console.log(present);

        // add newState to array if boolean is true and it is not already in the array
        if (bool && present.indexOf(newState) === -1) {
            present.push(newState);
            console.log(present);
            this.setState({postStatus: present});
        }

        // if boolean is false and newState is already in the array, remove it from the array
        if (!bool && present.indexOf(newState) >= 0) {
            present.splice(present.indexOf(newState), 1);
            this.setState({postStatus: present});
            console.log(present);
        }
    }

    shout() {

        // loop through the state of postStatuses
        for (var i = 0; i < this.state.postStatus.length; i++) {

            // switch through each element of the array
            switch (this.state.postStatus[i]) {

                case "linkedin":
                    alertify.success("Posting linkedIn message.");
					this.clearNetworksSelected();
                    break;
                case "facebook":
                    alertify.success("Posting FaceBook message.");
					this.clearNetworksSelected();
                    break;
                case "instagram":
                    alertify.success("Posting Instagram message.");
					this.clearNetworksSelected();
                    break;
                case "twitter":
					// this.tweet();
                    document.getElementById("mainShout").value = "";
					this.clearNetworksSelected();
                    break;
                case "googleplus":
                    alertify.success("Posting Google Plus message.");
					this.clearNetworksSelected();
                    break;
                case "pinterest":
                    alertify.success("Posting to pinterest board.");
					this.clearNetworksSelected();
                    break;
                case "tumbler":
                    alertify.success("Posting to Tumbler.");
					this.clearNetworksSelected();
                    break;
                default:
                    alertify.error("Error. Tried to post to: " + this.state.postStatus[i] + ".");
            }
        }
    }

    getTweets() {
        return new Promise((resolve, reject) => {
            twitter_helper.getTweets("jessematherne", function(result) {
                resolve(result);
            });

        });
    }

    tweet() {
        // variable for the tweet message
        let tweet = document.getElementById("mainShout").value;
        console.log(tweet);

        // check to see if user input is valid
        if (!Boolean(tweet))
            alertify.error("Please put in a valid tweet.");
        else {

            // post tweet
            twitter_helper.createTweet(tweet, (result) => {
                console.log(result);
                alertify.success("Sweet. Shout it Out!!!");
            });
        }
    }

	clearNetworksSelected() {
		let targets = document.getElementsByClassName("networkBox");
		for (var i = 0; i < targets.length; i++) {
			targets[i].setAttribute("data-selected", false);
			targets[i].style.color = "#695d46";
		}
	}

    // Here we render the function
    render() {
        return (
            <main className="bg-main">

                {/* TODO:  this aside increases the height of the page. fix this. */}
                <aside id="sideBar" className="bg-alt" data-open="false">
                    <SideList name="Tweets" tweets={this.state.tweets}/>
                </aside>

                <div>
                    <input id="mainShout" placeholder="type your shout here"/>
                    <button className="btn btn-primary bg-accent text-bg-main" onClick={this.shout}>Shout</button>
                </div>
                <div id="socialChecks">
                    <NetworkBox toggleState={this.toggleNetworkState} network={networks.linkedin}/>
                    <NetworkBox toggleState={this.toggleNetworkState} network={networks.facebook}/>
                    <NetworkBox toggleState={this.toggleNetworkState} network={networks.instagram}/>
                    <NetworkBox toggleState={this.toggleNetworkState} network={networks.twitter}/>
                    <NetworkBox toggleState={this.toggleNetworkState} network={networks.googleplus}/>
                    <NetworkBox toggleState={this.toggleNetworkState} network={networks.pinterest}/>
                    <NetworkBox toggleState={this.toggleNetworkState} network={networks.tumbler}/>
                </div>

            </main>
        );
    }
}
