// Include React
import React from "react";

// import networks
import networks from "../../../public/assets/javascript/networks.js";

// import CheckBox
import NetworkBox from "../pieces/networkbox.js";

// Creating the Main component
export default class Main extends React.Component {

    // Here we render the function
    render() {
        return (
            <main className="bg-main">
                <input id="mainShout" className="input-group"/>
                <div id="socialChecks">
                    <NetworkBox network={networks.linkedin}/>
                    <NetworkBox network={networks.facebook}/>
					<NetworkBox network={networks.instagram}/>
                    <NetworkBox network={networks.twitter}/>
					<NetworkBox network={networks.googleplus}/>
                    <NetworkBox network={networks.pinterest}/>
					<NetworkBox network={networks.tumbler}/>
                </div>

            </main>
        );
    }
}
