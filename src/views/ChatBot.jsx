import React from 'react';
import {Button, Card, CardBody, CardText, CardTitle} from 'reactstrap';
import '../css/index.css';
import chatBot from '../assets/chat_bot_button.svg'
import posed from 'react-pose';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons'

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
        text: "Bonjour,\n" +
            "vous vous intéressez au Parcours de Soins des personnes ayant fait un Traumatisme Crânien (TC) ?\n" +
            "Je suis là pour vous aider ! \n",
        actions: [
            {text: "COMMENCER",link:1},
        ],
        links:[]
    },
    {
        text: "J'aurais juste 3 petites questions pour pouvoir bien vous guider. Êtes-vous ?",
        actions: [
            {text :"Une personne ayant subi un TC ?", link:2},
            {text :"Un proche d'une personne TC ?", link:9},
            {text :"Un professionnel de santé ?", link:16},
        ],
        links:[]
    },
    {
        text: "Bien noté. Quelle était la gravité de votre traumatisme crânien ?",
        actions: [
            {text: "TC Léger : vous n'êtes pas resté hospitalisé après le TC",link:3},
            {text: "TC Modéré : il a fallu vous hospitaliser après le TC mais vous n'êtes pas passés en service de réanimation",link:6},
            {text: "TC Sévère : vous avez fait un séjour en  réanimation à la suite du TC",link:6},
        ],
        links:[]
    },
    {
        text: "C'est aussi noté. Pour mieux vous renseigner, il me faudrait savoir si vous êtes un adulte ou un enfant." +
            "Attention, je ne parle pas ici de votre âge au moment du TC, mais de votre âge actuel ! Êtes-vous ?",
        actions: [
            {text: "Un enfant ?",link:4},
            {text: "Un adulte ?",link:5},
        ],
        links:[]
    },
    {
        text: "Voici des renseignements.",
        actions: [],
        links:[{
            text:"Le traumatisme crânien léger chez l'enfant",
            href:"/accueil/sections/TCL/Utilisateur/enfant"
        }]
    },
    {
        text: "Voici des renseignements.",
        actions: [],
        links:[{
            text:"Le traumatisme crânien léger chez l'adulte",
            href:"/accueil/sections/TCL/Utilisateur/adult"
        }]
    },
    {
        text: "C'est aussi noté. Pour mieux vous renseigner, il me faudrait savoir si vous êtes un adulte ou un enfant." +
            "Attention, je ne parle pas ici de votre âge au moment du TC, mais de votre âge actuel ! Êtes-vous ?",
        actions: [
            {text: "Un enfant ?",link:7},
            {text: "Un adulte ?",link:8},
        ],
        links:[]
    },
    {
        text: "Voici des renseignements.",
        actions: [],
        links:[{
            text:"Le traumatisme crânien modéré ou sévère chez l'enfant",
            href:"/accueil/sections/TCL/Utilisateur/enfant"
        }]
    },
    {
        text: "Voici des renseignements.",
        actions: [],
        links:[{
            text:"Le traumatisme crânien modéré ou sévère chez l'adulte",
            href:"/accueil/sections/TCL/Utilisateur/adult"
        }]
    },
    {
        text: "Bien noté ! Quelle était la gravité du traumatisme crânien de votre proche ?",
        actions: [
            {text: "TC Léger : il ou elle n’est pas resté hospitalisé après le TC ",link:10},
            {text: "TC Modéré : il a fallu l’hospitaliser après le TC mais il ou elle n’est pas passé en service de réanimation ",link:13},
            {text: "TC Sévère : il ou elle a fait un séjour en réanimation à la suite du TC ",link:13},
        ],
        links:[]
    },
    {
        text: "C'est aussi noté. Pour mieux vous renseigner, il me faudrait savoir si votre proche est un adulte ou un enfant." +
            " Attention, je ne parle pas ici de son âge au moment du TC, mais de son âge actuel ! Est-il ?",
        actions: [
            {text: "Un enfant ?",link:11},
            {text: "Un adulte ?",link:12},
        ],
        links:[]
    },
    {
        text: "Voici des renseignements.",
        actions: [],
        links:[{
            text:"Le traumatisme crânien léger chez l'enfant",
            href:"/accueil/sections/TCL/Utilisateur/enfant"
        }]
    },
    {
        text: "Voici des renseignements.",
        actions: [],
        links:[{
            text:"Le traumatisme crânien léger chez l'adulte",
            href:"/accueil/sections/TCL/Utilisateur/adult"
        }]
    },
    {
        text: "C'est aussi noté. Pour mieux vous renseigner, il me faudrait savoir si votre proche est un adulte ou un enfant." +
            " Attention, je ne parle pas ici de son âge au moment du TC, mais de son âge actuel ! Est-il ?",
        actions: [
            {text: "Un enfant ?",link:14},
            {text: "Un adulte ?",link:15},
        ],
        links:[]
    },
    {
        text: "Voici des renseignements.",
        actions: [],
        links:[{
            text:"Le traumatisme crânien modéré ou sévère chez l'enfant",
            href:"/accueil/sections/TCL/Utilisateur/enfant"
        }]
    },
    {
        text: "Voici des renseignements.",
        actions: [],
        links:[{
            text:"Le traumatisme crânien modéré ou sévère chez l'adulte",
            href:"/accueil/sections/TCL/Utilisateur/adult"
        }]
    },
    {
        text: "Bien noté ! \n" +
            "Sur quelle gravité de traumatisme crânien souhaitez vous des renseignements ?",
        actions: [
            {text: "TC Léger : la personne n’est pas restée hospitalisé après le TC ",link:17},
            {text: "TC Modéré : il a fallu l’hospitaliser après le TC mais elle n’est pas passé en service de réanimation ",link:20},
            {text: "TC Sévère : la personne a fait un séjour en réanimation à la suite du TC",link:20},
        ],
        links:[]
    },
    {
        text: "C'est aussi noté. Pour mieux vous renseigner, il me faudrait savoir si votre intérêt se porte sur le parcours" +
            "de soin d'adulte ou d'enfant ayant eu un TC. Attention, je ne parle pas ici de l'âge au moment du TC, mais" +
            "bien du parcours de soin pour un adulte ou un enfant ! Vous intéressez-vous au parcours de soins :",
        actions: [
            {text: "D'un enfant ?",link:18},
            {text: "D'un adulte ?",link:19},
        ],
        links:[]
    },
    {
        text: "Voici des renseignements.",
        actions: [],
        links:[{
            text:"Le traumatisme crânien léger chez l'enfant",
            href:"/accueil/sections/TCL/Professionnel/enfantpro"
        }]
    },
    {
        text: "Voici des renseignements.",
        actions: [],
        links:[{
            text:"Le traumatisme crânien léger chez l'adulte",
            href:"/accueil/sections/TCL/Professionnel/adultpro"
        }]
    },
    {
        text: "C'est aussi noté. Pour mieux vous renseigner, il me faudrait savoir si votre intérêt se porte sur le parcours" +
            "de soin d'adulte ou d'enfant ayant eu un TC. Attention, je ne parle pas ici de l'âge au moment du TC, mais" +
            "bien du parcours de soin pour un adulte ou un enfant ! Vous intéressez-vous au parcours de soins :",
        actions: [
            {text: "D'un enfant ?",link:21},
            {text: "D'un adulte ?",link:22},
        ],
        links:[]
    },
    {
        text: "Voici des renseignements.",
        actions: [],
        links:[{
            text:"Le traumatisme crânien modéré ou sévère chez l'enfant",
            href:"/accueil/sections/TCL/Professionnel/enfantpro"
        }]
    },
    {
        text: "Voici des renseignements.",
        actions: [],
        links:[{
            text:"Le traumatisme crânien modéré ou sévère chez l'adulte",
            href:"/accueil/sections/TCL/Professionnel/adultpro"
        }]
    },
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
                                    <div className={'m_24p chatbot-texte'}> { questions[this.state.current_question].text}</div>
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


