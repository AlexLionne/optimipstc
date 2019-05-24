import React from 'react';
import {Card, CardBody, CardTitle, Col, Container, Media, Row,} from 'reactstrap';

import '../../../../css/index.css';
import '../../../../css/container.css'
import header2 from '../../../../assets/images/header2.png';
import deborah from '../../../../assets/images/deborah.PNG'
import jeremie from '../../../../assets/images/jeremie.PNG'
import christophe from '../../../../assets/images/christophe.PNG'

export default class SectionTwo extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <section className={'section'}>
                <Container fluid>
                    <Row className={'equipe-top'}>
                        <Col xs='12' xl='6'>
                            <div className={'media-margin'}>
                                <Media>
                                    <Media left>
                                        <Media object src={deborah} alt="Xavier de Boissezon" className={'img-equipe'}/>
                                    </Media>
                                    <Media body>
                                        <Media heading>
                                            <p className={'equipe-nom'}>
                                                Xavier de Boissezon
                                            </p>
                                        </Media>
                                        <p className={'equipe-texte'}>
                                            Pr, Médecine Physique et de Réadaptation, CHU de
                                            Toulouse
                                        </p>
                                    </Media>
                                </Media>
                            </div>
                            <div className={'media-margin'}>
                                <Media>
                                    <Media left>
                                        <Media object src={deborah} alt="Maëlle Biotteau" className={'img-equipe'}/>
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
                            </div>
                            <div className={'media-margin'}>
                                <Media>
                                    <Media left>
                                        <Media object src={deborah} alt="Alice Julien" className={'img-equipe'}/>
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
                            </div>                            <div className={'media-margin'}>
                            <Media>
                                <Media left>
                                    <Media object src={deborah} alt="Claire Jourdan" className={'img-equipe'}/>
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
                        </div>
                        </Col>
                        <Col xs="12" xl='6'>
                            <div className={'media-margin'}>
                                <Media>
                                    <Media left>
                                        <Media object src={deborah} alt="Déborah Meligne" className={'img-equipe'}/>
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
                            </div>
                            <div className={'media-margin'}>
                                <Media>
                                    <Media left>
                                        <Media object src={jeremie} alt="Jérémie Pariente" className={'img-equipe'}/>
                                    </Media>
                                    <Media body>
                                        <Media heading>
                                            <p className={'equipe-nom'}>
                                                Jérémie Pariente
                                            </p>
                                        </Media>
                                        <p className={'equipe-texte'}>
                                            Pr, Neurologie, CHU de Toulouse
                                        </p>
                                    </Media>
                                </Media>
                            </div>
                            <div className={'media-margin'}>
                                <Media>
                                    <Media left>
                                        <Media object src={christophe} alt="Christophe Arbus" className={'img-equipe'}/>
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
                            </div>
                            <div className={'media-margin'}>
                                <Media>
                                    <Media left>
                                        <Media object src={christophe} alt="Imen Megdiche" className={'img-equipe'}/>
                                    </Media>
                                    <Media body>
                                        <Media heading>
                                            <p className={'equipe-nom'}>
                                                Imen Megdiche
                                            </p>
                                        </Media>
                                        <p className={'equipe-texte'}>
                                            Ph.D, Enseignant-Chercheur, Champollion & IRIT, Albi &
                                            Toulouse
                                        </p>
                                    </Media>
                                </Media>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        );
    }
}