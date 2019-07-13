import React from "react";
import {Route, Switch} from "react-router-dom";

import firebase from "./firebase";
import {reactLocalStorage} from 'reactjs-localstorage';

import "./css/index.css";
import "./css/container.css";
import {
    Badge,
    Collapse,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Nav,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    NavLink,
    UncontrolledDropdown,
} from "reactstrap";
import Accueil from './views/pages/accueil/Accueil'
import Admin from './views/pages/admin/Index'
import Historique from './views/pages/accueil/sections/Historique'
import Bibliographie from './views/pages/accueil/sections/Bibliographie'
import Actions from './views/pages/accueil/sections/Actions'
import Definition from './views/pages/accueil/sections/Definition'
import Equipe from './views/pages/accueil/sections/Equipe'
import ListeStructures from './views/pages/accueil/sections/ListeStructures'
import Partenaires from './views/pages/accueil/sections/Partenaires'
import Public from './views/pages/accueil/sections/contact/Public'
import Pro from './views/pages/accueil/sections/contact/Pro'
import Avatar from "./views/Avatar";
import Controller from "./views/Controller";
import Login from "./views/pages/login/Login";
import Notification from "./views/Notification";
import Enfant from "./views/pages/accueil/sections/TCL/Utilisateur/Enfant"
import EnfantPro from "./views/pages/accueil/sections/TCL/Professionnel/EnfantPro"
import Adult from "./views/pages/accueil/sections/TCL/Utilisateur/Adult"
import AdultPro from "./views/pages/accueil/sections/TCL/Professionnel/AdultPro"
import SportTCL from "./views/pages/accueil/sections/TCL/Sport/SportTCL"
import Interface from "./views/pages/accueil/sections/TCL/Utilisateur/Interface"
import Cartographie from "./views/pages/cartographie/Cartographie";
import ParcoursMedicalAdulte from "./views/pages/accueil/sections/Parcours/ParcoursMedicalAdulte";
import ParcoursMedicalEnfant from "./views/pages/accueil/sections/Parcours/ParcoursMedicalEnfant";
import ParcoursAdulteInterface from "./views/pages/accueil/sections/Parcours/ParcoursAdulteInterface";
import ParcoursEnfantPEC from "./views/pages/accueil/sections/Parcours/ParcoursEnfantPEC";
import ParcoursEnfantMed from "./views/pages/accueil/sections/Parcours/ParcoursEnfantMed";
import ParcoursAdultePEC from "./views/pages/accueil/sections/Parcours/ParcoursAdultePEC";
import ParcoursAdulteMed from "./views/pages/accueil/sections/Parcours/ParcoursAdulteMed";
import InterfaceParcours from "./views/pages/accueil/sections/Parcours/InterfaceParcours";
import ParcoursEnfantInterface from "./views/pages/accueil/sections/Parcours/ParcoursEnfantInterface";

//session : 1H
const connection_max_time = 3600;
const WEB_DATA = '/web_data';
const ROOT = '/optimips-tc-160ea/accueil/accueil';
const storage = firebase.storage();
const storage_reference = storage.ref(ROOT);

let structures = [];
let structures_valides = [];
let passwords = [];
let notifications = [];
let result = [];

//641 = 1

function createAndLogUsers(structures) {
    structures.map((structure, i) => {
        firebase.auth().createUserWithEmailAndPassword(structure.mail, structure.password).then((res) => {
            firebase.auth().signInWithEmailAndPassword(structure.mail, structure.password).then((res) => {
                let uid = res.user.uid;
                firebase.database().ref('users/' + uid).set(structure);
            })
        }).catch((error) => {
        });
    })
}

function setStructuresValides() {
    let count = {};


    firebase.database().ref('structures/').once('value', function (snapshot) {

        snapshot.val().map((structure, i) => {
            let structure_valide = {};
            if (structure.mail !== "Non communiqué") {

                count[structure.mail] = count[structure.mail] ? count[structure.mail] + 1 : 1;
                snapshot.val().hasMail(structure.mail, function (terminated, ids) {
                    if (terminated) {
                        structure_valide['mail'] = structure.mail;
                        structure_valide['nom'] = structure.nom;
                        structure_valide['structure_id'] = ids;
                        structure_valide['password'] = generatePassword();
                        structure_valide['admin'] = true;
                        structure_valide['super_admin'] = false;
                        structures_valides.push(structure_valide);
                    }
                });
            }
        });
        result = structures_valides.reduce((unique, o) => {
            if (!unique.some(obj => obj.mail === o.mail)) {
                unique.push(o);
            }
            return unique;
        }, []);
        //createAndLogUsers(result);

    });

}

function generatePassword() {
    return Math.random()
        .toString(36)
        .slice(-8);
}


Array.prototype.hasMail = function (element, callback) {
    let i;
    let ids = [];
    for (i = 0; i < this.length; i++) {
        if (this[i].mail === element) {
            ids.push(this[i].id);
        }
    }
    callback(true, ids);
};

class App extends React.Component {


    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            activeItem: 0,
            isOpen: false,
            logged: false,
            email: '',
            password: '',
            error: null,
            notifications: [],
            navbarItems: [],
        };
        const uid = reactLocalStorage.get('uid');
        if (uid !== null) {
            this.checkSession(uid);
        }
    }

    componentDidMount() {
        switch (window.location.pathname) {
            case '/' :
                this.setState({activeItem: 0});
                break;
            case '/cartographie':
                this.setState({activeItem: 3});
                break;
            case '/admin' :
                this.setState({activeItem: 10});
                break;
            case '/accueil' :
                this.setState({activeItem: 3});
                break;
            case '/admin/structures' :
                this.setState({activeItem: 10});
                break;
            case '/admin/contenu' :
                this.setState({activeItem: 10});
                break;
            case '/admin/statistiques' :
                this.setState({activeItem: 10});
                break;
            case '/admin/structure' :
                this.setState({activeItem: 10});
                break;
            case '/admin/parametres' :
                this.setState({activeItem: 10});
                break;
            case '/admin/utilisateurs' :
                this.setState({activeItem: 10});
                break;
        }
    }

    componentWillMount(){
        const ref = firebase.database().ref('structures')
        ref.on('value', snapshot =>{
            this.setState({
                structures: snapshot.val()
            })
        })
    }

    getNotifications = () => {
        firebase.database().ref('demandes/').once('value', function (snapshot) {
            if (snapshot.val() !== null) {
                Object.values(snapshot.val()).map((notification, i) => {
                    if (reactLocalStorage.get('super_admin') === 'true') {
                        notifications.push(notification)
                    }
                });
                reactLocalStorage.setObject('notifications', {'notifications': notifications});
            }
        });

    };

    handleInputChange = (event) => {
        console.log(event.target.value);
        this.setState({[event.target.name]: event.target.value});
    };

    checkSession = (uid) => {
        let time = new Date();
        let to = time.getHours() * 3600 + time.getMinutes() * 60 + time.getSeconds();
        let ctx = this;
        firebase.database().ref('/sessions/' + uid).once('value').then(function (snapshot) {
            if (snapshot.val() !== null) {
                if (to <= snapshot.val().session_max_time) {
                    firebase.database().ref('/users/' + uid).once('value').then(function (snapshot) {
                        ctx.setState({email: snapshot.val().mail, password: snapshot.val().password.toString()});
                        ctx.login();

                    });
                    ctx.registerSession();
                } else {
                    ctx.logout();
                }
            }
        });
    };

    login = () => {
        const {email, password} = this.state;
        let ctx = this;
        firebase.auth()
            .signInWithEmailAndPassword(email, password)
            .then((res) => {
                firebase.database().ref('users/' + res.user.uid).once('value', function (snapshot) {
                    reactLocalStorage.set('admin', snapshot.val().admin);
                    reactLocalStorage.set('super_admin', snapshot.val().super_admin);
                    ctx.setState({logged: true});
                    if (snapshot.val().structure_id !== undefined) {
                        reactLocalStorage.setObject('structures', snapshot.val().structure_id);
                    } else {
                        reactLocalStorage.setObject('structures', null);
                    }

                });
                reactLocalStorage.set('uid', res.user.uid);
                this.registerSession();

            })
            .catch((error) => {
                ctx.setState({error: error.message});
                setTimeout(function () {
                        ctx.setState({error: null})
                    }, 300
                )
            });
    };
    logout = () => {
        this.unRegisterSession();
        window.location.href = '/accueil/accueil';
    };
    registerSession = () => {
        let uid = firebase.auth().currentUser.uid;
        let time = new Date();
        firebase.database().ref('sessions/' + uid).set({
            connection_time: (time.getHours() * 3600 + time.getMinutes() * 60 + time.getSeconds()),
            session_max_time: (time.getHours() * 3600 + time.getMinutes() * 60 + time.getSeconds()) + connection_max_time
        });
        this.getNotifications()
    };
    unRegisterSession = () => {
        let uid = firebase.auth().currentUser.uid;
        firebase.database().ref('sessions/' + uid).remove();
        reactLocalStorage.clear();
    };

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {

        return (
            <Route
                render={({location}) => (
                    <div className={'root'}>
                        {this.state.error ?
                            <Notification verbose={'error'} message={'Impossible de se connecter'}/> : null}
                        <Nav tabs className={this.state.activeItem !== 10 ? 'navigation_bar' : 'navigation_bar low'} dark
                                expand="md">
                            <NavLink className="white-text" href="/accueil/accueil">OptimipsTC</NavLink>
                                    <UncontrolledDropdown nav inNavbar>
                                        <DropdownToggle
                                            className="white-text"
                                            nav>
                                            Présentation
                                        </DropdownToggle>
                                        <DropdownMenu left="true" className={'nav_dropdown'}>
                                            <DropdownItem href="/accueil/sections/historique">
                                                Historique
                                            </DropdownItem>
                                            <DropdownItem href="/accueil/sections/actions">
                                                Nos actions
                                            </DropdownItem>
                                            <DropdownItem href="/accueil/sections/partenaires">
                                                Nos partenaires / Instances
                                            </DropdownItem>
                                            <DropdownItem href="/accueil/sections/equipe">
                                                Équipe de coordination
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                    <UncontrolledDropdown
                                        className={this.state.activeItem === 2 ? 'nav_link_active' : null} nav>
                                        <DropdownToggle nav className="white-text">
                                            Le traumatisme crânien
                                        </DropdownToggle>
                                        <DropdownMenu left="true" className={'nav_dropdown'}>
                                            <DropdownItem href='/accueil/sections/Definition'>
                                                Généralités
                                            </DropdownItem>
                                            <DropdownItem href="/accueil/sections/TCL/Utilisateur/Interface">
                                                Léger
                                            </DropdownItem>
                                            <DropdownItem href='/accueil/sections/parcours/interfaceparcours'>
                                                Modéré et Sévère
                                            </DropdownItem>
                                            <DropdownItem href="/accueil/sections/TCL/Sport/SportTCL">
                                                Sport et TC
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                    <UncontrolledDropdown nav inNavbar>
                                        <DropdownToggle
                                            className="white-text" nav>
                                            Cartographie
                                        </DropdownToggle>
                                        <DropdownMenu left="true" className={'nav_dropdown'}>
                                            <DropdownItem href="/cartographie">
                                                Carte
                                            </DropdownItem>
                                            <DropdownItem href="/accueil/sections/listestructures">
                                                Liste des structures
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                    <UncontrolledDropdown nav inNavbar>
                                        <DropdownToggle
                                            className="white-text" nav>
                                            Archives
                                        </DropdownToggle>
                                        <DropdownMenu left="true" className={'nav_dropdown'}>
                                            <DropdownItem href="/accueil/sections/bibliographie">
                                                Documents de références
                                            </DropdownItem>
                                            <DropdownItem>
                                                Médiathèque
                                            </DropdownItem>
                                            <DropdownItem>
                                                Agenda
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                    <UncontrolledDropdown nav inNavbar>
                                        <DropdownToggle
                                            className="white-text"
                                            nav>
                                            Contact
                                        </DropdownToggle>
                                        <DropdownMenu left="true" className="nav_dropdown">
                                            <DropdownItem href="/accueil/sections/contact/pro">
                                                Vous êtes un professionnel
                                            </DropdownItem>
                                            <DropdownItem href="/accueil/sections/contact/public">
                                                Vous êtes un patient
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                    <div className={'right'}>
                                        {
                                            reactLocalStorage.get('uid') ?
                                                <UncontrolledDropdown nav inNavbar>
                                                    <DropdownToggle className={'nav_link'} nav>
                                                        <Avatar/>
                                                        {reactLocalStorage.getObject('notifications').notifications !== undefined && reactLocalStorage.getObject('notifications').notifications.length > 0 ?
                                                            <Badge
                                                                className={'background_color_secondary'}>{reactLocalStorage.getObject('notifications').notifications.length}</Badge> : null}
                                                    </DropdownToggle>
                                                    {(() => {
                                                        if(window.location.pathname === "/"){
                                                            window.location.pathname = "/accueil/accueil";
                                                        };
                                                        let super_admin = reactLocalStorage.get('super_admin');
                                                        if (super_admin === 'true') {
                                                            return (
                                                                <DropdownMenu right="true" className={'nav_dropdown'}>
                                                                    <DropdownItem disabled={true}>
                                                                        Mon compte
                                                                    </DropdownItem>
                                                                    <DropdownItem href="/admin/structures">
                                                                        Gestion des centres
                                                                    </DropdownItem>
                                                                    <DropdownItem href="/admin/utilisateurs">
                                                                        Gestion des utilisateurs
                                                                    </DropdownItem>
                                                                    <DropdownItem href="/admin/chatbot">
                                                                        Gestion du chatbot
                                                                    </DropdownItem>
                                                                    <DropdownItem href="/admin/parametres">
                                                                        Paramètres
                                                                    </DropdownItem>
                                                                    <DropdownItem href="/admin/notifications">
                                                                        {reactLocalStorage.getObject('notifications').notifications !== undefined
                                                                        && reactLocalStorage.getObject('notifications').notifications.length > 0
                                                                            ? reactLocalStorage.getObject('notifications').notifications.length : ''} Notifications
                                                                    </DropdownItem>
                                                                    <DropdownItem onClick={this.logout} href="#"
                                                                                  className={'colorSecondary bold'}>
                                                                        Déconnexion
                                                                    </DropdownItem>
                                                                </DropdownMenu>);

                                                        } else {
                                                            return (
                                                                <DropdownMenu right="true" className={'nav_dropdown'}>
                                                                    <DropdownItem disabled={true}>
                                                                        Mon compte
                                                                    </DropdownItem>
                                                                    <DropdownItem href="/admin/structures">
                                                                        Gestion des centres
                                                                    </DropdownItem>
                                                                    <DropdownItem href="/admin/parametres">
                                                                        Paramètres
                                                                    </DropdownItem>
                                                                    <DropdownItem href="/admin/notifications">
                                                                        {reactLocalStorage.getObject('notifications').notifications !== undefined
                                                                        && reactLocalStorage.getObject('notifications').notifications.length > 0
                                                                            ? reactLocalStorage.getObject('notifications').notifications.length : ''} Notifications
                                                                    </DropdownItem>
                                                                    <DropdownItem onClick={this.logout} href="#"
                                                                                  className={'colorSecondary bold'}>
                                                                        Déconnexion
                                                                    </DropdownItem>
                                                                </DropdownMenu>);
                                                        }
                                                    })()}
                                                </UncontrolledDropdown>
                                                : <NavLink className={'nav_link_active'} href="/login"
                                                >Connexion</NavLink>}
                                    </div>
                        </Nav>
                        <Switch>
                            <Route path="/admin" render={() => <Admin notifications={this.state.notifications}
                                                                      uid={reactLocalStorage.get('uid')}/>}/>
                            <Route path="/cartographie" render={() => <Cartographie/>}/>
                            <Route path="/accueil/accueil" render={() => <Accueil/>}/>
                            <Route path="/accueil/sections/historique" render={() => <Historique/>}/>
                            <Route path="/accueil/sections/bibliographie" render={() => <Bibliographie/>}/>
                            <Route path="/accueil/sections/actions" render={() => <Actions/>}/>
                            <Route path="/accueil/sections/definition" render={() => <Definition/>}/>
                            <Route path="/accueil/sections/equipe" render={() => <Equipe/>}/>
                            <Route path="/accueil/sections/listestructures" render={() => <ListeStructures/>}/>
                            <Route path="/accueil/sections/TCL/Utilisateur/interface" render={() => <Interface/>}/>
                            <Route path="/accueil/sections/TCL/Utilisateur/enfant" render={() => <Enfant/>}/>
                            <Route path="/accueil/sections/TCL/Utilisateur/adult" render={() => <Adult/>}/>
                            <Route path="/accueil/sections/TCL/Professionnel/adultpro" render={() => <AdultPro/>}/>
                            <Route path="/accueil/sections/TCL/Professionnel/enfantpro" render={() => <EnfantPro/>}/>
                            <Route path="/accueil/sections/TCL/Sport/sporttcl" render={() => <SportTCL/>}/>
                            <Route path="/accueil/sections/partenaires" render={() => <Partenaires/>}/>
                            <Route path="/accueil/sections/contact/public" render={() => <Public/>}/>
                            <Route path="/accueil/sections/contact/pro" render={() => <Pro/>}/>
                            <Route path="/accueil/sections/parcours/parcoursmedicaladulte"
                                   render={() => <ParcoursMedicalAdulte/>}/>
                            <Route path="/accueil/sections/parcours/parcoursmedicalenfant"
                                   render={() => <ParcoursMedicalEnfant/>}/>
                            <Route path="/accueil/sections/parcours/parcoursenfantinterface" render={() => <ParcoursEnfantInterface/>}/>
                            <Route path="/accueil/sections/parcours/parcoursenfantpec" render={() => <ParcoursEnfantPEC/>}/>
                            <Route path="/accueil/sections/parcours/parcoursenfantmed" render={() => <ParcoursEnfantMed/>}/>
                            <Route path="/accueil/sections/parcours/parcoursadulteinterface" render={() => <ParcoursAdulteInterface/>}/>
                            <Route path="/accueil/sections/parcours/parcoursadultepec" render={() => <ParcoursAdultePEC/>}/>
                            <Route path="/accueil/sections/parcours/parcoursadultemed" render={() => <ParcoursAdulteMed/>}/>
                            <Route path="/accueil/sections/parcours/interfaceparcours"
                                   render={() => <InterfaceParcours/>}/>
                            <Route path="/login" render={() => <Login login={this.login}
                                                                      handleInputChange={this.handleInputChange}/>}/>
                            <Route render={() => <Controller route={window.location.pathname}/>}/>
                        </Switch>
                    </div>
                )}/>
        )
    }
}

export default App;