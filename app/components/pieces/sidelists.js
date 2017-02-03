// Include React
import React from "react";

// import SideBarItems
import SideBarItems from "./sidebaritems.js";

// Creating a network box component. this checkbox will determine which social networks receive a post.
export default class SideLists extends React.Component {

    constructor() {
        super();
        this.state = {
            messages: []
        };
        this.getTweets = this.getTweets.bind(this);
        this.setTweets = this.setTweets.bind(this);
        this.getClicked = this.getClicked.bind(this);
    }

    setTweets() {

        this.getTweets().then((tweets) => {
            // console.log(tweets);
            this.setState({messages: tweets.data});
        });
    }

    getTweets() {
        return new Promise(function(resolve, reject) {

            // get current username
            let username = localStorage.getItem("shoutUserNameLS");

            // prepare custom headers
            let options = {
                headers: {
                    username: username
                }
            };

            // api call to getTweets. Returns a promise.
            axios.get("/getTweets", options).then((result) => {
                resolve (result);
            }).catch((error) => {
                reject (error);
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
