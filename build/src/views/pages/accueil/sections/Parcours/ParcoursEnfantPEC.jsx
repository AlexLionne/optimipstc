import React from 'react';
import '../../../../../css/index.css'
import '../../../../../css/container.css'
import {DropdownItem} from "reactstrap";
import Parcours from "../Parcours";


export default class SectionTwo extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Parcours/>
            </div>
        );
    }
}