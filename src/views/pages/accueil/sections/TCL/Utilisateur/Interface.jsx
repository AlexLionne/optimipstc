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

import '../../../../../../css/index.css';
import '../../../../../../css/container.css'
import header2 from '../../../../../../assets/images/header2.png';
import child from '../../../../../../assets/images/child.png'
import doctor from '../../../../../../assets/images/doctor.png'

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
                        <Col xs="12" xl="4">
                            <Card className={'container-set-interface text-center'}>
                                <CardTitle className={'titre'}>
                                    Vous êtes un <br/>professionnel
                                </CardTitle>
                                <CardBody className={"TCL-interface"}>
                                    <img src={doctor} className={'img-avatar'}></img><br/>
                                    <Button className={'button-interface'} color="link" href="/accueil/sections/TCL/Professionnel/EnfantPro">Traumatisme
                                        crânien léger chez l'enfant.</Button><br/>
                                    <Button className={'button-interface'} color="link" href="/accueil/sections/TCL/Professionnel/AdultPro">Traumatisme
                                        crânien léger chez l'adulte.</Button>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col xs="12" xl="4">
                            <Card className={'container-set-interface text-center'}>
                                <CardTitle className={'titre'}>
                                    Vous êtes un <br/>particulier
                                </CardTitle>
                                <CardBody className={"TCL-interface"}>
                                    <img src={child} className={'img-avatar'}></img><br/>
                                    <Button className={'button-interface'} color="link" href="/accueil/sections/TCL/Utilisateur/Enfant">Traumatisme
                                        crânien léger chez l'enfant.</Button><br/>
                                    <Button className={'button-interface'} color="link" href="/accueil/sections/TCL/Utilisateur/Adult">Traumatisme
                                        crânien léger chez l'adulte.</Button>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>
        );
    }
}