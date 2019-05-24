import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";


import '../../../css/index.css'
import {Collapse, Nav, Navbar, NavbarToggler, NavItem, NavLink,} from "reactstrap";
import Structures from "./Structures";
import Parametres from "./Parametres";
import Utilisateurs from "./Utilisateurs";
import {reactLocalStorage} from "reactjs-localstorage";
import Notifications from "./Notifications";
import ChatBot from "./ChatBot";


class Index extends React.Component {

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            activeItem: 0,
            uid: reactLocalStorage.get('uid'),
            notifications: this.props.notifications
        };
        console.log(this.props.notifications)
    }

    componentDidMount() {
        switch (window.location.pathname) {
            case '/admin' :
                this.setState({activeItem: 0});
                break;
            case '/admin/structures':
                this.setState({activeItem: 1});
                break;
            case '/admin/parametres':
                this.setState({activeItem: 2});
                break;
            case '/admin/utilisateurs':
                this.setState({activeItem: 0});
                break;
            case '/admin/notifications':
                this.setState({activeItem: 0});
                break;
        }

    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return (
            <Router>
                <div>
                    <div>
                        <Navbar className={'navigation_bar_admin'} dark expand="md">
                            <NavbarToggler onClick={this.toggle}/>
                            <Collapse isOpen={this.state.isOpen} navbar>

                                {(() => {
                                    if (reactLocalStorage.get('super_admin') === 'true') {
                                        return (
                                            <Nav className="mr-auto" navbar>
                                                <NavItem>
                                                    <NavLink
                                                        className={this.state.activeItem === 0 ? 'nav_link_active' : 'nav_link'}
                                                        href="/admin/utilisateurs">Gestions des
                                                        utilisateurs</NavLink>
                                                </NavItem>
                                                <NavItem>
                                                    <NavLink
                                                        className={this.state.activeItem === 1 ? 'nav_link_active' : 'nav_link'}
                                                        href="/admin/structures">Gestion des centres</NavLink>
                                                </NavItem>
                                                <NavItem>
                                                    <NavLink
                                                        className={this.state.activeItem === 0 ? 'nav_link_active' : 'nav_link'}
                                                        href="/admin/chatbot">Gestion du
                                                        chatBot</NavLink>
                                                </NavItem>
                                                <NavItem>
                                                    <NavLink
                                                        className={this.state.activeItem === 2 ? 'nav_link_active' : 'nav_link'}
                                                        href="/admin/parametres">Paramètres du compte</NavLink>
                                                </NavItem>
                                                <NavItem>
                                                    <NavLink
                                                        className={this.state.activeItem === 3 ? 'nav_link_active' : 'nav_link'}
                                                        href="/admin/notifications">Notifications</NavLink>
                                                </NavItem>
                                            </Nav>
                                        );
                                    } else {
                                        return (<Nav className="mr-auto" navbar>
                                            <NavItem>
                                                <NavLink
                                                    className={this.state.activeItem === 1 ? 'nav_link_active' : 'nav_link'}
                                                    href="/admin/structures">Gestion des centres</NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink
                                                    className={this.state.activeItem === 2 ? 'nav_link_active' : 'nav_link'}
                                                    href="/admin/parametres">Paramètres du compte</NavLink>
                                            </NavItem>
                                        </Nav>)
                                    }
                                })()
                                }
                            </Collapse>
                        </Navbar>
                    </div>
                    <Route path="/" exact component={Index}/>
                    <Route path="/admin/structures" component={() => <Structures uid={this.state.uid}/>}/>
                    {reactLocalStorage.get('super_admin') ?
                        <Route path="/admin/chatbot" component={() => <ChatBot/>}/> : null}
                    <Route path="/admin/notifications"
                           component={() => <Notifications notifications={this.props.notifications}/>}/>
                    {reactLocalStorage.get('super_admin') ? <Route path="/admin/utilisateurs"
                                                                   component={() => <Utilisateurs
                                                                       uid={this.state.uid}/>}/> : null}
                    <Route path="/admin/parametres"
                           component={() => <Parametres admin={reactLocalStorage.get('admin')} uid={this.state.uid}/>}/>
                </div>
            </Router>
        )
    }
};

export default Index;