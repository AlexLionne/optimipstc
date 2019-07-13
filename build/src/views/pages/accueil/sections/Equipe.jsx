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
import deborah from '../../../../assets/images/deborah.jpg'
import jeremie from '../../../../assets/images/jeremie.jpg'
import christophe from '../../../../assets/images/christophe.jpg'
import claire from '../../../../assets/images/claire.JPG'
import imen from '../../../../assets/images/imen.jpg'
import alice from '../../../../assets/images/alice.jpg'
import sebastien from '../../../../assets/images/sebastien.jpg'
import maelle from '../../../../assets/images/maelle.jpg'
import xavier from '../../../../assets/images/xavier.jpg'

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
            modalChristophe: false,
            modalSebastien: false
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
    triggerModalSebastien = () => {
        this.setState({modalSebastien: !this.state.modalSebastien})
    };

    render() {
        return (
            <section className={'section'}>
                <Container fluid>
                    <Row className={'row-equipe'}>
                                <Media>
                                    <Media left>
                                        <button className={'link btn-equipe'} onClick={this.triggerModalXavier}>
                                        <Media object src={xavier} alt="Xavier de Boissezon" className={'img-equipe'}/>
                                        </button>
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
                                        <button className={'link btn-equipe'} onClick={this.triggerModalMaelle}>
                                        <Media object src={maelle} alt="Maëlle Biotteau" className={'img-equipe'}/>
                                        </button>
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
                                        <button className={'link btn-equipe'} onClick={this.triggerModalAlice} >
                                        <Media object src={alice} alt="Alice Julien" className={'img-equipe'}/>
                                        </button>
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
                                    <button className={'link btn-equipe'} onClick={this.triggerModalClaire}>
                                    <Media object src={claire} alt="Claire Jourdan" className={'img-equipe'}/>
                                    </button>
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
                                        <button className={'link btn-equipe'} onClick={this.triggerModalDeborah}>
                                        <Media object src={deborah} alt="Déborah Meligne" className={'img-equipe'}/>
                                        </button>
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
                                        <button className={'link btn-equipe'} onClick={this.triggerModalJeremie}>
                                        <Media object src={jeremie} alt="Jérémie Pariente" className={'img-equipe'}/>
                                        </button>
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
                                        <button className={'link btn-equipe'} onClick={this.triggerModalChristophe}>
                                        <Media object src={christophe} alt="Christophe Arbus" className={'img-equipe'}/>
                                        </button>
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
                                        <button className={'link btn-equipe'}onClick={this.triggerModalImen}> <Media object src={imen} alt="Imen Megdiche" className={'img-equipe'}/></button><br/>
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
                        <Media>
                            <Media left>
                                <button className={'link btn-equipe'} onClick={this.triggerModalSebastien}> <Media object src={sebastien} alt="Sébastien Déjean" className={'img-equipe'}/></button><br/>
                            </Media>
                            <Media body>
                                <Media heading>
                                    <p className={'equipe-nom'}>
                                        Sébastien Déjean
                                    </p>
                                </Media>
                                <p className={'equipe-texte'}>
                                    Ingénieur de recherche à l'institut de mathématiques de Toulouse (IMT)                               </p>
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
                        Cheffe de projet d'OPTIMIPS-TC pour la Fédération
                        Hospitalo-Universitaire des Handicaps Cognitifs, Psychiques et
                        Sensoriels. En collaboration avec le Pr Xavier de Boissezon, elle défini
                        les axes de recherche, organise et soutien le travail tout en
                        recherchant les partenariats et collaborations les plus fructueuses au
                        service de l'optimisation du parcours de soin du patient traumatisé
                        crânien en région Occitanie. Elle assure également le bon fonctionnement
                        de l'équipe, encadre les acteurs et participe à la mise en place et au
                        suivi des projets.
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.triggerModalMaelle} className={'buttonSecondary'}>Fermer</Button>
                    </ModalFooter>
                </Modal>
                <Modal className={'tc_modal'} isOpen={this.state.modalXavier} fade={false} centered>
                    <ModalHeader>Xavier de Boissezon</ModalHeader>
                    <ModalBody>
                        Xavier de Boissezon est professeur de Médecine Physique et de
                        Réadaptation (MPR) au CHU de Toulouse et à l’Université Paul Sabatier -
                        Toulouse 3. Son activité clinique est orientée sur les maladies
                        neurologiques (Accident Vasculaire Cérébraux, Traumatismes Crâniens,
                        Blessés Médullaires, etc.) et les troubles cognitifs ou moteurs qui s’en
                        suivent. Son activité de recherche est centrée sur les outils
                        d’évaluation et de rééducation des troubles du langage et des fonctions
                        exécutives. Fort de plusieurs années d'expérience au contact des
                        patients traumatisés crâniens et des difficultés liées à leurs parcours
                        de soins et de vie, il est l'investigateur principal de ce projet.
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.triggerModalXavier} className={'buttonSecondary'}>Fermer</Button>
                    </ModalFooter>
                </Modal>
                <Modal className={'tc_modal'} isOpen={this.state.modalAlice} fade={false} centered>
                    <ModalHeader>Alice Julien</ModalHeader>
                    <ModalBody>
                        Médecin de Médecine Physique et Réadaptation. Sa
                        pratique s'oriente vers la rééducation neurologique et durant son
                        internat elle commence à s'intéresser à la pathologie du traumatisme
                        crânien. C'est ainsi qu'elle a rejoint le projet Optimips-TC et écrit sa
                        thèse de médecine sur le sujet. Elle a écrit le contenu médical et
                        social de ce site internet, a participé à la création de la cartographie
                        et souhaite développer une équipe de coordination pour la prise en
                        charge des traumatisés crâniens dans la région.
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.triggerModalAlice} className={'buttonSecondary'}>Fermer</Button>
                    </ModalFooter>
                </Modal>
                <Modal className={'tc_modal'} isOpen={this.state.modalDeborah} fade={false} centered>
                    <ModalHeader>Deborah Meligne</ModalHeader>
                    <ModalBody>
                        Cheffe de projet de la Fédération Hospitalo-Universitaire dédiée aux
                        Handicaps Cognitifs, Psychiques et Sensoriels (FHU HoPeS), Déborah
                        Méligne est, avec les Prs Arbus et Pariente, à l'initiative du projet
                        OPTIMIPS-TC. Ses missions consistent à accompagner cliniciens et
                        chercheurs dans la conception et la mise en place de leurs projets de
                        recherche et de soin, elle a donc œuvré à la mise en œuvre de ce projet
                        collaboratif régional.
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
                        Médecin, professeur de Psychiatrie au CHU de
                        Toulouse. La gériatrie, la neuropsychiatrie, la dépression sont ses axes
                        de recherches majeurs. En lien avec sa pratique clinique, il a pu
                        constater l'ampleur du travail à accomplir en psychiatrie, et en lien
                        avec les autres services de médecine, afin de mieux accompagner le
                        patient traumatisé crânien. Co-fondateur avec le Pr Pariente et Déborah
                        Méligne de la FHU HoPeS qui œuvre pour les handicaps invisibles, il est
                        avec eux deux à l'initiative du projet OPTIMIPS-TC.
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.triggerModalChristophe} className={'buttonSecondary'}>Fermer</Button>
                    </ModalFooter>
                </Modal>
                <Modal className={'tc_modal'} isOpen={this.state.modalSebastien} fade={false} centered>
                    <ModalHeader>Sébastien Déjean</ModalHeader>
                    <ModalBody>
                        Ingénieur de recherche à l'institut de mathématiques de Toulouse (IMT). Il s'intéresse particulièrement à l'analyse statistique de données et aux techniques d'intégration de données. Il entretient de nombreuses collaborations dans le cadre de projets de recherche interdisciplinaires. Ses domaines d'interaction privilégiés sont la biologie et la recherche d'information. Il est membre du consortium du projet OPTIMIPS, représentant scientifique côté IMT. Il apporte à ce projet sa vision sur l'analyse de données et sur l'indispensable préparation des données préalable à toute analyse statistique.
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.triggerModalSebastien} className={'buttonSecondary'}>Fermer</Button>
                    </ModalFooter>
                </Modal>
            </section>
        );
    }
}