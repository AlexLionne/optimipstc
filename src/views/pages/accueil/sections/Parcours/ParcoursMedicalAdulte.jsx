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
            modalMT: false
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
    triggerModalYMCA = () => {
        this.setState({modalYMCA: !this.state.modalYMCA})
    };

    triggerModalNP = () => {
        this.setState({modalNP: !this.state.modalNP})
    };

    triggerModalNC = () => {
        this.setState({modalNC: !this.state.modalNC})
    };

    triggerModalMR = () => {
        this.setState({modalMR: !this.state.modalMR})
    };

    triggerModalNeuro = () => {
        this.setState({modalNeuro: !this.state.modalNeuro})
    };

    triggerModalMT = () => {
        this.setState({modalMT: !this.state.modalMT})
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
                                            <a onClick={this.triggerModalMPR} href={"#"} className={'link'}> Service
                                                MPR </a><br/>
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
                                            <a onClick={this.triggerModalYMCA} href={"#"}
                                               className={'link'}> YMCA </a><br/>
                                            <a onClick={this.triggerModalNP} href={"#"}
                                               className={'link'}> Neuropsychologue </a><br/>
                                        </CardBody>
                                    </Card>
                                    <Card className={'container-set reposition text-center'}>
                                        <CardTitle className={'titre'}>
                                            Suivi médical
                                        </CardTitle>
                                        <CardBody className={"TCL-interface"}>
                                            <a onClick={this.triggerModalNC} href={"#"}
                                               className={'link'}> Neurochirurgien </a><br/>
                                            <a onClick={this.triggerModalMR} href={"#"} className={'link'}> Médecin
                                                rééducateur </a><br/>
                                            <a onClick={this.triggerModalNeuro} href={"#"}
                                               className={'link'}> Neurologue </a><br/>
                                            <a onClick={this.triggerModalMT} href={"#"} className={'link'}> Médecin
                                                traitant </a><br/>
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
                <Modal className={'tc_modal'} isOpen={this.state.modalYMCA} fade={false} centered>
                    <ModalHeader>YMCA</ModalHeader>
                    <ModalBody>
                        Unité de Soutien et d'Accompagnement aux Personnes Cérébrolésées. Association régionale qui gère
                        des établissements sociaux et médico-sociaux agréés, notamment un ESAT, une entreprise adaptée,
                        un centre de rééducation professionnelle, et des foyers d’hébergement. Elle accueille également
                        des personnes cérébro lésées pour des activités rééducatives (individuelles ou
                        collectives).<br/>
                        Pour qui : personne en situation de handicap<br/>
                        Comment : il faut demander une notification d’orientation sur le certificat MDPH rempli par le
                        médecin.<br/>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.triggerModalYMCA} className={'buttonSecondary'}>Fermer</Button>
                    </ModalFooter>
                </Modal>
                <Modal className={'tc_modal'} isOpen={this.state.modalNP} fade={false} centered>
                    <ModalHeader>Neuropsychologue</ModalHeader>
                    <ModalBody>
                        Bilan et rééducation des fonctions cognitives, et accompagnement psychologique. Explique le
                        fonctionnement des fonctions cognitives, travaille la prise de conscience des troubles puis
                        utilise des techniques de rééducation et réadaptation des fonctions cognitives.<br/>
                        Comment : en SSR surtout, ou en libéral<br/>
                        Prise en charge : non remboursé par la sécurité sociale en libéral, une partie peut être prise
                        en charge par la mutuelle<br/>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.triggerModalNP} className={'buttonSecondary'}>Fermer</Button>
                    </ModalFooter>
                </Modal>
                <Modal className={'tc_modal'} isOpen={this.state.modalNC} fade={false} centered>
                    <ModalHeader>Le traumatisme crânien</ModalHeader>
                    <ModalBody>
                        oui
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.triggerModalNC} className={'buttonSecondary'}>Fermer</Button>
                    </ModalFooter>
                </Modal>
                <Modal className={'tc_modal'} isOpen={this.state.modalMR} fade={false} centered>
                    <ModalHeader>Le traumatisme crânien</ModalHeader>
                    <ModalBody>
                        oui
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.triggerModalMR} className={'buttonSecondary'}>Fermer</Button>
                    </ModalFooter>
                </Modal>
                <Modal className={'tc_modal'} isOpen={this.state.modalNeuro} fade={false} centered>
                    <ModalHeader>Le traumatisme crânien</ModalHeader>
                    <ModalBody>
                        oui
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.triggerModalNeuro} className={'buttonSecondary'}>Fermer</Button>
                    </ModalFooter>
                </Modal>
                <Modal className={'tc_modal'} isOpen={this.state.modalMT} fade={false} centered>
                    <ModalHeader>Le traumatisme crânien</ModalHeader>
                    <ModalBody>
                        oui
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.triggerModalMT} className={'buttonSecondary'}>Fermer</Button>
                    </ModalFooter>
                </Modal>
                <Modal className={'tc_modal'} isOpen={this.state.modalMPR} fade={false} centered>
                    <ModalHeader>Le traumatisme crânien</ModalHeader>
                    <ModalBody>
                        oui
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.triggerModalMPR} className={'buttonSecondary'}>Fermer</Button>
                    </ModalFooter>
                </Modal>
                <Modal className={'tc_modal'} isOpen={this.state.modalSRPR} fade={false} centered>
                    <ModalHeader>Le traumatisme crânien</ModalHeader>
                    <ModalBody>
                        oui
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.triggerModalSRPR} className={'buttonSecondary'}>Fermer</Button>
                    </ModalFooter>
                </Modal>
                <Modal className={'tc_modal'} isOpen={this.state.modalUE} fade={false} centered>
                    <ModalHeader>Le traumatisme crânien</ModalHeader>
                    <ModalBody>
                        oui
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.triggerModalUE} className={'buttonSecondary'}>Fermer</Button>
                    </ModalFooter>
                </Modal>
            </section>
        );
    }
}