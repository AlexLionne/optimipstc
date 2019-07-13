import React from 'react';
import {Button, Card, CardBody, CardText, CardTitle, Col} from 'reactstrap';
import '../css/index.css';
import chatBot from '../assets/chat_bot_button.svg'
import posed from 'react-pose';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons'
import pec from "../assets/images/prise_en_charge.png";

const BotAnim = posed.div({
    pressable: true,
    init: {scale: 1},
    press: {scale: 0.8}
});
const CardAnim = posed.div({
    hidden: {opacity: 0},
    visible: {opacity: 1}
});
const questions = [
    {
        text: "Bonjour,\n" +
            "vous vous intéressez au Parcours de Soins des personnes ayant fait un Traumatisme Crânien (TC) ?\n" +
            "Je suis là pour vous aider ! \n",
        actions: [
            {text: "COMMENCER", link: 1},
        ],
        links: []
    },
    {
        text: "J'aurais juste 3 petites questions pour pouvoir bien vous guider. Êtes-vous ?",
        actions: [
            {text: "Une personne ayant subi un traumatisme crânien ?", link: 2},
            {text: "Un proche d'une personne traumatisme crânien ?", link: 9},
            {text: "Un professionnel de santé ?", link: 16},
        ],
        links: []
    },
    {
        text: "Bien noté. Quelle était la gravité de votre traumatisme crânien ?",
        actions: [
            {text: "Traumatisme crânien Léger : vous n'êtes pas resté \n hospitalisé après le traumatisme crânien", link: 3},
            {
                text: "Traumatisme crânien Modéré : il a fallu vous \n hospitaliser après le traumatisme crânien mais vous n'êtes pas passés en service de réanimation",
                link: 6
            },
            {text: "Traumatisme crânien Sévère : vous avez fait un séjour \n en  réanimation à la suite du traumatisme crânien", link: 6},
        ],
        links: []
    },
    {
        text: "C'est aussi noté. Pour mieux vous renseigner, il me faudrait savoir si vous êtes un adulte ou un enfant." +
            "Attention, je ne parle pas ici de votre âge au moment du traumatisme crânien, mais de votre âge actuel ! Êtes-vous ?",
        actions: [
            {text: "Un enfant ?", link: 4},
            {text: "Un adulte ?", link: 5},
        ],
        links: []
    },
    {
        actions: [],
        links: [{
            text: "Le traumatisme crânien léger chez l'enfant",
            href: "/accueil/sections/TCL/Utilisateur/enfant"
        }]
    },
    {
        actions: [],
        links: [{
            text: "Le traumatisme crânien léger chez l'adulte",
            href: "/accueil/sections/TCL/Utilisateur/adult"
        }]
    },
    {
        text: "C'est aussi noté. Pour mieux vous renseigner, il me faudrait savoir si vous êtes un adulte ou un enfant." +
            "Attention, je ne parle pas ici de votre âge au moment du TC, mais de votre âge actuel ! Êtes-vous ?",
        actions: [
            {text: "Un enfant ?", link: 7},
            {text: "Un adulte ?", link: 8},
        ],
        links: []
    },
    {
        actions: [],
        links: [{
            text: "Le traumatisme crânien modéré ou sévère chez l'enfant",
            href: "/accueil/sections/parcours/parcoursenfantinterface"
        }]
    },
    {
        actions: [],
        links: [{
            text: "Le traumatisme crânien modéré ou sévère chez l'adulte",
            href: "/accueil/sections/parcours/parcoursadulteinterface"
        }]
    },
    {
        text: "Bien noté ! Quelle était la gravité du traumatisme crânien de votre proche ?",
        actions: [
            {text: "Traumatisme crânien Léger : il ou elle n’est pas resté  \nhospitalisé après le traumatisme crânien ", link: 10},
            {
                text: "Traumatisme crânien Modéré : il a fallu  \nl’hospitaliser après le traumatisme crânien mais il ou elle n’est pas passé en service de réanimation ",
                link: 13
            },
            {text: "Traumatisme crânien Sévère : il ou elle a fait un séjour \n en réanimation à la suite du traumatisme crânien ", link: 13},
        ],
        links: []
    },
    {
        text: "C'est aussi noté. Pour mieux vous renseigner, il me faudrait savoir si votre proche est un adulte ou un enfant." +
            " Attention, je ne parle pas ici de son âge au moment du traumatisme crânien, mais de son âge actuel ! Est-il ?",
        actions: [
            {text: "Un enfant ?", link: 11},
            {text: "Un adulte ?", link: 12},
        ],
        links: []
    },
    {
        actions: [],
        links: [{
            text: "Le traumatisme crânien léger chez l'enfant",
            href: "/accueil/sections/TCL/Utilisateur/enfant"
        }]
    },
    {
        actions: [],
        links: [{
            text: "Le traumatisme crânien léger chez l'adulte",
            href: "/accueil/sections/TCL/Utilisateur/adult"
        }]
    },
    {
        text: "C'est aussi noté. Pour mieux vous renseigner, il me faudrait savoir si votre proche est un adulte ou un enfant." +
            " Attention, je ne parle pas ici de son âge au moment du traumatisme crânien, mais de son âge actuel ! Est-il ?",
        actions: [
            {text: "Un enfant ?", link: 14},
            {text: "Un adulte ?", link: 15},
        ],
        links: []
    },
    {
        actions: [],
        links: [{
            text: "Le traumatisme crânien modéré ou sévère chez l'enfant",
            href: "/accueil/sections/parcours/parcoursenfantinterface"
        }]
    },
    {
        actions: [],
        links: [{
            text: "Le traumatisme crânien modéré ou sévère chez l'adulte",
            href: "/accueil/sections/parcours/parcoursadulteinterface"
        }]
    },
    {
        text: "Bien noté ! \n" +
            "Sur quelle gravité de traumatisme crânien souhaitez vous des renseignements ?",
        actions: [
            {text: "Traumatisme crânien Léger : la personne n’est pas restée \n hospitalisé après le traumatisme crânien ", link: 17},
            {
                text: "Traumatisme crânien Modéré : il a fallu \n l’hospitaliser après le traumatisme crânien mais elle n’est pas passé en service de réanimation ",
                link: 20
            },
            {text: "Traumatisme crânien Sévère : la personne a fait un séjour \n en réanimation à la suite du traumatisme crânien", link: 20},
        ],
        links: []
    },
    {
        text: "C'est aussi noté. Pour mieux vous renseigner, il me faudrait savoir si votre intérêt se porte sur le parcours" +
            "de soin d'adulte ou d'enfant ayant eu un traumatisme crânien. Attention, je ne parle pas ici de l'âge au moment du traumatisme crânien, mais" +
            "bien du parcours de soin pour un adulte ou un enfant ! Vous intéressez-vous au parcours de soins :",
        actions: [
            {text: "D'un enfant ?", link: 18},
            {text: "D'un adulte ?", link: 19},
        ],
        links: []
    },
    {
        actions: [],
        links: [{
            text: "Le traumatisme crânien léger chez l'enfant",
            href: "/accueil/sections/TCL/Professionnel/enfantpro"
        }]
    },
    {
        actions: [],
        links: [{
            text: "Le traumatisme crânien léger chez l'adulte",
            href: "/accueil/sections/TCL/Professionnel/adultpro"
        }]
    },
    {
        text: "C'est aussi noté. Pour mieux vous renseigner, il me faudrait savoir si votre intérêt se porte sur le parcours" +
            "de soin d'adulte ou d'enfant ayant eu un traumatisme crânien. Attention, je ne parle pas ici de l'âge au moment du traumatisme crânien, mais" +
            "bien du parcours de soin pour un adulte ou un enfant ! Vous intéressez-vous au parcours de soins :",
        actions: [
            {text: "D'un enfant ?", link: 21},
            {text: "D'un adulte ?", link: 22},
        ],
        links: []
    },
    {
        actions: [],
        links: [{
            text: "Le traumatisme crânien modéré ou sévère chez l'enfant",
            href: "/accueil/sections/parcours/parcoursenfantinterface"
        }]
    },
    {
        actions: [],
        links: [{
            text: "Le traumatisme crânien modéré ou sévère chez l'adulte",
            href: "/accueil/sections/parcours/parcoursadulteinterface"
        }]
    },
];

export default class Bot extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: true,
            current_question: 0,
        };
    }

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
                <Card className={'container-set-bis text-center size-set'}>
                    <CardTitle className={'titre-blue'}>
                        Parcours de Soins
                    </CardTitle>
                        <CardBody>
                            <img src={chatBot} className={'img-clinique'}></img><br/>
                            <CardText>
                                {
                                    questions[this.state.current_question].links.length === 0 ?
                                        null
                                        :
                                        questions[this.state.current_question].links.map((link, i) => {
                                            return (<div>
                                                <a key={i} href={link.href}>{link.text}</a></div>)
                                        })
                                }
                            </CardText>
                            <div className={'m_24p chatbot-texte'}> {questions[this.state.current_question].text}</div>
                            {questions[this.state.current_question].actions.map((action, i) => {
                                return (<Button key={i} className={'buttonSecondary'} onClick={() => {
                                    this.url(action.link)
                                }}>
                                    {action.text}
                                </Button>)
                            })}
                        </CardBody>
                    </Card>
        );
    }
}


