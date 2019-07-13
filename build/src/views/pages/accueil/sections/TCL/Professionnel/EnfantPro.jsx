import React from 'react';
import {
    Card,
    CardTitle,
    CardBody,
    Row,
    Col,
    Container, Modal, ModalHeader, ModalFooter, Button, ModalBody, Table, ListGroup, ListGroupItem,
} from 'reactstrap';

import '../../../../../../css/index.css';
import '../../../../../../css/container.css'
import header2 from '../../../../../../assets/images/header2.png';
import Parcours from '../../../../../pages/accueil/sections/Parcours'
import glasgow from "../../../../../../assets/images/score_glasgow.png";
import detection2 from "../../../../../../assets/images/decision_enfant_moins_2a.png";
import detection1 from "../../../../../../assets/images/decision_enfant_plus_2a.png";
import pec from "../../../../../../assets/images/pec.png";
import risques from '../../../../../../assets/images/risques.png'
import tb1 from '../../../../../../assets/images/tb1e.PNG'
import tb2 from '../../../../../../assets/images/tb2e.PNG'
import tb3 from '../../../../../../assets/images/tb3e.PNG'
import SportController from "../../../../../SportController";

export default class SectionTwo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalGlasgow: false,
            modalDetection: false,
            modalPEC: false,
            modalRisques: false
        }
    }

    triggerModalGlasgow = () => {
        this.setState({modalGlasgow: !this.state.modalGlasgow})
    };
    triggerModalDetection = () => {
        this.setState({modalDetection: !this.state.modalDetection})
    };
    triggerModalPEC = () => {
        this.setState({modalPEC: !this.state.modalPEC})
    };
    triggerModalRisques = () => {
        this.setState({modalRisques: !this.state.modalRisques})
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
                                Le Traumatisme crânien léger chez l'enfant
                            </h2>
                            <br/><br/>
                            <h3 className={'bold colorPrimary'}>
                                Définition
                            </h3>
                            <p>
                                Il n'y a pas de consensus sur la définition du traumatisme crânien léger mais la plus utilisée est celle-ci : un traumatisme crânien avec un état de vigilance entre
                                <a onClick={this.triggerModalGlasgow} href={"#"} className={'link'}> Glasgow </a>
                                13 et 15 lors de l'accès aux soins ou 30 minutes après le traumatisme crânien.
                                <br/><br/>
                                Ce score peut être associé à :
                                <ul>
                                    <li>une confusion ou désorientation initale.</li>
                                    <li>une perte de connaissance initiale de quelques secondes ou minutes (maximum 30
                                        minutes).
                                    </li>
                                    <li>une amnésie post-traumatique inférieure à 24 heures..</li>
                                    <li>un déficit neurologique transitoire, une crise comitiale.</li>
                                </ul>
                            </p>
                            <p>
                                C’est un recours de consultation d’urgence pédiatrique fréquent. Parmi eux : environ 1%
                                présentent des lésions intra crâniennes sévères (nécessitant une intervention
                                neurochirurgicale, une intubation oro-trachéale, une hospitalisation, et/ou pronostic
                                vital engagé). Il faut pouvoir repérer ces enfants à risque, sans pour autant réaliser
                                de scanner cérébral inutilement.
                            </p>
                            <br/>
                            <h3 className={'bold colorPrimary'}>
                                Orientation
                            </h3>
                            <p>La Société Française de Pédiatrie et la Société Française de Médecine d’Urgence utilisent
                                l’algorithme de décision PECARN¹ qui permet de classer l’enfant dans un des 3 groupes de
                                risque:
                                <a onClick={this.triggerModalDetection} href={"#"} className={'link'}> haut ,
                                    intermédiaire ou faible.</a>
                                Ce classement est basé sur l’anamnèse et l’examen clinique.
                                En fonction du risque, l’orientation sera :
                            </p>
                            <ul>
                                <li><strong>transfert vers un service d'Urgence avec scanner accessible</strong> si un
                                    des facteurs de risque suivant est présent :<br/>
                                    <div className={'orientation'}>
                                        <img src={tb1}></img>
                                        <br/>
                                    </div>
                                    Les modalités de transport seront discutées avec le médecin régulateur du SAMU.
                                </li>
                                <br/>
                                <li><strong>consultation</strong> chez le généraliste, le pédiatre ou aux urgences si
                                    :<br/>
                                    <div className={'orientation'}>
                                        <img src={tb2}></img>
                                    </div>
                                </li>
                                <li><strong>surveillance à domicile</strong> si aucun des facteurs de rique n'est
                                    présent et sous réserve d'un entourage adapté :<br/>
                                    <div className={'orientation'}>
                                        <img src={tb3}></img>
                                    </div>
                                </li>
                            </ul>
                            <p>
                                Une fiche d’informations à remettre aux parents vous est proposé, elle explique
                                <a onClick={this.triggerModalPEC} href={"#"} className={'link'}> les principes de la
                                    surveillance et de la prise en charge.</a><br/>
                            </p>
                            <p>
                                Pour plus de détails, voir :
                                <ul>
                                    <li>recommandations SFMU, 2012²</li>
                                    <li>Actualisation des recommandations, 2014³</li>
                                </ul>
                            </p>
                            <br/>
                            <h3 className={'bold colorPrimary'}>
                                Complications
                            </h3>
                            <p className={'text-danger'}>Syndrome post-commotionnel :</p>
                            <p>
                                Il apparait dans les jours qui suivent et peut associer : céphalées, cervicalgies,
                                sensations vertigineuses, asthénie, troubles du sommeil, cauchemars, intolérance au
                                bruit et à la lumière, des difficultés cognitives avec des troubles de l’attention, de
                                la concentration voire mnésiques et des troubles émotionnels avec une irritabilité, une
                                anxiété, une labilité émotionnelle.
                                Les signes sont peu spécifiques, et certains font aussi partis du syndrome de stress
                                post traumatique. La distinction nette de ces deux syndromes n’est d’ailleurs pas
                                consensuelle.
                            </p>
                            <p>
                                Il faut penser à rechercher un retentissement scolaire : difficultés nouvelles ou
                                aggravées, baisse des résultats, absentéisme, troubles du comportement signalé par les
                                enseignants.
                            </p>
                            <p>
                                Si l'enfant présente des éléments de ce syndrome, il faut :
                                <ul>
                                    <li><strong>Rassurer,</strong> expliquer que la pathologie régresse dans la grande
                                        majorité des cas.
                                    </li>
                                    <li><strong>contre-indiquer aux activités sportives</strong> pendant 4
                                        semaines.
                                    </li>
                                    <li>réduire les activités pour <strong>favoriser le repos.</strong> Une adaptation
                                        du rythme scolaire est
                                        parfois nécessaire.<br/>
                                        <a href={"http://www.france-traumatisme-cranien.fr/upload/actions/tc-leger/document-scol.-long-da-finitif-et-justifia-.pdf"}
                                           target={"_blank"}> Ce document </a>
                                        aidera l'équipe enseignante à mieux comprendre la situation et la gérer.
                                    </li>
                                    <li>faire une prise en charge symptomatique des douleurs.</li>
                                </ul>
                            </p>
                            <p>L'évolution est favorable dans 90% des cas en moins de 3 à 6 mois.<br/>
                                Mais si les troubles persistent à un mois du traumatisme crânien : il faut orienter le patient vers une
                                <strong>consultation de neurologie ou de médecine physique et réadaptation.</strong>
                                Cela permettra d'évaluer la nécessité d'un bilan neuropsychologique et/ou d'une
                                rééducation spécifique.<br/>
                                <a onClick={this.triggerModalRisques} href={"#"} className={'link'}>Des facteurs de
                                    risques </a>ont été mis en évidence,
                                permettant d'identifier les patients nécessitant une surveillance.
                            </p>
                            <br/>
                            <h3 className={'bold colorPrimary'}>
                                Sources et informations
                            </h3>
                            <p><a href='http://www.france-traumatisme-cranien.fr/upload/enfants.pdf' target='_blank'>
                                Plaquette informative pour parents et enfants.
                            </a><br/>
                                <a href='http://www.france-traumatisme-cranien.fr/upload/actions/tc-leger/document-scol.-long-da-finitif-et-justifia-.pdf'
                                   target='_blank'>
                                    Plaquette informative pour enseignant, infirmière et médecin scolaire.
                                </a><br/>
                                <a href='http://www.sfmu.org/upload/70_formation/02_eformation/02_congres/Urgences/urgences2015/donnees/pdf/039.pdf'
                                   target='_blank'>
                                    Traumatisme crânien chez l'enfant
                                </a>
                            </p>
                            <p>
                                [1] N. Kuppermann et al., « Identification of children at very low risk of
                                clinically-important brain injuries after head trauma: a prospective cohort study »,
                                Lancet Lond. Engl., vol. 374, no 9696, p. 1160‑1170, oct. 2009.<br/>
                                [2] comité de pilotage et al., « Traumatisme crânien léger (score de Glasgow de 13 à 15)
                                : triage, évaluation, examens complémentaires et prise en charge précoce chez le
                                nouveau-né, l’enfant et l’adulte: Société française de médecine d’urgence », Ann. Fr.
                                Médecine Urgence, vol. 2, no 3, p. 199‑214, mai 2012.<br/>
                                [3] F. Lorton et al., « Actualisation des recommandations pour la prise en charge du
                                traumatisme crânien léger chez l’enfant », Arch. Pédiatrie, vol. 21, no 7, p. 790‑796,
                                juill. 2014.<br/>
                            </p>
                            </div>
                        </Col>
                    </Row>
                </Container>
                <SportController/>
                <Modal className={'tc_modal'} size="lg" isOpen={this.state.modalGlasgow} fade={false}>
                    <ModalHeader>Le score de Glasgow</ModalHeader>
                    <ModalBody>
                        <img src={glasgow} width={'100%'}></img>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.triggerModalGlasgow} className={'buttonSecondary'}>Fermer</Button>
                    </ModalFooter>
                </Modal>
                <Modal className={'tc_modal'} size="lg" isOpen={this.state.modalDetection} fade={false}>
                    <ModalHeader>Groupes de risque</ModalHeader>
                    <ModalBody><p>
                        Pour les plus de 2 ans
                    </p>
                        <img src={detection1} width={'100%'}></img>
                        <p>
                            Pour les moins de 2 ans
                        </p>
                        <img src={detection2} width={'100%'}></img>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.triggerModalDetection} className={'buttonSecondary'}>Fermer</Button>
                    </ModalFooter>
                </Modal>
                <Modal className={'tc_modal'} size="lg" isOpen={this.state.modalPEC} fade={false}>
                    <ModalHeader>Principes de surveillance et de prise en charge</ModalHeader>
                    <ModalBody>
                        <img src={pec} width={'100%'}></img>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.triggerModalPEC} className={'buttonSecondary'}>Fermer</Button>
                    </ModalFooter>
                </Modal>
                <Modal className={'tc_modal'} size="lg" isOpen={this.state.modalRisques} fade={false}>
                    <ModalHeader>Facteurs de risques</ModalHeader>
                    <ModalBody>
                        <img src={risques} width={'100%'}></img>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.triggerModalRisques} className={'buttonSecondary'}>Fermer</Button>
                    </ModalFooter>
                </Modal>
            </section>
        );
    }
}