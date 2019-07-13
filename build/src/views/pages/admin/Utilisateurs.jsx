import React from "react";
import '../../../css/index.css'
import firebase from "../../../firebase";
import {Card, CardBody, CardText, CardTitle, Col, Container, ListGroup, ListGroupItem, Row, Spinner,} from "reactstrap";


let utilisateurs = [];
let structures_non_valides = [];

class Utilisateurs extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            activeItem: 0,
            uid: props.uid,
            isLoading: true,
            isLoadingNAN: true,
        };

        firebase.database().ref('users/').once('value').then((snapshot) => {
            utilisateurs = Object.values(snapshot.val());
            this.setState({isLoading: false});
            //structures non liées
        });
        firebase.database().ref('structures/').orderByChild('mail').equalTo('Non communiqué').once('value').then((snapshot) => {
            structures_non_valides = Object.values(snapshot.val());

            this.setState({isLoadingNAN: false});
        })
    }


    render() {
        return (
            <div className={'root root_fixed_nav'}>
                <Container className={'container'}>
                    <Row>
                        <Col sm={'6'} xs={'12'}>
                            <Card className={'card'}>
                                <CardBody>
                                    <CardTitle style={{
                                        width: 'auto',
                                        fontWeight: 'bold',
                                        color: '#000',
                                        display: 'inline-block'
                                    }} className={'titre'}>{structures_non_valides.length} Sructures non
                                        liées </CardTitle>

                                    {this.state.isLoadingNAN ? <Spinner className={'spinner'}/> : null}
                                    <CardText>
                                        <ListGroup flush>
                                            {
                                                structures_non_valides.map((structure, i) => {
                                                    return (
                                                        <ListGroupItem className={'link_primary'}
                                                                       href="#">{structure.nom}</ListGroupItem>
                                                    )
                                                })}
                                        </ListGroup>
                                    </CardText>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col sm={'6'} xs={'12'}>
                            <Card className={'card'}>
                                <CardBody>
                                    <CardTitle style={{
                                        width: 'auto',
                                        fontWeight: 'bold',
                                        color: '#000',
                                        display: 'inline-block'
                                    }} className={'titre'}>{utilisateurs.length} Utilisateurs</CardTitle>

                                    {this.state.isLoading ? <Spinner className={'spinner'}/> : null}
                                    <CardText>
                                        <ListGroup flush>
                                            {
                                                utilisateurs.map((utilisateur, i) => {
                                                    return (
                                                        <ListGroupItem className={'link_primary'}
                                                                       href="#">{utilisateur.mail}</ListGroupItem>
                                                    )
                                                })}
                                        </ListGroup>
                                    </CardText>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>


            </div>

        )
    }
}

export default Utilisateurs;