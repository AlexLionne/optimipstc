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
                                Traumatisme crânien et pratique sportive
                            </h2>
                            <h3 className={'bold colorPrimary'}>
                                Commotion cérébrale
                            </h3>
                            <p>
                                Les traumatismes crâniers légers, ou commotion cérébrale, en pratique sportive
                                sont particulièrement fréquents dans les sports de contact et de collision :
                                rugby, football, judo, boxe, taekwondo, lutte, hockey sur glace, etc.
                            </p>
                            <p>
                                Une commotion cérébrale peut avoir des conséquences importantes, même si le
                                traumatisme ne semble « pas grave ».
                            </p>
                            <p>
                                Le pratiquant peut développer un syndrome post-commotionnel
                                (voir <a href="/accueil/sections/TCL/Utilisateur/adult">traumatisme crânien
                                léger). </a>
                                Même si les cas sont heureusement très rares, il y a des risques de mort subite dans les
                                suites immédiates,
                                sur le terrain ou dans les 24h.
                            </p>
                            <p>
                                La récupération est plus longue chez l'enfant et l'adolescent jeune, ainsi que chez ceux
                                qui ont déjà subi une ou plusieurs commotions cérébrales.
                            </p><br/>
                            <p>
                                Il ne faut donc jamais le banaliser et suivre certaines règles de prise en charge.<br/>
                                Pour cela, les Fédérations ont publié des documents d'information et de prévention à ce
                                sujet :
                                <ul>
                                    <li><a
                                        href="http://www.france-traumatisme-cranien.fr/upload/tcl-traduction-scat-fifa.pdf"
                                        target='_blank'>FIFA</a></li>
                                    <li><a
                                        href="http://www.france-traumatisme-cranien.fr/upload/world_rugby_concussion_guidance_fr.pdf"
                                        target='_blank'>World Rugby</a></li>
                                    <li><a
                                        href="http://www.france-traumatisme-cranien.fr/upload/actions/tc-leger/cnosf-aff-40x60-ok-2.pdf"
                                        target='_blank'>Comité National Olympique Français</a></li>
                                </ul>
                            </p>
                            <p>
                                Dans les suites immédiates d'un choc sur la tête lors de l'activité sportive, il faut
                                immédiatemment
                                arrêter l'activité en cours et suivre les règles de prise en charge du
                                <a href="/accueil/sections/TCL/Utilisateur/adult"> traumatisme crânien léger. </a>
                            </p>
                            <p>
                                La reprise du sport après une commotion cérébrale devra être validée par un médecin.
                                Habituellement il faut au moins une semaine de repos chez l’adulte et deux semaines chez
                                l’enfant.<br/>
                                <strong>Il faut que tous les symptômes aient disparus avant de reprendre, et la reprise
                                    doit se faire de manière progressive</strong><br/>
                                Poursuivre l'activité sportive vous expose aux risques :
                                <ul>
                                    <li>d'une nouvelle commotion. La probabilité d'en subir une deuxième est en effet
                                        plus important que pour la personne qui n'en a jamais eu.
                                    </li>
                                    <li> d'une prolongation des symptômes.</li>
                                    <li>d'une mauvaise récupération avec un risque de séquelles plus importants.</li>
                                </ul>
                                Le cerveau a besoin de repos pour récupérer !<br/>
                                Une étude avec réalisation de neuro imagerie moderne (par IRM fonctionnelle) réalisée
                                chez des adolescents joueur de football américain, a montré que le cerveau fonctionnait
                                encore anormalement 7 semaines après une commotion cérébrale alors que les joueurs ne
                                présentent plus aucun symptôme !
                                <br/>
                                Il vaut mieux manquer un match que toute la saison ...
                            </p>
                            <h3 className={'bold colorPrimary'}>
                                Commotions cérébrales répétées
                            </h3>
                            <p>
                                Une problématique particulière de la commotion cérébrale chez le sportif est sa
                                répétition.
                                <br/>
                                A chaque nouveau traumatisme celui-ci risque d’être plus grave, surtout si les
                                traumatismes sont rapprochés. On dit qu’il y a un effet cumulatif sur le cerveau et son
                                fonctionnement.
                                <br/>
                                Par exemple le sportif qui a déjà eu plusieurs commotions cérébrales aura plus de
                                symptômes et mettra plus de temps à récupérer s’il subit une nouvelle commotion, par
                                rapport à un sportif qui en est à son premier choc.
                                <br/>
                                Mais avec la répétition des commotions cérébrales il y a aussi un risque de séquelles
                                définitives. Il s’agit surtout de troubles de la mémoire, de difficultés à réfléchir, à
                                parler.
                                <br/>
                                On retrouve également un risque plus important de vieillissement anormal du cerveau avec
                                l’apparition d’une maladie neuro-dégénérative, dont les symptômes ressemblent à la
                                maladie d’ Alzheimer. Ceci est montré chez les sportifs ayant subi plus de 3 commotions
                                cérébrales.
                            </p>
                            </div>
                        </Col>
                    </Row>
                </Container>
                <Modal className={'tc_modal'} isOpen={this.state.modal} fade={false}>
                    <ModalHeader>Le traumatisme crânien</ModalHeader>
                    <ModalBody>
                        <p>
                            Il s’agit d’une altération du fonctionnement cérébral provoqué par une force externe.
                            Il est parfois appelé commotion cérébrale.
                            Suite à un choc violent sur la boite crânienne le cerveau peut souffrir et cela peut se
                            manifester de manières très différentes selon la sévérité du traumatisme, le mécanisme,
                            la localisation des lésions, les antécédents et les médicaments que prend la personne.
                            Un choc indirect par accélération et/ou décélération brutale (lors d’un accident de voiture
                            à vitesse élevée par exemple),
                            peut aussi provoquer des lésions cérébrales.
                        </p>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.triggerModal} className={'buttonSecondary'}>Fermer</Button>
                    </ModalFooter>
                </Modal>
            </section>
        );
    }
}