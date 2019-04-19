import React from 'react';
import {Button, Card, CardBody, CardText, CardTitle} from 'reactstrap';
import '../css/index.css';
import chatBot from '../assets/chat_bot_button.svg'
import posed from 'react-pose';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

const BotAnim = posed.div({
    pressable: true,
    init: { scale: 1 },
    press: { scale: 0.8 }
});
const CardAnim = posed.div({
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
});
const questions = [
    {
        text: "Je peux recueillir vos questions afin de vous accompagner au mieux",
        actions: [
            {text: "COMMENCER",link:1},
        ],
        links:[]
    },
    {
        text: "Vous, un de vos proches ou votre patient avez été victime d’un traumatisme cranien léger ? ",
        actions: [
            {text: "OUI",link:2},
            {text: "NON",link:2},
        ],
        links:[]
    },
    {
        text: "S’agit-il d’un enfant ou d’un adulte ?",
        actions: [
            {text: "ENFANT",link:3},
            {text: "ADULTE",link:3},
        ],
        links:[{
            text:"Le traumatisme léger",
            href:"/traumas_cranniens"
        }]
    },
    {
        text: "Êtes vous professionnel de santé ou patient/famille ?",
        actions: [
            {text: "PROFESSIONEL",link:3},
            {text: "PATIENT/FAMILLE",link:3},
        ],
        links:[{
            text:"Trauma cranien léger ",
            href:"/traumas_cranniens"
        },
            {
                text:"Trauma cranien sévère",
                href:"/traumas_cranniens"
            }]
    }
];


export default class Bot extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: true,
            current_question : 0,
        };
    }
    url = (id) =>{
        this.setState({current_question:id});
    };
    back = () =>{
        if(this.state.current_question > 0){
            this.setState({current_question:this.state.current_question-1});
        }else{
            this.setState({current_question:0});
        }

    };
    openCard = () =>{
        this.setState({isOpen : !this.state.isOpen});
    };
    render() {
        return (
            <div className={'chatbot'}>
                <CardAnim className={'chatbot_card'} pose={this.state.isOpen ? 'visible' : 'hidden'} >
                            <Card className={'chatbot_container'}>
                                <CardBody>

                                    {this.state.current_question === 0 ?
                                        <CardTitle className={'chatbot_titre'}>ChatBot</CardTitle>
                                        :
                                        <CardTitle className={'chatbot_titre'}>
                                            <FontAwesomeIcon onClick={this.back} icon={faArrowLeft} className={'icon_left'} color={"#FFC107"}/>
                                            {this.state.current_question} sur {questions.length}</CardTitle>

                                    }

                                    <CardText>
                                        {
                                            questions[this.state.current_question].links.length === 0 ?
                                               null
                                                  :
                                                questions[this.state.current_question].links.map((link,i) => {
                                                    return (<div>
                                                    <a key={i} href={link.href}>{link.text}</a></div>)
                                        })
                                        }

                                    </CardText>
                                    <div className={'m_24p'}> { questions[this.state.current_question].text}</div>
                                    {questions[this.state.current_question].actions.map((action, i) => {
                                        return (<Button key={i} className={'buttonSecondary'} onClick={()=>{this.url(action.link)}}>
                                           {action.text}
                                       </Button>)
                                    })}
                                </CardBody>
                            </Card>
                </CardAnim>

                <BotAnim className={'chatbot_image'}>
                    <img src={chatBot}
                         onClick={this.openCard}  />
                </BotAnim>

            </div>
        );
    }
}


