import React from 'react';
import {Col, Container, Row,} from 'reactstrap';
import classes from "../../../../css/index.css";

export default class SectionOne extends React.Component {

    render() {
        return (
            <section className={'section _1'}>
                <Container fluid className={'container-justify'}>
                    <Row className={'row-top row-introduction'}>
                        <Col xs="9" xl="9" className={'testtt'}>
                            <h2 className={'titre'}>
                                Traumatisme Crânien en Occitanie<br/>
                                Que faire et où aller ?</h2>
                            <p>
                                Bienvenue<br/>
                                Dans le cadre d'un projet soutenu par l'Agence Régionale de Santé Occitanie, le projet
                                OPTIMIPS-TC (pour Optimiser le Parcours de Soin du Patients attenit de Traumatisme
                                Cranien) est né en 2018.<br/>
                                Ce site internet présente le réseau Traumatisme Crânien d'Occitanie, ses actualités et
                                vous oriente vers des outils, une cartographie des structures de la région prenant en
                                charge les personnes ayant subies un traumatisme crânien et des documents
                                ressources.<br/>
                                Bonne visite<br/>
                            </p>
                        </Col>
                    </Row>
                </Container>
            </section>
        );
    }
}