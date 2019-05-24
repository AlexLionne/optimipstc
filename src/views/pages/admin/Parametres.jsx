import React from "react";
import '../../../css/index.css'
import {
    Button,
    Card,
    CardBody,
    CardText,
    CardTitle,
    Col,
    Form,
    FormGroup,
    Input,
    Label,
    ListGroup,
    ListGroupItem,
    Modal,
    Spinner
} from "reactstrap";
import firebase from '../../../firebase'
import {faTimes} from "@fortawesome/free-solid-svg-icons/index";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome/index.es";
import {reactLocalStorage} from 'reactjs-localstorage';
import Notification from "../../Notification";


class Parametres extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            uid: props.uid,
            isNewEmailOpen: false,
            email: null,
            loading_email: false,
            error: false,
            validation: false,
        };

    }

    handleInputChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    };

    updateUserEmail = () => {
        let email = this.state.email.toString();
        let ctx = this;
        let user = firebase.auth().currentUser;
        this.setState({loading_login: true});
        user.updateEmail(email).then(function () {
            ctx.setState({loading_login: false});
            ctx.setState({isNewEmailOpen: !ctx.state.isNewEmailOpen});
            ctx.setState({validation: true});
        }).catch(function (error) {
            ctx.setState({error: true});
            ctx.setState({loading_login: false});
        });

    };
    openEmail = () => {
        this.setState({
            isNewEmailOpen: !this.state.isNewEmailOpen
        });
    };
    unRegisterSession = () => {
        let uid = firebase.auth().currentUser.uid;
        firebase.database().ref('sessions/' + uid).remove();
        reactLocalStorage.remove('uid');
    };
    logout = () => {
        this.unRegisterSession();
        window.location.href = '/';
    };


    render() {
        return (

            <div className={'root container root_fixed_nav'}>
                {this.state.validation ?
                    <Notification verbose={'warning'} message={'Vous allez être déconnecté'} action={this.logout}/>
                    : null}
                <Card className={'card'}>
                    <CardBody>
                        <CardTitle style={{width: 'auto', fontWeight: 'bold', color: '#000', display: 'inline-block'}}
                                   className={'titre'}>Général</CardTitle>
                        <CardText>
                            <ListGroup flush>
                                <ListGroupItem className={'link_primary'} href="#">Changer de mot de
                                    passe</ListGroupItem>
                                <ListGroupItem className={'link_primary'} href="#" onClick={this.openEmail}>Changer
                                    d'email</ListGroupItem>
                                <ListGroupItem className={'link_primary'} href="#">Afficher les paramètres de
                                    confidentialité</ListGroupItem>
                            </ListGroup>
                        </CardText>
                    </CardBody>
                </Card>

                <Modal className={'login_modal'} isOpen={this.state.isNewEmailOpen} fade={false}>
                    <CardBody>
                        <CardTitle style={{width: 'auto', fontWeight: 'bold', color: '#000', display: 'inline-block'}}>Changement
                            d'email</CardTitle>
                        <FontAwesomeIcon color={"#000"} style={{float: 'right', display: 'inline-block'}}
                                         onClick={this.openEmail} icon={faTimes}/>
                        <CardText>
                            <Form>
                                {this.state.error ?
                                    <h5 className={'error'}>Verifiez votre email ou réessayer</h5>
                                    :
                                    null
                                }
                                <h6 style={{marginBottom: '24px'}}>Changez votre email, un email confirmant la
                                    modification vous sera envoyé sur votre ancien mail.</h6>
                                <FormGroup row>
                                    <Label for="email" sm={2}>Email</Label>
                                    {this.state.error ?
                                        <Col sm={10}>
                                            <Input invalid/>
                                        </Col>
                                        :
                                        <Col sm={10}>
                                            <Input type="email" name="email" onChange={this.handleInputChange}
                                                   id="email" placeholder="Votre nouveau email"/>
                                        </Col>
                                    }
                                </FormGroup>
                                {this.state.loading_email ?
                                    <Spinner className={'spinner_login'}/> :
                                    <Button onClick={this.updateUserEmail} className={'buttonPrimary'}>Envoyer</Button>}
                            </Form>
                        </CardText>
                    </CardBody>
                </Modal>
            </div>

        )
    }
}

export default Parametres;