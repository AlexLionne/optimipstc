import React from 'react';
import {
    Card,
    CardTitle,
    CardImg,
    CardText,
    CardBody,
    Row,
    Col,
    Container, Modal, ModalHeader, ModalFooter, Button, ModalBody, Table, ListGroup, ListGroupItem,
} from 'reactstrap';

import '../../../../../../css/index.css';
import '../../../../../../css/container.css'
import header2 from '../../../../../../assets/images/header2.png';
import rugby from '../../../../../../assets/images/rugby-ball.png';
import Parcours from '../../../../../pages/accueil/sections/Parcours'
import SportController from '../../../../../SportController'

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
                                Le Traumatisme crânien léger chez l'adulte
                            </h2>
                            <h3 className={'bold colorPrimary'}>
                                Définition
                            </h3>
                            <p>
                                Il s'agit d'un
                                <a onClick={this.triggerModal} href={"#"} className={'link'}> traumatisme crânien </a>
                                léger si les troubles neurologiques ont duré très peu de temps. Ces troubles
                                neurologiques peuvent être :
                                <br/><br/>
                                <ul>
                                    <li>une perte de connaissance.</li>
                                    <li>une confusion : la personne tient un discours incohérent, elle ne sait pas à quel endroit elle se trouve, ou se trompe sur la date.
                                    </li>
                                    <li>une crise d épilepsie.</li>
                                    <li>une paralysie.</li>
                                    <li>une amnésie post-traumatique : oubli de la conversation au fur et à mesure,
                                        répète sans cesse les mêmes questions, cela doit durer moins de 24h.
                                    </li>
                                </ul>
                            </p>
                            <br/>
                            <h3 className={'bold colorPrimary'} id='appel15'>
                                Que devez-vous faire ?
                            </h3>
                            <p className={'bold'}>
                                Les signes d'alerte qui doivent vous faire appeler le 15 immédiatement :
                            </p>
                            <ul>
                                <li>une somnolence : difficulté à rester éveiller.</li>
                                <li>une perte de force dans un membre ou un engourdissement, une perte de sensibilité.
                                </li>
                                <li>difficulté à parler.</li>
                                <li>comportement inhabituel.</li>
                                <li>trouble de la vision, vision double.</li>
                                <li>trouble de l'équilibre, difficulté à tenir debout et à marcher.</li>
                                <li>maux de tête importants inhabituels.</li>
                                <li>nausées et/ou vomissements.</li>
                                <li>écoulement de sang ou de liquide clair par le nez ou les oreilles.</li>
                                <li>convulsions, mouvements anormaux.</li>
                            </ul>
                            <p>
                                Votre interlocuteur du SAMU vous posera des questions et vous guidera sur la conduite à
                                tenir.
                            </p>
                            </div>

                        </Col>
                    </Row>
                    <hr/>
                    <Row>
                        <Col xs="12" xl="9" className={'col-espacement'}>
                            <p className={'bold'}>
                                Les signes d'alerte qui doivent vous faire consulter votre médecin traitant :
                            </p>
                            <p>
                                Si dans les jours qui suivent, vous ressentez :
                            </p>
                            <ul>
                                <li>grosse fatigue.</li>
                                <li>maux de tête persistant.</li>
                                <li>difficulté à supporter le bruit ou la lumière.</li>
                                <li>difficulté à se concentrer, à réfléchir, à suivre une conversation.</li>
                                <li>trouble de la mémoire.</li>
                                <li>fatigue visuelle.</li>
                                <li>irritabilité, impatience.</li>
                                <li>acouphènes, bourdonnements d'oreille.</li>
                                <li>cauchemars, souvenirs de l'accident qui reviennent sans cesse.</li>
                            </ul>
                            <br/><br/>
                            <p className={'bold'}>
                                Dans les jours qui suivent, vous devez :
                            </p>
                            <ul>
                                <li><strong>Vous reposer: </strong>il est important de limiter ses activités. Si vous vous sentez fatigués, ne forcez pas, faites des pauses.
                                </li>
                                <li><strong>Ne pas pratiquer d'activité sportive : </strong>Il faut attendre
                                    4 semaines avant de reprendre le
                                    sport,ou que les maux de tête
                                    aient disparus depuis plusieurs jours
                                    avant de reprendre le sport.
                                </li>
                                <li><strong>Eviter l'alcool.</strong></li>
                                <li><strong>Ne conduire que si vous vous en sentez pleinement capable.</strong></li>
                            </ul>
                            <br/>
                            <h3 className={'bold colorPrimary'}>
                                Quels sont les risques possibles ?
                            </h3><br/>
                            <p className={'text-danger'}>
                                Dans les heures à venir :
                            </p>
                            <p> Un saignement dans le cerveau est rare mais grave. Il survient habituellement dans les
                                premières heures
                                après l'accident, mais il est préférable de surveiller la personne pendant 48 heures.
                                Et s'i l'un des « signes
                                d’alerte qui doivent vous faire appeler le
                                15 » cité <a href="#appel15">ci-dessus</a> apparaît, vous ne devez pas perdre de temps.
                                Le service du SAMU est le plus compétent pour juger de ce risque.
                                Il pourra alors choisir de : venir sur place, vous envoyer une ambulance, vous
                                demander de venir consulter
                                aux urgences, ou chez votre médecin traitant.<br/>
                                Un scanner n'est pas toujours nécessaire, il expose à des radiations ionisantes.</p>
                            <p className={'text-danger'}>
                                Dans les semaines et mois à venir :
                            </p>
                            <p>
                                Dans la majorité des cas tout rentre dans
                                l’ordre rapidement.
                                Chez certaines personnes il peut apparaitre les
                                jours suivants : des maux de tête, des difficultés à
                                se concentrer, à retenir des informations, une
                                fatigue, des troubles de la vision, une intolérance
                                au bruit et à la lumière, des vertiges, des troubles
                                du sommeil, cauchemars, des troubles
                                émotionnels, une irritabilité, une anxiété.
                            </p>
                            <p>
                                Ces signes vont disparaitre
                                progressivement en quelques semaines.
                                Dans 90% des cas ils ont disparu après 6
                                mois.<br/>
                                S’ils sont toujours présents au bout d’un
                                mois votre médecin traitant vous
                                orientera vers une consultation de
                                neurologue ou de médecin rééducateur.
                            </p>
                        </Col>
                    </Row>
                </Container>
                <SportController/>
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