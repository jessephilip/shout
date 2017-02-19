// TODO: When backing out completely out of the header options menu, restore the shout menu to the screen
// TODO: Description with linked in didn't go through. Did not have to do with "" in description.
// TODO: spacing for top of options bar
// TODO: Light up the icons that are "supposedly" authorized
// TODO: Implement sign in with Google, Facebook, Twitter, linkedin
// TODO: Update "username and account picture" in header with photo from Google, Facebook, Twitter, LinkedIn
// TODO: Only show the icons that are authorized in the main shout menu and in the notifications sidebar
// TODO: Set up LinkedIn and Facebook to work with the feed bar
// TODO: autoclose the authorizzation window when confirmed
// TODO: set up error handling for authorization
// TODO: have on screen prompts to help with messaging
// TODO: let the user know what pieces are what when multiple windows pop up for a linkedin message
// TODO: change the highlight color of the input field
// TODO: use different color error messages for the different color networks
// TODO: set up cancel buttons on both login and submit

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
        this.openOptionsBar = this.openOptionsBar.bind(this);
        this.closeOptionsBar = this.closeOptionsBar.bind(this);
    }

    componentDidMount() {
        // console.log("main did mount");

        let username = localStorage.getItem("shoutUserNameLS");

        try {
            if (username.length > 0) {

                document.getElementById('welcomeScreen').style.display = "none";
                document.getElementById('mainShoutDiv').style.display = "initial";
            }

        } catch (err) {
            console.log("No user logged in.");
            document.getElementById('mainShoutDiv').style.display = "none";
        }

        // give main shout input field the focus
        document.getElementById("mainShout").focus();
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("componentDidUpdate main.js");
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
        console.log(newState, bool);
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

        // open the options bar if at least one network is selected for posting
        if (this.state.postStatus.length > 0) {

            // get the optionsBar
            let optionsBar = document.getElementById('optionsBar');

            // get the articles within the optionsBar
            let optionsArticles = optionsBar.getElementsByTagName("article");

            for (var i = 0; i < optionsArticles.length; i++) {
                optionsArticles[i].style.display = "none";
            }

            for (i = 0; i < this.state.postStatus.length; i++) {
                document.getElementById(this.state.postStatus[i] + "Options").style.display = "initial";
            }

            this.openOptionsBar();
        }

        // close the options bar if no networks are selected
        if (this.state.postStatus.length === 0)
            this.closeOptionsBar();
        }

    // this function will open up the options side bar
    openOptionsBar() {
        console.log("open options bar");
        document.getElementById('optionsBar').style.width = "33%";
    }

    // this function will close the options side bar
    closeOptionsBar() {
        console.log("close options bar");
        document.getElementById('optionsBar').style.width = "0px";
    }

    shout() {

        let mainShoutText = document.getElementById('mainShout').value.trim();

        // staging messages: means will check validation for messages before trying to post them.
        var cont = true;

        // first check to see if mainShoutText has any input
        if (mainShoutText.length <= 0) {
            cont = false;
            alertify.error("You must have text in the shout input field.");
        } else if (this.state.postStatus.length <= 0) {
            cont = false;
            alertify.error("Please select a network to send a message to.");
        } else {

            // if there is input in the main shout field, loop through the networks in the postStatus for validation checks
            for (var i = 0; i < this.state.postStatus.length; i++) {

                let check = this.state.postStatus[i];

                switch (check) {

                    case "twitter":
                        if (mainShoutText.length > 140) {
                            cont = false;
                            alertify.error("Tweets are limited to a 140 character length. Please type a shorter message.");
                        }

                        break;

                    case "linkedin":
                        let description = document.getElementById("linkedInShoutDescription").value.trim();
                        console.log("linkedin description", description);
                        let url = document.getElementById("linkedInShoutURL").value.trim();
                        let image = document.getElementById("linkedInShoutImage").value.trim();
                        let comment = document.getElementById("linkedInShoutComment").value.trim();

                        if (mainShoutText.length > 200) {
                            cont = false;
                            alertify.error("LinkedIn titles are limited to 200 characters. Please shorten the message in the main shout input field.");
                        }

                        if (description.length > 256) {
                            cont = false;
                            alertify.error("LinkedIn descriptions are limited to 256 characters. Please shorten the description.");
                        }

                        if (url.length <= 0) {
                            cont = false;
                            alertify.error("A URL is required to post a LinkedIn message. Please post the URL to the content you are sharing.");
                        }

                        if (comment.length > 700) {
                            cont = false;
                            alertify.error("Comments are limited to 700 characters. Please shorten your comment.");
                        }

                        break;

                    default:
                        console.log("Attempted a network not yet accounted for.", this.state.postStatus[i]);
                }
            }
        }

        if (cont) {

            // loop through the state of postStatuses
            for (i = 0; i < this.state.postStatus.length; i++) {

                // switch through each element of the array
                switch (this.state.postStatus[i]) {

                    case "linkedin":
                        this.linkedInShare();
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
    }

    // this function posts a linkedin share
    linkedInShare() {

        // get username
        let username = localStorage.getItem("shoutUserNameLS");

        // variable for the linkedin title
        let share = document.getElementById("mainShout").value.trim();

        // get values from the options bar
        let description = document.getElementById("linkedInShoutDescription").value.trim();
        let url = document.getElementById("linkedInShoutURL").value.trim();
        let image = document.getElementById("linkedInShoutImage").value.trim();
        let comment = document.getElementById("linkedInShoutComment").value.trim();
        let visibility;

        // get selection from visibility radio buttons
        let radios = document.getElementsByName("linkedInVisibility");

        for (var i = 0; i < radios.length; i++) {
            if (radios[i].checked)
                visibility = radios[i].value;
            }

        // combine options into single object
        let options = {
            visibility: visibility
        };

        // first check to see if value exists before adding to object
        if (description.length > 0)
            options.description = description;
        if (url.length > 0)
            options["submitted-url"] = url;
        if (image.length > 0)
            options["submitted-image-url"] = image;
        if (comment.length > 0)
            options.comment = comment;

        // check to see if user input in main shout input field is valid
        if (!Boolean(share)) {
            alertify.error("Please put in a valid LinkedIn Share.");
        } else {
            axios.post("/linkedInShare", {
                username: username,
                message: share,
                restObject: options
            }).then(result => {

                // clear out values from input fields
                document.getElementById('mainShout').value = "";
                document.getElementById('linkedInShoutDescription').value = "";
                document.getElementById('linkedInShoutURL').value = "";
                document.getElementById('linkedInShoutImage').value = "";
                document.getElementById('linkedInShoutComment').value = "";

                alertify.success("Posting linkedIn message.");
                this.clearNetworksSelected();

            }).catch(error => {
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
                document.getElementById("mainShout").value = "";
                this.clearNetworksSelected();
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

        // clear the data in state.postStatus
        this.setState({postStatus: []});
        console.log(this.state.postStatus);

        // close options bar
        this.closeOptionsBar();
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

                <aside id="sideBar" className="bg-alt" data-open="false">
                    <SideList name="Tweets" tweets={this.state.tweets}/>
                </aside>

                <div id="welcomeScreen">
                    <h3>Welcome</h3>
                    <p>Please log in to SHOUT!</p>
                </div>

                <div id="mainShoutDiv">
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
                        <NetworkBox toggleState={this.toggleNetworkState} network={networks.tumblr}/>
                    </div>
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

                <aside id="optionsBar">
                    <article id="linkedinOptions">
                        <h4>LinkedIn Options</h4>
                        <div className="networkOptions">
                            <form>
                                <div><input id="linkedInShoutDescription" type="text" placeholder="description"/></div>
                                <div><input id="linkedInShoutURL" type="text" placeholder="url to actual message (required)"/></div>
                                <div><input id="linkedInShoutImage" type="text" placeholder="image url"/></div>
                                <div><textarea id="linkedInShoutComment" type="text" placeholder="comment"/></div>
                                <div>

                                    <input type="radio" name="linkedInVisibility" value="anyone" defaultChecked/>Anyone
                                    <input type="radio" name="linkedInVisibility" value="connections-only"/>Connections Only
                                </div>
                            </form>
                        </div>
                    </article>
                    <article id="facebookOptions">
                        <h4>Facebook Options</h4>
                    </article>
                    <article id="instagramOptions">
                        <h4>Instagram Options</h4>
                    </article>
                    <article id="twitterOptions">
                        <h4>Twitter Options</h4>
                    </article>
                    <article id="googleplusOptions">
                        <h4>Google Plus Options</h4>
                    </article>
                    <article id="pinterestOptions">
                        <h4>Pinterest Options</h4>
                    </article>
                    <article id="tumblrOptions">
                        <h4>Tumblr Options</h4>
                    </article>
                </aside>

            </main>
        );
    }
}
