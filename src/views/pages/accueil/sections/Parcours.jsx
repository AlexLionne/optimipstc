import React from 'react';
import {
    Card, CardBody, CardSubtitle, CardText, CardTitle,
    Col,
    Container, FormGroup, Input, Label, Row,
} from 'reactstrap';
import BarGraph from "../../../parcoursSoins";
import { withParentSize } from '@vx/responsive';
import colors from '../../../../css/colors'
import styles from '../../../../css/styles';

let Chart = withParentSize(BarGraph);

const parcours_soins = {
    "name": "Accident",
    "id":"accident",
    "common_child":null,
    "size":100,
    "color":null,
    "text":null,
    "illustration":null,
    "children": [{
        "name": "Samu",
        "id":"samu",
        "common_child":null,
        "size":80,
        "color":"#9575CD",
        "text":"Texte descriptif Samu",
        "children": [
            {   "name": "Urgences",
                "id":"urgences",
                "common_child":"child_one",
                "size":100,
                "color":"#F06292",
                "text":"Texte descriptif Urgences",
                "children": [
                    {   "name": " ",
                        "id":"child_one",
                        "common_child":null,
                        "size":150,
                        "color":null,
                        "text":null,
                        "children": [
                            {   "name": "Neurochirurgie",
                                "id":"neurochirurgie",
                                "common_child":"child_two",
                                "size":150,
                                "color":"#4DB6AC",
                                "text":"Texte descriptif Neurochirurgie",
                            },

                            {   "name": "Chir Ortho",
                                "id":"chirortho",
                                "common_child":"child_two",
                                "size":150,
                                "color":"#4DB6AC",
                                "text":"Texte descriptif Chir Ortho",
                                "children": [
                                    {   "name": " ",
                                        "id":"child_two",
                                        "common_child":"mpr",
                                        "size":150,
                                        "color":null,
                                        "text":null,
                                        "children": [
                                            {   "name": "Domicile",
                                                "id":"domicile",
                                                "common_child":null,
                                                "size":100,
                                                "color":"#FF8A65",
                                                "text":"Texte descriptif Domicile",
                                            },
                                            {   "name": "Unité Eveil",
                                                "id":"uniteeveil",
                                                "common_child":null,
                                                "size":120,
                                                "color":"#FF8A65",
                                                "text":"Texte descriptif Unité Eveil",
                                            },
                                            {   "name": "Service de Rééducation",
                                                "id":"servicedereeducation",
                                                "common_child":null,
                                                "size":220,
                                                "color":"#FF8A65",
                                                "text":"Texte descriptif Service de Rééducation",
                                            }]
                                    }],
                            },
                            {   "name": "Neurologie",
                                "id":"neurologie",
                                "common_child":"child_two",
                                "size":150,
                                "color":"#4DB6AC",
                                "text":"Texte descriptif Neurologie",
                            },
                            {   "name": "Pédiatrie",
                                "id":"pediatrie",
                                "common_child":"child_two",
                                "color":"#4DB6AC",
                                "text":"Texte descriptif Pédiatrie",
                                "size":150,
                                "visible":{
                                    "age":"Enfant"
                                }
                            },
                        ]
                    }]
            },
            {   "name": "Réanimation",
                "id":"reanimation",
                "common_child":"child_one",
                "size":120,
                "color":"#F06292",
                "text":"Texte descriptif Réanimation",
                "children": [
                    {   "name": " ",
                        "id":"null",
                        "common_child":null,
                        "color":null,
                        "text":null,
                        "children": [
                            {   "name": "SRPR",
                                "id":"srpr",
                                "common_child":"child_two",
                                "size":80,
                                "color":"#4DB6AC",
                                "text":"Texte descriptif SRPR",
                            }]
                    }]
            },
        ]},
    ],
};

const options = {
    backgroundColor:colors.colorPrimaryDark,
    lineColor:colors.colorPrimary,
    lineHeight:4,
    textColor:colors.white,
    textSize:18
};



export default class Parcours extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            age: 'Adulte'
        }
    }
    handleChange = (event) => {
        this.setState({ age: event.target.value })
    };

    render() {
        return (
            <section>
                <Container style={styles.container}>
                    <Row>
                        <Col xs="12">
                            <h2 style={styles.section_titre}>
                                Parcours de soins</h2>
                        </Col>
                    </Row>
                    <Chart schema={parcours_soins} options={options}/>
                    <Card style={styles.ps_options}>
                        <CardBody>
                            <CardTitle style={styles.bold}>Options</CardTitle>
                                <FormGroup>
                                    <Label for="select">Age</Label>
                                    <Input onChange={this.handleChange} type="select" name="select" id="select">
                                        <option>Adulte</option>
                                        <option>Enfant</option>
                                    </Input>
                                </FormGroup>

                        </CardBody>
                    </Card>
                </Container>
            </section>
        );
    }
}