import React from 'react';
import '../../../../../css/index.css'
import '../../../../../css/container.css'
import ParcoursMedicalAdulte from '../../../../pages/accueil/sections/Parcours/ParcoursMedicalAdulte'
import ParcoursVieAdulte from '../../../../pages/accueil/sections/Parcours/ParcoursVieAdulte'
import {DropdownItem} from "reactstrap";
import Parcours from "../Parcours";
import {
    Card,
    CardBody,
    Button,
    CardTitle,
    Col,
    Container,
    Row,
} from 'reactstrap';

export default class SectionTwo extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Parcours/>
                <DropdownItem divider/>
                <Col xs="6" xl="6">
                <ParcoursMedicalAdulte/>
                </Col>
                <DropdownItem divider/>
                <Col xs="6" xl="6">
                <ParcoursVieAdulte/>
                </Col>
            </div>
        );
    }
}