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
import child from '../../../../../assets/images/child.png'
import woman from '../../../../../assets/images/woman.png'

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
                    <Row className={'justify-content-start'}>
                        <Col xs="9" xl="4" className={'no-gutter'}>
                            <Card className={'container-set reposition text-center'}>
                                <CardTitle className={'titre'}>
                                    Vous êtes un adulte ?
                                </CardTitle>
                                <CardBody className={"TCL-interface"}>
                                    <img src={woman} className={'img-avatar'}></img><br/>
                                    <Button className={'button-interface'} color="link" href="/accueil/sections/parcours/parcoursadulte">Traumatisme
                                        crânien modéré ou sévère chez l'adulte.</Button>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col xs="9" xl="4">
                            <Card className={'container-set reposition text-center'}>
                                <CardTitle className={'titre'}>
                                    Vous êtes un enfant ?
                                </CardTitle>
                                <CardBody className={"TCL-interface"}>
                                    <img src={child} className={'img-avatar'}></img><br/>
                                    <Button className={'button-interface'} color="link" href="/accueil/sections/parcours/parcoursenfantinterface">Traumatisme
                                        crânien modéré ou sévère chez l'enfant.</Button><br/>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>
        );
    }
}