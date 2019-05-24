import React from 'react';
import {
    Col,
    Container,
    ListGroup,
    ListGroupItem,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Row,
    Table,
} from 'reactstrap';
import {Card, CardBody, Button, CardTitle, UncontrolledCollapse} from 'reactstrap';
import '../../../../../css/index.css'
import '../../../../../css/container.css'
import header2 from "../../../../../assets/images/header2.png";
import doctor from "../../../../../assets/images/doctor.png";
import child from "../../../../../assets/images/child.png";

export default class SectionTwo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalMPR: false,
            modalSRPR: false,
            modalUE: false,
            modalKine: false,
            modalErgo: false,
            modalOrtho: false,
            modalOTP: false,
            modalYMCA: false,
            modalNP: false,
            modalNC: false,
            modalMR: false,
            modalNeuro: false,
            modalMT: false,
            modalMS: false,
            modalPM: false,
            modalPedia: false,
            modalNeuroP: false
        }
    }

    triggerModalMPR = () => {
        this.setState({modalMPR: !this.state.modalMPR})
    };

    triggerModalSRPR = () => {
        this.setState({modalSRPR: !this.state.modalSRPR})
    };

    triggerModalUE = () => {
        this.setState({modalUE: !this.state.modalUE})
    };

    triggerModalKine = () => {
        this.setState({modalKine: !this.state.modalKine})
    };

    triggerModalErgo = () => {
        this.setState({modalErgo: !this.state.modalErgo})
    };

    triggerModalOrtho = () => {
        this.setState({modalOrtho: !this.state.modalOrtho})
    };

    triggerModalOTP = () => {
        this.setState({modalOTP: !this.state.modalOTP})
    };
    triggerModalPedia = () => {
        this.setState({modalPedia: !this.state.modalPedia})
    };

    triggerModalNP = () => {
        this.setState({modalNP: !this.state.modalNP})
    };

    triggerModalNC = () => {
        this.setState({modalNC: !this.state.modalNC})
    };

    triggerModalNeuroP = () => {
        this.setState({modalNeuroP: !this.state.modalNeuroP})
    };

    triggerModalMR = () => {
        this.setState({modalMR: !this.state.modalMR})
    };

    triggerModalPM = () => {
        this.setState({modalPM: !this.state.modalPM})
    };

    triggerModalMT = () => {
        this.setState({modalMT: !this.state.modalMT})
    };

    triggerModalMS = () => {
        this.setState({modalMS: !this.state.modalMS})
    };


    render() {
        return (
            <section className={'section'}>
                <img style={{position: 'absolute', top: 0, bottom: 0, right: 0, margin: 'auto'}} height={'100%'}
                     width={'auto'} src={header2}/>
                <Container fluid className={'container-justify'}>
                    <Row>
                        <Col xs='12' xl='6' className={'pm'}>
                            <div className={'action-responsive'}>
                            <h2 className={'titre TCL'}>
                                Parcours de soin
                            </h2><br/>
                            À l'issue de la prise en charge initiale, même si le patient est stabilisé, le suivi médical
                            et la prise en charge rééducative nécessitent d'être poursuivis. En parallèle, un parcours
                            de vie se met en place.<br/>
                            Les dispositifs d'aide sont nombreux et il n'est pas toujours facile de s'y retrouver.<br/>
                            Nous vous présentons ci-dessous les principales personnes, dispositifs et structures dont
                            vous pouvez avoir besoin.<br/>
                            Des informations supplémentaires apparaissent en cliquant sur la case correspondante.
                            </div>
                            </Col>
                    </Row>
                    <Row className={'justify-content-start'}>
                        <Col xs="9" xl="4" className={'reeducation'}>
                            <Card>
                                <CardTitle className={'titre'}>
                                    Rééducation
                                </CardTitle>
                                <CardBody>
                                    <Card className={''}>
                                        <CardBody className={'TCL-interface'}>
                                            <a onClick={this.triggerModalMPR} href={"#"} className={'link'}> MPR
                                                Pédiatrie </a><br/>
                                            <a onClick={this.triggerModalSRPR} href={"#"}
                                               className={'link'}> SRPR </a><br/>
                                            <a onClick={this.triggerModalUE} href={"#"} className={'link'}> Unité
                                                Eveil </a><br/>
                                        </CardBody>
                                    </Card>
                                    <Card className={'container-set reposition text-center'}>
                                        <CardTitle className={'titre'}>
                                            Rééducateur
                                        </CardTitle>
                                        <CardBody className={"TCL-interface"}>
                                            <a onClick={this.triggerModalKine} href={"#"}
                                               className={'link'}> Kinésithérapeute </a><br/>
                                            <a onClick={this.triggerModalErgo} href={"#"}
                                               className={'link'}> Ergothérapeute </a><br/>
                                            <a onClick={this.triggerModalOrtho} href={"#"}
                                               className={'link'}> Orthophoniste </a><br/>
                                            <a onClick={this.triggerModalOTP} href={"#"}
                                               className={'link'}> Orthoptiste </a><br/>
                                            <a onClick={this.triggerModalPM} href={"#"}
                                               className={'link'}> Psychomotricien </a><br/>
                                        </CardBody>
                                    </Card>
                                    <Card className={'container-set reposition text-center'}>
                                        <CardTitle className={'titre'}>
                                            Suivi médical
                                        </CardTitle>
                                        <CardBody className={"TCL-interface"}>
                                            <a onClick={this.triggerModalPedia} href={"#"}
                                               className={'link'}> Pediatre </a><br/>
                                            <a onClick={this.triggerModalNC} href={"#"}
                                               className={'link'}> Neurochirurgien </a><br/>
                                            <a onClick={this.triggerModalMR} href={"#"} className={'link'}> Médecin
                                                rééducateur </a><br/>
                                            <a onClick={this.triggerModalNeuroP} href={"#"}
                                               className={'link'}> Neuropédiatre </a><br/>
                                            <a onClick={this.triggerModalMT} href={"#"} className={'link'}> Médecin
                                                traitant </a><br/>
                                            <a onClick={this.triggerModalMS} href={"#"} className={'link'}> Médecin
                                                Scolaire </a><br/>
                                        </CardBody>
                                    </Card>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
                <Modal className={'tc_modal'} isOpen={this.state.modalKine} fade={false} centered>
                    <ModalHeader>Kinésithérapeute</ModalHeader>
                    <ModalBody>
                        Prend en charge les troubles loco-moteurs, par exemple : renforcement musculaire, travail de la
                        marche, de l’équilibre, étirements contre la spasticité, verticalisation…<br/>
                        En SSR ou en libéral.<br/>
                        Pour qui : personne avec difficultés motrices<br/>
                        Comment : prescription médicale<br/>
                        Prise en charge : Sécurité sociale<br/>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.triggerModalKine} className={'buttonSecondary'} centered>Fermer</Button>
                    </ModalFooter>
                </Modal>
                <Modal className={'tc_modal'} isOpen={this.state.modalErgo} fade={false} centered>
                    <ModalHeader>Ergothérapeute</ModalHeader>
                    <ModalBody>
                        Travaille surtout l’autonomie, cherche des adaptations techniques pour pallier les difficultés.
                        Aide également dans le choix du fauteuil roulant et les autres appareillages.<br/>
                        Peut intervenir à domicile pour évaluer et adapter l’environnement. Intervient aussi dans la
                        réadaptation professionnelle.<br/>
                        Comment : Prescription médicale en SSR, et sur demande du patient ou de la famille en
                        libéral<br/>
                        Prise en charge : non pris en charge par la Sécurité Sociale en libéral, possibilité de
                        financement par la PCH pour les adultes et par l’AEEH (Allocation Education Enfant Handicapé)
                        pour les enfants. Certaines mutuelles peuvent financer aussi.<br/>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.triggerModalErgo} className={'buttonSecondary'}>Fermer</Button>
                    </ModalFooter>
                </Modal>
                <Modal className={'tc_modal'} isOpen={this.state.modalOrtho} fade={false} centered>
                    <ModalHeader>Orthophoniste</ModalHeader>
                    <ModalBody>
                        Rééducation des troubles du langage, des fonctions cognitives, de la communication et de la
                        déglutition.<br/>
                        La demande est faite par la personne Traumatisée Crânienne, sa famille ou son médecin.<br/>
                        Comment : en SSR ou en libéral. Sur Prescription médicale.<br/>
                        Prise en charge : Sécurité Sociale<br/>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.triggerModalOrtho} className={'buttonSecondary'}>Fermer</Button>
                    </ModalFooter>
                </Modal>
                <Modal className={'tc_modal'} isOpen={this.state.modalOTP} fade={false} centered>
                    <ModalHeader>Orthoptiste</ModalHeader>
                    <ModalBody>
                        Son rôle est l’évaluation des capacités visuelles du patient, et leur rééducation en essayant
                        d’améliorer l’équilibre et l’efficacité de la vision<br/>
                        Comment : SSR ou libéral. Sur prescription médicale<br/>
                        Prise en charge : Sécurité sociale<br/>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.triggerModalOTP} className={'buttonSecondary'}>Fermer</Button>
                    </ModalFooter>
                </Modal>
                <Modal className={'tc_modal'} isOpen={this.state.modalPM} fade={false} centered>
                    <ModalHeader>Psychomotricien</ModalHeader>
                    <ModalBody>
                        Concerne surtout les enfants. Travaille sur le schéma corporel, la communication, l’expression
                        corporelle, les émotions. Aide à la réinsertion psycho-sociale<br/>
                        Comment : en SSR, CMP, CMPP, CAMSP, ou en libéral. Séance individuelle ou en groupe.<br/>
                        Prise en charge : non remboursé par la Sécurité Sociale en libéral. Possibilité de faire une
                        demande de « prise en charge exceptionnelle » auprès de votre CPAM.<br/>
                        Ou financement possible par l’AEEH (Allocation Education Enfant Handicapé) ou certaines
                        mutuelles.<br/>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.triggerModalPM} className={'buttonSecondary'}>Fermer</Button>
                    </ModalFooter>
                </Modal>
                <Modal className={'tc_modal'} isOpen={this.state.modalNeuroP} fade={false} centered>
                    <ModalHeader>Neuropédiatre</ModalHeader>
                    <ModalBody>
                        WIP
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.triggerModalNeuroP} className={'buttonSecondary'}>Fermer</Button>
                    </ModalFooter>
                </Modal>
                <Modal className={'tc_modal'} isOpen={this.state.modalNC} fade={false} centered>
                    <ModalHeader>Neurochirurgien</ModalHeader>
                    <ModalBody>
                        WIP
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.triggerModalNC} className={'buttonSecondary'}>Fermer</Button>
                    </ModalFooter>
                </Modal>
                <Modal className={'tc_modal'} isOpen={this.state.modalMR} fade={false} centered>
                    <ModalHeader>Médecin rééducateur</ModalHeader>
                    <ModalBody>
                        WIP
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.triggerModalMR} className={'buttonSecondary'}>Fermer</Button>
                    </ModalFooter>
                </Modal>
                <Modal className={'tc_modal'} isOpen={this.state.modalMS} fade={false} centered>
                    <ModalHeader>Médecin scolaire</ModalHeader>
                    <ModalBody>
                        WIP
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.triggerModalMS} className={'buttonSecondary'}>Fermer</Button>
                    </ModalFooter>
                </Modal>
                <Modal className={'tc_modal'} isOpen={this.state.modalMT} fade={false} centered>
                    <ModalHeader>Médecin traitant</ModalHeader>
                    <ModalBody>
                        WIP
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.triggerModalMT} className={'buttonSecondary'}>Fermer</Button>
                    </ModalFooter>
                </Modal>
                <Modal className={'tc_modal'} isOpen={this.state.modalMPR} fade={false} centered>
                    <ModalHeader>MPR Pédiatrie</ModalHeader>
                    <ModalBody>
                        WIP
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.triggerModalMPR} className={'buttonSecondary'}>Fermer</Button>
                    </ModalFooter>
                </Modal>
                <Modal className={'tc_modal'} isOpen={this.state.modalSRPR} fade={false} centered>
                    <ModalHeader>SRPR</ModalHeader>
                    <ModalBody>
                        WIP
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.triggerModalSRPR} className={'buttonSecondary'}>Fermer</Button>
                    </ModalFooter>
                </Modal>
                <Modal className={'tc_modal'} isOpen={this.state.modalUE} fade={false} centered>
                    <ModalHeader>Unite Eveil</ModalHeader>
                    <ModalBody>
                        WIP
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.triggerModalUE} className={'buttonSecondary'}>Fermer</Button>
                    </ModalFooter>
                </Modal>
                <Modal className={'tc_modal'} isOpen={this.state.modalPedia} fade={false} centered>
                    <ModalHeader>Pediatre</ModalHeader>
                    <ModalBody>
                        WIP
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.triggerModalPedia} className={'buttonSecondary'}>Fermer</Button>
                    </ModalFooter>
                </Modal>
            </section>
        );
    }
}