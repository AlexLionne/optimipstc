import React from 'react';
import {Card, CardBody, CardTitle, Col, Container, FormGroup, Input, Label, Row,} from 'reactstrap';
import BarGraph from "../../../parcoursSoins";
import {withParentSize} from '@vx/responsive';
import colors from '../../../../css/colors'
import styles from '../../../../css/styles';
import {Route, Switch} from "react-router-dom";

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

                            {   "name": "Chirurgie orthopédique",
                                "id":"chirortho",
                                "common_child":"child_two",
                                "size":200,
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

const parcours_soins_enfant = {
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

                            {   "name": "Chirurgie orthopédique",
                                "id":"chirortho",
                                "common_child":"child_two",
                                "size":200,
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
    this.state = {isAdult: true};
}


    render() {
        return (
            <section className={'section grandtexte'}>
                <Container>
                    <Row className={'row-top-5'}>
                        <Col xs="12">
                            <h2 className={'titre'}>
                                Prise en charge initiale</h2>
                            <p>
                                Dans le cas d'un traumatisme crânien modéré ou sévère, la parcours de soins varie en fonction de la gravité, des individus et du lieu de prise en charge.<br/>
                                Vous pourrez retrouver les différentes étapes parcourues dans la prise en charge initiale, avec des informations supplémentaires pour certaines d'entre-elles en cliquant sur la case correspondante.<br/>
                            </p>
                        </Col>
                    </Row>
                    <Switch>
                        <Route path="/accueil/sections/Parcours/parcoursenfant" render={() => <Chart schema={parcours_soins_enfant} options={options}/>}/>
                        <Route path="/accueil/sections/Parcours/parcoursadulte" render={() => <Chart schema={parcours_soins} options={options}/>}/>
                    </Switch>
                </Container>
            </section>
        );
    }


}