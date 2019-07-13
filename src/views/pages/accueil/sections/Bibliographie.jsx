import React from 'react';
import {
    Card,
    CardTitle,
    CardBody,
    Row,
    Col,
    Container, Modal, ModalHeader, ModalFooter, Button, ModalBody, Table, ListGroup, ListGroupItem,
} from 'reactstrap';

import '../../../../css/index.css';
import '../../../../css/container.css'
import header2 from '../../../../assets/images/header2.png';

export default class SectionTwo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        }
    }

    triggerModal = () => {
        this.setState({modal: !this.state.modal})
    };


    render() {
        return (
            <section className={'section grandtexte'}>
                <img style={{position: 'absolute', top: 0, bottom: 0, right: 0, margin: 'auto'}} height={'100%'}
                     width={'auto'} src={header2}/>
                <Container fluid className={'container-justify'}>
                    <Row className={'row-equipe'}>
                        <Col xs="12" xl="9">
                            <div className={'action-responsive'}>
                                <h2 className={'titre TCL'}>
                                    Bibliographie
                                </h2>
                                <h3 className={'bold colorPrimary'}>
                                    Documentation internet utile :
                                </h3>
                                <ul>
                                    <li>
                                        <a href="www.crftc.org" target="_blank"> Centre Ressource d'Ile de France</a>
                                    </li>
                                    <li>
                                        <a href="www.traumacranien.org" target="_blank">Union Nationale des AFTC</a>
                                    </li>
                                    <li>
                                        <a href="www.handicap.gouv.fr" target="_blank">Site gouvernemental sur le handicap</a>
                                    </li>
                                </ul>
                                <br/>
                                <h3 className={'bold colorPrimary'} id='appel15'>
                                    Bibliographie autour du Traumatisme Crânien et du Parcours de Soins :
                                </h3>
                                <ul>
                                    <li>
                                        Parcours de soins en MPR : l’adulte après traumatisme crânien grave. P. Pradat-Diehl et al., Annals of Physical and Rehabilitation Medicine, vol. 57, mai 2014.
                                    </li><br/>
                                    <li>
                                        Cognitive deficits after traumatic coma. Azouvi P., Vallat-Azouvi C, Belmont A. Prog Brain Res. 2009
                                    </li><br/>
                                    <li>
                                        A comprehensive picture of 4-year outcome of severe brain injuries. Results from the PariS-TBI study. Jourdan.C et al. Annals of Physical and Rehabilitation Medicine., vol. 59, avr. 2016.
                                    </li><br/>
                                    <li>
                                        Late Functional Changes Post-Severe Traumatic Brain Injury Are Related to Community Reentry Support: Results From the PariS-TBI Cohort. Jourdan C. et al,  J Head Trauma Rehabil., 2017
                                    </li><br/>
                                    <li>
                                        Epidemiology of traumatic brain injuries based on hospital reports in mainland France , Paget and al. Revue d'Épidémiologie et de Santé Publique , juil. 2018
                                    </li><br/>
                                    <li>
                                        Troubles du Comportement chez les Traumatisés Crâniens : Quelles options thérapeutiques ? Recommandations Société Française de Médecine Physique et de Réadaptation (SOFMER), 2013
                                    </li><br/>
                                    <li>
                                        Incidence, risk factors and prevention of mild traumatic brain injury: results of the WHO Collaborating Centre Task Force on Mild Traumatic Brain Injury.  Cassidy. Journal of Rehabilitation Medicine, Feb 2004
                                    </li><br/>
                                    <li>
                                        Changing patterns in the epidemiology of traumatic brain injury, Roozenbeek, Nature Reviews. Neurology, avr. 2013
                                    </li><br/>
                                    <li>
                                        Maisons d’accueil spécialisé et foyers d’accueil médicalisé, similitudes et particularités, Yara MAKDESSI. Document de travail, Série études et recherche N° 123, octobre 2012
                                    </li><br/>
                                    <li>
                                        Habitats partagés et accompagnés : des solutions sur mesure pour les personnes cérébrolésées, Ruch J., Petit P., Kiefer C, 2017
                                    </li><br/>
                                    <li>
                                        Livre Blanc sur les Etats Végétatifs et Pauci Relationnels, Regards croisés de familles et de professionnels sur la vie au quotidien dans les unités dédiées, UNAFTC
                                    </li><br/>
                                </ul>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        );
    }
}