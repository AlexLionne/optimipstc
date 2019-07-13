import React from 'react';
import {
    Card,
    CardBody,
    Button,
    CardTitle,
    Col,
    Container,
    Row,
} from 'reactstrap';

import '../../../../../css/index.css';
import '../../../../../css/container.css'
import header2 from '../../../../../assets/images/header2.png';
import house from '../../../../../assets/images/house.png'
import pec from '../../../../../assets/images/prise_en_charge.png'
import doctor from "../../../../../assets/images/doctor.png";
import child from "../../../../../assets/images/child.png";

export default class SectionTwo extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <section className={'section'}>
                <img style={{position: 'absolute', top: 0, bottom: 0, right: 0, margin: 'auto'}} height={'100%'}
                     width={'auto'} src={header2}/>
                <Container fluid>
                    <Row className={'row-equipe '}>
                        <Col xs="12" xl="6">
                            <Card className={'container-set-interface text-center'}>
                                <CardTitle className={'titre'}>
                                    <a href="/accueil/sections/Parcours/ParcoursAdultePEC">
                                    Prise en charge <br/>initiale
                                    </a>
                                </CardTitle>
                                <CardBody className={"TCL-interface"}>
                                    <img src={pec} className={'img-avatar-ms'}></img><br/>
                                    Dans le cas d'un traumatisme crânien modéré ou sévère, le parcours de soins varie en fonction de la gravité, des individus et du lieu de prise en charge.
                                    Vous pourrez retrouver ici les différentes étapes parcourues dans la prise en charge initiale, avec des informations supplémentaires pour certaines d'entre-elles en cliquant sur la case correspondante.
                                    <br/><br/>
                                    <Button className={'button-interface'} color="link" href="/accueil/sections/Parcours/ParcoursAdultePEC">
                                        Accéder au contenu
                                    </Button><br/>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col xs="12" xl="6">
                            <Card className={'container-set-interface text-center'}>
                                <CardTitle className={'titre'}>
                                    <a href="/accueil/sections/Parcours/ParcoursAdulteMed">
                                        Parcours Médical et <br/>Parcours de Vie
                                    </a>
                                </CardTitle>
                                <CardBody className={"TCL-interface"}>
                                    <img src={house} className={'img-avatar-ms'}></img><br/>
                                    À l'issue de la prise en charge initiale, même si le patient est stabilisé, le suivi médical et la prise en charge rééducative nécessitent d'être poursuivis. En parallèle, un parcours de vie se met en place.
                                    Les dispositifs d'aide sont nombreux et il n'est pas toujours facile de s'y retrouver.
                                    Nous vous présentons ici les principales personnes, dispositifs et structures dont vous pouvez avoir besoin.
                                    Des informations supplémentaires apparaissent en cliquant sur la case correspondante
                                    <br/>
                                    <Button className={'button-interface'} color="link" href="/accueil/sections/Parcours/ParcoursAdulteMed">
                                        Accéder au contenu
                                    </Button><br/>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>
        );
    }
}