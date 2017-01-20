// Include React
import React from "react";

import Header from "./children/header.js";
import Main from "./children/main.js";
import Footer from "./children/footer.js";

// Creating the Main component
export default class Layout extends React.Component {

    // Here we render the function
    render() {
        return (
            <div id="layout">
                <Header/>
                <Main/>
                <Footer/>
            </div>
        );
    }
}
