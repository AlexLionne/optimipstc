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
import glasgow from '../../../../../../assets/images/score_glasgow.png'
import scanner from '../../../../../../assets/images/scanner.png'
import risques from '../../../../../../assets/images/risques.png'
import tb1 from '../../../../../../assets/images/tb1a.png'
import tb2 from '../../../../../../assets/images/tb2a.png'
import tb3 from '../../../../../../assets/images/tb3a.png'

import Parcours from '../../../../../pages/accueil/sections/Parcours'
import SportController from "../../../../../SportController";

export default class SectionTwo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalGlasgow: false,
            modalScanner: false,
            modalSD: false,
            modalRisques: false
        }
    }

    triggerModalGlasgow = () => {
        this.setState({modalGlasgow: !this.state.modalGlasgow})
    };
    triggerModalScanner = () => {
        this.setState({modalScanner: !this.state.modalScanner})
    };
    triggerModalSD = () => {
        this.setState({modalSD: !this.state.modalSD})
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
                            <h2 className={'titre TCL'}>
                                Le Traumatisme crânien léger chez l'adulte
                            </h2><br/><br/>
                            <h3 className={'bold colorPrimary'}>
                                Définition
                            </h3>
                            <p>
                                Il n'y a pas de consensus sur la définition du traumatisme crânien léger mais la plus utilisée est celle-ci : un traumatisme crânien avec un état de vigilance entre
                                <a onClick={this.triggerModalGlasgow} href={"#"} className={'link'}> Glasgow </a>
                                13 et 15 lors de l'accès aux soins ou 30 minutes après le traumatisme crânien.
                                <br/><br/>
                                Ce score peut être associé à :
                            </p>
                            <ul>
                                <li>une confusion ou désorientation initale.</li>
                                <li>une perte de connaissance initiale de quelques secondes ou minutes (maximum 30
                                    minutes).
                                </li>
                                <li>une amnésie post-traumatique inférieure à 24 heures..</li>
                                <li>un déficit neurologique transitoire, une crise comitiale.</li>
                            </ul>
                            <p>
                                C’est un recours de consultation d’urgence
                                fréquent. Parmi eux : environ 8 % des patients
                                présentent des lésions hémorragiques
                                intracrâniennes non neurochirurgicales et 1 %
                                nécessitent un recours à la neurochirurgie¹.
                            </p>
                            <br/>
                            <h3 className={'bold colorPrimary'}>
                                Orientation
                            </h3>
                            <p>
                                En fonction du risque de lésions intra-cérébrales, l'orientation du patient peut être :
                            </p>
                            <ul>
                                <li><a onClick={this.triggerModalScanner} href={"#"} className={'link'}>transfert vers
                                    un service d'Urgence avec scanner accessible.</a></li>
                                <li> consultation chez le généraliste ou aux urgences.</li>
                                <li><a onClick={this.triggerModalSD} href={"#"} className={'link'}>surveillance à
                                    domicile.</a></li>
                            </ul>
                            <p>
                                Pour évaluer ce risque, vous pouvez vous aider des tableaux suivants,
                                issus des recommandations SFMU de 2012² :
                            </p>
                            <div className={'orientation'}>
                                <img className="img-size-tcl" src={tb1}></img>
                                <img className="img-size-tcl" src={tb2}></img>
                                <img className="img-size-tcl" src={tb3}></img>
                            </div>
                            <br/>
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
                                Si votre patient présente des éléments de ce syndrome, il faut :
                            </p>
                            <ul>
                                <li><strong>Rassurer,</strong> expliquer que la pathologie régresse dans la majorité des
                                    cas.
                                </li>
                                <li><strong>contre-indiquer aux activités sportives</strong> pendant un
                                    mois,
                                    réduire les activités pour favoriser le repos. Un arrêt de travail peut être
                                    justifié.
                                </li>
                                <li>faire une prise en charge symptomatique des douleurs.</li>
                            </ul>
                            <p>L'évolution est favorable dans 90% des cas en moins de 3 à 6 mois.<br/>
                                Mais si les troubles persistent à un mois du traumatisme crânien : il faut orienter le patient vers une
                                <strong>consultation de neurologie ou de médecine physique et réadaptation.</strong>
                                Cela permettra d'évaluer la nécessité d'un bilan neuropsychologique et/ou d'une
                                rééducation spécifique.<br/>
                                <a onClick={this.triggerModalRisques} href={"#"} className={'link'}>Des facteurs de
                                    risques </a>ont été mis en évidence,
                                permettant d'identifier les patients nécessitant une surveillance.
                            </p><br/>
                            <h3 className={'bold colorPrimary'}>
                                Sources et informations
                            </h3>
                            <p><a href='http://www.france-traumatisme-cranien.fr/upload/ga-na-ralistes.pdf'
                                  target='_blank'>
                                Plaquette informative pour médecin généraliste
                            </a><br/>
                                <a href='http://www.france-traumatisme-cranien.fr/upload/urgentistes.pdf'
                                   target='_blank'>
                                    Plaquette informative pour urgentiste
                                </a><br/>
                                <a href='http://www.france-traumatisme-cranien.fr/upload/adultes.pdf' target='_blank'>
                                    Traumatisme crânien chez l'adulte
                                </a>
                            </p>
                            <p>
                                [1] I. G. Stiell et al., « The Canadian CT Head Rule for patients with minor head injury
                                », Lancet Lond. Engl., vol. 357, no 9266, p. 1391‑1396, mai 2001.<br/>
                                [2] comité de pilotage et al., « Traumatisme crânien léger (score de Glasgow de 13 à 15)
                                : triage, évaluation, examens complémentaires et prise en charge précoce chez le
                                nouveau-né, l’enfant et l’adulte: Société française de médecine d’urgence », Ann. Fr.
                                Médecine Urgence, vol. 2, no 3, p. 199‑214, mai 2012.<br/>
                            </p>
                        </Col>
                    </Row>
                    <hr/>
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
                <Modal className={'tc_modal'} size="lg" isOpen={this.state.modalScanner} fade={false}>
                    <ModalHeader>Scanner cérébral</ModalHeader>
                    <ModalBody>
                        <img src={scanner} width={'100%'}></img>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.triggerModalScanner} className={'buttonSecondary'}>Fermer</Button>
                    </ModalFooter>
                </Modal>
                <Modal className={'tc_modal'} size="lg" isOpen={this.state.modalSD} fade={false}>
                    <ModalHeader>Surveillance à domicile</ModalHeader>
                    <ModalBody>
                        <p>Il faut que l'entourage soit adapté. Expliquer au patient dans un
                            vocabulaire simple et compréhensible qu'il doit appeler le 15 si un des signes
                            suivants apparaît :
                        </p>
                        <ul>
                            <li>somnolence excessive.</li>
                            <li>comportement anormal.</li>
                            <li>troubles moteurs.</li>
                            <li>troubles visuels.</li>
                            <li>céphalées persistantes.</li>
                            <li>vomissements persistants.</li>
                            <li>convulsions.</li>
                            <li>rhinorrhée, otorrhée.</li>
                        </ul>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.triggerModalSD} className={'buttonSecondary'}>Fermer</Button>
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