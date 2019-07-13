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
                        <div className={'action-responsive'}>
                        <h1 className='titre'>Vous êtes un patient</h1>
                        <p>
                            OptimiPS-TC n’est pas un établissement de santé. Nous ne réalisons pas de soin et ne prenons
                            pas en charge de patients. Nous œuvrons à faciliter le parcours de soin et de vie de
                            patients traumatisés crâniens, quel que soit leurs âges, dans la région Occitanie.
                            <br/><br/>
                            Nous mettons à disposition des patients, familles, usagers, proches et professionnels de
                            santé un ensemble d’outils afin d’organiser une prise en charge de qualité. Vous trouverez
                            sur ce site internet des ressources, des professionnels de santé spécialisés, des conseils,
                            les projets de recherches en cours, etc.
                        </p>
                        <h2 id="titre-espace">Vous avez une question ?</h2>
                        <a target='_blank' href="mailto:cartoccitanie.tc@gmail.com?subject=Contact public depuis OPTIMIPS"><Button
                            color="secondary">Nous contacter</Button></a>
                        </div>
                    </Col>
                    </Row>
                </Container>
            </section>
        );
    }
}