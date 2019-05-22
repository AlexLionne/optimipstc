import React from 'react';
import '../../../../../css/index.css'
import '../../../../../css/container.css'
import ParcoursMedicalAdulte from '../../../../pages/accueil/sections/Parcours/ParcoursMedicalAdulte'
import ParcoursVieAdulte from '../../../../pages/accueil/sections/Parcours/ParcoursVieAdulte'
import {DropdownItem} from "reactstrap";
import Parcours from "../Parcours";


export default class SectionTwo extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div>
                <Parcours/>
                <DropdownItem divider />
                    <ParcoursMedicalAdulte/>
                <DropdownItem divider />
                     <ParcoursVieAdulte/>
        </div>
        );
    }
}