import React from 'react';
import {
    Row,
    Col,
    Container, Modal, ModalHeader, ModalFooter, Button, ModalBody, Table, ListGroup, ListGroupItem,
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
                <Container className={'container'}>
                    <Row>
                        <Col xs="6">
                            <h2 className={'titre'}>
                               Le Traumatisme crannien
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
                                    <br/>
                                    <p className={'bold colorPrimary'}>TC léger :</p>
                                    <p>les troubles neurologiques suite au choc ont duré peu de temps, il peut s’agir :</p>
                                       <br/>
                                        <ListGroup flush>
                                            <ListGroupItem className={'bold'}>d’une perte de connaissance</ListGroupItem>
                                            <ListGroupItem className={'bold'}>d’une confusion</ListGroupItem>
                                            <ListGroupItem className={'bold'}>d’une crise d épilepsie</ListGroupItem>

                                        </ListGroup>
                                        <br/>
                                       Le score
                                    <a onClick={this.triggerModal} href={"#"} className={'link'}> Glasgow initiale </a>est entre 13 et 15.


                                    <p className={'bold colorPrimary'}>TC modéré et sévère :</p>
                                    <p>les troubles neurologiques sont importants et durables, ils nécessitent l’intervention des services de secours pour une hospitalisation la plus rapide possible.
                                Le TC sera dit sévère si le score Glasgow à l’arrivée des secours est entre 3 et 8. Le blessé est dans le coma.
                                Le TC sera dit modéré si le score Glasgow à l’arrivée des secours est entre 9 et 12. Le blessé n’est pas dans le coma mais il présente des signes d’atteinte neurologique
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