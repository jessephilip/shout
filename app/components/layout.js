// Include React
import React from "react";

import Header from "./children/header.js";
import Main from "./children/main.js";
import Footer from "./children/footer.js";

// Creating the Main component
export default class Layout extends React.Component {

    constructor() {
        super();
        this.state = {
            change: false
        };
        this.transform = this.transform.bind(this);
    }

    componentDidMount() {
        console.log("layout did mount");
    }

    componentDidUpdate() {
        console.log("layout did update");
    }

    transform() {
        console.log("transform pushed");
        if (this.state.change) {
            this.setState({change: false});
        } else {
            this.setState({change: true});
        }
    }

    // Here we render the function
    render() {
        return (
            <div id="layout">
                <Header transform={this.transform}/>
                <Main change={this.state.change}/>
                <Footer/>
            </div>
        );
    }
}
