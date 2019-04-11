import React from 'react';
import {
    DropdownItem,
} from 'reactstrap';
import '../../../css/index.css';
import ChatBot from '../../ChatBot'
import Introduction from "./sections/Introduction";
import Definition from "./sections/Definition";
import Parcours from "./sections/Parcours";
import Notification from "../../Notification";



export default class App extends React.Component {



    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={'root'}>
                <Introduction/>
                <DropdownItem divider />
                <Definition/>
                <DropdownItem divider />
                <Parcours/>
                <ChatBot/>
            </div>
        );
    }
}


