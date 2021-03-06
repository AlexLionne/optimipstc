import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";

import firebase from "./firebase";
import {reactLocalStorage} from 'reactjs-localstorage';

import "./css/index.css";
import {
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
    Badge,
} from "reactstrap";
import Admin from './views/pages/admin/Index'

import Avatar from "./views/Avatar";
import Controller from "./views/Controller";
import Login from "./views/pages/login/Login";
import Notification from "./views/Notification";
import Cartographie from "./views/pages/cartographie/Cartographie";
import {Switch} from "react-router-dom";




//session : 1H
const connection_max_time = 3600;
const WEB_DATA = '/web_data';
const WEB_URL = 'http://localhost:3000'
const ROOT = '/optimips';
const storage = firebase.storage();
const storage_reference = storage.ref(ROOT);



let structures = [];
let structures_valides = [];
let passwords = [];
let notifications = [];
let result = [];
//641 = 1

function createAndLogUsers(structures){
    structures.map((structure,i)=>{
        firebase.auth().createUserWithEmailAndPassword(structure.mail, structure.password).then((res) => {
            firebase.auth().signInWithEmailAndPassword(structure.mail, structure.password).then((res) => {
                let uid = res.user.uid;
                firebase.database().ref('users/' + uid).set(structure);
            })
        }).catch((error) => {});
    })
}
function setStructuresValides() {
    let count = {};


    firebase.database().ref('structures/').once('value', function (snapshot) {

        snapshot.val().map((structure,i) =>{
            let structure_valide = {};
            if (structure.mail !== "Non communiqué") {

                count[structure.mail] = count[structure.mail] ? count[structure.mail] + 1 : 1;
                        snapshot.val().hasMail(structure.mail,function (terminated,ids) {
                            if(terminated){
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
            if(!unique.some(obj => obj.mail === o.mail)) {
                unique.push(o);
            }
            return unique;
        },[]);
        //createAndLogUsers(result);

        });

}
function generatePassword() {
    return Math.random()
        .toString(36)
        .slice(-8);
}


Array.prototype.hasMail = function(element,callback) {
    let i;
    let ids = [];
    for (i = 0; i < this.length; i++) {
        if (this[i].mail === element) {
            ids.push(this[i].id);
        }
    }
    callback(true,ids);
};

class App extends React.Component {

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
            case '/Acceuil' :
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
            notifications : [],
            navbarItems:[]
        };
        const uid = reactLocalStorage.get('uid');
        if(uid !== null){
            this.checkSession(uid);
        }
    }
    getNotifications = () => {
        firebase.database().ref('demandes/').once('value', function (snapshot) {
            if(snapshot.val() !== null){
                Object.values(snapshot.val()).map((notification,i)=>{
                    if(reactLocalStorage.get('super_admin') === 'true'){
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
            if(snapshot.val() !== null){
                if (to <= snapshot.val().session_max_time) {
                    firebase.database().ref('/users/' + uid).once('value').then(function (snapshot) {
                        ctx.setState({email:snapshot.val().mail,password:snapshot.val().password.toString()});
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
                        ctx.setState({error:null})
                }, 300
                )
            });

    };
    logout = () => {
        this.unRegisterSession();
        window.location.href = '/';
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
                render={({ location }) => (
                    <div className={'root'}>

                        {this.state.error ? <Notification verbose={'error'} message={'Impossible de se connecter'}/>:null}
                        <Navbar className={this.state.activeItem !== 10 ? 'navigation_bar' : 'navigation_bar low'} dark
                                expand="md">
                            <NavbarBrand href="/">OptimipsTC</NavbarBrand>
                            <NavbarToggler onClick={this.toggle}/>
                            <Collapse isOpen={this.state.isOpen} navbar>
                                <Nav className="mr-auto" navbar>
                                    <UncontrolledDropdown nav inNavbar>
                                        <DropdownToggle
                                            className={this.state.activeItem === 1 ? 'nav_link_active' : 'nav_link'}
                                            nav>
                                            Présentation
                                        </DropdownToggle>
                                        <DropdownMenu left="true" className={'nav_dropdown'}>
                                            <DropdownItem href="/presentation#definition">
                                                Historique
                                            </DropdownItem>
                                            <DropdownItem>
                                                Nos actions
                                            </DropdownItem>
                                            <DropdownItem>
                                                Nos partenaires / Instances
                                            </DropdownItem>
                                            <DropdownItem>
                                                Équipe de coordination
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                    <UncontrolledDropdown
                                        className={this.state.activeItem === 2 ? 'nav_link_active' : null} nav>
                                        <DropdownToggle nav>
                                            Le traumatisme crânien
                                        </DropdownToggle>
                                        <DropdownMenu left="true" className={'nav_dropdown'}>
                                            <DropdownItem onClick={()=>this.login}>
                                                Léger
                                            </DropdownItem>
                                            <DropdownItem>
                                                Modéré et Sévère
                                            </DropdownItem>
                                            <DropdownItem>
                                                Du sportif
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                    <UncontrolledDropdown nav inNavbar>
                                        <DropdownToggle
                                            className={this.state.activeItem === 4 ? 'nav_link_active' : null} nav>
                                            Archives
                                        </DropdownToggle>
                                        <DropdownMenu left="true" className={'nav_dropdown'}>
                                            <DropdownItem>
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
                                            className={this.state.activeItem === 5 ? 'nav_link_active' : 'nav_link'}
                                            nav>
                                            Liens amis
                                        </DropdownToggle>
                                        <DropdownMenu left="true" className={'nav_dropdown'}>
                                            <DropdownItem>
                                                ARS
                                            </DropdownItem>
                                            <DropdownItem>
                                                CHU Toulouse / CHU Montpellier / CHU Nîme
                                            </DropdownItem>
                                            <DropdownItem>
                                                Associations (qui ?)
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                    <UncontrolledDropdown nav inNavbar>
                                        <DropdownToggle
                                            className={this.state.activeItem === 6 ? 'nav_link_active' : 'nav_link'}
                                            nav>
                                            Contact
                                        </DropdownToggle>
                                        <DropdownMenu left="true" className="nav_dropdown">
                                            <DropdownItem href="/contact">
                                                Vous êtes un professionnel
                                            </DropdownItem>
                                            <DropdownItem>
                                                Vous êtes un patient
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                    <UncontrolledDropdown nav inNavbar>
                                        <DropdownToggle
                                            className={this.state.activeItem === 3 ? 'nav_link_active' : null} nav>
                                            Cartographie
                                        </DropdownToggle>
                                        <DropdownMenu left="true" className={'nav_dropdown'}>
                                            <DropdownItem href="/cartographie">
                                                Carte
                                            </DropdownItem>
                                            <DropdownItem>
                                                Types de structures
                                            </DropdownItem>
                                            <DropdownItem>
                                                Soins
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>



                                    <div className={'right'}>
                                        {
                                            reactLocalStorage.get('uid') ?

                                                <UncontrolledDropdown nav inNavbar>
                                                    <DropdownToggle className={'nav_link'} nav>
                                                        <Avatar/>
                                                        {reactLocalStorage.getObject('notifications').notifications !== undefined && reactLocalStorage.getObject('notifications').notifications.length > 0?
                                                        <Badge  className={'background_color_secondary'}>{reactLocalStorage.getObject('notifications').notifications.length }</Badge> :null}
                                                    </DropdownToggle>
                                                    {(() => {

                                                        let super_admin = reactLocalStorage.get('super_admin');
                                                        if (super_admin === 'true') {
                                                            return (<DropdownMenu right="true" className={'nav_dropdown'}>
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
                                                            return (<DropdownMenu right="true" className={'nav_dropdown'}>
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
                            </Collapse>
                        </Navbar>
                        <Switch>
                            <Route path="/admin" render={() => <Admin notifications={this.state.notifications} uid={reactLocalStorage.get('uid')}/>}/>
                            <Route path="/cartographie" render={() => <Cartographie/>}/>
                            <Route path="/login" render={() => <Login login={this.login} handleInputChange={this.handleInputChange}/>}/>
                            <Route render={()=><Controller route={window.location.pathname}/>}/>
                        </Switch>
                    </div>
                )}/>
        )
    }
}

export default App;