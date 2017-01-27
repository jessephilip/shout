// Include React
import React from "react";

// import heper to file for axios calls
import helper from "../../../utilities/helpers/helper.js"

// Creating the Main component
export default class Header extends React.Component {

    constructor() {
        super();
        this.state = {};
        this.sideBarToggle = this.sideBarToggle.bind(this);
        this.loginClick = this.loginClick.bind(this);
        this.loginSubmit = this.loginSubmit.bind(this);
        this.signUpClick = this.signUpClick.bind(this);
		this.signUpSubmit = this.signUpSubmit.bind(this);
        this.login = {};
		this.signUp = {};
    }

    sideBarToggle() {

        let open = document.getElementById("sideBar").getAttribute("data-open");
        console.log(open);

        if (open === "false") {
            document.getElementById("sideBar").style.left = "0px";
            document.getElementById("sideBar").setAttribute("data-open", true);
        } else {
            document.getElementById("sideBar").style.left = "-33%";
            document.getElementById("sideBar").setAttribute("data-open", false);
        }
    }

    // login function
    loginClick() {

        // hide the login and signup buttons
        document.getElementById("loginDiv").setAttribute("class", "hidden");

        // DOM location for login button
        const loginForm = document.getElementById("loginForm");
        loginForm.setAttribute("class", "show");

        // give name input field focus
        document.getElementById("loginName").focus();
    }

    signUpClick() {

		// hide the login and signup buttons
		document.getElementById("loginDiv").setAttribute("class", "hidden");

		// DOM location for login button
		const signUpForm = document.getElementById("signUpForm");
		signUpForm.setAttribute("class", "show");

		// give name input field focus
		document.getElementById("signUpName").focus();
    }

    // funtion governing the login submit button
    loginSubmit() {

        // DOM location for name input field
        const loginName = document.getElementById("loginName");

        // DOM location for password input field
        const loginPassword = document.getElementById("loginPassword");

        if (loginName.value) {

            // save value to login object
            this.login.name = loginName.value;

            // hide login input field
            loginName.setAttribute("class", "hidden");

            // show password input field
            loginPassword.setAttribute("class", "show");

            // give password input field focus
            loginPassword.focus();
        }

        if (loginPassword.value) {

            // save value to login object
            this.login.password = loginPassword.value;

            // hide login input field
            loginName.setAttribute("class", "hidden");

            // show password input field
            loginPassword.setAttribute("class", "show");
        }

        if (this.login.name && this.login.password) {
            console.log("log in procedures");
            helper.getUser(this.login, (result, error) => {
                if (error || result.data == "error") {
                    console.log(error);
                    alertify.error("Error logging in.");
                } else {
                    console.log(result);
                    alertify.success("Logged in.");
                }

            });

        }

    }

	signUpSubmit() {

        // DOM location for name input field
        const signUPName = document.getElementById("signUpName");

        // DOM location for password input field
        const signUpPassword = document.getElementById("signUpPassword");

		// DOM location for password input field
        const signUpConfirm = document.getElementById("signUpConfirm");

        if (signUpName.value) {

            // save value to login object
            this.signUp.name = signUpName.value;

            // hide login input field
            signUpName.setAttribute("class", "hidden");

            // show password input field
            signUpPassword.setAttribute("class", "show");

            // give password input field focus
            signUpPassword.focus();
        }

        if (signUpPassword.value) {

            // save value to login object
            this.signUp.password = signUpPassword.value;

            // hide login input field
            signUpPassword.setAttribute("class", "hidden");

            // show password input field
            signUpConfirm.setAttribute("class", "show");

			// give confirm input field the focus
			signUpConfirm.focus();
        }

		if (signUpConfirm.value) {

			// save value to login object
			this.signUp.confirm = signUpConfirm.value;

		}

        if (this.signUp.name && this.signUp.password && this.signUp.confirm && (this.signUp.password == this.signUp.confirm)) {
            console.log("sign up procedures");
            helper.createUser(this.signUp, (result, error) => {
                if (error || result.data == "error") {
                    console.log(error);
                    alertify.error("Error logging in.");
                } else {
                    console.log(result);
                    alertify.success("Logged in.");
                }

            });

        }

    }

    // Here we render the function
    render() {
        return (
            <nav className="navbar navbar-toggleable-md navbar-light fixed-top bg-accent d-flex justify-content-between">
                <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <a id="brand" className="navbar-brand" onClick={this.sideBarToggle}>Shout</a>
                <div id="loginDiv">
                    <button id="loginButton" className="btn btn-outline-primary" onClick={this.loginClick}>Login</button>
                    <button id="loginButton" className="btn btn-outline-primary" onClick={this.signUpClick}>Sign Up</button>
                </div>
                <aside id="loginForm" className="hidden">
                    <input id="loginName" type="text" placeholder="login name"/>
                    <input id="loginPassword" type="password" className="hidden" placeholder="password"/>
                    <button type="submit" className="btn btn-primary btn-sm" onClick={this.loginSubmit}>Submit</button>
                </aside>
				<aside id="signUpForm" className="hidden">
					<input id="signUpName" type="text" placeholder="desired username"/>
					<input id="signUpPassword" type="password" className="hidden" placeholder="desired password"/>
					<input id="signUpConfirm" type="password" className="hidden" placeholder="confirm password"/>
					<button type="submit" className="btn btn-primary btn-sm" onClick={this.signUpSubmit}>Submit</button>
				</aside>
            </nav>
        );
    }
}
