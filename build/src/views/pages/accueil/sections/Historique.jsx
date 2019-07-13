import React from 'react';
import {Card, CardBody, CardTitle, Col, Container, Row,} from 'reactstrap';

import '../../../../css/index.css';
import '../../../../css/container.css'
import header2 from '../../../../assets/images/header2.png';

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
            <section className={'section'}>
                <img style={{position: 'absolute', top: 0, bottom: 0, right: 0, margin: 'auto'}} height={'100%'}
                     width={'auto'} src={header2}/>
                <Container fluid>
                    <Row>
                        <Col xs="12" xl="9">
                            <div className={'row-equipe'}>
                                <Card className={'container-set'}>
                                    <CardTitle className={'titre'}>
                                        Historique
                                    </CardTitle>
                                    <CardBody>
                                        OPTIMIPS-TC (pour Optimiser le Parcours de Soin du Patient Traumatisé Crânien)
                                        est né début 2017 et vise à mieux organiser le parcours de soins des patients
                                        traumatisés crâniens. Pour cela, nous sommes amenés à utiliser les données de
                                        santé qui ont servi à soigner les patients afin de (1) reconstruire les parcours
                                        de soins à postériori (diagnostic de l’existant), (2) les rendre lisibles et
                                        compréhensibles, et (3) identifier des pistes d’amélioration. Nous réunissons
                                        pour ce faire cliniciens, chercheurs et enseignants autour d'une préoccupation
                                        commune : la qualité de vie et de soins des patients présentant des traumatismes
                                        crâniens, de l'enfance à l'âge adulte. De façon transdisciplinaire, de la
                                        cognition à l'imagerie, de l'ergonomie au droit des personnes, notre travail
                                        vise au développement d’une médecine de qualité, respectueuse de ses usagers et
                                        soucieuse de l’évolution des textes de lois, également mue par la question de
                                        plus en plus prégnante de l’usage de la technologie au service de l’humain.
                                        <br/><br/>
                                        Le projet est réalisé dans le cadre de la Fédération Hospitalo-Universitaire
                                        (FHU) des Handicaps Cognitifs, Psychiques et Sensoriels (HoPeS) et l’Institut
                                        des Handicaps Neurologiques, Psychiatriques et Sensoriels (IHNPS) du CHU de
                                        Toulouse. L’IHNPS regroupe les forces de soin, recherche et enseignement des
                                        différents pôles médicaux et médico-techniques du CHU de Toulouse autour de la
                                        thématique commune des handicaps invisibles. Coordonnée par les Professeurs
                                        Christophe Arbus (Psychiatrie et Psychologie Médicale) et Jérémie Pariente
                                        (Neurologie cognitive et Neuropsychologie), la FHU HoPeS englobe les différentes
                                        disciplines qui touchent à la thématique des handicaps dans le cadre de
                                        pathologies chroniques dans le champ des maladies neurologiques, psychiatriques
                                        et sensorielles.<br/><br/> Son but : fédérer les expertises complémentaires, optimiser la
                                        lisibilité et la visibilité de la recherche et renforcer les synergies entre
                                        soin, enseignement et recherche. Sa création repose sur une base d'interactions
                                        fortes entre ces différentes disciplines. Une perspective originale « tout au
                                        long de la vie » a été choisie afin de proposer une vision globale de l'enfance
                                        à l'âge adulte et 3 axes thématiques ont été identifiés : 1) Dépistage,
                                        diagnostic et interventions précoces ; 2) Suivi et évaluation tout au long de la
                                        vie ; 3) Prévention, remédiation et réadaptation. Notre projet entre dans ces
                                        prérogatives et y est accueilli, développé et soutenu solidement.
                                    </CardBody>
                                </Card>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        );
    }
}