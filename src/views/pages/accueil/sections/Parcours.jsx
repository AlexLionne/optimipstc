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
    "id": "accident",
    "common_child": null,
    "size": 100,
    "color": null,
    "text": null,
    "illustration": null,
    "children": [{
        "name": "Samu",
        "id": "samu",
        "common_child": null,
        "size": 80,
        "color": "#9575CD",
        "text": "Service d’Aide Médicale Urgente. C’est un centre d’appel ouvert 24h/24 qui oriente les patients en fonction de la situation. En cas d’urgence vitale il fait intervenir le SMUR (=structure mobile d’urgence et de réanimation) sur les lieux de l’accident pour assurer les premiers soins et le transport vers un centre hospitalier.",
        "children": [
            {
                "name": "Urgences",
                "id": "urgences",
                "common_child": "child_one",
                "size": 100,
                "color": "#F06292",
                "text": "Service d’Aide Médicale Urgente. C’est un centre d’appel ouvert 24h/24 qui oriente les patients en fonction de la situation. En cas d’urgence vitale il fait intervenir le SMUR (=structure mobile d’urgence et de réanimation) sur les lieux de l’accident pour assurer les premiers soins et le transport vers un centre hospitalier.",
                "children": [
                    {
                        "name": " ",
                        "id": "child_one",
                        "common_child": null,
                        "size": 150,
                        "color": null,
                        "text": null,
                        "children": [
                            {
                                "name": "Neurochirurgie",
                                "id": "neurochirurgie",
                                "common_child": "child_two",
                                "size": 150,
                                "color": "#4DB6AC",
                                "text": "Service hospitalier qui assure la prise en charge des venues non programmées, 24h/24. Situé dans un établissement de santé public ou privé. Le patient peut se présenter de lui-même ou être amené par une ambulance, les pompiers ou le SMUR.\n" +
                                    "Service spécialisé dans les pathologies du cerveau et du système nerveux qui nécessitent ou pourraient nécessiter d’être opéré. Les neurochirurgiens connaissent bien la pathologie du traumatisme crânien. Une hospitalisation en neurochirurgie est parfois nécessaire même si le patient n’a pas été opéré. \n",
                            },

                            {
                                "name": "Chirurgie orthopédique",
                                "id": "chirortho",
                                "common_child": "child_two",
                                "size": 200,
                                "color": "#4DB6AC",
                                "text": "Service spécialisé dans les pathologies de l’appareil loco-moteur. On y est souvent hospitalisé après l’opération d’une fracture, d’une lésion d’un tendon ou d’un muscle, de la mise en place d’une prothèse.",
                                "children": [
                                    {
                                        "name": " ",
                                        "id": "child_two",
                                        "common_child": "mpr",
                                        "size": 150,
                                        "color": null,
                                        "text": null,
                                        "children": [
                                            {
                                                "name": "Domicile",
                                                "id": "domicile",
                                                "common_child": null,
                                                "size": 100,
                                                "color": "#FF8A65",
                                                "text": "Lieu de vie du patient",
                                            },
                                            {
                                                "name": "Unité Eveil",
                                                "id": "uniteeveil",
                                                "common_child": null,
                                                "size": 120,
                                                "color": "#FF8A65",
                                                "text": "Service qui accueille les patients en phase d’éveil. Il s’agit souvent de traumatisés crâniens sévères qui ont vécus un long séjour en réanimation, qui sont maintenant plus stables sur le plan vital, mais restent en état de conscience altérée. Les complications médicales et les décès restent fréquents à ce stade. L’objectif du service est d’apporter un environnement propice à l’éveil, avec des stimulations visuelles (photos par exemple), auditives (voix des proches, musique), présence de l’entourage, etc… \n" +
                                                    "Si le patient récupère un état de conscience suffisant il rejoindra un service de rééducation.\n" +
                                                    "Si le patient ne se réveille pas ou que son niveau de conscience reste altéré, l’orientation vers une Unité EVC-EPR (Etat Végétatif Chronique- Etat Pauci Relationnel) se discutera. \n",
                                            },
                                            {
                                                "name": "Service de Rééducation",
                                                "id": "servicedereeducation",
                                                "common_child": null,
                                                "size": 220,
                                                "color": "#FF8A65",
                                                "text": "Service spécialisé qui prend en charge la rééducation et la réadaptation des patients. Une équipe pluridisciplinaire coordonne le programme de rééducation, fixe des objectifs et prépare un projet de réinsertion avec le patient et son entourage. Dans un service de MPR neurologique l’équipe est habituellement composée de kinésithérapeute, orthophoniste, assistante sociale, ergothérapeute, psychomotricien, psychologue, neuropsychologue, médecin rééducateur.\n" +
                                                    "Un service de MPR peut être spécialisé en pathologie neurologique, ou loco-motrice ou être polyvalent.\n",
                                            }]
                                    }],
                            },
                            {
                                "name": "Neurologie",
                                "id": "neurologie",
                                "common_child": "child_two",
                                "size": 150,
                                "color": "#4DB6AC",
                                "text": "Service spécialisé dans les pathologies du cerveau et du système nerveux. Certains services de neurologie sont spécialisés dans un domaine comme l’épilepsie, l’AVC, les troubles cognitif, etc.",
                            },
                        ]
                    }]
            },
            {
                "name": "Réanimation",
                "id": "reanimation",
                "common_child": "child_one",
                "size": 120,
                "color": "#F06292",
                "text": "Service spécialisé où sont hospitalisés les patients les plus graves. Les patients sont admis en réanimation s’ils présentent une défaillance d’une fonction vitale comme par exemple un coma, un choc septique, un polytraumatisme, ou après un arrêt cardiaque. Dans certains hôpitaux il existe des services de « réanimation neurochirurgicale » qui sont spécialisés dans la prise en charge des traumatisés crâniens graves.",
                "children": [
                    {
                        "name": " ",
                        "id": "null",
                        "common_child": null,
                        "color": null,
                        "text": null,
                        "children": [
                            {
                                "name": "SRPR",
                                "id": "srpr",
                                "common_child": "child_two",
                                "size": 80,
                                "color": "#4DB6AC",
                                "text": "Service de Rééducation Post Réanimation\n" +
                                    "Service qui accueille les patients au décours d’un séjour en réanimation, quand la rééducation peut être débutée mais que les soins médicaux sont encore lourds, complexes et nécessitent une surveillance continue. En Occitanie il n’existe qu’une unité de 6 lits à Toulouse.\n",
                            }]
                    }]
            },
        ]
    },
    ],
};

const parcours_soins_enfant = {
    "name": "Accident",
    "id": "accident",
    "common_child": null,
    "size": 100,
    "color": null,
    "text": null,
    "illustration": null,
    "children": [{
        "name": "Samu",
        "id": "samu",
        "common_child": null,
        "size": 80,
        "color": "#9575CD",
        "text": "Service d’Aide Médicale Urgente. C’est un centre d’appel ouvert 24h/24 qui oriente les patients en fonction de la situation. En cas d’urgence vitale il fait intervenir le SMUR (=structure mobile d’urgence et de réanimation) sur les lieux de l’accident pour assurer les premiers soins et le transport vers un centre hospitalier.",
        "children": [
            {
                "name": "Urgences",
                "id": "urgences",
                "common_child": "child_one",
                "size": 100,
                "color": "#F06292",
                "text": "Service hospitalier qui assure la prise en charge des venues non programmées, 24h/24. Situé dans un établissement de santé public ou privé. Le patient peut se présenter de lui-même ou être amené par une ambulance, les pompiers ou le SMUR.",
                "children": [
                    {
                        "name": " ",
                        "id": "child_one",
                        "common_child": null,
                        "size": 150,
                        "color": null,
                        "text": null,
                        "children": [
                            {
                                "name": "Neurochirurgie",
                                "id": "neurochirurgie",
                                "common_child": "child_two",
                                "size": 150,
                                "color": "#4DB6AC",
                                "text": "Service hospitalier qui assure la prise en charge des venues non programmées, 24h/24. Situé dans un établissement de santé public ou privé. Le patient peut se présenter de lui-même ou être amené par une ambulance, les pompiers ou le SMUR.\n" +
                                    "Service spécialisé dans les pathologies du cerveau et du système nerveux qui nécessitent ou pourraient nécessiter d’être opéré. Les neurochirurgiens connaissent bien la pathologie du traumatisme crânien. Une hospitalisation en neurochirurgie est parfois nécessaire même si le patient n’a pas été opéré. \n",
                            },

                            {
                                "name": "Chirurgie orthopédique",
                                "id": "chirortho",
                                "common_child": "child_two",
                                "size": 200,
                                "color": "#4DB6AC",
                                "text": "Service spécialisé dans les pathologies de l’appareil loco-moteur. On y est souvent hospitalisé après l’opération d’une fracture, d’une lésion d’un tendon ou d’un muscle, de la mise en place d’une prothèse.",
                                "children": [
                                    {
                                        "name": " ",
                                        "id": "child_two",
                                        "common_child": "mpr",
                                        "size": 150,
                                        "color": null,
                                        "text": null,
                                        "children": [
                                            {
                                                "name": "Domicile",
                                                "id": "domicile",
                                                "common_child": null,
                                                "size": 100,
                                                "color": "#FF8A65",
                                                "text": "Lieu de vie du patient",
                                            },
                                            {
                                                "name": "Unité Eveil",
                                                "id": "uniteeveil",
                                                "common_child": null,
                                                "size": 120,
                                                "color": "#FF8A65",
                                                "text": "Service qui accueille les patients en phase d’éveil. Il s’agit souvent de traumatisés crâniens sévères qui ont vécus un long séjour en réanimation, qui sont maintenant plus stables sur le plan vital, mais restent en état de conscience altérée. Les complications médicales et les décès restent fréquents à ce stade. L’objectif du service est d’apporter un environnement propice à l’éveil, avec des stimulations visuelles (photos par exemple), auditives (voix des proches, musique), présence de l’entourage, etc… \n" +
                                                    "Si le patient récupère un état de conscience suffisant il rejoindra un service de rééducation.\n" +
                                                    "Si le patient ne se réveille pas ou que son niveau de conscience reste altéré, l’orientation vers une Unité EVC-EPR (Etat Végétatif Chronique- Etat Pauci Relationnel) se discutera. \n",
                                            },
                                            {
                                                "name": "Service de Rééducation",
                                                "id": "servicedereeducation",
                                                "common_child": null,
                                                "size": 220,
                                                "color": "#FF8A65",
                                                "text": "Service spécialisé qui prend en charge la rééducation et la réadaptation des patients. Une équipe pluridisciplinaire coordonne le programme de rééducation, fixe des objectifs et prépare un projet de réinsertion avec le patient et son entourage. Dans un service de MPR neurologique l’équipe est habituellement composée de kinésithérapeute, orthophoniste, assistante sociale, ergothérapeute, psychomotricien, psychologue, neuropsychologue, médecin rééducateur.\n" +
                                                    "Un service de MPR peut être spécialisé en pathologie neurologique, ou loco-motrice ou être polyvalent.\n",
                                            }]
                                    }],
                            },
                            {
                                "name": "Neurologie",
                                "id": "neurologie",
                                "common_child": "child_two",
                                "size": 150,
                                "color": "#4DB6AC",
                                "text": "Service spécialisé dans les pathologies du cerveau et du système nerveux. Certains services de neurologie sont spécialisés dans un domaine comme l’épilepsie, l’AVC, les troubles cognitif, etc.",
                            },
                            {
                                "name": "Pédiatrie",
                                "id": "pediatrie",
                                "common_child": "child_two",
                                "color": "#4DB6AC",
                                "text": "Service prenant en charge les enfants et les adolescents",
                                "size": 150,
                            },
                        ]
                    }]
            },
            {
                "name": "Réanimation",
                "id": "reanimation",
                "common_child": "child_one",
                "size": 120,
                "color": "#F06292",
                "text": "Service spécialisé où sont hospitalisés les patients les plus graves. Les patients sont admis en réanimation s’ils présentent une défaillance d’une fonction vitale comme par exemple un coma, un choc septique, un polytraumatisme, ou après un arrêt cardiaque. Dans certains hôpitaux il existe des services de « réanimation neurochirurgicale » qui sont spécialisés dans la prise en charge des traumatisés crâniens graves.",
                "children": [
                    {
                        "name": " ",
                        "id": "null",
                        "common_child": null,
                        "color": null,
                        "text": null,
                        "children": [
                            {
                                "name": "SRPR",
                                "id": "srpr",
                                "common_child": "child_two",
                                "size": 80,
                                "color": "#4DB6AC",
                                "text": "Service de Rééducation Post Réanimation\n" +
                                    "Service qui accueille les patients au décours d’un séjour en réanimation, quand la rééducation peut être débutée mais que les soins médicaux sont encore lourds, complexes et nécessitent une surveillance continue. En Occitanie il n’existe qu’une unité de 6 lits à Toulouse.\n",
                            }]
                    }]
            },
        ]
    },
    ],
};

const options = {
    backgroundColor: colors.colorPrimaryDark,
    lineColor: colors.white,
    lineHeight: 4,
    textColor: colors.white,
    textSize: 18
};

export default class Parcours extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isAdult: true};
    }


    render() {
        return (
            <section className={'section'}>
                <Container>
                    <Row>
                        <Col xs="12" className={'container-set'}>
                            <h2 className={'titre'}>
                                Prise en charge initiale</h2>
                            <p>
                                Dans le cas d'un traumatisme crânien modéré ou sévère, la parcours de soins varie en fonction de la gravité, des individus et du lieu de prise en charge.<br/>
                                Vous pourrez retrouver les différentes étapes parcourues dans la prise en charge initiale, avec des informations supplémentaires pour certaines d'entre-elles en cliquant sur la case correspondante.<br/>
                            </p>
                        </Col>
                    </Row>
                    <Switch>
                        <Route path="/accueil/sections/Parcours/parcoursenfantpec"
                               render={() => <Chart schema={parcours_soins_enfant} options={options}/>}/>
                        <Route path="/accueil/sections/Parcours/parcoursadultepec"
                               render={() => <Chart schema={parcours_soins} options={options}/>}/>
                    </Switch>
                </Container>
            </section>
        );
    }


}