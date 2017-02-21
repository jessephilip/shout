// Include React
import React from "react";

// Creating the Main component
export default class Header extends React.Component {

    constructor() {
        super();
        this.state = {
            username: ""
        };
        this.sideBarToggle = this.sideBarToggle.bind(this);
        this.loginClick = this.loginClick.bind(this);
        this.loginSubmit = this.loginSubmit.bind(this);
        this.signUpClick = this.signUpClick.bind(this);
        this.signUpSubmit = this.signUpSubmit.bind(this);
        this.optionsClick = this.optionsClick.bind(this);
        this.signoutClick = this.signoutClick.bind(this);
        this.backClick = this.backClick.bind(this);
        this.loginCancel = this.loginCancel.bind(this);
        this.signUpCancel = this.signUpCancel.bind(this);
        this.authorizeClick = this.authorizeClick.bind(this);
        this.login = {};
        this.signUp = {};

    }

    componentDidMount() {
        // console.log("header did mount");

        // the below statements make a keylistener enabling the user to simply click enter to submit the login and signup forms.
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

        // get username from localStorage
        let username = localStorage.getItem("shoutUserNameLS");

        // check if user was previously signed in
        if (username) {

            // if user was previously logged in, hide login and signup buttons and provide welcome message to user

            // hide the login and signup buttons
            document.getElementById("loginDiv").setAttribute("class", "hidden");

            // show signed in aside
            document.getElementById("signedInAside").setAttribute("class", "show");

            alertify.success(`Welcome ${username}.`);
            this.setState({username: username});
        }
    }

    // opens the sidebar containing the recent posts for each network
    sideBarToggle() {

        // get open status of the sidebar
        let open = document.getElementById("sideBar").getAttribute("data-open");

        // if sidebar closed, open it, and vice-versa
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

    // click listener for signup button
    signUpClick() {

        // hide the login and signup buttons
        document.getElementById("loginDiv").setAttribute("class", "hidden");

        // DOM location for login button
        const signUpForm = document.getElementById("signUpForm");
        signUpForm.setAttribute("class", "show");

        // give name input field focus
        document.getElementById("signUpUsername").focus();
    }

    loginCancel() {

        // hide stuff
        document.getElementById('loginForm').setAttribute("class", "hidden");
        document.getElementById('loginPassword').setAttribute("class", "hidden");

        // show stuff
        document.getElementById('loginDiv').setAttribute("class", "show");
        document.getElementById('loginUsername').setAttribute("class", "show");

        // reset values
        this.login = {};

    }

    signUpCancel() {

        // hide stuff
        document.getElementById('signUpForm').setAttribute("class", "hidden");
        document.getElementById('signUpPassword').setAttribute("class", "hidden");

        // show stuff
        document.getElementById('loginDiv').setAttribute("class", "show");
        document.getElementById('signUpUsername').setAttribute("class", "show");

        // reset values
        this.signUp = {};
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

            // update the placeholder text for loginPassword
            loginPassword.setAttribute("placeholder", "password for " + this.login.username);

            // show password input field
            loginPassword.setAttribute("class", "show");

            // give password input field focus
            loginPassword.focus();
        }

        if (this.login.username && loginPassword.value) {

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

                // provide visual cues to the user that he or she was successfully signed in
                alertify.success(`Welcome ${result.data[0].username}`);

                // clear previous value of username, if any, from localStorage
                localStorage.removeItem("shoutUserNameLS");

                // store username to local storage
                localStorage.setItem("shoutUserNameLS", result.data[0].username);
                this.setState({username: result.data[0].username});

                // hide sign up aside
                document.getElementById("loginForm").setAttribute("class", "hidden");

                // show signed in aside
                document.getElementById("signedInAside").setAttribute("class", "show");

                // hide welcome screen
                document.getElementById('welcomeScreen').style.display = "none";

                // show mainshout screen
                document.getElementById('mainShoutDiv').style.display = "initial";

                // hide the loginPassword input field
                loginPassword.setAttribute("class", "hidden");

                // show the loginUsername input field
                loginUsername.setAttribute("class", "show");

            }).catch((error) => {
                alertify.error(`Given password for ${this.login.username} was incorrect. Please try again.`);
            });

        }

    }

    // function governing the submit button for the various sign up forms in the header
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

            // update placeholder text for signUpPassword
            signUpPassword.setAttribute("placeholder", "password for " + this.signUp.username);

            // hide login input field
            signUpUsername.setAttribute("class", "hidden");

            // show password input field
            signUpPassword.setAttribute("class", "show");

            // give password input field focus
            signUpPassword.focus();
        }

        if (signUpPassword.value) {

            console.log(this.signUp.username);

            // save value to login object
            this.signUp.password = signUpPassword.value;

            // clear the user data inputted in the input field
            signUpPassword.value = "";

            // update placeholder text for signUpPassword
            signUpConfirm.setAttribute("placeholder", "confirm password for " + this.signUp.username);

            // hide login input field
            signUpPassword.setAttribute("class", "hidden");

            // show password input field
            signUpConfirm.setAttribute("class", "show");

            // give confirm input field the focus
            signUpConfirm.focus();
        }

        if (signUpConfirm.value) {

            // update placeholder text for signUpConfirm
            signUpConfirm.setAttribute("placeholder", "confirm password for " + this.signUp.username);

            // save value to login object
            this.signUp.confirm = signUpConfirm.value;

            // clear the user data inputted in the input field
            signUpConfirm.value = "";

        }

        // if the user has inputted values for username, password, and confirmed that password with a matching password, do the following
        if (this.signUp.username && this.signUp.password && this.signUp.confirm) {

            if (this.signUp.password != this.signUp.confirm) {

                // send message to the user that the password and confirm do not match
                alertify.error("Password and Confirm do not match. Please try again.");

                // reset password and confirm password
                delete this.signUp.password;
                delete this.signUp.confirm;

                // hide confirm password
                signUpConfirm.setAttribute("class", "hidden");

                // show password
                signUpPassword.setAttribute("class", "show");

				// give focus to signUpPassword
				signUpPassword.focus();

            } else {

                // prepare object to send to api call
                let userObject = {
                    username: this.signUp.username,
                    password: this.signUp.password,
                    confirm: this.signUp.confirm
                };

                // api call to /createUser
                axios.post("/createUser", userObject).then(result => {

                    // if server returns a result but that result contains a MongoDb error message, handle that error.
                    if (result.data.hasOwnProperty("errmsg")) {
                        console.log(result.data.errmsg);

                        let check = result.data.errmsg.includes("E11000");
						console.log(check);

                        if (check) {

							// notify the user that they attepted a username that is already taken
                            alertify.error(`${this.signUp.username} is already taken. Please try a different username.`);

							// reset this.signUp
							this.signUp = {};

							// hide stuff
							signUpPassword.setAttribute("class", "hidden");
							signUpConfirm.setAttribute("class", "hidden");

							// show stuff
							signUpUsername.setAttribute("class", "show");

							// give signUpUsername focus
							signUpUsername.focus();

                        }
						else {
							alertify.error("There was some other error Shout is unaware of. Oh no!!!");
						}

                    // if no error returned, handle signup procedures
                    } else {

                        // provide visual cues to the user
                        alertify.success(`Congrats. ${result.data.username} created.`);
                        alertify.success(`${result.data.username} signed in.`);

                        // if username item is present in local storage, delete it
                        localStorage.removeItem("shoutUserNameLS");

                        // set username to local storage
                        localStorage.setItem("shoutUserNameLS", result.data.username);
                        this.setState({username: result.data.username})

                        // hide sign up aside
                        document.getElementById("signUpForm").setAttribute("class", "hidden");

                        // show signed in aside
                        document.getElementById("signedInAside").setAttribute("class", "show");

                        // hide welcomeScreen
                        document.getElementById('welcomeScreen').style.display = "none";

                        // show mainShoutDiv
                        document.getElementById('mainShoutDiv').style.display = "initial";

						// reset this.signUp in case another user account is set up
						this.signUp = {};

						// hide stuff
						signUpPassword.setAttribute("class", "hidden");
						signUpConfirm.setAttribute("class", "hidden");

						// show stuff
						signUpUsername.setAttribute("class", "show");

						// give focus to the mainShout Input Field
						document.getElementById('mainShout').focus();

                    }
                }).catch((error) => {
                    console.log("createUser error: ", error);
                });

            }
        }

    }

    optionsClick() {
        // console.log("options click");

        // hide sign up aside
        document.getElementById("signedInAside").setAttribute("class", "hidden");

        // show signed in aside
        document.getElementById("optionsAside").setAttribute("class", "show");
    }

    backClick() {

        // hide sign up aside
        document.getElementById("optionsAside").setAttribute("class", "hidden");

        // hide socialAuthorize
        document.getElementById('socialAuthorization').style.display = 'none';

        // show signed in aside
        document.getElementById("signedInAside").setAttribute("class", "show");

        // show mainShoutDiv
        document.getElementById('mainShoutDiv').style.display = 'initial';

    }

    signoutClick() {
        // console.log("options click");

        // remove username from localStorage
        localStorage.removeItem("shoutUserNameLS");

        // hide sign up aside
        document.getElementById("optionsAside").setAttribute("class", "hidden");

        // show signed in aside
        document.getElementById("loginDiv").setAttribute("class", "show");

        // hide mainShoutDiv
        document.getElementById('mainShoutDiv').style.display = "none";

        // hide socialAuthorization
        document.getElementById('socialAuthorization').style.display = "none";

        // show welcomeScreen
        document.getElementById('welcomeScreen').style.display = "initial";

        // provide visual cue to user
        alertify.success("Signed Out");
        this.setState({username: ""});
        this.login = {};
        this.signUp = {};

    }

    authorizeClick() {

        // hide mainShoutDiv
        document.getElementById('mainShoutDiv').style.display = "none";

        // show authorize section
        document.getElementById('socialAuthorization').style.display = "initial";
    }

    // Here we render the function
    render() {
        return (
            <nav className="navbar navbar-toggleable-md navbar-light fixed-top bg-accent d-flex justify-content-between">
                <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <a id="brand" className="navbar-brand" onClick={this.sideBarToggle} data-toggle="tooltip" data-placement="right" title="Open Drawer">
                    <i className="fa fa-bullhorn fa-2x"></i>
                </a>
                <h1>Shout</h1>
                <aside id="loginDiv">
                    <button id="loginButton" className="btn btn-outline-primary" onClick={this.loginClick}>Login</button>
                    <button id="signUpButton" className="btn btn-outline-primary" onClick={this.signUpClick}>Sign Up</button>
                </aside>
                <aside id="loginForm" className="hidden">
                    <input id="loginUsername" type="text" placeholder="login username"/>
                    <input id="loginPassword" type="password" className="hidden" placeholder="password"/>
                    <button type="submit" className="btn btn-primary btn-sm" onClick={this.loginSubmit} value="submit">Submit</button>
                    <button type="submit" className="btn btn-primary btn-sm" onClick={this.loginCancel} value="cancel">Cancel</button>
                </aside>
                <aside id="signUpForm" className="hidden">
                    <input id="signUpUsername" type="text" placeholder="desired username"/>
                    <input id="signUpPassword" type="password" className="hidden" placeholder="password"/>
                    <input id="signUpConfirm" type="password" className="hidden" placeholder="confirm password"/>
                    <button type="submit" className="btn btn-primary btn-sm" onClick={this.signUpSubmit} value="submit">Submit</button>
                    <button type="submit" className="btn btn-primary btn-sm" onClick={this.signUpCancel} value="cancel">Cancel</button>
                </aside>
                <aside id="signedInAside" className="hidden">
                    <div>
                        <span>
                            <a data-toggle="tooltip" data-placement="left" title="user options" onClick={this.optionsClick}>
                                <div>
                                    <i className="fa fa-user fa-2x"></i>
                                </div>
                                <span>{this.state.username}</span>
                            </a>
                        </span>
                    </div>
                </aside>
                <aside id="optionsAside" className="hidden">
                    <div>
                        <a>
                            <i className="fa fa-cloud fa-2x" data-toggle="tooltip" data-placement="bottom" title="authorize" onClick={this.authorizeClick}></i>
                        </a>
                        <a>
                            <i className="fa fa-sign-out fa-2x" data-toggle="tooltip" data-placement="bottom" title="signout" onClick={this.signoutClick}></i>
                        </a>
                        <a>
                            <i className="fa fa-chevron-right fa-2x" data-toggle="tooltip" data-placement="bottom" title="back" onClick={this.backClick}></i>
                        </a>
                    </div>
                </aside>
            </nav>
        );
    }
}
