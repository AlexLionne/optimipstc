import React from 'react';
import '../../../../../css/index.css'
import '../../../../../css/container.css'
import ParcoursMedicalEnfant from '../../../../pages/accueil/sections/Parcours/ParcoursMedicalEnfant'
import ParcoursVieEnfant from '../../../../pages/accueil/sections/Parcours/ParcoursVieEnfant'
import {DropdownItem} from "reactstrap";


export default class SectionTwo extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div>
                <DropdownItem divider />
                <ParcoursMedicalEnfant/>
                <DropdownItem divider />
                <ParcoursVieEnfant/>
            </div>
        );
    }
}