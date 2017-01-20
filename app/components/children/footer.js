// Include React
const React = require ("react");

// Creating the Main component
const Footer = React.createClass ({

    // Here we render the function
    render: function () {
        return (
			<footer className="bg-accent text-center">This is the footer</footer>
        );
    }
});

// Export the component back for use in other files
module.exports = Footer;
