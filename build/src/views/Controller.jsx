import React from "react";
import View from "./View";

class Controller extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            route: this.props.route,
        }
    }


    render() {
        let route = this.state.route;

        return (
            <div>
                <View route={route === '/' ? 'accueil' : route}/>
            </div>

        )
    }


}


export default Controller;