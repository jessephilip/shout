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
        let value = clicked.getAttribute("value");
        value = value.replace(" ", "");
		value = value.toLowerCase();
        // console.log("networkBox", value);

        // toggle the status and color of the anchor element
        if (clicked.getAttribute("data-selected") === "true") {
            clicked.setAttribute("data-selected", "false");

            // change color of icon
            clicked.style.color = "#695d46";

            // set status on main component to false
            this.props.toggleState(value, false);

        } else {
            clicked.setAttribute("data-selected", "true");

            // change color of icon
            clicked.style.color = "#ff712c";

            // set status on main component to false
            this.props.toggleState(value, true);
        }

    }

    // set props to the state on mounting this component
    componentDidMount() {
        this.setState({network: this.props.network});
    }

    // render the below HTML
    render() {
        return (

            <a className={this.props.network.icon + " networkBox"} data-toggle="tooltip" data-placement="bottom" title={this.props.network.name} data-selected="false" value={this.props.network.name} onClick={this.checkToggle}></a>

        );
    }
}
