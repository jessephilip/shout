// Include React
import React from "react";

// Creating the Main component
export default class Header extends React.Component {

    constructor() {
        super();
        this.state = {};
        this.sideBarToggle = this.sideBarToggle.bind(this);
    }

    sideBarToggle() {

        let open = document.getElementById("sideBar").getAttribute("data-open");
        console.log(open);

        if (open === "false") {
            document.getElementById("sideBar").style.left = "0px";
			document.getElementById("sideBar").setAttribute("data-open", true);
        }
		else {
			document.getElementById("sideBar").style.left = "-33%";
			document.getElementById("sideBar").setAttribute("data-open", false);
		}
    }

    // Here we render the function
    render() {
        return (
            <nav className="navbar navbar-toggleable-md navbar-light fixed-top bg-accent">
                <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <a id="brand" className="navbar-brand" onClick={this.sideBarToggle}>Shout</a>
            </nav>
        );
    }
}
