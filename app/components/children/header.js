// Include React
const React = require ("react");

// Creating the Main component
const Header = React.createClass ({

    // Here we render the function
    render: function () {
        return (
			<header>This is the header.</header>
        );
    }
});

// Export the component back for use in other files
module.exports = Header;
