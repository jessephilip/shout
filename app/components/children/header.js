// Include React
const React = require("react");

// Creating the Main component
const Header = React.createClass({

    // Here we render the function
    render: function() {
        return (
            <nav className="navbar navbar-toggleable-md navbar-light fixed-top bg-accent">
                <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <a className="navbar-brand" href="#">Shout</a>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="#">Home
                                <span className="sr-only">(current)</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Link</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link disabled" href="#">Disabled</a>
                        </li>
                    </ul>
                    <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2" type="text" placeholder="Quick Shout" />
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Quick</button>
                    </form>
                </div>
            </nav>
        );
    }
});

// Export the component back for use in other files
module.exports = Header;
