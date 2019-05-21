import React from 'react';
import {Button, Card, CardBody, CardTitle} from 'reactstrap';
import '../css/index.css';
import sport from '../assets/sport_button.svg'
import posed from 'react-pose';

const BotAnim = posed.div({
    pressable: true,
    init: { scale: 1 },
    press: { scale: 0.8 }
});
const CardAnim = posed.div({
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
});

export default class Bot extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: true,
            current_question : 0,
        };
    }
    openCard = () =>{
        this.setState({isOpen : !this.state.isOpen});
    };
    render() {
        return (
            <div className={'sport'}>
                <CardAnim className={'chatbot_card'} pose={this.state.isOpen ? 'visible' : 'hidden'} >
                    <Card className={'chatbot_container'}>
                        <CardBody >
                            <CardTitle className={'sport_title'}>
                                Particularités de la commotion cérébrale en pratique sportive
                            </CardTitle>
                            <Button color="info" href='/accueil/sections/TCL/Sport/sporttcl'>En savoir plus</Button>
                        </CardBody >
                    </Card>
                </CardAnim>
                <BotAnim className={'sport_image'}>
                    <img src={sport} width={'100px'}
                         onClick={this.openCard}  />
                </BotAnim>
            </div>
        );
    }
}


