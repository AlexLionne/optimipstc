import React from 'react';
import {
    Card,
    CardTitle,
    CardBody,
    Row,
    Col,
    Container, Modal, ModalHeader, ModalFooter, Button, ModalBody, Table, ListGroup, ListGroupItem,
} from 'reactstrap';

import axios from 'axios';
import '../../../../../css/index.css';
import '../../../../../css/container.css'
import header2 from '../../../../../assets/images/header2.png';
import doctor from "../../../../../assets/images/doctor.png";


export default class SectionTwo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            fname: '',
            lname: '',
            email: '',
            message: '',
            mailSent: false,
            error: null
        }
    }

    triggerModal = () => {
        this.setState({modal: !this.state.modal})
    };

    render() {
        return (
            <section className={'section'}>
                <img style={{position: 'absolute', top: 0, bottom: 0, right: 0, margin: 'auto'}} height={'100%'}
                     width={'auto'} src={header2}/>

                <Container className={'container-set'}>
                    <Row className="row-equipe">
                    <Col xs='12' xl='9'>
                        <Card>
                        <h1 className='titre'>Vous êtes un professionnel</h1>
                        Mettez à jour votre structure<br/>

                        <a href="/login"><Button
                            color="secondary">J'ai déjà un compte</Button></a>
                            <a target='_blank' href="mailto:cartoccitanie.tc@gmail.com?Subject=Création de compte OPTIMIPS&amp;body=Bonjour, veuillez nous fournir
                             votre adresse mail, et le nom de votre structure :"><Button
                                color="secondary">Je n'ai pas encore de compte</Button></a>
                        <h2 id="titre-espace">Vous avez une question ?</h2>
                        <a target='_blank' href="cartoccitanie.tc@gmail.com?subject=Contact professionnel depuis OPTIMIPS"><Button
                            color="secondary">Nous contacter</Button></a>
                        </Card>
                    </Col>
                    </Row>
                </Container>
            </section>
        );
    }
}