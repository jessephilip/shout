// Include React
const React = require ("react");

// Creating the Main component
const Main = React.createClass ({

    // Here we render the function
    render: function () {
        return (
			<main>This is the main.</main>
        );
    }
});

// Export the component back for use in other files
module.exports = Main;
