// Include React
const React = require("react");

const Header = require("./children/header.js");
const Main = require("./children/main.js");
const Footer = require("./children/footer.js");

// Creating the Main component
const Layout = React.createClass({

    // Here we render the function
    render: function() {
        return (
            <div id="layout">
                <Header/>
                <Main/>
                <Footer/>
            </div>
        );
    }
});

// Export the component back for use in other files
module.exports = Layout;
