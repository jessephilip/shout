// Include React
import React from "react";

// Creating a network box component. this checkbox will determine which social networks receive a post.
export default class SideLists extends React.Component {

    constructor() {
        super();
        this.state = {
            posts: {
                twitter: []
            }
        };
    }

    componentDidUpdate() {
        // console.log("sidebaritemsDidUpdate");
		// console.log(this.props.messages);
    }

    render() {
        return (
            <section>
                <nav id="sideBarNav">
                    <ul className="nav nav-pills nav-fill">
                        {/* <li className="nav-item">
                            <a className="nav-link" onClick={this.props.clicked}>
                                <i className="fa fa-linkedin-square fa-2x" value="linkedin"></i>
                            </a>
                        </li> */}
						{/*
                        <li className="nav-item">
                            <a className="nav-link" onClick={this.props.clicked}>
                                <i className="fa fa-facebook-square" value="facebook"></i>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" onClick={this.props.clicked}>
                                <i className="fa fa-instagram" value="instagram"></i>
                            </a>
                        </li> */}
                        <li className="nav-item">
                            <a className="nav-link" onClick={this.props.clicked}>
                                <i className="fa fa-twitter-square fa-2x" value="twitter"></i>
                            </a>
                        </li>
                        {/* <li className="nav-item">
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
                                <i className="fa fa-tumblr-square" value="tumblr"></i>
                            </a>
                        </li> */}
                    </ul>
                </nav>
                <article id="navOutput">
                    <div className="">
                        {this.props.messages.map(function(key, index) {

                            let newDate = convertTwitterTime(key.created_at);

                            function convertTwitterTime(date) {

                                // get day of the week from created_at property
                                let day = date.substring(0, 3);

                                // remove day of week from date
                                date = date.substring(4, date.length);

                                // get time from created_at property
                                let time = date.substring(7, date.length - 5);

                                // get shortened time from created_at property. removes seconds and 0000
                                let timeShort = time.substring(0, 5);

                                // get day and month from created_at property
                                let monthDay = date.substring(0, 6);

                                // get year from created_at property
                                let year = date.substring(date.length - 4, date.length);

                                // concatenate string into normal format
                                let final = monthDay + ", " + year + " at " + timeShort;

                                // return final concatenated string
                                return final;
                            }

                            return (
                                <div key={index} className="">
                                    <div>
                                        {newDate}
                                    </div>
                                    <div>
                                        <p><strong>{key.text}</strong></p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </article>
            </section>
        );

    }
}
