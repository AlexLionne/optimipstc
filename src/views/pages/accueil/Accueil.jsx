import React from 'react';
import {DropdownItem,} from 'reactstrap';

import '../../../css/index.css';
import ChatBot from '../../ChatBot'
import Introduction from "./sections/Introduction";

export default class App extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={'root'}>
                <Introduction/>
            </div>
        );
    }
}


