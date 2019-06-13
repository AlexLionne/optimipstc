import React from 'react';
import {
    Button,
    Card,
    CardBody,
    CardTitle,
    Col,
    Container,
    Media,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Row,
} from 'reactstrap';

import '../../../../css/index.css';
import '../../../../css/container.css'
import header2 from '../../../../assets/images/header2.png';
import deborah from '../../../../assets/images/deborah.PNG'
import jeremie from '../../../../assets/images/jeremie.PNG'
import christophe from '../../../../assets/images/christophe.PNG'
import claire from '../../../../assets/images/claire.JPG'
import imen from '../../../../assets/images/imen.jpg'

export default class SectionTwo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalImen: false,
            modalXavier: false,
            modalMaelle: false,
            modalAlice: false,
            modalClaire: false,
            modalDeborah: false,
            modalJeremie: false,
            modalChristophe: false
        }
    }

    triggerModalImen = () => {
        this.setState({modalImen: !this.state.modalImen})
    };
    triggerModalXavier = () => {
        this.setState({modalXavier: !this.state.modalXavier})
    };
    triggerModalMaelle = () => {
        this.setState({modalMaelle: !this.state.modalMaelle})
    };
    triggerModalAlice = () => {
        this.setState({modalAlice: !this.state.modalAlice})
    };
    triggerModalClaire = () => {
        this.setState({modalClaire: !this.state.modalClaire})
    };
    triggerModalDeborah = () => {
        this.setState({modalDeborah: !this.state.modalDeborah})
    };
    triggerModalJeremie = () => {
        this.setState({modalJeremie: !this.state.modalJeremie})
    };
    triggerModalChristophe = () => {
        this.setState({modalChristophe: !this.state.modalChristophe})
    };

    render() {
        return (
            <section className={'section'}>
                <Container fluid>
                    <Row className={'equipe-top'}>
                                <Media>
                                    <Media left>
                                        <a onClick={this.triggerModalXavier} href={"#"} className={'link'}>
                                        <Media object src={deborah} alt="Xavier de Boissezon" className={'img-equipe'}/>
                                        </a>
                                    </Media>
                                    <Media body>
                                        <Media heading>
                                            <p className={'equipe-nom'} id="">
                                                Xavier de Boissezon
                                            </p>
                                        </Media>
                                        <p className={'equipe-texte'}>
                                            Pr, Médecine Physique et de Réadaptation, CHU de
                                            Toulouse
                                        </p>
                                    </Media>
                                </Media>
                                <Media>
                                    <Media left>
                                        <a onClick={this.triggerModalMaelle} href={"#"} className={'link'}>
                                        <Media object src={deborah} alt="Maëlle Biotteau" className={'img-equipe'}/>
                                        </a>
                                    </Media>
                                    <Media body>
                                        <Media heading>
                                            <p className={'equipe-nom'}>
                                                Maëlle Biotteau
                                            </p>
                                        </Media>
                                        <p className={'equipe-texte'}>
                                            Ph.D, Cheffe de Projet IHNPS, CHU de Toulouse
                                        </p>
                                    </Media>
                                </Media>
                                <Media>
                                    <Media left>
                                        <a onClick={this.triggerModalAlice} href={"#"} className={'link'}>
                                        <Media object src={deborah} alt="Alice Julien" className={'img-equipe'}/>
                                        </a>
                                    </Media>
                                    <Media body>
                                        <Media heading>
                                            <p className={'equipe-nom'}>
                                                Alice Julien
                                            </p>
                                        </Media>
                                        <p className={'equipe-texte'}>
                                            Dr, Médecine Physique et de Réadaptation, CHU de Toulouse
                                        </p>
                                    </Media>
                                </Media>
                            <Media>
                                <Media left>
                                    <a onClick={this.triggerModalClaire} href={"#"} className={'link'}>
                                    <Media object src={claire} alt="Claire Jourdan" className={'img-equipe'}/>
                                    </a>
                                </Media>
                                <Media body>
                                    <Media heading>
                                        <p className={'equipe-nom'}>
                                            Claire Jourdan
                                        </p>
                                    </Media>
                                    <p className={'equipe-texte'}>
                                        PU, Médecine Physique et de Réadaptation, CHU de Montpellier
                                    </p>
                                </Media>
                            </Media>
                                <Media>
                                    <Media left>
                                        <a onClick={this.triggerModalDeborah} href={"#"} className={'link'}>
                                        <Media object src={deborah} alt="Déborah Meligne" className={'img-equipe'}/>
                                        </a>
                                    </Media>
                                    <Media body>
                                        <Media heading>
                                            <p className={'equipe-nom'}>
                                                Déborah Meligne
                                            </p>
                                        </Media>
                                        <p className={'equipe-texte'}>
                                            Ph.D, Cheffe de Projet IHNPS & FHU HoPeS, CHU de Toulouse
                                        </p>
                                    </Media>
                                </Media>
                                <Media>
                                    <Media left>
                                        <a onClick={this.triggerModalJeremie} href={"#"} className={'link'}>
                                        <Media object src={jeremie} alt="Jérémie Pariente" className={'img-equipe'}/>
                                        </a>
                                    </Media>
                                    <Media body>
                                        <Media heading>
                                            <p className={'equipe-nom'}>
                                                Jérémie Pariente
                                            </p>
                                        </Media>
                                        <p className={'equipe-texte'}>
                                            PU-PH, Neurologie, CHU de Toulouse
                                        </p>
                                    </Media>
                                </Media>
                                <Media>
                                    <Media left>
                                        <a onClick={this.triggerModalChristophe} href={"#"} className={'link'}>
                                        <Media object src={christophe} alt="Christophe Arbus" className={'img-equipe'}/>
                                        </a>
                                    </Media>
                                    <Media body>
                                        <Media heading>
                                            <p className={'equipe-nom'}>
                                                Christophe Arbus
                                            </p>
                                        </Media>
                                        <p className={'equipe-texte'}>
                                            PU-PH, Psychiatrie, CHU de Toulouse
                                        </p>
                                    </Media>
                                </Media>
                                <Media>
                                    <Media left>
                                        <a onClick={this.triggerModalImen} href={"#"} className={'link'}> <Media object src={imen} alt="Imen Megdiche" className={'img-equipe'}/></a><br/>
                                    </Media>
                                    <Media body>
                                        <Media heading>
                                            <p className={'equipe-nom'}>
                                                Imen Megdiche
                                            </p>
                                        </Media>
                                        <p className={'equipe-texte'}>
                                            Maître de conférences à l’école d’ingénieurs ISIS à Castres et chercheur membre de l’équipe SIG/IRIT
                                        </p>
                                    </Media>
                                </Media>
                    </Row>
                </Container>
                <Modal className={'tc_modal'} isOpen={this.state.modalImen} fade={false} centered>
                    <ModalHeader>Imen Megdiche</ModalHeader>
                    <ModalBody>
                        Maître de conférences à l'école d'ingénieur ISIS Castres- INU Champollion  et chercheur au sein de l'équipe SIG à l'IRIT. Elle s’intéresse particulièrement aux problématiques d'intégration et d'analyse de données hétérogènes et volumineuses.  Elle cible comme domaine applicatif les systèmes d'information de santé couvrant plus particulièrement les problématiques d’homogénéisation, d'interopérabilité et d'accès aux données de parcours de soins. Elle est membre du consortium du projet OPTIMIPS, représentant scientifique côté IRIT.  Elle apporte  à ce projet une vision recherche et conseils techniques pour l'aide à la prise de décision (datamart dédié et solutions d'analyses) concernant le parcours de patients Traumatisme Crânien.
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.triggerModalImen} className={'buttonSecondary'}>Fermer</Button>
                    </ModalFooter>
                </Modal>
                <Modal className={'tc_modal'} isOpen={this.state.modalMaelle} fade={false} centered>
                    <ModalHeader>Maëlle Biotteau</ModalHeader>
                    <ModalBody>
                        oui
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.triggerModalMaelle} className={'buttonSecondary'}>Fermer</Button>
                    </ModalFooter>
                </Modal>
                <Modal className={'tc_modal'} isOpen={this.state.modalXavier} fade={false} centered>
                    <ModalHeader>Xavier de Boissezon</ModalHeader>
                    <ModalBody>
                        oui
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.triggerModalXavier} className={'buttonSecondary'}>Fermer</Button>
                    </ModalFooter>
                </Modal>
                <Modal className={'tc_modal'} isOpen={this.state.modalAlice} fade={false} centered>
                    <ModalHeader>Alice Julien</ModalHeader>
                    <ModalBody>
                        oui
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.triggerModalAlice} className={'buttonSecondary'}>Fermer</Button>
                    </ModalFooter>
                </Modal>
                <Modal className={'tc_modal'} isOpen={this.state.modalDeborah} fade={false} centered>
                    <ModalHeader>Deborah Meligne</ModalHeader>
                    <ModalBody>
                        oui
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.triggerModalDeborah} className={'buttonSecondary'}>Fermer</Button>
                    </ModalFooter>
                </Modal>
                <Modal className={'tc_modal'} isOpen={this.state.modalClaire} fade={false} centered>
                    <ModalHeader>Claire Jourdan</ModalHeader>
                    <ModalBody>
                        Médecin de Médecine Physique et de Réadaptation au CHU de Montpellier, avec une activité clinique orientée sur les maladies neurologiques, en particulier le traumatisme crânien. Elle a réalisé une thèse d'université sur le parcours de soins du patient traumatisé crânien, puis un séjour de recherche d'un an en Finlande, pour poursuivre les travaux sur cette thématique. Elle participe à la diffusion du projet OPTIMIPS sur Montpellier et Nîmes.
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.triggerModalClaire} className={'buttonSecondary'}>Fermer</Button>
                    </ModalFooter>
                </Modal>
                <Modal className={'tc_modal'} isOpen={this.state.modalJeremie} fade={false} centered>
                    <ModalHeader>Jérémie Pariente</ModalHeader>
                    <ModalBody>
                        Médecin, professeur de Neurologie au CHU de Toulouse. Son activité clinique et recherche, orientée cognition et neuroimagerie, prend corps autours de la mémoire, l'AVC, l’épilepsie, mais aussi la neuro-inflammation ou encore la maladie d'Alzheimer. Après un long travail sur le traumatisme crânien chez les sportifs mais aussi une riche expérience clinique de neurologue dans cette pathologie, il est à l'initiative avec le Pr Arbus et Déborah Meligne (FHU HoPeS) du projet OPTIMIPS-TC dans le but d'améliorer la prise en charge des patients traumatisés crâniens dans la région Occitanie.
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.triggerModalJeremie} className={'buttonSecondary'}>Fermer</Button>
                    </ModalFooter>
                </Modal>
                <Modal className={'tc_modal'} isOpen={this.state.modalChristophe} fade={false} centered>
                    <ModalHeader>Christophe Arbus</ModalHeader>
                    <ModalBody>
                        oui
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.triggerModalChristophe} className={'buttonSecondary'}>Fermer</Button>
                    </ModalFooter>
                </Modal>
            </section>
        );
    }
}