import React from 'react';
import {Button, Card, CardBody, CardTitle, Col, Container, Row,} from 'reactstrap';
import classes from "../../../../css/index.css";
import ChatBotBlock from "../../../ChatBotBlock";
import clinic from "../../../../assets/images/clinic.png";

export default class SectionOne extends React.Component {

    render() {
        return (
            <section className={'section _1'}>
                <Container fluid className={'container-justify'}>
                    <Row className={'row-top row-introduction'}>
                        <Col xs="12" xl="9" className={'testtt'}>
                            <h2 className={'titre'}>
                                Traumatisme Crânien en Occitanie<br/>
                                Que faire et où aller ?</h2>
                        </Col>
                    </Row>
                    <hr/>
                    <Row className="margin-5">
                        <Col xl="6" xs="12">
                        <p className={'titre margin-top-10'}>
                            <strong>Bienvenue</strong>
                        </p>
                            <p className="intro-text">
                            Dans le cadre d'un projet soutenu par l'Agence Régionale de Santé Occitanie, le projet
                            OPTIMIPS-TC (pour Optimiser le Parcours de Soin du Patients atteint de Traumatisme
                            Cranien) est né en 2018.<br/><br/>
                            Ce site internet présente le réseau Traumatisme Crânien d'Occitanie, ses actualités et
                            vous oriente vers des outils, une cartographie des structures de la région prenant en
                            charge les personnes ayant subies un traumatisme crânien et des documents
                            ressources.<br/><br/>
                            <strong>Bonne visite</strong><br/>
                        </p>
                        </Col>
                        <Col xl="6" xs="12" >
                            <Row>
                            <ChatBotBlock/>
                            <Card className={'container-set-bis text-center size-set'}>
                                <CardTitle className={'titre'}>
                                    <a href="/cartographie">
                                    Cartographie
                                    </a>
                                </CardTitle>
                                <CardBody className={"TCL-interface"}>
                                    <a href="/cartographie">
                                    <img src={clinic} className={'img-clinique'}></img>
                                    </a><br/>
                                    Une cartographie des différents établissements de Santé de la région Occitanie liés au traumatisme crânien est mise à votre disposition
                                    <br/>
                                    <Button className={'button-interface'} color="link" href="/cartographie">
                                        Accéder à la cartographie.
                                    </Button><br/>
                                </CardBody>
                            </Card>
                            </Row>
                        </Col>
                    </Row>
                    <hr/>
                </Container>
            </section>
        );
    }
}