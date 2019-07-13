import React from 'react';
import '../../../../../css/index.css'
import '../../../../../css/container.css'
import ParcoursMedicalAdulte from '../../../../pages/accueil/sections/Parcours/ParcoursMedicalAdulte'
import {DropdownItem} from "reactstrap";


export default class SectionTwo extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <ParcoursMedicalAdulte/>
                <DropdownItem divider/>
            </div>
        );
    }
}