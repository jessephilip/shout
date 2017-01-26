// Include React
import React from "react";

// Creating a network box component. this checkbox will determine which social networks receive a post.
export default class SideLists extends React.Component {

    constructor() {
        super();
        this.state = {};
    }

    componentDidUpdate() {
        console.log("sidebaritemsDidUpdate");
    }

    render() {
        return (
            <section>
                <nav id="sideBarNav">
                    <ul className="nav nav-pills nav-fill">
                        <li className="nav-item">
                            <a className="nav-link" onClick={this.props.clicked}>
                                <i className="fa fa-linkedin-square" value="linkedin"></i>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" onClick={this.props.clicked}>
                                <i className="fa fa-facebook-square" value="facebook"></i>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" onClick={this.props.clicked}>
                                <i className="fa fa-instagram" value="instagram"></i>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" onClick={this.props.clicked}>
                                <i className="fa fa-twitter-square" value="twitter"></i>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" onClick={this.props.clicked}>
                                <i className="fa fa-google-plus-square" value="googleplus"></i>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" onClick={this.props.clicked}>
                                <i className="fa fa-pinterest" value="pinterest"></i>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" onClick={this.props.clicked}>
                                <i className="fa fa-tumblr-square" value="tumbler"></i>
                            </a>
                        </li>
                    </ul>
                </nav>
                <article id="navOutput">
                    <div className="list-group">
                        {this.props.messages.map(function(key, index) {
                            return (
                                <div key={index} className="list-group-item">
                                    {key.text}
                                </div>
                            );
                        })}
                    </div>
                </article>
            </section>
        );

    }
}
