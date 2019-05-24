import React from "react";
import '../../../css/index.css'
import firebase from "../../../firebase";
import {
    Button,
    Card,
    CardBody,
    CardText,
    CardTitle,
    Col,
    Container,
    Input,
    ListGroup,
    ListGroupItem,
    Nav,
    NavItem,
    NavLink,
    Row,
} from "reactstrap";
import {reactLocalStorage} from 'reactjs-localstorage';
import {Badge} from "reactstrap/dist/reactstrap";


class Notifications extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activeItem: 0,
            uid: props.uid,
            isLoading: true,
            isLoadingNAN: true,
            selectedItem: 0,
            notifications: [],
            nbEnCours: 0,
            nbAcceptees: 0,
            nbRefusees: 0,
        };
        if (reactLocalStorage.getObject('notifications').notifications !== undefined) {
            reactLocalStorage.getObject('notifications').notifications.map((notification, i) => {
                switch (notification.etat) {
                    case 0 :
                        this.setState({nbEnCours: this.state.nbEnCours++});
                        break;
                    case 1 :
                        this.setState({nbAcceptees: this.state.nbAcceptees++});
                        break;
                    case 2 :
                        this.setState({nbRefusees: this.state.nbRefusees++});
                        break;
                }
            });
        }

    }

    componentDidMount() {
        this.handleItem(0);
    }

    handleItem = (id) => {
        console.log("handled");
        this.setState({activeItem: id});
        let notifications = [];
        if (id !== 4) {
            reactLocalStorage.getObject('notifications').notifications.map((notification, i) => {
                if (notification.etat === id) {
                    notifications.push(notification);
                }
            });
            this.setState({notifications: notifications});
        }
    };
    handleMessageChange = (event) => {
        this.setState({actionMessage: event.target.value})
    };

    validerDemande(demandeID) {
        //valider la demande
        let res = null;
        let ctx = this;
        let d = new Date,
            dformat = [(d.getMonth() + 1).padLeft(),
                    d.getDate().padLeft(),
                    d.getFullYear()].join('/') + ' ' +
                [d.getHours().padLeft(),
                    d.getMinutes().padLeft(),
                    d.getSeconds().padLeft()].join(':');

        firebase.database().ref('/demandes/').once('value').then(function (snapshot) {
            Object.values(snapshot.val()).map((demande, i) => {
                if (demande.id === demandeID) {
                    res = demande;
                    res.etat = 1;
                    firebase.database().ref('/demandes/' + demandeID).update(
                        {
                            uid: firebase.auth().currentUser.uid,
                            id: demande.id,
                            nom: demande.nom,
                            mail: demande.mail,
                            message: ctx.state.actionMessage,
                            time: dformat,
                            data: demande.data,
                            etat: 1, // 0 en cours 1 validée, 2 refusée
                        }
                    )
                }
            })
        });

        //on supprime la demande de la liste d'attente
        let demandes = this.state.notifications;
        demandes.map((demande, i) => {
            if (demande.id === demandeID) {
                demande.etat = 1;
            }
        });
        this.setState({nbEnCours: this.state.nbEnCours--}); //does not work
        this.setState({nbAcceptees: this.state.nbAcceptees++}); //does not work
        this.setState({notifications: demandes});
        //modifier la valeur
    }

    render() {
        return (
            <div className={'root root_fixed_nav'}>

                <Container className={'container'}>
                    <h2>Liste des demandes</h2>
                    <Row>
                        <Col xs="3">
                            <Nav vertical>
                                <NavItem>
                                    <NavLink onClick={() => this.handleItem(0)}
                                             className={this.state.activeItem === 0 ? 'bold mr-24' : 'mr-24'}
                                             href="#">{this.state.nbEnCours !== 0 ? this.state.nbEnCours : null} En
                                        cours</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink onClick={() => this.handleItem(1)}
                                             className={this.state.activeItem === 1 ? 'bold mr-24' : 'mr-24'}
                                             href="#">{this.state.nbAcceptees !== 0 ? this.state.nbAcceptees : null} Acceptées</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink onClick={() => this.handleItem(2)}
                                             className={this.state.activeItem === 2 ? 'bold mr-24' : 'mr-24'}
                                             href="#">{this.state.nbRefusees !== 0 ? this.state.nbRefusees : null} Refusée</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink onClick={() => this.handleItem(3)}
                                             className={this.state.activeItem === 3 ? 'bold mr-24' : 'mr-24'}
                                             href="#">Historique</NavLink>
                                </NavItem>
                            </Nav>
                        </Col>
                        <Col xs="9">
                            {reactLocalStorage.getObject('notifications').notifications.map((notification, i) => {
                                return (
                                    <div>
                                        <CardTitle>{notification.time}</CardTitle>
                                        <Card>
                                            <CardBody>
                                                <CardText>
                                                    <p>
                                                        Le gestionnaire de la structure {notification.nom} ayant pour
                                                        mail <a
                                                        href={'mailto:' + notification.mail}>{notification.mail}</a> souhaiterai
                                                        modifier les champs suivants :
                                                    </p>
                                                    <ListGroup flush>
                                                        {notification.data.map((row, i) => {
                                                            return <ListGroupItem disabled tag="p">
                                                                <p><Badge color="secondary">Ligne</Badge> {row.name}</p>
                                                                <p><Badge color="success">Valeur</Badge> {row.value}</p>
                                                                <p><Badge
                                                                    color="warning">Ancienement</Badge> {row.oldValue}
                                                                </p>
                                                            </ListGroupItem>
                                                        })}
                                                    </ListGroup>
                                                    {notification.etat === 0 ?
                                                        <Input type="textarea" onChange={this.handleMessageChange}
                                                               placeholder={'Répondre à ' + notification.nom}
                                                               name="message" className="texteaera"/>
                                                        :
                                                        <Input type="textarea" name="message"
                                                               value={notification.message} className="texteaera"
                                                               disabled/>}


                                                </CardText>
                                                {notification.etat === 0 ?
                                                    <div>
                                                        <Button className={'field_btn color_secondary'}
                                                                outline>Refuser</Button>
                                                        <Button className={'field_btn color_primary'}
                                                                onClick={() => this.validerDemande(notification.id)}
                                                                outline>Accepter</Button>
                                                    </div>
                                                    :
                                                    null}

                                            </CardBody>
                                        </Card>
                                    </div>
                                )
                            }).reverse()}
                        </Col>
                    </Row>
                </Container>


            </div>

        )
    }
}

export default Notifications;