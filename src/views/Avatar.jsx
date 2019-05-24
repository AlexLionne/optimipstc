import React, {Component} from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUserCircle} from '@fortawesome/free-solid-svg-icons'

//user-circle

class Avatar extends Component {
    constructor(props) {
        super(props)
    }


    render() {

        return (
            <FontAwesomeIcon color={"#fff"} icon={faUserCircle}/>
        );
    }
}

export default Avatar;
