import React from 'react';
import {Button, Card, CardBody, CardText, CardTitle, Col, Form, FormGroup, Input, Label, Spinner} from "reactstrap";


class Login extends React.Component{


    constructor(props){
        super(props);

        this.state={
            error:null
        };
    }

    render(){
        return (
            <div className={'login'} >
                <CardBody>
                    <CardTitle style={{
                        width: 'auto',
                        fontWeight: 'bold',
                        color: '#000',
                        display: 'inline-block'
                    }}>Connexion</CardTitle>
                    <CardText>
                        <Form>
                            {this.state.error !== null ?
                                <h5 className={'error'}>L'email ou le mot de passe est incorrect</h5>
                                :
                                null
                            }
                            <FormGroup row>
                                {this.state.error !== null ?
                                    <Col sm={10}>
                                        <Input invalid/>
                                    </Col>
                                    :
                                    <Col sm={10}>
                                        <Input key="editor1" type="email" name="email" onChange={this.props.handleInputChange}
                                               id="email"  placeholder="Votre email"/>
                                    </Col>
                                }
                            </FormGroup>
                            <FormGroup row>
                                {this.state.error !== null ?
                                    <Col sm={10}>
                                        <Input type="password" invalid/>
                                    </Col>
                                    :
                                    <Col sm={10}>
                                        <Input key="editor" type="password" name="password" onChange={this.props.handleInputChange}
                                               id="password" placeholder="Votre mot de passe"/>
                                    </Col>
                                }
                            </FormGroup>
                            {this.state.loading_login ?
                                <Spinner className={'spinner_login'}/> :
                                <Button onClick={this.props.login} className={'buttonPrimary'}>Se connecter</Button>}
                        </Form>
                    </CardText>
                </CardBody>
            </div>
        )
    }

}

export default Login