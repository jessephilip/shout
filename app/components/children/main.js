//TODO: change the highlight color of the input field

// Include React
import React from "react";

// import networks
import networks from "../../../public/assets/minified/networks.min.js";

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
        this.tweet = this.tweet.bind(this);
        this.linkedInShare = this.linkedInShare.bind(this);
        this.toggleNetworkState = this.toggleNetworkState.bind(this);
        this.shout = this.shout.bind(this);
        this.clearNetworksSelected = this.clearNetworksSelected.bind(this);
        this.authorizeNetworkBox = this.authorizeNetworkBox.bind(this);
    }

    componentDidMount() {
        // console.log("main did mount");

        // give main shout input field the focus
        document.getElementById("mainShout").focus();
    }

    componentDidUpdate(prevProps, prevState) {
        // console.log(this.props.change);
        // console.log("main prevProps: ", prevProps);
        // console.log("main prevState: ", prevState);

        if (this.props.change) {

            // hide main shout input field
            document.getElementById("mainShoutDiv").setAttribute("class", "hidden");

            // hide socialNetworks boxes
            document.getElementById("socialChecks").setAttribute("class", "hidden");

            // hide socialNetworks boxes
            document.getElementById("socialAuthorization").setAttribute("class", "show");
        }
    }

    toggleNetworkState(newState, bool) {
        // console.log(newState, bool);
        let present = this.state.postStatus;
        // console.log(present);

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
                    this.linkedInShare();
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
                    this.tweet();
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
                case "tumblr":
                    alertify.success("Posting to Tumblr.");
                    this.clearNetworksSelected();
                    break;
                default:
                    alertify.error("Error. Tried to post to: " + this.state.postStatus[i] + ".");
            }
        }
    }

    // this function posts a linkedin share
    linkedInShare() {
        console.log("linkedinShare");

        // get username
        let username = localStorage.getItem("shoutUserNameLS");

        // variable for the tweet message
        let share = document.getElementById("mainShout").value;

        // check to see if user input is valid
        if (!Boolean(share)) {
            alertify.error("Please put in a valid LinkedIn Share.");
        } else {
            axios.post("/linkedInShare", {
                username: username,
                message: share,
                restObject: {}
            }).then((result) => {
                console.log("/linkedInshare result: ", result);
            }).catch((error) => {
                console.log("/linkedInShare error: ", error);
            });

        }
    }

    // function to collect message from main shout input field and post that message to Twitter
    tweet() {

        // get username
        let username = localStorage.getItem("shoutUserNameLS");

        // variable for the tweet message
        let tweet = document.getElementById("mainShout").value;

        // check to see if user input is valid
        if (!Boolean(tweet)) {
            alertify.error("Please put in a valid tweet.");
        } else {
            axios.post("/tweet", {
                username: username,
                message: tweet
            }).then((result) => {
                console.log("/tweet result: ", result);
            }).catch((error) => {
                console.log("/tweet error: ", error);
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

    authorizeNetworkBox(e) {

        // get data-name attribute
        let target = e.target;

        // variable to hold network name
        let name = target.getAttribute("data-name");

        // get username from localStorage
        let username = localStorage.getItem("shoutUserNameLS");

        // run authorize function
        if (name.toLowerCase() == "linkedin") {

            let options = {
                headers: {
                    id: "linkedin",
                    username: username
                }
            };

            // api call to getClientId. Returns a promise.
            axios.get("/getClientId", options).then((result) => {
                console.log(result);

                // object to hold header values
                let authObject = {
                    response_type: "code",
                    client_id: result.data.id,
                    redirect_uri: result.data.callback,
                    state: result.data.state
                };

                // variable to hold url string
                let url = "https://www.linkedin.com/oauth/v2/authorization?";

                for (var key in authObject) {
                    url += key;
                    url += "=";
                    url += authObject[key];
                    url += "&";
                }

                url = url.substring(0, url.length - 1);

                window.open(url);

            }).catch((error) => {
                console.log(error);
            });

        } else
            networks[name.toLowerCase()].authorize(username);
        }

    // Here we render the function
    render() {
        return (
            <main className="bg-main">

                {/* TODO:  this aside increases the height of the page. fix this. */}
                <aside id="sideBar" className="bg-alt" data-open="false">
                    <SideList name="Tweets" tweets={this.state.tweets}/>
                </aside>

                <div id="mainShoutDiv">
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
                    <NetworkBox toggleState={this.toggleNetworkState} network={networks.tumblr}/>
                </div>
                <div id="socialAuthorization" className="hidden">
                    <h2>Authorize Social Networks</h2>
                    <p>Click the below buttons to authorize Shout to make and read posts on your behalf.</p>
                    <br/>
                    <div>
                        <a onClick={this.authorizeNetworkBox}>
                            <i data-name="LinkedIn" className="fa fa-linkedin-square fa-3x hvr-grow"></i>
                        </a>
                        <a onClick={this.authorizeNetworkBox}>
                            <i data-name="Facebook" className="fa fa-facebook-square fa-3x hvr-grow"></i>
                        </a>
                        <a onClick={this.authorizeNetworkBox}>
                            <i data-name="Instagram" className="fa fa-instagram fa-3x hvr-grow"></i>
                        </a>
                        <a onClick={this.authorizeNetworkBox}>
                            <i data-name="Twitter" className="fa fa-twitter-square fa-3x hvr-grow"></i>
                        </a>
                        <a onClick={this.authorizeNetworkBox}>
                            <i data-name="GooglePlus" className="fa fa-google-plus-square fa-3x hvr-grow"></i>
                        </a>
                        <a onClick={this.authorizeNetworkBox}>
                            <i data-name="Pinterest" className="fa fa-pinterest-square fa-3x hvr-grow"></i>
                        </a>
                        <a onClick={this.authorizeNetworkBox}>
                            <i data-name="Tumblr" className="fa fa-tumblr-square fa-3x hvr-grow"></i>
                        </a>
                    </div>
                </div>

            </main>
        );
    }
}
