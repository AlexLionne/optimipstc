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
import fhandi from '../../../../assets/images/fhandi.PNG';
import IRSP from '../../../../assets/images/IRSP.PNG';
import ars_action from '../../../../assets/images/ars_action.PNG';
import roche from '../../../../assets/images/roche.PNG';

export default class SectionTwo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalHandi: false,
            modalIRSP: false,
            modalARS: false,
            modalRoche: false
        }
    }

    triggerModalHandi = () => {
        this.setState({modalHandi: !this.state.modalHandi})
    };
    triggerModalIRSP = () => {
        this.setState({modalIRSP: !this.state.modalIRSP})
    };
    triggerModalARS = () => {
        this.setState({modalARS: !this.state.modalARS})
    };
    triggerModalRoche = () => {
        this.setState({modalRoche: !this.state.modalRoche})
    };

    render() {
        return (
            <section className={'section grandtexte'}>
                <div className="img-responsive">
                <img id="hiddenImg" style={{position: 'absolute', top: 0, bottom: 0, right: 0, margin: 'auto'}} height={'100%'}
                     width={'auto'} src={header2}/>
                </div>
                <Container fluid className={'second-container-set'}>
                    <div className={'margin-historique'}>
                        <Row>
                            <Col xs='12' xl="9">
                                <div className={'action-responsive'}>
                                <h2 className={'titre'}>
                                    Projets sur l’Optimisation du Parcours de Soin des Patients Traumatisés Crâniens
                                </h2>
                                <p className={'container-justify'}>
                                    Afin d’optimiser le parcours de soin du patient traumatisé crânien, nous avons
                                    développé plusieurs axes de travail, réflexion ou recherche.
                                </p>
                                </div>
                                <div className={'img-center'}>
                                    <button className={'link btn-equipe'} onClick={this.triggerModalHandi}> <img src={fhandi}
                                                                                                            alt='Fondation Malakoff Médéric'
                                                                                                            className={'img-actions'}></img>
                                    </button>
                                    <button className={'link btn-equipe'} onClick={this.triggerModalIRSP}> <img src={IRSP}
                                                                                                           alt='IRSeP'
                                                                                                           className={'img-actions'}></img>
                                    </button>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs='9'>
                                <div className={'img-center'}>
                                    <button className={'link btn-equipe'} onClick={this.triggerModalARS}> <img
                                        src={ars_action} alt='ARS' className={'img-actions'}></img> </button>
                                    <button className={'link btn-equipe'} onClick={this.triggerModalRoche}> <img src={roche}
                                                                                                            alt='Fondation Roche'
                                                                                                            className={'img-actions'}></img>
                                    </button>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Container>
                <Modal className={'tc_modal'} isOpen={this.state.modalHandi} fade={false}>
                    <ModalHeader>DELPHI-OptimiPS-TC : Identifier les Facteurs médicaux et socio-économiques pertinents
                        permettant d’optimiser le parcours de soins des patients traumatisés crânien </ModalHeader>
                    <ModalBody>
                        <p>
                            Description : Identifier des marqueurs médicaux et socio-économiques primordiaux à la
                            qualité du parcours de soin du patient traumatisé crânien par la méthode Delphi (méthode de
                            consensus) et la réunion d’un consortium d’experts pluri et multidisciplinaire<br/>
                            Partenaires : CHU de Toulouse (Institut des Handicaps NPS, UEME), Inserm U1027<br/>
                            Financement : Fondation Malakoff Médéric<br/>
                            Durée du projet : 18 mois (juillet 2019-décembre 2020)<br/>
                        </p>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.triggerModalHandi} className={'buttonSecondary'}>Fermer</Button>
                    </ModalFooter>
                </Modal>
                <Modal className={'tc_modal'} isOpen={this.state.modalIRSP} fade={false}>
                    <ModalHeader>EXHATC : EXpérience du HAndicap et de l'autonomie chez les personnes concernées par le
                        Traumtisme Crânien</ModalHeader>
                    <ModalBody>
                        <p>
                            Description : Explorer l’expérience du handicap chez les personnes ayant subi un TC, celle
                            de leurs proches et des professionnels impliqués dans leur prise en charge, en documentant
                            les besoins de compensation et l’impact du traumatisme crânien et des parcours de soins sur leur
                            participation sociale et leur autonomie.<br/>
                            Partenaires : CHU Toulouse (IHNPS), LISST CERS UMR 5193 CNRS, Association AFTC<br/>
                            Financement : IReSP<br/>
                            Durée du projet : 3 ans (avril 2019-mai 2022)<br/>
                        </p>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.triggerModalIRSP} className={'buttonSecondary'}>Fermer</Button>
                    </ModalFooter>
                </Modal>
                <Modal className={'tc_modal'} isOpen={this.state.modalARS} fade={false}>
                    <ModalHeader>OPTIMIPS-TC-Occitanie - Optimiser le Parcours de Soin des Patients Traumatisés Crâniens
                        en Occitanie</ModalHeader>
                    <ModalBody>
                        <p>
                            Description : Démarche globale d’amélioration du parcours de soin du patient Traumatisé
                            Crânien par l'analyse et l’étude rétrospective de leurs parcours de soins<br/>
                            Partenaires : DSIO, DIMs et services MPR des CHU Toulouse (Porteur) et Montpellier (Centre
                            associé), l’IRIT (CNRS/UPS), l’université Champollion d’Albi, et l’IMT (CNRS/UPS)<br/>
                            Financement : ARS Occitanie<br/>
                            Durée du projet : non communiquée<br/>
                        </p>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.triggerModalARS} className={'buttonSecondary'}>Fermer</Button>
                    </ModalFooter>
                </Modal>
                <Modal className={'tc_modal'} isOpen={this.state.modalRoche} fade={false}>
                    <ModalHeader>TRANSPARENS - Une transparence d’usage des données du patient : la blockchain au
                        service du traumatisme crânien</ModalHeader>
                    <ModalBody>
                        <p>
                            Description : Apporter traçabilité et sécurité (via la blockchain) sur l’usage des données
                            de santé pour les patients traumatisme crânien & acteurs du traumatisme crânien (professionnels, famille) afin de limiter le
                            parcours de soin chaotique et les perdus de vue : prototypage d'une blockchain<br/>
                            Partenaires : CHU Toulouse (IHNPS, DSIO), IRIT (CNRS/UPS + Univ. Champollion Albi),
                            ISIS<br/>
                            Financement : Fondation Roche<br/>
                            Durée du projet : 3 ans (septembre 2019-septembre 2022)<br/>
                        </p>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.triggerModalRoche} className={'buttonSecondary'}>Fermer</Button>
                    </ModalFooter>
                </Modal>
            </section>
        );
    }
}