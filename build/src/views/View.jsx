import React from "react";

import '../css/index.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import firebase from '../firebase';
import {faAlignJustify, faColumns, faHeading, faImage, faSave, faTimes} from "@fortawesome/free-solid-svg-icons/index";
import {
    Button,
    CardBody,
    CardText,
    CardTitle,
    Col,
    Collapse,
    Container,
    DropdownItem,
    Form,
    FormGroup,
    Input,
    Label,
    Modal,
    Nav,
    Navbar,
    NavbarToggler,
    NavItem,
    NavLink,
    Row,
} from "reactstrap";


import EditView from "./EditView";
import MultiRef from 'react-multi-ref';
import Notification from "./Notification";
import {reactLocalStorage} from "reactjs-localstorage";


const ROOT = '/optimips/pages/';
const storage = firebase.storage();
const storage_reference = storage.ref(ROOT);


function key() {
    return Math.random()
        .toString(36)
        .slice(-4);
}


class View extends React.Component {
    _items = new MultiRef();

    constructor(props) {
        super(props);
        this.state = {
            isOpen: true,
            elements: [],
            selectedElement: '',
            imagePreviewUrl: null,
            saveModal: false,
            error: false,
            inNav: false,
            pageName: '',
            isPageSaved: false,
            superAdmin: reactLocalStorage.get('super_admin'),
        };
        this.openHeader = React.createRef();
        this.getPage()
    }

    getPage = () => {
        let elements = [];
        let ctx = this;
        firebase.database().ref('pages/' + this.props.route).once('value', function (snapshot) {
            console.log(snapshot.val());
            if (snapshot.val() !== null) {
                Object.keys(snapshot.val()).map(((item, i) => {
                    if (item !== 'inNav' && item !== 'header') {
                        elements[i] = snapshot.val()[i];
                    }
                }));
                ctx.setState({elements: elements});
            }
        })
    };

    selectElement = (i) => {
        this.setState({selectedElement: i});
    };

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    addHtml = (array, html) => {
        if (array === null) {
            array = this.state.elements;
        }
        array.map((element, i) => {
            if (element.id === this.state.selectedElement && element.name !== 'section') {
                element.html = html;
                console.log(element);
            } else {
                if (Array.isArray(element.children)) {
                    this.addHtml(element.children, html)
                }
            }
        });
        this.setState({elements: array});
        console.log(this.state.elements)
    };
    handleEditorChange = (html) => {
        this.addHtml(null, html);
    };
    showOpenHeaderFileDlg = () => {
        this.openHeader.current.click()
    };
    addSection = () => {
        let section = {
            id: key(),
            type: 'div',
            name: 'section',
            className: 'section',
            children: [],
        };

        let elements = this.state.elements;
        elements.push(section);
        this.setState({elements: elements});
        this.setState({selectedElement: section.id});
    };
    addColumn = () => {
        let column = {
            id: key(),
            type: 'Col',
            name: 'column',
            className: 'col',
            children: [],
        };
        let elements = this.state.elements;
        elements.map((element, i) => {
            if (element.id === this.state.selectedElement) {
                element.children.push(column);
            }
        });
        this.setState({elements: elements});
    };

    addText = () => {
        let text = {
            id: key(),
            type: 'p',
            name: 'text',
            className: 'p',
        };
        let elements = this.state.elements;
        elements.map((element, i) => {
            if (element.id === this.state.selectedElement) {
                element.children.push(text)
            }
        });
        this.setState({elements: elements});
    };

    save = () => {
        this.setState({saveModal: !this.state.saveModal})

    };

    addPage = () => {
        let elements = this.state.elements;
        elements.inNav = this.state.inNav;
        firebase.database().ref('pages/' + this.state.pageName).set(elements).then(() => {
            this.save();
            this.setState({pageSaved: true});
        });
    };

    deleteElement = (array) => {
        if (array === null || array === undefined) {
            array = this.state.elements;
        }
        array.map((element, i) => {
            if (element.id === this.state.selectedElement) {
                array.splice(i, 1);
            } else {
                if (Array.isArray(element.children)) {
                    console.log(element.children);
                    this.deleteElement(element.children)
                }
            }
        });
        //on verifie s'il ne s'agit pa d'un titre
        this.setState({elements: array});
    };

    addHeader(event) {
        event.stopPropagation();
        event.preventDefault();
        let reader = new FileReader();
        let file = event.target.files[0];
        let ctx = this;
        reader.onloadend = () => {
            //this.editor [this.state.selectedElement].insertImage(reader.result);
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            }, () => {


                let filename = Math.random()
                    .toString(36)
                    .slice(-4);
                let upload = storage_reference.child(filename + '/').put(file);
                upload.on('state_changed', function (snapshot) {
                    // Observe state change events such as progress, pause, and resume
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case firebase.storage.TaskState.PAUSED: // or 'paused'
                            console.log('Upload is paused');
                            break;
                        case firebase.storage.TaskState.RUNNING: // or 'running'
                            console.log('Upload is running');
                            break;
                    }
                }, function (error) {
                    // Handle unsuccessful uploads
                }, function () {
                    // Handle successful uploads on complete
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    upload.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                        let elements = ctx.state.elements;
                        let header = {
                            id: key(),
                            type: 'div',
                            name: 'header',
                            src: downloadURL,
                            className: 'header'
                        };
                        elements.push(header);
                        ctx.setState({elements: elements});
                        ctx.setState({selectedElement: header.id});
                    });
                });
            });
        };
        reader.readAsDataURL(file);
    }

    handleInNav = () => {
        this.setState({inNav: !this.state.inNav});
    };

    handlePageName = (e) => {
        this.setState({pageName: e.target.value})
    };

    render() {
        let elements = this.state.elements;
        return (
            <div className={'main'}>
                <div>
                    {this.state.superAdmin === 'true' ?
                        <Navbar className={'navigation_bar_editor'} dark expand="md">
                            <NavbarToggler onClick={this.toggle}/>
                            <Collapse isOpen={this.state.isOpen} navbar>
                                <Nav className="mr-auto" navbar>
                                    <NavItem>
                                        <NavLink
                                            onClick={(e) => {
                                                this.addSection();
                                                e.stopPropagation();
                                            }}
                                            className={'nav_link'}>
                                            <FontAwesomeIcon color={"#000"} icon={faAlignJustify}/>
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            onClick={(e) => {
                                                this.addColumn();
                                                e.stopPropagation();
                                            }}
                                            className={'nav_link'}>
                                            <FontAwesomeIcon color={"#000"} icon={faColumns}/>
                                        </NavLink>
                                    </NavItem>

                                    <NavItem>
                                        <NavLink
                                            className={'nav_link'}>
                                            <input type="file" id="file" ref={this.openHeader} style={{display: "none"}}
                                                   onChange={this.addHeader.bind(this)}/>
                                            <FontAwesomeIcon
                                                onClick={(e) => {
                                                    this.showOpenHeaderFileDlg();
                                                }}
                                                color={"#000"}
                                                icon={faImage}/>
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            onClick={(e) => {
                                                this.addText();
                                                e.stopPropagation();
                                            }}
                                            className={'nav_link'}>
                                            <FontAwesomeIcon color={"#000"} icon={faHeading}/>
                                        </NavLink>
                                    </NavItem>

                                    <div className={'right'}>
                                        <NavItem>
                                            <NavLink
                                                onClick={(e) => {
                                                    this.save();
                                                    e.stopPropagation();
                                                }}
                                                className={'nav_link'}>
                                                <FontAwesomeIcon color={"#000"} icon={faSave}/>
                                            </NavLink>
                                        </NavItem>

                                    </div>
                                </Nav>
                            </Collapse>
                        </Navbar>
                        : null}

                    <div>
                        {elements.map((element, j) => {
                            if (element.name === 'header') {
                                return (
                                    <div onClick={(e) => {
                                        this.selectElement(element.id);
                                        e.stopPropagation();
                                    }}
                                         className={'header'}>
                                        {this.state.selectedElement === element.id && this.state.superAdmin === 'true' ?
                                            <div className={'editor_selected_action'}>
                                                <FontAwesomeIcon color={"#fff"}
                                                                 icon={faTimes}
                                                                 onClick={(e) => {
                                                                     this.deleteElement();
                                                                     e.stopPropagation();
                                                                 }}/></div>
                                            : null}
                                        <img width={'100%'} height={'auto'} src={element.src}/>
                                    </div>)
                            }
                        })}
                        {elements.map((element, j) => {
                            if (element.name !== 'header') {

                                return <div>
                                    <Container key={j} id={element.id} onClick={(e) => {
                                        this.selectElement(element.id);
                                        e.stopPropagation();
                                    }}
                                               className={this.state.selectedElement === element.id && this.state.superAdmin === 'true' ? 'border-selected' : 'border'}>
                                        {this.state.selectedElement === element.id && this.state.superAdmin === 'true' ?
                                            <div className={'editor_selected_action'}>
                                                <FontAwesomeIcon color={"#fff"}
                                                                 icon={faTimes}
                                                                 onClick={(e) => {
                                                                     this.deleteElement();
                                                                     e.stopPropagation();
                                                                 }}/></div>
                                            : null}
                                        <Row>
                                            {element.children !== undefined ?
                                                element.children.map((column, i) => {
                                                    if (column.name === 'text') {
                                                        return <Col xs={'11'} id={column.id} onClick={(e) => {
                                                            this.selectElement(column.id);
                                                            e.stopPropagation();
                                                        }}
                                                                    className={this.state.selectedElement === column.id && this.state.superAdmin === 'true' ? 'editor-wrapper-title border-title-selected' : 'editor-wrapper-title border'}>
                                                            {this.state.selectedElement === column.id && this.state.superAdmin === 'true' ?
                                                                <div className={'editor_selected_title_action'}>
                                                                    <FontAwesomeIcon
                                                                        color={"#fff"} icon={faTimes} onClick={(e) => {
                                                                        this.deleteElement();
                                                                        e.stopPropagation();
                                                                    }}/></div>
                                                                : null}
                                                            <EditView readOnly={this.state.superAdmin === 'true'}
                                                                      id={column.id} html={column.html}
                                                                      ref={this._items.ref(column.id)}
                                                                      onChange={this.handleEditorChange}/>
                                                        </Col>
                                                    } else {
                                                        return <Col key={i} id={column.id} onClick={(e) => {
                                                            this.selectElement(column.id);
                                                            e.stopPropagation();
                                                        }}
                                                                    className={this.state.selectedElement === column.id && this.state.superAdmin === 'true' ? 'editor-wrapper border-selected' : 'editor-wrapper border '}>
                                                            {this.state.selectedElement === column.id && this.state.superAdmin === 'true' ?
                                                                <div className={'editor_selected_action'}>
                                                                    <FontAwesomeIcon

                                                                        color={"#fff"} icon={faTimes} onClick={(e) => {
                                                                        this.deleteElement();
                                                                        e.stopPropagation();
                                                                    }}/></div>
                                                                : null}
                                                            <EditView readOnly={this.state.superAdmin === 'true'}
                                                                      id={column.id} html={column.html}
                                                                      ref={this._items.ref(column.id)}
                                                                      onChange={this.handleEditorChange}
                                                            />
                                                        </Col>
                                                    }
                                                }) : null}
                                        </Row>
                                    </Container>
                                    <DropdownItem divider/>
                                </div>
                            }
                        })}
                    </div>
                </div>

                {this.state.pageSaved ?
                    <Notification verbose={'success'} message={'page ' + this.state.pageName + ' sauvegardée'}/> : null}

                <Modal className={'save_modal'} isOpen={this.state.saveModal} fade={false}>
                    <CardBody>
                        <CardTitle style={{
                            width: 'auto',
                            fontWeight: 'bold',
                            color: '#000',
                            display: 'inline-block'
                        }}>Ajout de la page</CardTitle>
                        <FontAwesomeIcon color={"#000"} style={{float: 'right', display: 'inline-block'}}
                                         onClick={this.save} icon={faTimes}/>
                        <CardText>
                            <Form>
                                <FormGroup row>
                                    <Row>
                                        <Col xs={'6'}>
                                            <Label for="email" sm={11}>Nom de la page</Label>
                                        </Col>
                                        <Col xs={'6'}>
                                            <Input onChange={this.handlePageName}/>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={'12'}>
                                            <FormGroup check inline>
                                                <Label check>
                                                    <Input type="checkbox" onChange={this.handleInNav}/> Intégrer la
                                                    page dans la barre de navigation
                                                </Label>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </FormGroup>
                                <Button onClick={this.addPage} className={'buttonPrimary'}>Ajouter</Button>
                            </Form>
                        </CardText>
                    </CardBody>
                </Modal>
            </div>
        )
    }
}


export default View;