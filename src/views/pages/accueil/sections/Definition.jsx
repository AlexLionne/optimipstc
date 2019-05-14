import React from 'react';
import {
    Button,
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

import '../../../../css/index.css';
import header2 from '../../../../assets/images/header2.png';

export default class SectionTwo extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            modal : false
        }
    }
    triggerModal = () =>{
        this.setState({modal:!this.state.modal})
    };


    render() {
        return (
            <section className={'section'}>
                <img style={{position:'absolute',top:0,bottom:0,right:0,margin:'auto'}} height={'100%'} width={'auto'} src={header2}/>
                <Container fluid className={'container-justify'}>
                    <Row>
                        <Col xs="6" className={'testtt'}>
                            <h2 className={'titre'}>
                               Le Traumatisme crânien
                            </h2>
                            <p>
                                Il s’agit d’une altération du fonctionnement cérébral provoqué par une force externe.
                                Il est parfois appelé commotion cérébrale.
                                Suite à un choc violent sur la boite crânienne le cerveau peut souffrir et cela peut se manifester de manières très différentes selon la sévérité du traumatisme, le mécanisme,
                                la localisation des lésions, les antécédents et les médicaments que prend la personne.
                                Un choc indirect par accélération et/ou décélération brutale (lors d’un accident de voiture à vitesse élevée par exemple),
                                peut aussi provoquer des lésions cérébrales.
                            </p>
                            <p>
                                On utilise un classement en fonction de la gravité globale du traumatisme :
                            </p>

                                    <p className={'bold colorPrimary'}>TC léger :</p>
                                    <p>les troubles neurologiques suite au choc ont duré peu de temps, il peut s’agir d'une perte
                                    de connaissance, d'une confusion, d'une crise d'épilepsie, etc.</p>

                                       Le score
                                    <a onClick={this.triggerModal} href={"#"} className={'link'}> Glasgow initial </a>est entre 13 et 15.
                                    <br/><br/>
                                    <p className={'bold colorPrimary'}>TC modéré et sévère :</p>
                                    <p>les troubles neurologiques sont importants et durables, ils nécessitent l’intervention des services de secours pour une hospitalisation la plus rapide possible.
                                Le TC sera dit sévère si le score Glasgow à l’arrivée des secours est entre 3 et 8. Le blessé est dans le coma.
                                Le TC sera dit modéré si le score Glasgow à l’arrivée des secours est entre 9 et 12. Le blessé n’est pas dans le coma mais il présente des signes d’atteinte neurologique
                                    </p><br/>
                                    <p>
                                        Tout âge et sévérité confondus, on compte environ 150 000 traumatismes crâniens par an en France.
                                        Parmi eux, environ 80% sont légers, 11% modérés et 9% sévères.<br/>
                                        Ces chiffres sont probablement sous-évalués car il ya beaucoup de traumatimes crâniens minimes qui ne sont pas recensés dans les études.
                                    </p>
                            <h3 className={'bold colorPrimary'}>
                                Les causes
                            </h3>
                            <p>Jusqu'à récemment, la cause principale eétait l'accident de la route, touchant principalement les hommes de 15 à 25 ans.
                            <br/>Les autres causes fréquentes dans cette tranche d'âge sont les accidents de sports, les agressions.
                            </p>
                            <p>
                                Les autres populations particulièrement touchées sont les personnes agées, avec les chutes, et les très jeunes enfants
                                avec les accidents domestiques et les maltraitances.
                            </p>
                            <p>
                                Ces dernières années les traumatismes crâniens chez les jeunes sont en diminution. Ceci s’explique essentiellement par les mesures de prévention routière qui ont fait diminuer les accidents de la voie publique.
                            </p>
                            <p>
                                En revanche, le nombre de traumatismes crâniens chez les personnes âgées est en augmentation, notamment en raison de l'augmentation de l'espérance de vie.
                                Les personnages âgées vivent de manière autonome plus longtemps, mais le risque de chute augmente proportionnellement. De plus, beaucoup d'entres elles suivent des
                                traitements pouvant favoriser un saignement cérébral lors d'une chute.
                            </p>
                            La mortalité secondaire aux TC ne diminue pas.
                            <br/><br/>
                            <h3 className={'bold colorPrimary'}>
                                Evolution et conséquences
                            </h3>
                                Les séquelles sont très variables et dépendent en partie de l'importance des lésions cérébrales et de l'âge du patient.
                            <p className={'liste'}>
                                <strong>Pour les traumatismes crâniens sévères, </strong>le risque de décès est important durant la phase de coma, 50%
                                de ces derniers décèdent dans les premières semaines après l'accident.<br/>
                                Chez les blessés qui survivent, la sortie du coma, qui correspond à l'ouverture spontanée des yeux, est suivie de la phase d'éveil. On distingue 3 stades :
                                <br/><br/>
                                <ul>
                                    <li>
                                        <p  className={'text-primary'}> la phase végétative : </p>le patient récupère les fonctions vitales, il peut respirer seul sans machine et a un cycle veille-sommeil. Mais il n’y a pas de communication et d’interactions avec l’environnement extérieur. Il ne parle pas, ne répond pas aux stimulis.
                                    </li>
                                    <li>
                                        <p  className={'text-primary'}> la phase pauci-relationnel : </p>le patient a une certaine conscience du monde extérieur, on obtient des réponses à certains stimulis, un suivi du regard par exemple. Une communication simple peut s’établir, par clignement des yeux ou serrement de main par exemple.
                                    </li>
                                    <li>
                                        <p  className={'text-primary'}>la phase des premiers échanges relationnels : </p>le patient va communiquer de plus en plus facilement et de manière plus spontanée, il n’y a plus forcément besoin de stimulation. Mais souvent le patient est confus et désorienté, parfois agité. Il a des oublis au fur et à mesure, il oublie les évènements d’un jour à l’autre : il s’agit de « l’amnésie post traumatique », qui va s’améliorer progressivement.
                                    </li>
                                </ul>
                                Dans certains cas le patient sort du coma mais reste en phase végétative ou pauci relationnelle. Il respire de manière autonome (avec une trachéotomie parfois), est alimenté par une sonde ou par voie orale, mais la communication reste inexistante ou très limitée. L’éveil est encore possible plusieurs mois après l’accident. Au-delà d’un an on parle d’ « état végétatif chronique », cela concerne 2 à 4% des TC sévères.
                            </p>
                            <p>
                                Il faut souligner qu’il est impossible de prévoir la durée de la phase d’éveil qui peut varier de quelques jours à quelques mois.<br/>
                                Il y a souvent des lésions non neurologiques qui s’associent : des fractures osseuses, des lésions viscérales thoracique ou abdominale, qui peuvent compliquer la situation.
                            </p>
                            <p className={'liste'}>
                                Pour les traumatismes crâniens modérés ou sévères, <strong>les séquelles neurologiques </strong>secondaires aux lésions cérébrales peuvent être très diverses et imprévisibles. Elles sont de type :
                                <br/><br/>
                                <ul>
                                    <li>
                                        moteur : modification de la commande motrice d'un ou plusieurs membres, rendant difficile voire impossible leur utilisation.
                                    </li>
                                    <li>
                                        cognitif : troubles de la mémoire, difficulté à accomplir certaines tâches, difficulté à se concentrer, à maintenir son attention, lenteur.
                                    </li>
                                    <li>
                                        trouble de la parole, du langage.
                                    </li>
                                    <li>
                                        changement de comportement, de personnalité. Il peut s'agir d'une difficulté à se contrôler.
                                    </li>
                                    <li>
                                        trouble de la vision, de l'audition, du goût, de l'odorat, du toucher.
                                    </li>
                                    <li>
                                        trouble de la déglutition : difficulté voire impossibilité de boire et manger.
                                    </li>
                                    <li>
                                        dysfonctionnement de la vessie, de l'intestin.
                                    </li>
                                    <li>
                                        épilepsie
                                    </li>
                                </ul>
                            </p><br/>
                            Après un traumatisme crânien sévère :
                            <br/><br/>
                            <ul>
                                <li>
                                    bonne récupération dans 20 à 30% des cas. Le blessé est capable de retrouver une vie sociale et professionnelle, il a récupéré la quasi-totalité de ses capacités antérieures.
                                </li>
                                <li>
                                    handicap modéré dans 15 à 20% des cas. Le patient est autonome dans les activités quotidiennes mais il persiste des déficiences. La vie sociale et professionnelle doit être adaptée aux séquelles.
                                </li>
                                <li>
                                    handicap grave dans 7 à 15% des cas. Le patient est dépendant dans les activités quotidiennes, il doit être aidé d’une tierce personne.
                                </li>
                                <li>
                                    état végétatif chronique dans 2 à 4 % des cas
                                </li>
                                <li>
                                    Décès dans 50% des cas
                                </li>
                            </ul>
                            <p>
                                Pour les traumatismes crâniens légers, les troubles sont moins visibles au premier plan, et vont surtout concerner
                                les troubles de la concentration, les maux de tête, la fatigue, l'anxiété, etc.<br/>
                                Dans la grande majorité des cas, les symptômes vont disparaître progressivement.<br/>
                                Parfois, ils ont des conséquences importantes dans la vie professionnelle et familiale.
                            </p>
                        </Col>


                    </Row>

                </Container>
                <Modal className={'glasgow_modal'} isOpen={this.state.modal} fade={false} >
                    <ModalHeader >Score de Glasgow</ModalHeader>
                    <ModalBody>
                        <p>
                            L’échelle de coma de Glasgow est beaucoup utilisée dans la phase initiale. Il s’agit d’une échelle qui évalue l’état de conscience du patient. En fonction de l’ouverture des yeux, de la réponse verbale et de la réponse motrice on obtient un score total qui varie de 3 à 15.
                        </p>

                        <Table>
                            <thead>
                            <tr>
                                <th>Score</th>
                                <th>Ouverture des yeux</th>
                                <th>Meilleure réponse verbale</th>
                                <th>Meilleure réponse motrice</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <th scope="row">6</th>
                                <td>-</td>
                                <td>-</td>
                                <td>Obéit aux ordres</td>
                            </tr>
                            <tr>
                                <th scope="row">5</th>
                                <td>-</td>
                                <td>Orientée</td>
                                <td> Localise la douleur</td>
                            </tr>
                            <tr>
                                <th scope="row">4</th>
                                <td>Spontanée</td>
                                <td>Confuse</td>
                                <td>Flexion orientée à la douleur</td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td>À la demande</td>
                                <td>Innapropriée</td>
                                <td>Flexion à la douleur</td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>À la douleur</td>
                                <td>Incompréhensibke</td>
                                <td>Extension à la douleur</td>
                            </tr>
                            <tr>
                                <th scope="row">1</th>
                                <td>Aucune</td>
                                <td>Aucune</td>
                                <td>Aucune</td>
                            </tr>
                            </tbody>
                        </Table>
                    </ModalBody>
                    <ModalFooter>
                        <Button className={'buttonPrimary'} >Voir plus d'informations</Button>
                        <Button onClick={this.triggerModal} className={'buttonSecondary'}>Fermer</Button>
                    </ModalFooter>
                </Modal>
            </section>
        );
    }
}