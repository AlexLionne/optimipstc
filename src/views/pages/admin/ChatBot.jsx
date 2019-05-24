import React from "react";
import '../../../css/index.css'
import {
    Card,
    CardBody,
    CardText,
    CardTitle,
    Col,
    Container,
    FormGroup,
    Input,
    ListGroup,
    ListGroupItem,
    Row,
} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSave} from "@fortawesome/free-solid-svg-icons";


const questions = [
    {
        text: "Je peux recueillir vos questions afin de vous accompagner au mieux",
        actions: [
            {text: "COMMENCER", link: 1},
        ],
        links: []
    },
    {
        text: "Vous, un de vos proches ou votre patient avez été victime d’un traumatisme cranien léger ? ",
        actions: [
            {text: "OUI", link: 2},
            {text: "NON", link: 2},
        ],
        links: []
    },
    {
        text: "S’agit-il d’un enfant ou d’un adulte ?",
        actions: [
            {text: "ENFANT", link: 3},
            {text: "ADULTE", link: 3},
        ],
        links: [{
            text: "Le traumatisme léger",
            href: "/traumas_cranniens"
        }]
    },
    {
        text: "Êtes vous professionnel de santé ou patient/famille ?",
        actions: [
            {text: "PROFESSIONEL", link: 3},
            {text: "PATIENT/FAMILLE", link: 3},
        ],
        links: [{
            text: "Trauma cranien léger ",
            href: "/traumas_cranniens"
        },
            {
                text: "Trauma cranien sévère",
                href: "/traumas_cranniens"
            }]
    }
];

class Notifications extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: true,
        };
    }


    render() {
        return (
            <div className={'root root_fixed_nav'}>

                <Container className={'container'}>
                    <Row>
                        <Col xs="12">
                            <Card className={'card'}>
                                <CardBody>
                                    <CardTitle style={{
                                        width: 'auto',
                                        fontWeight: 'bold',
                                        color: '#000',
                                        display: 'inline-block'
                                    }} className={'titre'}>Questions</CardTitle>
                                    <FontAwesomeIcon style={{display: 'inline-block', float: 'right'}} color={"#000"}
                                                     icon={faSave}/>

                                    <CardText>
                                        <ListGroup flush>
                                            {questions.map((question, i) => {
                                                return (
                                                    <ListGroupItem>
                                                        {i === 0 ? <h4>Introduction</h4> : <h4>Question {i}</h4>}
                                                        <Input value={question.text}/>
                                                        <h4>Actions</h4>
                                                        <FormGroup>
                                                            <Input type="select" name="select" id="exampleSelect">
                                                                {
                                                                    question.actions.map((action, a) => {
                                                                        return (<option>{action.link}</option>)
                                                                    })
                                                                }

                                                            </Input>
                                                        </FormGroup>
                                                        <h4>Liens</h4>
                                                    </ListGroupItem>
                                                )
                                            })}
                                        </ListGroup>
                                    </CardText>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>


            </div>

        )
    }
}

export default Notifications;