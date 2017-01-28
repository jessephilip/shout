// Include React
import React from "react";

// import heper to file for axios calls
import helper from "../../../utilities/helpers/helper.js"

// Creating the Main component
export default class Header extends React.Component {

    constructor() {
        super();
        this.state = {
			username: "",
			name: ""
		};
        this.sideBarToggle = this.sideBarToggle.bind(this);
        this.loginClick = this.loginClick.bind(this);
        this.loginSubmit = this.loginSubmit.bind(this);
        this.signUpClick = this.signUpClick.bind(this);
        this.signUpSubmit = this.signUpSubmit.bind(this);
        this.login = {};
        this.signUp = {};
    }

    componentDidMount() {
        console.log(`header did mount.`);

        document.getElementById("loginUsername").onkeydown = (e) => {
            if (e.keyCode == 13) {
                this.loginSubmit();
            }
        };
        document.getElementById("loginPassword").onkeydown = (e) => {
            if (e.keyCode == 13) {
                this.loginSubmit();
            }
        };
        document.getElementById("signUpUsername").onkeydown = (e) => {
            if (e.keyCode == 13) {
                this.signUpSubmit();
            }
        };

        document.getElementById("signUpPassword").onkeydown = (e) => {
            if (e.keyCode == 13) {
                this.signUpSubmit();
            }
        };

        document.getElementById("signUpConfirm").onkeydown = (e) => {
            if (e.keyCode == 13) {
                this.signUpSubmit();
            }
        };
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
        document.getElementById("loginUsername").focus();
    }

    signUpClick() {

        // hide the login and signup buttons
        document.getElementById("loginDiv").setAttribute("class", "hidden");

        // DOM location for login button
        const signUpForm = document.getElementById("signUpForm");
        signUpForm.setAttribute("class", "show");

        // give name input field focus
        document.getElementById("signUpUsername").focus();
    }

    // funtion governing the login submit button
    loginSubmit() {

        // DOM location for name input field
        const loginUsername = document.getElementById("loginUsername");

        // DOM location for password input field
        const loginPassword = document.getElementById("loginPassword");

        if (loginUsername.value) {

            // save value to login object
            this.login.username = loginUsername.value;

            // clear the user data inputted in the input field
            loginUsername.value = "";

            // hide login input field
            loginUsername.setAttribute("class", "hidden");

            // show password input field
            loginPassword.setAttribute("class", "show");

            // give password input field focus
            loginPassword.focus();
        }

        if (loginPassword.value) {

            // save value to login object
            this.login.password = loginPassword.value;

            // clear the user data inputted in the input field
            loginPassword.value = "";

            // hide login input field
            loginUsername.setAttribute("class", "hidden");

            // show password input field
            loginPassword.setAttribute("class", "show");
        }

        // if the user has inputted a user login name and a user login password conduct the following
        if (this.login.username && this.login.password) {

            // prepare the object to be passed through the headers to the /getUser api-route
            let config = {
                headers: {
                    username: this.login.username,
                    password: this.login.password
                }
            };

            // api-call to /getUser
            axios.get("/getUser", config).then((result) => {
                console.log(result);
                alertify.success(`Welcome ${result.data[0].username}`);

                // hide sign up aside
                document.getElementById("loginForm").setAttribute("class", "hidden");

                // show signed in aside
                document.getElementById("signedInAside").setAttribute("class", "show");

            }).catch((error) => {
                console.log("error");
                alertify.error("errored.");
            });

        }

    }

    signUpSubmit() {

        // DOM location for name input field
        const signUpUsername = document.getElementById("signUpUsername");

        // DOM location for password input field
        const signUpPassword = document.getElementById("signUpPassword");

        // DOM location for password input field
        const signUpConfirm = document.getElementById("signUpConfirm");

        if (signUpUsername.value) {

            // save value to login object
            this.signUp.username = signUpUsername.value;

            // clear the user data inputted in the input field
            signUpUsername.value = "";

            // hide login input field
            signUpUsername.setAttribute("class", "hidden");

            // show password input field
            signUpPassword.setAttribute("class", "show");

            // give password input field focus
            signUpPassword.focus();
        }

        if (signUpPassword.value) {

            // save value to login object
            this.signUp.password = signUpPassword.value;

            // clear the user data inputted in the input field
            signUpPassword.value = "";

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

            // clear the user data inputted in the input field
            signUpConfirm.value = "";

        }

        // if the user has inputted values for username, password, and confirmed that password with a matching password, do the following
        if (this.signUp.username && this.signUp.password && this.signUp.confirm && (this.signUp.password == this.signUp.confirm)) {

            // prepare object to send to api call
            let userObject = {
                username: this.signUp.username,
                password: this.signUp.password,
                confirm: this.signUp.confirm
            };

            // api call to /createUser
            axios.post("/createUser", userObject).then((result) => {
                console.log(result);

                // if server returns a result but that result contains a MongoDb error message, handle that error.
                if (result.data.hasOwnProperty("errmsg")) {
                    alertify.error(`Error." ${result.data.errmsg}` // if no error returned, handle signup procedures
                    );
                } else {
                    alertify.success(`Congrats. ${result.data.username} created.`);

                    // hide sign up aside
                    document.getElementById("signUpForm").setAttribute("class", "hidden");

                    // show signed in aside
                    document.getElementById("signedInAside").setAttribute("class", "show");
                }
            }).catch((error) => {
                console.log(error);
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
                <a id="brand" className="navbar-brand" onClick={this.sideBarToggle} data-toggle="tooltip" data-placement="right" title="Open Drawer">Shout</a>
                <aside id="loginDiv">
                    <button id="loginButton" className="btn btn-outline-primary" onClick={this.loginClick}>Login</button>
                    <button id="signUpButton" className="btn btn-outline-primary" onClick={this.signUpClick}>Sign Up</button>
                </aside>
                <aside id="loginForm" className="hidden">
                    <input id="loginUsername" type="text" placeholder="login username"/>
                    <input id="loginPassword" type="password" className="hidden" placeholder="password"/>
                    <button type="submit" className="btn btn-primary btn-sm" onClick={this.loginSubmit}>Submit</button>
                </aside>
                <aside id="signUpForm" className="hidden">
                    <input id="signUpUsername" type="text" placeholder="desired username"/>
                    <input id="signUpPassword" type="password" className="hidden" placeholder="desired password"/>
                    <input id="signUpConfirm" type="password" className="hidden" placeholder="confirm password"/>
                    <button type="submit" className="btn btn-primary btn-sm" onClick={this.signUpSubmit}>Submit</button>
                </aside>
                <aside id="signedInAside" className="hidden">
                    <div>
                        <span>
                            <i className="fa fa-user fa-2x"></i>
                        </span>
                    </div>
                </aside>
            </nav>
        );
    }
}
