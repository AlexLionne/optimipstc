import React from 'react';
import {Button, Card, CardBody, CardTitle} from 'reactstrap';
import '../css/index.css';
import sport from '../assets/sport_button.svg'
import posed from 'react-pose';

const BotAnim = posed.div({
    pressable: true,
    init: {scale: 1},
    press: {scale: 0.8}
});
const CardAnim = posed.div({
    hidden: {opacity: 0},
    visible: {opacity: 1}
});

export default class Bot extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            count:0,
            delay:10000,
            isOpen: false,
            current_question: 0,
        };
    }

    componentDidMount() {
        this.interval = setInterval(this.tick, this.state.delay);
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.delay !== this.state.delay) {
            clearInterval(this.interval);
            this.interval = setInterval(this.tick, this.state.delay);
        }
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    tick = () => {
        this.setState({
            count: this.state.count + 1
        });
        if(this.state.count % 2 === 0){
            this.setState({isOpen: false});
            this.setState({delay: 120000});
        }
        else{
            this.setState({isOpen: true});
        }
    };

    url = (id) => {
        this.setState({current_question: id});
    };
    back = () => {
        if (this.state.current_question > 0) {
            this.setState({current_question: this.state.current_question - 1});
        } else {
            this.setState({current_question: 0});
        }

    };
    openCard = () => {
        this.setState({isOpen: !this.state.isOpen});
    };

    render() {
        return (
            <div className={'sport'}>
                <CardAnim className={'sport-card'} pose={this.state.isOpen ? 'visible' : 'hidden'}>
                    <Card className={'chatbot_container'}>
                        <CardBody>
                            <CardTitle className={'sport_title'}>
                                Particularités de la commotion cérébrale en pratique sportive
                            </CardTitle>
                            <Button color="info" className="witdh-90" href='/accueil/sections/TCL/Sport/sporttcl'>En savoir plus</Button>
                        </CardBody>
                    </Card>
                </CardAnim>
                <BotAnim className={'sport_image'}>
                    <img src={sport} width={'100px'}
                         onClick={this.openCard}/>
                </BotAnim>
            </div>
        );
    }
}


