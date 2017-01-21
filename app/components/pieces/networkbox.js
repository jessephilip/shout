// Include React
import React from "react";

// Creating a network box component. this checkbox will determine which social networks receive a post.
export default class NetworkBox extends React.Component {

    constructor() {
        super();
        this.state = {
            network: ""
        };
        this.checkToggle = this.checkToggle.bind(this);
    }

	// toggle the status and color of the checkbox
    checkToggle(e) {

        // get the element that was clicked
        let clicked = (e.target);

        // toggle the status and color of the anchor element
        if (clicked.getAttribute("data-toggle") === "true") {
            clicked.setAttribute("data-toggle", "false");

            // change color of icon
            clicked.style.color = "#695d46";

        } else {
            clicked.setAttribute("data-toggle", "true");

            // change color of icon
            clicked.style.color = "#ff712c";
        }

    }

	// set props to the state on mounting this component
    componentDidMount() {
        this.setState({network: this.props.network});
    }

    // render the below HTML
    render() {
        return (

            <a className={this.props.network.icon} data-toggle="false" value={this.props.network.name} onClick={this.checkToggle}></a>

		);
    }
}
