import React, { Component } from 'react'
import ReactMapGL, {Marker, Popup} from 'react-map-gl';

import Geocoder from 'react-map-gl-geocoder';
import 'mapbox-gl/dist/mapbox-gl.css';
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css';
import styles from '../../../../css/styles';
import '../../../../css/container.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faInfo} from '@fortawesome/free-solid-svg-icons'
import {  faPhone } from '@fortawesome/free-solid-svg-icons'
import {  faMap } from '@fortawesome/free-solid-svg-icons'
import {  faMailBulk } from '@fortawesome/free-solid-svg-icons'
import {  faSearch } from '@fortawesome/free-solid-svg-icons'
import {  faUser } from '@fortawesome/free-solid-svg-icons'
import * as structuresOcc from "../../../../models/datas.json";
import marker_img from '../../../../assets/images/hospital.png'
import img_hos from '../../../../assets/images/img_hos.png'
import img_aeso from '../../../../assets/images/img_aeso.png'
import img_phi from '../../../../assets/images/img_phi.png'
import img_pro from '../../../../assets/images/img_pro.png'
import img_r from '../../../../assets/images/img_r.png'
import img_sad from '../../../../assets/images/img_sad.png'
import img_scol from '../../../../assets/images/img_scol.png'
import img_sml from '../../../../assets/images/img_sml.png'
import hospital from '../../../../assets/images/hospital.png'
import axios from 'axios';
import _ from 'lodash';

import {
    Card,
    CardBody, CardHeader,
    CardSubtitle,
    Col, Collapse,
    Container, DropdownItem, Dropdown, DropdownMenu, DropdownToggle, ListGroup, ListGroupItem,
    Row, Button, CardTitle
} from "reactstrap";

export default class TCSevere extends React.Component {

    constructor(props) {
        super(props);
        let ctx = this;
        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false,
            dropdownOpen2: false,
            value: "",
            codes:[],
            collapse: false,
            hover: null,
            markers: [],
            markers_zips:[],
            types: [],
            lng: 1.4333,
            zoom: [10],
            selected: null,
            lat: 43.6000,
            filtre: "Aucun",
            filtre_age: "Aucun",
            filtre_barre: "Aucun",
            viewport: {
                width: 400,
                height: 400,
                latitude: 43.6000,
                longitude: 1.4333,
                zoom: 8
            },
            selectedStructure: null
        };
    }

    toggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    mapRef = React.createRef();

    componentDidMount() {
        window.addEventListener('resize', this.resize)
        this.resize();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resize)
    }

    resize = () => {

    this.handleViewportChange({
                                  width: "100%",
                                  height: 800
                              })
};
    handleViewportChange = (viewport) => {
        this.setState({
            viewport: { ...this.state.viewport, ...viewport }
        })
    };

    handleGeocoderViewportChange = (viewport) => {
        const geocoderDefaultOverrides = { transitionDuration: 1000 }

        return this.handleViewportChange({
            ...viewport,
            ...geocoderDefaultOverrides
        })
    };

    setStructure = (str) =>{
        this.setState({selectedStructure: str});
    };

    onSelect = (value) => {
        this.setState({value: value});
        this.setState({longitude: value.longitude});
        this.setState({latitude: value.latitude});
    };

    render() {

        return (
            <section>
                <Container>
                    <div className="filtres-actifs-structures">
                        <strong><p className="center-filtres">
                            <h3>Filtres actifs</h3>
                        </p>
                        </strong>
                        <hr/>
                        Filtre de catégorie : {this.state.filtre}<br/>
                        Filtre d'âge : {this.state.filtre_age}
                    </div>
                    <Row className="row-top-5">
                        <div className="card-filtres-liste">
                            <Dropdown className="margin-top-5 margin-right-5" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                                <DropdownToggle caret>
                                    Filtres
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem header>Filtres par catégorie</DropdownItem>
                                    <DropdownItem onClick={(e) => {
                                        e.preventDefault();
                                        // eslint-disable-next-line no-undef
                                        this.setState({filtre: "Services de Médecine & Chirurgie"});
                                        this.setState({filtre_age: "Aucun"});
                                    }}><button className="marker-btn"><img src={img_r} alt="Structure"/>Services de Médecine & Chirurgie</button></DropdownItem>
                                    <DropdownItem onClick={(e) => {
                                        e.preventDefault();
                                        // eslint-disable-next-line no-undef
                                        this.setState({filtre: "Structures de Rééducation"});
                                        this.setState({filtre_age: "Aucun"});
                                    }}><button className="marker-btn"><img src={img_r} alt="Structure"/>Structures de Rééducation</button></DropdownItem>
                                    <DropdownItem onClick={(e) => {
                                        e.preventDefault();
                                        // eslint-disable-next-line no-undef
                                        this.setState({filtre: "Structures Médico-sociales & Lieux de vie"});
                                        this.setState({filtre_age: "Aucun"});
                                    }}><button className="marker-btn"><img src={img_sml} alt="Structure"/>Structures Médico-sociales & Lieux de vie</button></DropdownItem>
                                    <DropdownItem onClick={(e) => {
                                        e.preventDefault();
                                        // eslint-disable-next-line no-undef
                                        this.setState({filtre: "Associations & Structures Occupationnelles"});
                                        this.setState({filtre_age: "Aucun"});
                                    }}><button className="marker-btn"><img src={img_aeso} alt="Structure"/>Associations & Structures Occupationnelles</button></DropdownItem>
                                    <DropdownItem onClick={(e) => {
                                        e.preventDefault();
                                        // eslint-disable-next-line no-undef
                                        this.setState({filtre: "SRéinsertion Professionnelle"});
                                        this.setState({filtre_age: "Aucun"});
                                    }}><button className="marker-btn"><img src={img_pro} alt="Structure"/></button>SRéinsertion Professionnelle</DropdownItem>
                                    <DropdownItem onClick={(e) => {
                                        e.preventDefault();
                                        // eslint-disable-next-line no-undef
                                        this.setState({filtre: "Service d'Accompagnement à Domicile"});
                                        this.setState({filtre_age: "Aucun"});
                                    }}><button className="marker-btn"><img src={img_sad} alt="Structure"/></button>Service d'Accompagnement à Domicile</DropdownItem>
                                    <DropdownItem onClick={(e) => {
                                        e.preventDefault();
                                        // eslint-disable-next-line no-undef
                                        this.setState({filtre: "Accompagnement Scolaire"});
                                        this.setState({filtre_age: "Aucun"});
                                    }}><button className="marker-btn"><img src={img_scol} alt="Structure"/></button>Accompagnement Scolaire</DropdownItem>
                                    <DropdownItem onClick={(e) => {
                                        e.preventDefault();
                                        // eslint-disable-next-line no-undef
                                        this.setState({filtre: "Structures de Psychiatrie et d’Accompagnement Psychologique"});
                                        this.setState({filtre_age: "Aucun"});
                                    }}><button className="marker-btn"><img src={img_phi} alt="Structure"/></button>Structures de Psychiatrie et d’Accompagnement Psychologique</DropdownItem>
                                    <DropdownItem onClick={(e) => {
                                        e.preventDefault();
                                        // eslint-disable-next-line no-undef
                                        this.setState({filtre: "Professionnels libéraux (formés au TC)"});
                                        this.setState({filtre_age: "Aucun"});
                                    }}><button className="marker-btn"><img src={hospital} alt="Structure"/></button>Professionnels libéraux (formés au traumatisme crânien)</DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem onClick={(e) => {
                                        e.preventDefault();
                                        // eslint-disable-next-line no-undef
                                        this.setState({filtre: "Aucun"});
                                        this.setState({filtre_age: "Aucun"});
                                    }}>Aucun filtre</DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem header>Filtres par âge</DropdownItem>
                                    <DropdownItem onClick={(e) => {
                                        e.preventDefault();
                                        // eslint-disable-next-line no-undef
                                        this.setState({filtre_age: "Enfants"});
                                    }}>Enfant</DropdownItem>
                                    <DropdownItem onClick={(e) => {
                                        e.preventDefault();
                                        // eslint-disable-next-line no-undef
                                        this.setState({filtre_age: "Adultes"});
                                    }}>Adulte</DropdownItem>
                                    <DropdownItem onClick={(e) => {
                                        e.preventDefault();
                                        // eslint-disable-next-line no-undef
                                        this.setState({filtre_age: "Personnes âgées"});
                                    }}>Personnes âgées</DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem onClick={(e) => {
                                        e.preventDefault();
                                        // eslint-disable-next-line no-undef
                                        this.setState({filtre_age: "Aucun"});
                                    }}>Aucun filtre</DropdownItem>
                                </DropdownMenu>
                            </Dropdown><br/>
                            <Button className="margin-top-5 margin-right-5" onClick={(e) => {
                                e.preventDefault();
                                // eslint-disable-next-line no-undef
                                this.setState({filtre_age: "Aucun"});
                                this.setState({filtre: "Aucun"});
                            }}>Aucun filtre</Button>
                        <input placeholder="Nom, sous-catégorie, ..." className="mapboxgl-ctrl-geocoder recherche" id="test" type="text"
                               onInput={(e) => {
                            let key = e.key;
                            console.log(key);
                            let touche = e.keyCode;
                            let nom = String.fromCharCode(touche);
                            if(key === "Backspace"){
                                if(this.state.filtre_barre === "Aucun"){
                                    this.setState({filtre_barre: "Aucun"});
                                }
                                else {
                                    this.setState({filtre_barre: this.state.filtre_barre.substr(-20, this.state.filtre_barre.length - 1)})
                                }
                            }
                            else if(key === "Space"){
                                if(this.state.filtre_barre === "Aucun"){
                                    this.setState({filtre_barre: "Aucun"});
                                }
                                else {
                                    this.setState({filtre_barre: this.state.filtre_barre + ' '});
                                }
                            }
                            else if((key === "CapsLock")||(key === "Shift")||(key === "Enter")||(key === "Dead")||(key === "ControlLeft")||(key === "Control")||(key === "Ctrl")){}
                            else{
                                if(this.state.filtre_barre === "Aucun"){
                                    this.setState({filtre_barre: e.key.toLowerCase()});
                                }
                                else {
                                    this.setState({filtre_barre: this.state.filtre_barre + e.key.toLowerCase()});
                                }
                            }
                        }
                        }/>
                        </div>
                            <h2 style={styles.section_titre}>
                                Résultat de recherche des structures
                            </h2>
                    </Row>
                    {structuresOcc.features.map((structure) => {
                        let ret = null;
                        switch(this.state.filtre){
                            case 'Aucun':
                                switch(this.state.filtre_age){
                                    case 'Aucun':
                                        if(this.state.filtre_barre === "Aucun"){
                                            ret =
                                                <Col xs="12" xl="6">
                                                    <Card style={styles.cardItem} className="card-size">
                                                        <CardHeader onClick={()=>this.flyTo(structure)} style={styles.cardHeader}>{structure.properties.denomination_structure}</CardHeader>
                                                        <CardBody>
                                                            <CardSubtitle style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}<br/>{structure.properties.categorie}<br/>{structure.properties.sous_categorie}</CardSubtitle>
                                                            <Collapse style={styles.subtitle} isOpen={this.state.collapse}>
                                                                <DropdownItem style={styles.divider_margin}divider />
                                                            </Collapse>
                                                        </CardBody>
                                                    </Card>
                                                </Col>
                                        }
                                        else{
                                            if((structure.properties.adresse.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.cp.toString().includes(this.state.filtre_barre))||(structure.properties.ville.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.denomination_structure.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.sous_categorie.toLowerCase().includes(this.state.filtre_barre))){
                                                ret =
                                                    <Col xs="12" xl="6">
                                                        <Card style={styles.cardItem}>
                                                            <CardHeader onClick={()=>this.flyTo(structure)} style={styles.cardHeader}>{structure.properties.denomination_structure}</CardHeader>
                                                            <CardBody>
                                                                <CardSubtitle style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}<br/>{structure.properties.categorie}<br/>{structure.properties.sous_categorie}</CardSubtitle>
                                                                <Collapse style={styles.subtitle} isOpen={this.state.collapse}>
                                                                    <DropdownItem style={styles.divider_margin}divider />
                                                                </Collapse>
                                                            </CardBody>
                                                        </Card>
                                                    </Col>
                                            }
                                        }
                                        break;
                                    case 'Adultes':
                                        if(structure.properties.type_personne.includes(this.state.filtre_age)){
                                            if(this.state.filtre_barre === "Aucun"){
                                                ret =
                                                    <Col xs="12" xl="6">
                                                        <Card style={styles.cardItem}>
                                                            <CardHeader onClick={()=>this.flyTo(structure)} style={styles.cardHeader}>{structure.properties.denomination_structure}</CardHeader>
                                                            <CardBody>
                                                                <CardSubtitle style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}<br/>{structure.properties.categorie}<br/>{structure.properties.sous_categorie}</CardSubtitle>
                                                                <Collapse style={styles.subtitle} isOpen={this.state.collapse}>
                                                                    <DropdownItem style={styles.divider_margin}divider />
                                                                </Collapse>
                                                            </CardBody>
                                                        </Card>
                                                    </Col>
                                            }
                                            else{
                                                if((structure.properties.adresse.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.cp.toString().includes(this.state.filtre_barre))||(structure.properties.ville.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.denomination_structure.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.sous_categorie.toLowerCase().includes(this.state.filtre_barre))){
                                                    ret =
                                                        <Col xs="12" xl="6">
                                                            <Card style={styles.cardItem}>
                                                                <CardHeader onClick={()=>this.flyTo(structure)} style={styles.cardHeader}>{structure.properties.denomination_structure}</CardHeader>
                                                                <CardBody>
                                                                    <CardSubtitle style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}<br/>{structure.properties.categorie}<br/>{structure.properties.sous_categorie}</CardSubtitle>
                                                                    <Collapse style={styles.subtitle} isOpen={this.state.collapse}>
                                                                        <DropdownItem style={styles.divider_margin}divider />
                                                                    </Collapse>
                                                                </CardBody>
                                                            </Card>
                                                        </Col>
                                                }
                                            }
                                        }
                                        break;
                                    case 'Enfants':
                                        if(structure.properties.type_personne.includes(this.state.filtre_age)){
                                            if(this.state.filtre_barre === "Aucun"){
                                                ret =
                                                    <Col xs="12" xl="6">
                                                        <Card style={styles.cardItem}>
                                                            <CardHeader onClick={()=>this.flyTo(structure)} style={styles.cardHeader}>{structure.properties.denomination_structure}</CardHeader>
                                                            <CardBody>
                                                                <CardSubtitle style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}<br/>{structure.properties.categorie}<br/>{structure.properties.sous_categorie}</CardSubtitle>
                                                                <Collapse style={styles.subtitle} isOpen={this.state.collapse}>
                                                                    <DropdownItem style={styles.divider_margin}divider />
                                                                </Collapse>
                                                            </CardBody>
                                                        </Card>
                                                    </Col>
                                            }
                                            else{
                                                if((structure.properties.adresse.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.cp.toString().includes(this.state.filtre_barre))||(structure.properties.ville.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.denomination_structure.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.sous_categorie.toLowerCase().includes(this.state.filtre_barre))){
                                                    ret =
                                                        <Col xs="12" xl="6">
                                                            <Card style={styles.cardItem}>
                                                                <CardHeader onClick={()=>this.flyTo(structure)} style={styles.cardHeader}>{structure.properties.denomination_structure}</CardHeader>
                                                                <CardBody>
                                                                    <CardSubtitle style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}<br/>{structure.properties.categorie}<br/>{structure.properties.sous_categorie}</CardSubtitle>
                                                                    <Collapse style={styles.subtitle} isOpen={this.state.collapse}>
                                                                        <DropdownItem style={styles.divider_margin}divider />
                                                                    </Collapse>
                                                                </CardBody>
                                                            </Card>
                                                        </Col>
                                                }
                                            }
                                        }
                                        break;
                                    case 'Personnes âgées':
                                        if(structure.properties.type_personne.includes(this.state.filtre_age)){
                                            if(this.state.filtre_barre === "Aucun"){
                                                ret =
                                                    <Col xs="12" xl="6">
                                                        <Card style={styles.cardItem}>
                                                            <CardHeader onClick={()=>this.flyTo(structure)} style={styles.cardHeader}>{structure.properties.denomination_structure}</CardHeader>
                                                            <CardBody>
                                                                <CardSubtitle style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}<br/>{structure.properties.categorie}<br/>{structure.properties.sous_categorie}</CardSubtitle>
                                                                <Collapse style={styles.subtitle} isOpen={this.state.collapse}>
                                                                    <DropdownItem style={styles.divider_margin}divider />
                                                                </Collapse>
                                                            </CardBody>
                                                        </Card>
                                                    </Col>
                                            }
                                            else{
                                                if((structure.properties.adresse.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.cp.toString().includes(this.state.filtre_barre))||(structure.properties.ville.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.denomination_structure.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.sous_categorie.toLowerCase().includes(this.state.filtre_barre))){
                                                    ret =
                                                        <Col xs="12" xl="6">
                                                            <Card style={styles.cardItem}>
                                                                <CardHeader onClick={()=>this.flyTo(structure)} style={styles.cardHeader}>{structure.properties.denomination_structure}</CardHeader>
                                                                <CardBody>
                                                                    <CardSubtitle style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}<br/>{structure.properties.categorie}<br/>{structure.properties.sous_categorie}</CardSubtitle>
                                                                    <Collapse style={styles.subtitle} isOpen={this.state.collapse}>
                                                                        <DropdownItem style={styles.divider_margin}divider />
                                                                    </Collapse>
                                                                </CardBody>
                                                            </Card>
                                                        </Col>
                                                }
                                            }
                                        }
                                        break;
                                }
                                return ret;
                            case "Structures Médico-sociales & Lieux de vie":
                                if (structure.properties.categorie === this.state.filtre) {
                                    switch (this.state.filtre_age) {
                                        case 'Aucun':
                                            if (this.state.filtre_barre === "Aucun") {
                                                ret =
                                                    <Col xs="12" xl="6">
                                                        <Card style={styles.cardItem}>
                                                            <CardHeader
                                                                onClick={() => this.flyTo(structure)}
                                                                style={styles.cardHeader}>{structure.properties.denomination_structure}</CardHeader>
                                                            <CardBody>
                                                                <CardSubtitle
                                                                    style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}<br/>{structure.properties.categorie}<br/>{structure.properties.sous_categorie}
                                                                </CardSubtitle>
                                                                <Collapse style={styles.subtitle}
                                                                          isOpen={this.state.collapse}>
                                                                    <DropdownItem
                                                                        style={styles.divider_margin}
                                                                        divider/>
                                                                </Collapse>
                                                            </CardBody>
                                                        </Card>
                                                    </Col>
                                            } else {
                                                if((structure.properties.adresse.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.cp.toString().includes(this.state.filtre_barre))||(structure.properties.ville.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.denomination_structure.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.sous_categorie.toLowerCase().includes(this.state.filtre_barre))){
                                                    ret =
                                                        <Col xs="12" xl="6">
                                                            <Card style={styles.cardItem}>
                                                                <CardHeader
                                                                    onClick={() => this.flyTo(structure)}
                                                                    style={styles.cardHeader}>{structure.properties.denomination_structure}</CardHeader>
                                                                <CardBody>
                                                                    <CardSubtitle
                                                                        style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}<br/>{structure.properties.categorie}<br/>{structure.properties.sous_categorie}
                                                                    </CardSubtitle>
                                                                    <Collapse style={styles.subtitle}
                                                                              isOpen={this.state.collapse}>
                                                                        <DropdownItem
                                                                            style={styles.divider_margin}
                                                                            divider/>
                                                                    </Collapse>
                                                                </CardBody>
                                                            </Card>
                                                        </Col>
                                                }
                                            }
                                            break;
                                        case 'Adultes':
                                            if (structure.properties.type_personne.includes(this.state.filtre_age)) {
                                                if (this.state.filtre_barre === "Aucun") {
                                                    ret =
                                                        <Col xs="12" xl="6">
                                                            <Card style={styles.cardItem}>
                                                                <CardHeader
                                                                    onClick={() => this.flyTo(structure)}
                                                                    style={styles.cardHeader}>{structure.properties.denomination_structure}</CardHeader>
                                                                <CardBody>
                                                                    <CardSubtitle
                                                                        style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}
                                                                    </CardSubtitle>
                                                                    <Collapse style={styles.subtitle}
                                                                              isOpen={this.state.collapse}>
                                                                        <DropdownItem
                                                                            style={styles.divider_margin}
                                                                            divider/>
                                                                        Anim pariatur cliche reprehenderit,
                                                                        enim eiusmod high life accusamus
                                                                        terry richardson ad squid. Nihil
                                                                        anim keffiyeh helvetica, craft beer
                                                                        labore wes anderson cred
                                                                        nesciunt sapiente ea proident.
                                                                    </Collapse>
                                                                </CardBody>
                                                            </Card>
                                                        </Col>
                                                } else {
                                                    if((structure.properties.adresse.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.cp.toString().includes(this.state.filtre_barre))||(structure.properties.ville.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.denomination_structure.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.sous_categorie.toLowerCase().includes(this.state.filtre_barre))){
                                                        ret =
                                                            <Col xs="12" xl="6">
                                                                <Card style={styles.cardItem}>
                                                                    <CardHeader
                                                                        onClick={() => this.flyTo(structure)}
                                                                        style={styles.cardHeader}>{structure.properties.denomination_structure}</CardHeader>
                                                                    <CardBody>
                                                                        <CardSubtitle
                                                                            style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}
                                                                        </CardSubtitle>
                                                                        <Collapse style={styles.subtitle}
                                                                                  isOpen={this.state.collapse}>
                                                                            <DropdownItem
                                                                                style={styles.divider_margin}
                                                                                divider/>
                                                                            Anim pariatur cliche
                                                                            reprehenderit,
                                                                            enim eiusmod high life accusamus
                                                                            terry richardson ad squid. Nihil
                                                                            anim keffiyeh helvetica, craft
                                                                            beer labore wes anderson cred
                                                                            nesciunt sapiente ea proident.
                                                                        </Collapse>
                                                                    </CardBody>
                                                                </Card>
                                                            </Col>
                                                    }
                                                }
                                            }
                                            break;
                                        case 'Enfants':
                                            if (structure.properties.type_personne.includes(this.state.filtre_age)) {
                                                if (this.state.filtre_barre === "Aucun") {
                                                    ret =
                                                        <Col xs="12" xl="6">
                                                            <Card style={styles.cardItem}>
                                                                <CardHeader
                                                                    onClick={() => this.flyTo(structure)}
                                                                    style={styles.cardHeader}>{structure.properties.denomination_structure}</CardHeader>
                                                                <CardBody>
                                                                    <CardSubtitle
                                                                        style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}
                                                                    </CardSubtitle>
                                                                    <Collapse style={styles.subtitle}
                                                                              isOpen={this.state.collapse}>
                                                                        <DropdownItem
                                                                            style={styles.divider_margin}
                                                                            divider/>
                                                                        Anim pariatur cliche reprehenderit,
                                                                        enim eiusmod high life accusamus
                                                                        terry richardson ad squid. Nihil
                                                                        anim keffiyeh helvetica, craft beer
                                                                        labore wes anderson cred
                                                                        nesciunt sapiente ea proident.
                                                                    </Collapse>
                                                                </CardBody>
                                                            </Card>
                                                        </Col>
                                                } else {
                                                    if((structure.properties.adresse.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.cp.toString().includes(this.state.filtre_barre))||(structure.properties.ville.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.denomination_structure.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.sous_categorie.toLowerCase().includes(this.state.filtre_barre))){
                                                        ret =
                                                            <Col xs="12" xl="6">
                                                                <Card style={styles.cardItem}>
                                                                    <CardHeader
                                                                        onClick={() => this.flyTo(structure)}
                                                                        style={styles.cardHeader}>{structure.properties.denomination_structure}</CardHeader>
                                                                    <CardBody>
                                                                        <CardSubtitle
                                                                            style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}
                                                                        </CardSubtitle>
                                                                        <Collapse style={styles.subtitle}
                                                                                  isOpen={this.state.collapse}>
                                                                            <DropdownItem
                                                                                style={styles.divider_margin}
                                                                                divider/>
                                                                            Anim pariatur cliche
                                                                            reprehenderit,
                                                                            enim eiusmod high life accusamus
                                                                            terry richardson ad squid. Nihil
                                                                            anim keffiyeh helvetica, craft
                                                                            beer labore wes anderson cred
                                                                            nesciunt sapiente ea proident.
                                                                        </Collapse>
                                                                    </CardBody>
                                                                </Card>
                                                            </Col>
                                                    }
                                                }
                                            }
                                            break;
                                        case 'Personnes âgées':
                                            if (structure.properties.type_personne.includes(this.state.filtre_age)) {
                                                if (this.state.filtre_barre === "Aucun") {
                                                    ret =
                                                        <Col xs="12" xl="6">
                                                            <Card style={styles.cardItem}>
                                                                <CardHeader
                                                                    onClick={() => this.flyTo(structure)}
                                                                    style={styles.cardHeader}>{structure.properties.denomination_structure}</CardHeader>
                                                                <CardBody>
                                                                    <CardSubtitle
                                                                        style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}
                                                                    </CardSubtitle>
                                                                    <Collapse style={styles.subtitle}
                                                                              isOpen={this.state.collapse}>
                                                                        <DropdownItem
                                                                            style={styles.divider_margin}
                                                                            divider/>
                                                                        Anim pariatur cliche reprehenderit,
                                                                        enim eiusmod high life accusamus
                                                                        terry richardson ad squid. Nihil
                                                                        anim keffiyeh helvetica, craft beer
                                                                        labore wes anderson cred
                                                                        nesciunt sapiente ea proident.
                                                                    </Collapse>
                                                                </CardBody>
                                                            </Card>
                                                        </Col>
                                                } else {
                                                    if((structure.properties.adresse.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.cp.toString().includes(this.state.filtre_barre))||(structure.properties.ville.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.denomination_structure.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.sous_categorie.toLowerCase().includes(this.state.filtre_barre))){
                                                        ret =
                                                            <Col xs="12" xl="6">
                                                                <Card style={styles.cardItem}>
                                                                    <CardHeader
                                                                        onClick={() => this.flyTo(structure)}
                                                                        style={styles.cardHeader}>{structure.properties.denomination_structure}</CardHeader>
                                                                    <CardBody>
                                                                        <CardSubtitle
                                                                            style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}
                                                                        </CardSubtitle>
                                                                        <Collapse style={styles.subtitle}
                                                                                  isOpen={this.state.collapse}>
                                                                            <DropdownItem
                                                                                style={styles.divider_margin}
                                                                                divider/>
                                                                            Anim pariatur cliche
                                                                            reprehenderit,
                                                                            enim eiusmod high life accusamus
                                                                            terry richardson ad squid. Nihil
                                                                            anim keffiyeh helvetica, craft
                                                                            beer labore wes anderson cred
                                                                            nesciunt sapiente ea proident.
                                                                        </Collapse>
                                                                    </CardBody>
                                                                </Card>
                                                            </Col>
                                                    }
                                                }
                                            }
                                            break;
                                    }
                                }
                                return ret;
                            case "Services de Médecine & Chirurgie":
                                if (structure.properties.categorie === this.state.filtre) {
                                    switch (this.state.filtre_age) {
                                        case 'Aucun':
                                            if (this.state.filtre_barre === "Aucun") {
                                                ret =
                                                    <Col xs="12" xl="6">
                                                        <Card style={styles.cardItem}>
                                                            <CardHeader
                                                                onClick={() => this.flyTo(structure)}
                                                                style={styles.cardHeader}>{structure.properties.denomination_structure}</CardHeader>
                                                            <CardBody>
                                                                <CardSubtitle
                                                                    style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}<br/>{structure.properties.categorie}<br/>{structure.properties.sous_categorie}
                                                                </CardSubtitle>
                                                                <Collapse style={styles.subtitle}
                                                                          isOpen={this.state.collapse}>
                                                                    <DropdownItem
                                                                        style={styles.divider_margin}
                                                                        divider/>
                                                                </Collapse>
                                                            </CardBody>
                                                        </Card>
                                                    </Col>
                                            } else {
                                                if((structure.properties.adresse.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.cp.toString().includes(this.state.filtre_barre))||(structure.properties.ville.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.denomination_structure.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.sous_categorie.toLowerCase().includes(this.state.filtre_barre))){
                                                    ret =
                                                        <Col xs="12" xl="6">
                                                            <Card style={styles.cardItem}>
                                                                <CardHeader
                                                                    onClick={() => this.flyTo(structure)}
                                                                    style={styles.cardHeader}>{structure.properties.denomination_structure}</CardHeader>
                                                                <CardBody>
                                                                    <CardSubtitle
                                                                        style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}<br/>{structure.properties.categorie}<br/>{structure.properties.sous_categorie}
                                                                    </CardSubtitle>
                                                                    <Collapse style={styles.subtitle}
                                                                              isOpen={this.state.collapse}>
                                                                        <DropdownItem
                                                                            style={styles.divider_margin}
                                                                            divider/>
                                                                    </Collapse>
                                                                </CardBody>
                                                            </Card>
                                                        </Col>
                                                }
                                            }
                                            break;
                                        case 'Adultes':
                                            if (structure.properties.type_personne.includes(this.state.filtre_age)) {
                                                if (this.state.filtre_barre === "Aucun") {
                                                    ret =
                                                        <Col xs="12" xl="6">
                                                            <Card style={styles.cardItem}>
                                                                <CardHeader
                                                                    onClick={() => this.flyTo(structure)}
                                                                    style={styles.cardHeader}>{structure.properties.denomination_structure}</CardHeader>
                                                                <CardBody>
                                                                    <CardSubtitle
                                                                        style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}
                                                                    </CardSubtitle>
                                                                    <Collapse style={styles.subtitle}
                                                                              isOpen={this.state.collapse}>
                                                                        <DropdownItem
                                                                            style={styles.divider_margin}
                                                                            divider/>
                                                                        Anim pariatur cliche reprehenderit,
                                                                        enim eiusmod high life accusamus
                                                                        terry richardson ad squid. Nihil
                                                                        anim keffiyeh helvetica, craft beer
                                                                        labore wes anderson cred
                                                                        nesciunt sapiente ea proident.
                                                                    </Collapse>
                                                                </CardBody>
                                                            </Card>
                                                        </Col>
                                                } else {
                                                    if((structure.properties.adresse.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.cp.toString().includes(this.state.filtre_barre))||(structure.properties.ville.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.denomination_structure.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.sous_categorie.toLowerCase().includes(this.state.filtre_barre))){
                                                        ret =
                                                            <Col xs="12" xl="6">
                                                                <Card style={styles.cardItem}>
                                                                    <CardHeader
                                                                        onClick={() => this.flyTo(structure)}
                                                                        style={styles.cardHeader}>{structure.properties.denomination_structure}</CardHeader>
                                                                    <CardBody>
                                                                        <CardSubtitle
                                                                            style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}
                                                                        </CardSubtitle>
                                                                        <Collapse style={styles.subtitle}
                                                                                  isOpen={this.state.collapse}>
                                                                            <DropdownItem
                                                                                style={styles.divider_margin}
                                                                                divider/>
                                                                            Anim pariatur cliche
                                                                            reprehenderit,
                                                                            enim eiusmod high life accusamus
                                                                            terry richardson ad squid. Nihil
                                                                            anim keffiyeh helvetica, craft
                                                                            beer labore wes anderson cred
                                                                            nesciunt sapiente ea proident.
                                                                        </Collapse>
                                                                    </CardBody>
                                                                </Card>
                                                            </Col>
                                                    }
                                                }
                                            }
                                            break;
                                        case 'Enfants':
                                            if (structure.properties.type_personne.includes(this.state.filtre_age)) {
                                                if (this.state.filtre_barre === "Aucun") {
                                                    ret =
                                                        <Col xs="12" xl="6">
                                                            <Card style={styles.cardItem}>
                                                                <CardHeader
                                                                    onClick={() => this.flyTo(structure)}
                                                                    style={styles.cardHeader}>{structure.properties.denomination_structure}</CardHeader>
                                                                <CardBody>
                                                                    <CardSubtitle
                                                                        style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}
                                                                    </CardSubtitle>
                                                                    <Collapse style={styles.subtitle}
                                                                              isOpen={this.state.collapse}>
                                                                        <DropdownItem
                                                                            style={styles.divider_margin}
                                                                            divider/>
                                                                        Anim pariatur cliche reprehenderit,
                                                                        enim eiusmod high life accusamus
                                                                        terry richardson ad squid. Nihil
                                                                        anim keffiyeh helvetica, craft beer
                                                                        labore wes anderson cred
                                                                        nesciunt sapiente ea proident.
                                                                    </Collapse>
                                                                </CardBody>
                                                            </Card>
                                                        </Col>
                                                } else {
                                                    if((structure.properties.adresse.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.cp.toString().includes(this.state.filtre_barre))||(structure.properties.ville.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.denomination_structure.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.sous_categorie.toLowerCase().includes(this.state.filtre_barre))){
                                                        ret =
                                                            <Col xs="12" xl="6">
                                                                <Card style={styles.cardItem}>
                                                                    <CardHeader
                                                                        onClick={() => this.flyTo(structure)}
                                                                        style={styles.cardHeader}>{structure.properties.denomination_structure}</CardHeader>
                                                                    <CardBody>
                                                                        <CardSubtitle
                                                                            style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}
                                                                        </CardSubtitle>
                                                                        <Collapse style={styles.subtitle}
                                                                                  isOpen={this.state.collapse}>
                                                                            <DropdownItem
                                                                                style={styles.divider_margin}
                                                                                divider/>
                                                                            Anim pariatur cliche
                                                                            reprehenderit,
                                                                            enim eiusmod high life accusamus
                                                                            terry richardson ad squid. Nihil
                                                                            anim keffiyeh helvetica, craft
                                                                            beer labore wes anderson cred
                                                                            nesciunt sapiente ea proident.
                                                                        </Collapse>
                                                                    </CardBody>
                                                                </Card>
                                                            </Col>
                                                    }
                                                }
                                            }
                                            break;
                                        case 'Personnes âgées':
                                            if (structure.properties.type_personne.includes(this.state.filtre_age)) {
                                                if (this.state.filtre_barre === "Aucun") {
                                                    ret =
                                                        <Col xs="12" xl="6">
                                                            <Card style={styles.cardItem}>
                                                                <CardHeader
                                                                    onClick={() => this.flyTo(structure)}
                                                                    style={styles.cardHeader}>{structure.properties.denomination_structure}</CardHeader>
                                                                <CardBody>
                                                                    <CardSubtitle
                                                                        style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}
                                                                    </CardSubtitle>
                                                                    <Collapse style={styles.subtitle}
                                                                              isOpen={this.state.collapse}>
                                                                        <DropdownItem
                                                                            style={styles.divider_margin}
                                                                            divider/>
                                                                        Anim pariatur cliche reprehenderit,
                                                                        enim eiusmod high life accusamus
                                                                        terry richardson ad squid. Nihil
                                                                        anim keffiyeh helvetica, craft beer
                                                                        labore wes anderson cred
                                                                        nesciunt sapiente ea proident.
                                                                    </Collapse>
                                                                </CardBody>
                                                            </Card>
                                                        </Col>
                                                } else {
                                                    if((structure.properties.adresse.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.cp.toString().includes(this.state.filtre_barre))||(structure.properties.ville.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.denomination_structure.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.sous_categorie.toLowerCase().includes(this.state.filtre_barre))){
                                                        ret =
                                                            <Col xs="12" xl="6">
                                                                <Card style={styles.cardItem}>
                                                                    <CardHeader
                                                                        onClick={() => this.flyTo(structure)}
                                                                        style={styles.cardHeader}>{structure.properties.denomination_structure}</CardHeader>
                                                                    <CardBody>
                                                                        <CardSubtitle
                                                                            style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}
                                                                        </CardSubtitle>
                                                                        <Collapse style={styles.subtitle}
                                                                                  isOpen={this.state.collapse}>
                                                                            <DropdownItem
                                                                                style={styles.divider_margin}
                                                                                divider/>
                                                                            Anim pariatur cliche
                                                                            reprehenderit,
                                                                            enim eiusmod high life accusamus
                                                                            terry richardson ad squid. Nihil
                                                                            anim keffiyeh helvetica, craft
                                                                            beer labore wes anderson cred
                                                                            nesciunt sapiente ea proident.
                                                                        </Collapse>
                                                                    </CardBody>
                                                                </Card>
                                                            </Col>
                                                    }
                                                }
                                            }
                                            break;
                                    }
                                }
                                return ret;
                            case "Structures de Rééducation":
                                if(structure.properties.categorie === this.state.filtre) {
                                    switch (this.state.filtre_age) {
                                        case 'Aucun':
                                            if (this.state.filtre_barre === "Aucun") {
                                                ret =
                                                    <Col xs="12" xl="6">
                                                        <Card style={styles.cardItem}>
                                                            <CardHeader
                                                                onClick={() => this.flyTo(structure)}
                                                                style={styles.cardHeader}>{structure.properties.denomination_structure}</CardHeader>
                                                            <CardBody>
                                                                <CardSubtitle
                                                                    style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}<br/>{structure.properties.categorie}<br/>{structure.properties.sous_categorie}
                                                                </CardSubtitle>
                                                                <Collapse style={styles.subtitle}
                                                                          isOpen={this.state.collapse}>
                                                                    <DropdownItem
                                                                        style={styles.divider_margin}
                                                                        divider/>
                                                                </Collapse>
                                                            </CardBody>
                                                        </Card>
                                                    </Col>
                                            } else {
                                                if((structure.properties.adresse.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.cp.toString().includes(this.state.filtre_barre))||(structure.properties.ville.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.denomination_structure.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.sous_categorie.toLowerCase().includes(this.state.filtre_barre))){
                                                    ret =
                                                        <Col xs="12" xl="6">
                                                            <Card style={styles.cardItem}>
                                                                <CardHeader
                                                                    onClick={() => this.flyTo(structure)}
                                                                    style={styles.cardHeader}>{structure.properties.denomination_structure}</CardHeader>
                                                                <CardBody>
                                                                    <CardSubtitle
                                                                        style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}<br/>{structure.properties.categorie}<br/>{structure.properties.sous_categorie}
                                                                    </CardSubtitle>
                                                                    <Collapse style={styles.subtitle}
                                                                              isOpen={this.state.collapse}>
                                                                        <DropdownItem
                                                                            style={styles.divider_margin}
                                                                            divider/>
                                                                    </Collapse>
                                                                </CardBody>
                                                            </Card>
                                                        </Col>
                                                }
                                            }
                                            break;
                                        case 'Adultes':
                                            if (structure.properties.type_personne.includes(this.state.filtre_age)) {
                                                if (this.state.filtre_barre === "Aucun") {
                                                    ret =
                                                        <Col xs="12" xl="6">
                                                            <Card style={styles.cardItem}>
                                                                <CardHeader
                                                                    onClick={() => this.flyTo(structure)}
                                                                    style={styles.cardHeader}>{structure.properties.denomination_structure}</CardHeader>
                                                                <CardBody>
                                                                    <CardSubtitle
                                                                        style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}
                                                                    </CardSubtitle>
                                                                    <Collapse style={styles.subtitle}
                                                                              isOpen={this.state.collapse}>
                                                                        <DropdownItem
                                                                            style={styles.divider_margin}
                                                                            divider/>
                                                                        Anim pariatur cliche reprehenderit,
                                                                        enim eiusmod high life accusamus
                                                                        terry richardson ad squid. Nihil
                                                                        anim keffiyeh helvetica, craft beer
                                                                        labore wes anderson cred
                                                                        nesciunt sapiente ea proident.
                                                                    </Collapse>
                                                                </CardBody>
                                                            </Card>
                                                        </Col>
                                                } else {
                                                    if((structure.properties.adresse.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.cp.toString().includes(this.state.filtre_barre))||(structure.properties.ville.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.denomination_structure.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.sous_categorie.toLowerCase().includes(this.state.filtre_barre))){
                                                        ret =
                                                            <Col xs="12" xl="6">
                                                                <Card style={styles.cardItem}>
                                                                    <CardHeader
                                                                        onClick={() => this.flyTo(structure)}
                                                                        style={styles.cardHeader}>{structure.properties.denomination_structure}</CardHeader>
                                                                    <CardBody>
                                                                        <CardSubtitle
                                                                            style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}
                                                                        </CardSubtitle>
                                                                        <Collapse style={styles.subtitle}
                                                                                  isOpen={this.state.collapse}>
                                                                            <DropdownItem
                                                                                style={styles.divider_margin}
                                                                                divider/>
                                                                            Anim pariatur cliche
                                                                            reprehenderit,
                                                                            enim eiusmod high life accusamus
                                                                            terry richardson ad squid. Nihil
                                                                            anim keffiyeh helvetica, craft
                                                                            beer labore wes anderson cred
                                                                            nesciunt sapiente ea proident.
                                                                        </Collapse>
                                                                    </CardBody>
                                                                </Card>
                                                            </Col>
                                                    }
                                                }
                                            }
                                            break;
                                        case 'Enfants':
                                            if (structure.properties.type_personne.includes(this.state.filtre_age)) {
                                                if (this.state.filtre_barre === "Aucun") {
                                                    ret =
                                                        <Col xs="12" xl="6">
                                                            <Card style={styles.cardItem}>
                                                                <CardHeader
                                                                    onClick={() => this.flyTo(structure)}
                                                                    style={styles.cardHeader}>{structure.properties.denomination_structure}</CardHeader>
                                                                <CardBody>
                                                                    <CardSubtitle
                                                                        style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}
                                                                    </CardSubtitle>
                                                                    <Collapse style={styles.subtitle}
                                                                              isOpen={this.state.collapse}>
                                                                        <DropdownItem
                                                                            style={styles.divider_margin}
                                                                            divider/>
                                                                        Anim pariatur cliche reprehenderit,
                                                                        enim eiusmod high life accusamus
                                                                        terry richardson ad squid. Nihil
                                                                        anim keffiyeh helvetica, craft beer
                                                                        labore wes anderson cred
                                                                        nesciunt sapiente ea proident.
                                                                    </Collapse>
                                                                </CardBody>
                                                            </Card>
                                                        </Col>
                                                } else {
                                                    if((structure.properties.adresse.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.cp.toString().includes(this.state.filtre_barre))||(structure.properties.ville.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.denomination_structure.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.sous_categorie.toLowerCase().includes(this.state.filtre_barre))){
                                                        ret =
                                                            <Col xs="12" xl="6">
                                                                <Card style={styles.cardItem}>
                                                                    <CardHeader
                                                                        onClick={() => this.flyTo(structure)}
                                                                        style={styles.cardHeader}>{structure.properties.denomination_structure}</CardHeader>
                                                                    <CardBody>
                                                                        <CardSubtitle
                                                                            style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}
                                                                        </CardSubtitle>
                                                                        <Collapse style={styles.subtitle}
                                                                                  isOpen={this.state.collapse}>
                                                                            <DropdownItem
                                                                                style={styles.divider_margin}
                                                                                divider/>
                                                                            Anim pariatur cliche
                                                                            reprehenderit,
                                                                            enim eiusmod high life accusamus
                                                                            terry richardson ad squid. Nihil
                                                                            anim keffiyeh helvetica, craft
                                                                            beer labore wes anderson cred
                                                                            nesciunt sapiente ea proident.
                                                                        </Collapse>
                                                                    </CardBody>
                                                                </Card>
                                                            </Col>
                                                    }
                                                }
                                            }
                                            break;
                                        case 'Personnes âgées':
                                            if (structure.properties.type_personne.includes(this.state.filtre_age)) {
                                                if (this.state.filtre_barre === "Aucun") {
                                                    ret =
                                                        <Col xs="12" xl="6">
                                                            <Card style={styles.cardItem}>
                                                                <CardHeader
                                                                    onClick={() => this.flyTo(structure)}
                                                                    style={styles.cardHeader}>{structure.properties.denomination_structure}</CardHeader>
                                                                <CardBody>
                                                                    <CardSubtitle
                                                                        style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}
                                                                    </CardSubtitle>
                                                                    <Collapse style={styles.subtitle}
                                                                              isOpen={this.state.collapse}>
                                                                        <DropdownItem
                                                                            style={styles.divider_margin}
                                                                            divider/>
                                                                        Anim pariatur cliche reprehenderit,
                                                                        enim eiusmod high life accusamus
                                                                        terry richardson ad squid. Nihil
                                                                        anim keffiyeh helvetica, craft beer
                                                                        labore wes anderson cred
                                                                        nesciunt sapiente ea proident.
                                                                    </Collapse>
                                                                </CardBody>
                                                            </Card>
                                                        </Col>
                                                } else {
                                                    if((structure.properties.adresse.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.cp.toString().includes(this.state.filtre_barre))||(structure.properties.ville.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.denomination_structure.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.sous_categorie.toLowerCase().includes(this.state.filtre_barre))){
                                                        ret =
                                                            <Col xs="12" xl="6">
                                                                <Card style={styles.cardItem}>
                                                                    <CardHeader
                                                                        onClick={() => this.flyTo(structure)}
                                                                        style={styles.cardHeader}>{structure.properties.denomination_structure}</CardHeader>
                                                                    <CardBody>
                                                                        <CardSubtitle
                                                                            style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}
                                                                        </CardSubtitle>
                                                                        <Collapse style={styles.subtitle}
                                                                                  isOpen={this.state.collapse}>
                                                                            <DropdownItem
                                                                                style={styles.divider_margin}
                                                                                divider/>
                                                                            Anim pariatur cliche
                                                                            reprehenderit,
                                                                            enim eiusmod high life accusamus
                                                                            terry richardson ad squid. Nihil
                                                                            anim keffiyeh helvetica, craft
                                                                            beer labore wes anderson cred
                                                                            nesciunt sapiente ea proident.
                                                                        </Collapse>
                                                                    </CardBody>
                                                                </Card>
                                                            </Col>
                                                    }
                                                }
                                            }
                                            break;
                                    }
                                }
                                return ret;
                            case "Associations & Structures Occupationnelles":
                                if (structure.properties.categorie === this.state.filtre) {
                                    switch (this.state.filtre_age) {
                                        case 'Aucun':
                                            if (this.state.filtre_barre === "Aucun") {
                                                ret =
                                                    <Col xs="12" xl="6">
                                                        <Card style={styles.cardItem}>
                                                            <CardHeader
                                                                onClick={() => this.flyTo(structure)}
                                                                style={styles.cardHeader}>{structure.properties.denomination_structure}</CardHeader>
                                                            <CardBody>
                                                                <CardSubtitle
                                                                    style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}<br/>{structure.properties.categorie}<br/>{structure.properties.sous_categorie}
                                                                </CardSubtitle>
                                                                <Collapse style={styles.subtitle}
                                                                          isOpen={this.state.collapse}>
                                                                    <DropdownItem
                                                                        style={styles.divider_margin}
                                                                        divider/>
                                                                </Collapse>
                                                            </CardBody>
                                                        </Card>
                                                    </Col>
                                            } else {
                                                if((structure.properties.adresse.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.cp.toString().includes(this.state.filtre_barre))||(structure.properties.ville.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.denomination_structure.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.sous_categorie.toLowerCase().includes(this.state.filtre_barre))){
                                                    ret =
                                                        <Col xs="12" xl="6">
                                                            <Card style={styles.cardItem}>
                                                                <CardHeader
                                                                    onClick={() => this.flyTo(structure)}
                                                                    style={styles.cardHeader}>{structure.properties.denomination_structure}</CardHeader>
                                                                <CardBody>
                                                                    <CardSubtitle
                                                                        style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}<br/>{structure.properties.categorie}<br/>{structure.properties.sous_categorie}
                                                                    </CardSubtitle>
                                                                    <Collapse style={styles.subtitle}
                                                                              isOpen={this.state.collapse}>
                                                                        <DropdownItem
                                                                            style={styles.divider_margin}
                                                                            divider/>
                                                                    </Collapse>
                                                                </CardBody>
                                                            </Card>
                                                        </Col>
                                                }
                                            }
                                            break;
                                        case 'Adultes':
                                            if (structure.properties.type_personne.includes(this.state.filtre_age)) {
                                                if (this.state.filtre_barre === "Aucun") {
                                                    ret =
                                                        <Col xs="12" xl="6">
                                                            <Card style={styles.cardItem}>
                                                                <CardHeader
                                                                    onClick={() => this.flyTo(structure)}
                                                                    style={styles.cardHeader}>{structure.properties.denomination_structure}</CardHeader>
                                                                <CardBody>
                                                                    <CardSubtitle
                                                                        style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}
                                                                    </CardSubtitle>
                                                                    <Collapse style={styles.subtitle}
                                                                              isOpen={this.state.collapse}>
                                                                        <DropdownItem
                                                                            style={styles.divider_margin}
                                                                            divider/>
                                                                        Anim pariatur cliche reprehenderit,
                                                                        enim eiusmod high life accusamus
                                                                        terry richardson ad squid. Nihil
                                                                        anim keffiyeh helvetica, craft beer
                                                                        labore wes anderson cred
                                                                        nesciunt sapiente ea proident.
                                                                    </Collapse>
                                                                </CardBody>
                                                            </Card>
                                                        </Col>
                                                } else {
                                                    if((structure.properties.adresse.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.cp.toString().includes(this.state.filtre_barre))||(structure.properties.ville.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.denomination_structure.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.sous_categorie.toLowerCase().includes(this.state.filtre_barre))){
                                                        ret =
                                                            <Col xs="12" xl="6">
                                                                <Card style={styles.cardItem}>
                                                                    <CardHeader
                                                                        onClick={() => this.flyTo(structure)}
                                                                        style={styles.cardHeader}>{structure.properties.denomination_structure}</CardHeader>
                                                                    <CardBody>
                                                                        <CardSubtitle
                                                                            style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}
                                                                        </CardSubtitle>
                                                                        <Collapse style={styles.subtitle}
                                                                                  isOpen={this.state.collapse}>
                                                                            <DropdownItem
                                                                                style={styles.divider_margin}
                                                                                divider/>
                                                                            Anim pariatur cliche
                                                                            reprehenderit,
                                                                            enim eiusmod high life accusamus
                                                                            terry richardson ad squid. Nihil
                                                                            anim keffiyeh helvetica, craft
                                                                            beer labore wes anderson cred
                                                                            nesciunt sapiente ea proident.
                                                                        </Collapse>
                                                                    </CardBody>
                                                                </Card>
                                                            </Col>
                                                    }
                                                }
                                            }
                                            break;
                                        case 'Enfants':
                                            if (structure.properties.type_personne.includes(this.state.filtre_age)) {
                                                if (this.state.filtre_barre === "Aucun") {
                                                    ret =
                                                        <Col xs="12" xl="6">
                                                            <Card style={styles.cardItem}>
                                                                <CardHeader
                                                                    onClick={() => this.flyTo(structure)}
                                                                    style={styles.cardHeader}>{structure.properties.denomination_structure}</CardHeader>
                                                                <CardBody>
                                                                    <CardSubtitle
                                                                        style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}
                                                                    </CardSubtitle>
                                                                    <Collapse style={styles.subtitle}
                                                                              isOpen={this.state.collapse}>
                                                                        <DropdownItem
                                                                            style={styles.divider_margin}
                                                                            divider/>
                                                                        Anim pariatur cliche reprehenderit,
                                                                        enim eiusmod high life accusamus
                                                                        terry richardson ad squid. Nihil
                                                                        anim keffiyeh helvetica, craft beer
                                                                        labore wes anderson cred
                                                                        nesciunt sapiente ea proident.
                                                                    </Collapse>
                                                                </CardBody>
                                                            </Card>
                                                        </Col>
                                                } else {
                                                    if((structure.properties.adresse.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.cp.toString().includes(this.state.filtre_barre))||(structure.properties.ville.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.denomination_structure.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.sous_categorie.toLowerCase().includes(this.state.filtre_barre))){
                                                        ret =
                                                            <Col xs="12" xl="6">
                                                                <Card style={styles.cardItem}>
                                                                    <CardHeader
                                                                        onClick={() => this.flyTo(structure)}
                                                                        style={styles.cardHeader}>{structure.properties.denomination_structure}</CardHeader>
                                                                    <CardBody>
                                                                        <CardSubtitle
                                                                            style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}
                                                                        </CardSubtitle>
                                                                        <Collapse style={styles.subtitle}
                                                                                  isOpen={this.state.collapse}>
                                                                            <DropdownItem
                                                                                style={styles.divider_margin}
                                                                                divider/>
                                                                            Anim pariatur cliche
                                                                            reprehenderit,
                                                                            enim eiusmod high life accusamus
                                                                            terry richardson ad squid. Nihil
                                                                            anim keffiyeh helvetica, craft
                                                                            beer labore wes anderson cred
                                                                            nesciunt sapiente ea proident.
                                                                        </Collapse>
                                                                    </CardBody>
                                                                </Card>
                                                            </Col>
                                                    }
                                                }
                                            }
                                            break;
                                        case 'Personnes âgées':
                                            if (structure.properties.type_personne.includes(this.state.filtre_age)) {
                                                if (this.state.filtre_barre === "Aucun") {
                                                    ret =
                                                        <Col xs="12" xl="6">
                                                            <Card style={styles.cardItem}>
                                                                <CardHeader
                                                                    onClick={() => this.flyTo(structure)}
                                                                    style={styles.cardHeader}>{structure.properties.denomination_structure}</CardHeader>
                                                                <CardBody>
                                                                    <CardSubtitle
                                                                        style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}
                                                                    </CardSubtitle>
                                                                    <Collapse style={styles.subtitle}
                                                                              isOpen={this.state.collapse}>
                                                                        <DropdownItem
                                                                            style={styles.divider_margin}
                                                                            divider/>
                                                                        Anim pariatur cliche reprehenderit,
                                                                        enim eiusmod high life accusamus
                                                                        terry richardson ad squid. Nihil
                                                                        anim keffiyeh helvetica, craft beer
                                                                        labore wes anderson cred
                                                                        nesciunt sapiente ea proident.
                                                                    </Collapse>
                                                                </CardBody>
                                                            </Card>
                                                        </Col>
                                                } else {
                                                    if((structure.properties.adresse.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.cp.toString().includes(this.state.filtre_barre))||(structure.properties.ville.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.denomination_structure.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.sous_categorie.toLowerCase().includes(this.state.filtre_barre))){
                                                        ret =
                                                            <Col xs="12" xl="6">
                                                                <Card style={styles.cardItem}>
                                                                    <CardHeader
                                                                        onClick={() => this.flyTo(structure)}
                                                                        style={styles.cardHeader}>{structure.properties.denomination_structure}</CardHeader>
                                                                    <CardBody>
                                                                        <CardSubtitle
                                                                            style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}
                                                                        </CardSubtitle>
                                                                        <Collapse style={styles.subtitle}
                                                                                  isOpen={this.state.collapse}>
                                                                            <DropdownItem
                                                                                style={styles.divider_margin}
                                                                                divider/>
                                                                            Anim pariatur cliche
                                                                            reprehenderit,
                                                                            enim eiusmod high life accusamus
                                                                            terry richardson ad squid. Nihil
                                                                            anim keffiyeh helvetica, craft
                                                                            beer labore wes anderson cred
                                                                            nesciunt sapiente ea proident.
                                                                        </Collapse>
                                                                    </CardBody>
                                                                </Card>
                                                            </Col>
                                                    }
                                                }
                                            }
                                            break;
                                    }
                                }
                                return ret;
                            case "SRéinsertion Professionnelle":
                                if (structure.properties.categorie === this.state.filtre) {
                                    switch (this.state.filtre_age) {
                                        case 'Aucun':
                                            if (this.state.filtre_barre === "Aucun") {
                                                ret =
                                                    <Col xs="12" xl="6">
                                                        <Card style={styles.cardItem}>
                                                            <CardHeader
                                                                onClick={() => this.flyTo(structure)}
                                                                style={styles.cardHeader}>{structure.properties.denomination_structure}</CardHeader>
                                                            <CardBody>
                                                                <CardSubtitle
                                                                    style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}<br/>{structure.properties.categorie}<br/>{structure.properties.sous_categorie}
                                                                </CardSubtitle>
                                                                <Collapse style={styles.subtitle}
                                                                          isOpen={this.state.collapse}>
                                                                    <DropdownItem
                                                                        style={styles.divider_margin}
                                                                        divider/>
                                                                </Collapse>
                                                            </CardBody>
                                                        </Card>
                                                    </Col>
                                            } else {
                                                if((structure.properties.adresse.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.cp.toString().includes(this.state.filtre_barre))||(structure.properties.ville.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.denomination_structure.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.sous_categorie.toLowerCase().includes(this.state.filtre_barre))){
                                                    ret =
                                                        <Col xs="12" xl="6">
                                                            <Card style={styles.cardItem}>
                                                                <CardHeader
                                                                    onClick={() => this.flyTo(structure)}
                                                                    style={styles.cardHeader}>{structure.properties.denomination_structure}</CardHeader>
                                                                <CardBody>
                                                                    <CardSubtitle
                                                                        style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}<br/>{structure.properties.categorie}<br/>{structure.properties.sous_categorie}
                                                                    </CardSubtitle>
                                                                    <Collapse style={styles.subtitle}
                                                                              isOpen={this.state.collapse}>
                                                                        <DropdownItem
                                                                            style={styles.divider_margin}
                                                                            divider/>
                                                                    </Collapse>
                                                                </CardBody>
                                                            </Card>
                                                        </Col>
                                                }
                                            }
                                            break;
                                        case 'Adultes':
                                            if (structure.properties.type_personne.includes(this.state.filtre_age)) {
                                                if (this.state.filtre_barre === "Aucun") {
                                                    ret =
                                                        <Col xs="12" xl="6">
                                                            <Card style={styles.cardItem}>
                                                                <CardHeader
                                                                    onClick={() => this.flyTo(structure)}
                                                                    style={styles.cardHeader}>{structure.properties.denomination_structure}</CardHeader>
                                                                <CardBody>
                                                                    <CardSubtitle
                                                                        style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}
                                                                    </CardSubtitle>
                                                                    <Collapse style={styles.subtitle}
                                                                              isOpen={this.state.collapse}>
                                                                        <DropdownItem
                                                                            style={styles.divider_margin}
                                                                            divider/>
                                                                        Anim pariatur cliche reprehenderit,
                                                                        enim eiusmod high life accusamus
                                                                        terry richardson ad squid. Nihil
                                                                        anim keffiyeh helvetica, craft beer
                                                                        labore wes anderson cred
                                                                        nesciunt sapiente ea proident.
                                                                    </Collapse>
                                                                </CardBody>
                                                            </Card>
                                                        </Col>
                                                } else {
                                                    if((structure.properties.adresse.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.cp.toString().includes(this.state.filtre_barre))||(structure.properties.ville.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.denomination_structure.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.sous_categorie.toLowerCase().includes(this.state.filtre_barre))){
                                                        ret =
                                                            <Col xs="12" xl="6">
                                                                <Card style={styles.cardItem}>
                                                                    <CardHeader
                                                                        onClick={() => this.flyTo(structure)}
                                                                        style={styles.cardHeader}>{structure.properties.denomination_structure}</CardHeader>
                                                                    <CardBody>
                                                                        <CardSubtitle
                                                                            style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}
                                                                        </CardSubtitle>
                                                                        <Collapse style={styles.subtitle}
                                                                                  isOpen={this.state.collapse}>
                                                                            <DropdownItem
                                                                                style={styles.divider_margin}
                                                                                divider/>
                                                                            Anim pariatur cliche
                                                                            reprehenderit,
                                                                            enim eiusmod high life accusamus
                                                                            terry richardson ad squid. Nihil
                                                                            anim keffiyeh helvetica, craft
                                                                            beer labore wes anderson cred
                                                                            nesciunt sapiente ea proident.
                                                                        </Collapse>
                                                                    </CardBody>
                                                                </Card>
                                                            </Col>
                                                    }
                                                }
                                            }
                                            break;
                                        case 'Enfants':
                                            if (structure.properties.type_personne.includes(this.state.filtre_age)) {
                                                if (this.state.filtre_barre === "Aucun") {
                                                    ret =
                                                        <Col xs="12" xl="6">
                                                            <Card style={styles.cardItem}>
                                                                <CardHeader
                                                                    onClick={() => this.flyTo(structure)}
                                                                    style={styles.cardHeader}>{structure.properties.denomination_structure}</CardHeader>
                                                                <CardBody>
                                                                    <CardSubtitle
                                                                        style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}
                                                                    </CardSubtitle>
                                                                    <Collapse style={styles.subtitle}
                                                                              isOpen={this.state.collapse}>
                                                                        <DropdownItem
                                                                            style={styles.divider_margin}
                                                                            divider/>
                                                                        Anim pariatur cliche reprehenderit,
                                                                        enim eiusmod high life accusamus
                                                                        terry richardson ad squid. Nihil
                                                                        anim keffiyeh helvetica, craft beer
                                                                        labore wes anderson cred
                                                                        nesciunt sapiente ea proident.
                                                                    </Collapse>
                                                                </CardBody>
                                                            </Card>
                                                        </Col>
                                                } else {
                                                    if((structure.properties.adresse.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.cp.toString().includes(this.state.filtre_barre))||(structure.properties.ville.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.denomination_structure.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.sous_categorie.toLowerCase().includes(this.state.filtre_barre))){
                                                        ret =
                                                            <Col xs="12" xl="6">
                                                                <Card style={styles.cardItem}>
                                                                    <CardHeader
                                                                        onClick={() => this.flyTo(structure)}
                                                                        style={styles.cardHeader}>{structure.properties.denomination_structure}</CardHeader>
                                                                    <CardBody>
                                                                        <CardSubtitle
                                                                            style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}
                                                                        </CardSubtitle>
                                                                        <Collapse style={styles.subtitle}
                                                                                  isOpen={this.state.collapse}>
                                                                            <DropdownItem
                                                                                style={styles.divider_margin}
                                                                                divider/>
                                                                            Anim pariatur cliche
                                                                            reprehenderit,
                                                                            enim eiusmod high life accusamus
                                                                            terry richardson ad squid. Nihil
                                                                            anim keffiyeh helvetica, craft
                                                                            beer labore wes anderson cred
                                                                            nesciunt sapiente ea proident.
                                                                        </Collapse>
                                                                    </CardBody>
                                                                </Card>
                                                            </Col>
                                                    }
                                                }
                                            }
                                            break;
                                        case 'Personnes âgées':
                                            if (structure.properties.type_personne.includes(this.state.filtre_age)) {
                                                if (this.state.filtre_barre === "Aucun") {
                                                    ret =
                                                        <Col xs="12" xl="6">
                                                            <Card style={styles.cardItem}>
                                                                <CardHeader
                                                                    onClick={() => this.flyTo(structure)}
                                                                    style={styles.cardHeader}>{structure.properties.denomination_structure}</CardHeader>
                                                                <CardBody>
                                                                    <CardSubtitle
                                                                        style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}
                                                                    </CardSubtitle>
                                                                    <Collapse style={styles.subtitle}
                                                                              isOpen={this.state.collapse}>
                                                                        <DropdownItem
                                                                            style={styles.divider_margin}
                                                                            divider/>
                                                                        Anim pariatur cliche reprehenderit,
                                                                        enim eiusmod high life accusamus
                                                                        terry richardson ad squid. Nihil
                                                                        anim keffiyeh helvetica, craft beer
                                                                        labore wes anderson cred
                                                                        nesciunt sapiente ea proident.
                                                                    </Collapse>
                                                                </CardBody>
                                                            </Card>
                                                        </Col>
                                                } else {
                                                    if((structure.properties.adresse.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.cp.toString().includes(this.state.filtre_barre))||(structure.properties.ville.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.denomination_structure.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.sous_categorie.toLowerCase().includes(this.state.filtre_barre))){
                                                        ret =
                                                            <Col xs="12" xl="6">
                                                                <Card style={styles.cardItem}>
                                                                    <CardHeader
                                                                        onClick={() => this.flyTo(structure)}
                                                                        style={styles.cardHeader}>{structure.properties.denomination_structure}</CardHeader>
                                                                    <CardBody>
                                                                        <CardSubtitle
                                                                            style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}
                                                                        </CardSubtitle>
                                                                        <Collapse style={styles.subtitle}
                                                                                  isOpen={this.state.collapse}>
                                                                            <DropdownItem
                                                                                style={styles.divider_margin}
                                                                                divider/>
                                                                            Anim pariatur cliche
                                                                            reprehenderit,
                                                                            enim eiusmod high life accusamus
                                                                            terry richardson ad squid. Nihil
                                                                            anim keffiyeh helvetica, craft
                                                                            beer labore wes anderson cred
                                                                            nesciunt sapiente ea proident.
                                                                        </Collapse>
                                                                    </CardBody>
                                                                </Card>
                                                            </Col>
                                                    }
                                                }
                                            }
                                            break;
                                    }
                                }
                                return ret;
                            case "Accompagnement Scolaire":
                                if (structure.properties.categorie === this.state.filtre) {
                                    switch (this.state.filtre_age) {
                                        case 'Aucun':
                                            if (this.state.filtre_barre === "Aucun") {
                                                ret =
                                                    <Col xs="12" xl="6">
                                                        <Card style={styles.cardItem}>
                                                            <CardHeader
                                                                onClick={() => this.flyTo(structure)}
                                                                style={styles.cardHeader}>{structure.properties.denomination_structure}</CardHeader>
                                                            <CardBody>
                                                                <CardSubtitle
                                                                    style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}<br/>{structure.properties.categorie}<br/>{structure.properties.sous_categorie}
                                                                </CardSubtitle>
                                                                <Collapse style={styles.subtitle}
                                                                          isOpen={this.state.collapse}>
                                                                    <DropdownItem
                                                                        style={styles.divider_margin}
                                                                        divider/>
                                                                </Collapse>
                                                            </CardBody>
                                                        </Card>
                                                    </Col>
                                            } else {
                                                if((structure.properties.adresse.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.cp.toString().includes(this.state.filtre_barre))||(structure.properties.ville.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.denomination_structure.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.sous_categorie.toLowerCase().includes(this.state.filtre_barre))){
                                                    ret =
                                                        <Col xs="12" xl="6">
                                                            <Card style={styles.cardItem}>
                                                                <CardHeader
                                                                    onClick={() => this.flyTo(structure)}
                                                                    style={styles.cardHeader}>{structure.properties.denomination_structure}</CardHeader>
                                                                <CardBody>
                                                                    <CardSubtitle
                                                                        style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}<br/>{structure.properties.categorie}<br/>{structure.properties.sous_categorie}
                                                                    </CardSubtitle>
                                                                    <Collapse style={styles.subtitle}
                                                                              isOpen={this.state.collapse}>
                                                                        <DropdownItem
                                                                            style={styles.divider_margin}
                                                                            divider/>
                                                                    </Collapse>
                                                                </CardBody>
                                                            </Card>
                                                        </Col>
                                                }
                                            }
                                            break;
                                        case 'Adultes':
                                            if (structure.properties.type_personne.includes(this.state.filtre_age)) {
                                                if (this.state.filtre_barre === "Aucun") {
                                                    ret =
                                                        <Col xs="12" xl="6">
                                                            <Card style={styles.cardItem}>
                                                                <CardHeader
                                                                    onClick={() => this.flyTo(structure)}
                                                                    style={styles.cardHeader}>{structure.properties.denomination_structure}</CardHeader>
                                                                <CardBody>
                                                                    <CardSubtitle
                                                                        style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}
                                                                    </CardSubtitle>
                                                                    <Collapse style={styles.subtitle}
                                                                              isOpen={this.state.collapse}>
                                                                        <DropdownItem
                                                                            style={styles.divider_margin}
                                                                            divider/>
                                                                        Anim pariatur cliche reprehenderit,
                                                                        enim eiusmod high life accusamus
                                                                        terry richardson ad squid. Nihil
                                                                        anim keffiyeh helvetica, craft beer
                                                                        labore wes anderson cred
                                                                        nesciunt sapiente ea proident.
                                                                    </Collapse>
                                                                </CardBody>
                                                            </Card>
                                                        </Col>
                                                } else {
                                                    if((structure.properties.adresse.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.cp.toString().includes(this.state.filtre_barre))||(structure.properties.ville.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.denomination_structure.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.sous_categorie.toLowerCase().includes(this.state.filtre_barre))){
                                                        ret =
                                                            <Col xs="12" xl="6">
                                                                <Card style={styles.cardItem}>
                                                                    <CardHeader
                                                                        onClick={() => this.flyTo(structure)}
                                                                        style={styles.cardHeader}>{structure.properties.denomination_structure}</CardHeader>
                                                                    <CardBody>
                                                                        <CardSubtitle
                                                                            style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}
                                                                        </CardSubtitle>
                                                                        <Collapse style={styles.subtitle}
                                                                                  isOpen={this.state.collapse}>
                                                                            <DropdownItem
                                                                                style={styles.divider_margin}
                                                                                divider/>
                                                                            Anim pariatur cliche
                                                                            reprehenderit,
                                                                            enim eiusmod high life accusamus
                                                                            terry richardson ad squid. Nihil
                                                                            anim keffiyeh helvetica, craft
                                                                            beer labore wes anderson cred
                                                                            nesciunt sapiente ea proident.
                                                                        </Collapse>
                                                                    </CardBody>
                                                                </Card>
                                                            </Col>
                                                    }
                                                }
                                            }
                                            break;
                                        case 'Enfants':
                                            if (structure.properties.type_personne.includes(this.state.filtre_age)) {
                                                if (this.state.filtre_barre === "Aucun") {
                                                    ret =
                                                        <Col xs="12" xl="6">
                                                            <Card style={styles.cardItem}>
                                                                <CardHeader
                                                                    onClick={() => this.flyTo(structure)}
                                                                    style={styles.cardHeader}>{structure.properties.denomination_structure}</CardHeader>
                                                                <CardBody>
                                                                    <CardSubtitle
                                                                        style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}
                                                                    </CardSubtitle>
                                                                    <Collapse style={styles.subtitle}
                                                                              isOpen={this.state.collapse}>
                                                                        <DropdownItem
                                                                            style={styles.divider_margin}
                                                                            divider/>
                                                                        Anim pariatur cliche reprehenderit,
                                                                        enim eiusmod high life accusamus
                                                                        terry richardson ad squid. Nihil
                                                                        anim keffiyeh helvetica, craft beer
                                                                        labore wes anderson cred
                                                                        nesciunt sapiente ea proident.
                                                                    </Collapse>
                                                                </CardBody>
                                                            </Card>
                                                        </Col>
                                                } else {
                                                    if((structure.properties.adresse.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.cp.toString().includes(this.state.filtre_barre))||(structure.properties.ville.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.denomination_structure.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.sous_categorie.toLowerCase().includes(this.state.filtre_barre))){
                                                        ret =
                                                            <Col xs="12" xl="6">
                                                                <Card style={styles.cardItem}>
                                                                    <CardHeader
                                                                        onClick={() => this.flyTo(structure)}
                                                                        style={styles.cardHeader}>{structure.properties.denomination_structure}</CardHeader>
                                                                    <CardBody>
                                                                        <CardSubtitle
                                                                            style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}
                                                                        </CardSubtitle>
                                                                        <Collapse style={styles.subtitle}
                                                                                  isOpen={this.state.collapse}>
                                                                            <DropdownItem
                                                                                style={styles.divider_margin}
                                                                                divider/>
                                                                            Anim pariatur cliche
                                                                            reprehenderit,
                                                                            enim eiusmod high life accusamus
                                                                            terry richardson ad squid. Nihil
                                                                            anim keffiyeh helvetica, craft
                                                                            beer labore wes anderson cred
                                                                            nesciunt sapiente ea proident.
                                                                        </Collapse>
                                                                    </CardBody>
                                                                </Card>
                                                            </Col>
                                                    }
                                                }
                                            }
                                            break;
                                        case 'Personnes âgées':
                                            if (structure.properties.type_personne.includes(this.state.filtre_age)) {
                                                if (this.state.filtre_barre === "Aucun") {
                                                    ret =
                                                        <Col xs="12" xl="6">
                                                            <Card style={styles.cardItem}>
                                                                <CardHeader
                                                                    onClick={() => this.flyTo(structure)}
                                                                    style={styles.cardHeader}>{structure.properties.denomination_structure}</CardHeader>
                                                                <CardBody>
                                                                    <CardSubtitle
                                                                        style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}
                                                                    </CardSubtitle>
                                                                    <Collapse style={styles.subtitle}
                                                                              isOpen={this.state.collapse}>
                                                                        <DropdownItem
                                                                            style={styles.divider_margin}
                                                                            divider/>
                                                                        Anim pariatur cliche reprehenderit,
                                                                        enim eiusmod high life accusamus
                                                                        terry richardson ad squid. Nihil
                                                                        anim keffiyeh helvetica, craft beer
                                                                        labore wes anderson cred
                                                                        nesciunt sapiente ea proident.
                                                                    </Collapse>
                                                                </CardBody>
                                                            </Card>
                                                        </Col>
                                                } else {
                                                    if((structure.properties.adresse.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.cp.toString().includes(this.state.filtre_barre))||(structure.properties.ville.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.denomination_structure.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.sous_categorie.toLowerCase().includes(this.state.filtre_barre))){
                                                        ret =
                                                            <Col xs="12" xl="6">
                                                                <Card style={styles.cardItem}>
                                                                    <CardHeader
                                                                        onClick={() => this.flyTo(structure)}
                                                                        style={styles.cardHeader}>{structure.properties.denomination_structure}</CardHeader>
                                                                    <CardBody>
                                                                        <CardSubtitle
                                                                            style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}
                                                                        </CardSubtitle>
                                                                        <Collapse style={styles.subtitle}
                                                                                  isOpen={this.state.collapse}>
                                                                            <DropdownItem
                                                                                style={styles.divider_margin}
                                                                                divider/>
                                                                            Anim pariatur cliche
                                                                            reprehenderit,
                                                                            enim eiusmod high life accusamus
                                                                            terry richardson ad squid. Nihil
                                                                            anim keffiyeh helvetica, craft
                                                                            beer labore wes anderson cred
                                                                            nesciunt sapiente ea proident.
                                                                        </Collapse>
                                                                    </CardBody>
                                                                </Card>
                                                            </Col>
                                                    }
                                                }
                                            }
                                            break;
                                    }
                                }
                                return ret;
                            case "Structures de Psychiatrie et d’Accompagnement Psychologique":
                                if (structure.properties.categorie === this.state.filtre) {
                                    switch (this.state.filtre_age) {
                                        case 'Aucun':
                                            if (this.state.filtre_barre === "Aucun") {
                                                ret =
                                                    <Col xs="12" xl="6">
                                                        <Card style={styles.cardItem}>
                                                            <CardHeader
                                                                onClick={() => this.flyTo(structure)}
                                                                style={styles.cardHeader}>{structure.properties.denomination_structure}</CardHeader>
                                                            <CardBody>
                                                                <CardSubtitle
                                                                    style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}<br/>{structure.properties.categorie}<br/>{structure.properties.sous_categorie}
                                                                </CardSubtitle>
                                                                <Collapse style={styles.subtitle}
                                                                          isOpen={this.state.collapse}>
                                                                    <DropdownItem
                                                                        style={styles.divider_margin}
                                                                        divider/>
                                                                </Collapse>
                                                            </CardBody>
                                                        </Card>
                                                    </Col>
                                            } else {
                                                if((structure.properties.adresse.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.cp.toString().includes(this.state.filtre_barre))||(structure.properties.ville.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.denomination_structure.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.sous_categorie.toLowerCase().includes(this.state.filtre_barre))){
                                                    ret =
                                                        <Col xs="12" xl="6">
                                                            <Card style={styles.cardItem}>
                                                                <CardHeader
                                                                    onClick={() => this.flyTo(structure)}
                                                                    style={styles.cardHeader}>{structure.properties.denomination_structure}</CardHeader>
                                                                <CardBody>
                                                                    <CardSubtitle
                                                                        style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}<br/>{structure.properties.categorie}<br/>{structure.properties.sous_categorie}
                                                                    </CardSubtitle>
                                                                    <Collapse style={styles.subtitle}
                                                                              isOpen={this.state.collapse}>
                                                                        <DropdownItem
                                                                            style={styles.divider_margin}
                                                                            divider/>
                                                                    </Collapse>
                                                                </CardBody>
                                                            </Card>
                                                        </Col>
                                                }
                                            }
                                            break;
                                        case 'Adultes':
                                            if (structure.properties.type_personne.includes(this.state.filtre_age)) {
                                                if (this.state.filtre_barre === "Aucun") {
                                                    ret =
                                                        <Col xs="12" xl="6">
                                                            <Card style={styles.cardItem}>
                                                                <CardHeader
                                                                    onClick={() => this.flyTo(structure)}
                                                                    style={styles.cardHeader}>{structure.properties.denomination_structure}</CardHeader>
                                                                <CardBody>
                                                                    <CardSubtitle
                                                                        style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}
                                                                    </CardSubtitle>
                                                                    <Collapse style={styles.subtitle}
                                                                              isOpen={this.state.collapse}>
                                                                        <DropdownItem
                                                                            style={styles.divider_margin}
                                                                            divider/>
                                                                        Anim pariatur cliche reprehenderit,
                                                                        enim eiusmod high life accusamus
                                                                        terry richardson ad squid. Nihil
                                                                        anim keffiyeh helvetica, craft beer
                                                                        labore wes anderson cred
                                                                        nesciunt sapiente ea proident.
                                                                    </Collapse>
                                                                </CardBody>
                                                            </Card>
                                                        </Col>
                                                } else {
                                                    if((structure.properties.adresse.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.cp.toString().includes(this.state.filtre_barre))||(structure.properties.ville.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.denomination_structure.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.sous_categorie.toLowerCase().includes(this.state.filtre_barre))){
                                                        ret =
                                                            <Col xs="12" xl="6">
                                                                <Card style={styles.cardItem}>
                                                                    <CardHeader
                                                                        onClick={() => this.flyTo(structure)}
                                                                        style={styles.cardHeader}>{structure.properties.denomination_structure}</CardHeader>
                                                                    <CardBody>
                                                                        <CardSubtitle
                                                                            style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}
                                                                        </CardSubtitle>
                                                                        <Collapse style={styles.subtitle}
                                                                                  isOpen={this.state.collapse}>
                                                                            <DropdownItem
                                                                                style={styles.divider_margin}
                                                                                divider/>
                                                                            Anim pariatur cliche
                                                                            reprehenderit,
                                                                            enim eiusmod high life accusamus
                                                                            terry richardson ad squid. Nihil
                                                                            anim keffiyeh helvetica, craft
                                                                            beer labore wes anderson cred
                                                                            nesciunt sapiente ea proident.
                                                                        </Collapse>
                                                                    </CardBody>
                                                                </Card>
                                                            </Col>
                                                    }
                                                }
                                            }
                                            break;
                                        case 'Enfants':
                                            if (structure.properties.type_personne.includes(this.state.filtre_age)) {
                                                if (this.state.filtre_barre === "Aucun") {
                                                    ret =
                                                        <Col xs="12" xl="6">
                                                            <Card style={styles.cardItem}>
                                                                <CardHeader
                                                                    onClick={() => this.flyTo(structure)}
                                                                    style={styles.cardHeader}>{structure.properties.denomination_structure}</CardHeader>
                                                                <CardBody>
                                                                    <CardSubtitle
                                                                        style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}
                                                                    </CardSubtitle>
                                                                    <Collapse style={styles.subtitle}
                                                                              isOpen={this.state.collapse}>
                                                                        <DropdownItem
                                                                            style={styles.divider_margin}
                                                                            divider/>
                                                                        Anim pariatur cliche reprehenderit,
                                                                        enim eiusmod high life accusamus
                                                                        terry richardson ad squid. Nihil
                                                                        anim keffiyeh helvetica, craft beer
                                                                        labore wes anderson cred
                                                                        nesciunt sapiente ea proident.
                                                                    </Collapse>
                                                                </CardBody>
                                                            </Card>
                                                        </Col>
                                                } else {
                                                    if((structure.properties.adresse.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.cp.toString().includes(this.state.filtre_barre))||(structure.properties.ville.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.denomination_structure.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.sous_categorie.toLowerCase().includes(this.state.filtre_barre))){
                                                        ret =
                                                            <Col xs="12" xl="6">
                                                                <Card style={styles.cardItem}>
                                                                    <CardHeader
                                                                        onClick={() => this.flyTo(structure)}
                                                                        style={styles.cardHeader}>{structure.properties.denomination_structure}</CardHeader>
                                                                    <CardBody>
                                                                        <CardSubtitle
                                                                            style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}
                                                                        </CardSubtitle>
                                                                        <Collapse style={styles.subtitle}
                                                                                  isOpen={this.state.collapse}>
                                                                            <DropdownItem
                                                                                style={styles.divider_margin}
                                                                                divider/>
                                                                            Anim pariatur cliche
                                                                            reprehenderit,
                                                                            enim eiusmod high life accusamus
                                                                            terry richardson ad squid. Nihil
                                                                            anim keffiyeh helvetica, craft
                                                                            beer labore wes anderson cred
                                                                            nesciunt sapiente ea proident.
                                                                        </Collapse>
                                                                    </CardBody>
                                                                </Card>
                                                            </Col>
                                                    }
                                                }
                                            }
                                            break;
                                        case 'Personnes âgées':
                                            if (structure.properties.type_personne.includes(this.state.filtre_age)) {
                                                if (this.state.filtre_barre === "Aucun") {
                                                    ret =
                                                        <Col xs="12" xl="6">
                                                            <Card style={styles.cardItem}>
                                                                <CardHeader
                                                                    onClick={() => this.flyTo(structure)}
                                                                    style={styles.cardHeader}>{structure.properties.denomination_structure}</CardHeader>
                                                                <CardBody>
                                                                    <CardSubtitle
                                                                        style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}
                                                                    </CardSubtitle>
                                                                    <Collapse style={styles.subtitle}
                                                                              isOpen={this.state.collapse}>
                                                                        <DropdownItem
                                                                            style={styles.divider_margin}
                                                                            divider/>
                                                                        Anim pariatur cliche reprehenderit,
                                                                        enim eiusmod high life accusamus
                                                                        terry richardson ad squid. Nihil
                                                                        anim keffiyeh helvetica, craft beer
                                                                        labore wes anderson cred
                                                                        nesciunt sapiente ea proident.
                                                                    </Collapse>
                                                                </CardBody>
                                                            </Card>
                                                        </Col>
                                                } else {
                                                    if((structure.properties.adresse.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.cp.toString().includes(this.state.filtre_barre))||(structure.properties.ville.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.denomination_structure.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.sous_categorie.toLowerCase().includes(this.state.filtre_barre))){
                                                        ret =
                                                            <Col xs="12" xl="6">
                                                                <Card style={styles.cardItem}>
                                                                    <CardHeader
                                                                        onClick={() => this.flyTo(structure)}
                                                                        style={styles.cardHeader}>{structure.properties.denomination_structure}</CardHeader>
                                                                    <CardBody>
                                                                        <CardSubtitle
                                                                            style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}
                                                                        </CardSubtitle>
                                                                        <Collapse style={styles.subtitle}
                                                                                  isOpen={this.state.collapse}>
                                                                            <DropdownItem
                                                                                style={styles.divider_margin}
                                                                                divider/>
                                                                            Anim pariatur cliche
                                                                            reprehenderit,
                                                                            enim eiusmod high life accusamus
                                                                            terry richardson ad squid. Nihil
                                                                            anim keffiyeh helvetica, craft
                                                                            beer labore wes anderson cred
                                                                            nesciunt sapiente ea proident.
                                                                        </Collapse>
                                                                    </CardBody>
                                                                </Card>
                                                            </Col>
                                                    }
                                                }
                                            }
                                            break;
                                    }
                                }
                                return ret;
                            case "Service d'Accompagnement à Domicile":
                                if (structure.properties.categorie === this.state.filtre) {
                                    switch (this.state.filtre_age) {
                                        case 'Aucun':
                                            if (this.state.filtre_barre === "Aucun") {
                                                ret =
                                                    <Col xs="12" xl="6">
                                                        <Card style={styles.cardItem}>
                                                            <CardHeader
                                                                onClick={() => this.flyTo(structure)}
                                                                style={styles.cardHeader}>{structure.properties.denomination_structure}</CardHeader>
                                                            <CardBody>
                                                                <CardSubtitle
                                                                    style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}<br/>{structure.properties.categorie}<br/>{structure.properties.sous_categorie}
                                                                </CardSubtitle>
                                                                <Collapse style={styles.subtitle}
                                                                          isOpen={this.state.collapse}>
                                                                    <DropdownItem
                                                                        style={styles.divider_margin}
                                                                        divider/>
                                                                </Collapse>
                                                            </CardBody>
                                                        </Card>
                                                    </Col>
                                            } else {
                                                if((structure.properties.adresse.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.cp.toString().includes(this.state.filtre_barre))||(structure.properties.ville.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.denomination_structure.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.sous_categorie.toLowerCase().includes(this.state.filtre_barre))){
                                                    ret =
                                                        <Col xs="12" xl="6">
                                                            <Card style={styles.cardItem}>
                                                                <CardHeader
                                                                    onClick={() => this.flyTo(structure)}
                                                                    style={styles.cardHeader}>{structure.properties.denomination_structure}</CardHeader>
                                                                <CardBody>
                                                                    <CardSubtitle
                                                                        style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}<br/>{structure.properties.categorie}<br/>{structure.properties.sous_categorie}
                                                                    </CardSubtitle>
                                                                    <Collapse style={styles.subtitle}
                                                                              isOpen={this.state.collapse}>
                                                                        <DropdownItem
                                                                            style={styles.divider_margin}
                                                                            divider/>
                                                                    </Collapse>
                                                                </CardBody>
                                                            </Card>
                                                        </Col>
                                                }
                                            }
                                            break;
                                        case 'Adultes':
                                            if (structure.properties.type_personne.includes(this.state.filtre_age)) {
                                                if (this.state.filtre_barre === "Aucun") {
                                                    ret =
                                                        <Col xs="12" xl="6">
                                                            <Card style={styles.cardItem}>
                                                                <CardHeader
                                                                    onClick={() => this.flyTo(structure)}
                                                                    style={styles.cardHeader}>{structure.properties.denomination_structure}</CardHeader>
                                                                <CardBody>
                                                                    <CardSubtitle
                                                                        style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}
                                                                    </CardSubtitle>
                                                                    <Collapse style={styles.subtitle}
                                                                              isOpen={this.state.collapse}>
                                                                        <DropdownItem
                                                                            style={styles.divider_margin}
                                                                            divider/>
                                                                        Anim pariatur cliche reprehenderit,
                                                                        enim eiusmod high life accusamus
                                                                        terry richardson ad squid. Nihil
                                                                        anim keffiyeh helvetica, craft beer
                                                                        labore wes anderson cred
                                                                        nesciunt sapiente ea proident.
                                                                    </Collapse>
                                                                </CardBody>
                                                            </Card>
                                                        </Col>
                                                } else {
                                                    if((structure.properties.adresse.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.cp.toString().includes(this.state.filtre_barre))||(structure.properties.ville.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.denomination_structure.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.sous_categorie.toLowerCase().includes(this.state.filtre_barre))){
                                                        ret =
                                                            <Col xs="12" xl="6">
                                                                <Card style={styles.cardItem}>
                                                                    <CardHeader
                                                                        onClick={() => this.flyTo(structure)}
                                                                        style={styles.cardHeader}>{structure.properties.denomination_structure}</CardHeader>
                                                                    <CardBody>
                                                                        <CardSubtitle
                                                                            style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}
                                                                        </CardSubtitle>
                                                                        <Collapse style={styles.subtitle}
                                                                                  isOpen={this.state.collapse}>
                                                                            <DropdownItem
                                                                                style={styles.divider_margin}
                                                                                divider/>
                                                                            Anim pariatur cliche
                                                                            reprehenderit,
                                                                            enim eiusmod high life accusamus
                                                                            terry richardson ad squid. Nihil
                                                                            anim keffiyeh helvetica, craft
                                                                            beer labore wes anderson cred
                                                                            nesciunt sapiente ea proident.
                                                                        </Collapse>
                                                                    </CardBody>
                                                                </Card>
                                                            </Col>
                                                    }
                                                }
                                            }
                                            break;
                                        case 'Enfants':
                                            if (structure.properties.type_personne.includes(this.state.filtre_age)) {
                                                if (this.state.filtre_barre === "Aucun") {
                                                    ret =
                                                        <Col xs="12" xl="6">
                                                            <Card style={styles.cardItem}>
                                                                <CardHeader
                                                                    onClick={() => this.flyTo(structure)}
                                                                    style={styles.cardHeader}>{structure.properties.denomination_structure}</CardHeader>
                                                                <CardBody>
                                                                    <CardSubtitle
                                                                        style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}
                                                                    </CardSubtitle>
                                                                    <Collapse style={styles.subtitle}
                                                                              isOpen={this.state.collapse}>
                                                                        <DropdownItem
                                                                            style={styles.divider_margin}
                                                                            divider/>
                                                                        Anim pariatur cliche reprehenderit,
                                                                        enim eiusmod high life accusamus
                                                                        terry richardson ad squid. Nihil
                                                                        anim keffiyeh helvetica, craft beer
                                                                        labore wes anderson cred
                                                                        nesciunt sapiente ea proident.
                                                                    </Collapse>
                                                                </CardBody>
                                                            </Card>
                                                        </Col>
                                                } else {
                                                    if((structure.properties.adresse.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.cp.toString().includes(this.state.filtre_barre))||(structure.properties.ville.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.denomination_structure.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.sous_categorie.toLowerCase().includes(this.state.filtre_barre))){
                                                        ret =
                                                            <Col xs="12" xl="6">
                                                                <Card style={styles.cardItem}>
                                                                    <CardHeader
                                                                        onClick={() => this.flyTo(structure)}
                                                                        style={styles.cardHeader}>{structure.properties.denomination_structure}</CardHeader>
                                                                    <CardBody>
                                                                        <CardSubtitle
                                                                            style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}
                                                                        </CardSubtitle>
                                                                        <Collapse style={styles.subtitle}
                                                                                  isOpen={this.state.collapse}>
                                                                            <DropdownItem
                                                                                style={styles.divider_margin}
                                                                                divider/>
                                                                            Anim pariatur cliche
                                                                            reprehenderit,
                                                                            enim eiusmod high life accusamus
                                                                            terry richardson ad squid. Nihil
                                                                            anim keffiyeh helvetica, craft
                                                                            beer labore wes anderson cred
                                                                            nesciunt sapiente ea proident.
                                                                        </Collapse>
                                                                    </CardBody>
                                                                </Card>
                                                            </Col>
                                                    }
                                                }
                                            }
                                            break;
                                        case 'Personnes âgées':
                                            if (structure.properties.type_personne.includes(this.state.filtre_age)) {
                                                if (this.state.filtre_barre === "Aucun") {
                                                    ret =
                                                        <Col xs="12" xl="6">
                                                            <Card style={styles.cardItem}>
                                                                <CardHeader
                                                                    onClick={() => this.flyTo(structure)}
                                                                    style={styles.cardHeader}>{structure.properties.denomination_structure}</CardHeader>
                                                                <CardBody>
                                                                    <CardSubtitle
                                                                        style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}
                                                                    </CardSubtitle>
                                                                    <Collapse style={styles.subtitle}
                                                                              isOpen={this.state.collapse}>
                                                                        <DropdownItem
                                                                            style={styles.divider_margin}
                                                                            divider/>
                                                                        Anim pariatur cliche reprehenderit,
                                                                        enim eiusmod high life accusamus
                                                                        terry richardson ad squid. Nihil
                                                                        anim keffiyeh helvetica, craft beer
                                                                        labore wes anderson cred
                                                                        nesciunt sapiente ea proident.
                                                                    </Collapse>
                                                                </CardBody>
                                                            </Card>
                                                        </Col>
                                                } else {
                                                    if((structure.properties.adresse.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.cp.toString().includes(this.state.filtre_barre))||(structure.properties.ville.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.denomination_structure.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.sous_categorie.toLowerCase().includes(this.state.filtre_barre))){
                                                        ret =
                                                            <Col xs="12" xl="6">
                                                                <Card style={styles.cardItem}>
                                                                    <CardHeader
                                                                        onClick={() => this.flyTo(structure)}
                                                                        style={styles.cardHeader}>{structure.properties.denomination_structure}</CardHeader>
                                                                    <CardBody>
                                                                        <CardSubtitle
                                                                            style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}
                                                                        </CardSubtitle>
                                                                        <Collapse style={styles.subtitle}
                                                                                  isOpen={this.state.collapse}>
                                                                            <DropdownItem
                                                                                style={styles.divider_margin}
                                                                                divider/>
                                                                            Anim pariatur cliche
                                                                            reprehenderit,
                                                                            enim eiusmod high life accusamus
                                                                            terry richardson ad squid. Nihil
                                                                            anim keffiyeh helvetica, craft
                                                                            beer labore wes anderson cred
                                                                            nesciunt sapiente ea proident.
                                                                        </Collapse>
                                                                    </CardBody>
                                                                </Card>
                                                            </Col>
                                                    }
                                                }
                                            }
                                            break;
                                    }
                                }
                                return ret;
                            case "Professionnels libéraux (formés au TC)":
                                if (structure.properties.categorie === this.state.filtre) {
                                    switch (this.state.filtre_age) {
                                        case 'Aucun':
                                            if (this.state.filtre_barre === "Aucun") {
                                                ret =
                                                    <Col xs="12" xl="6">
                                                        <Card style={styles.cardItem}>
                                                            <CardHeader
                                                                onClick={() => this.flyTo(structure)}
                                                                style={styles.cardHeader}>{structure.properties.denomination_structure}</CardHeader>
                                                            <CardBody>
                                                                <CardSubtitle
                                                                    style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}<br/>{structure.properties.categorie}<br/>{structure.properties.sous_categorie}
                                                                </CardSubtitle>
                                                                <Collapse style={styles.subtitle}
                                                                          isOpen={this.state.collapse}>
                                                                    <DropdownItem
                                                                        style={styles.divider_margin}
                                                                        divider/>
                                                                </Collapse>
                                                            </CardBody>
                                                        </Card>
                                                    </Col>
                                            } else {
                                                if((structure.properties.adresse.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.cp.toString().includes(this.state.filtre_barre))||(structure.properties.ville.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.denomination_structure.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.sous_categorie.toLowerCase().includes(this.state.filtre_barre))){
                                                    ret =
                                                        <Col xs="12" xl="6">
                                                            <Card style={styles.cardItem}>
                                                                <CardHeader
                                                                    onClick={() => this.flyTo(structure)}
                                                                    style={styles.cardHeader}>{structure.properties.denomination_structure}</CardHeader>
                                                                <CardBody>
                                                                    <CardSubtitle
                                                                        style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}<br/>{structure.properties.categorie}<br/>{structure.properties.sous_categorie}
                                                                    </CardSubtitle>
                                                                    <Collapse style={styles.subtitle}
                                                                              isOpen={this.state.collapse}>
                                                                        <DropdownItem
                                                                            style={styles.divider_margin}
                                                                            divider/>
                                                                    </Collapse>
                                                                </CardBody>
                                                            </Card>
                                                        </Col>
                                                }
                                            }
                                            break;
                                            break;
                                        case 'Adultes':
                                            if (structure.properties.type_personne.includes(this.state.filtre_age)) {
                                                if (this.state.filtre_barre === "Aucun") {
                                                    ret =
                                                        <Col xs="12" xl="6">
                                                            <Card style={styles.cardItem}>
                                                                <CardHeader
                                                                    onClick={() => this.flyTo(structure)}
                                                                    style={styles.cardHeader}>{structure.properties.denomination_structure}</CardHeader>
                                                                <CardBody>
                                                                    <CardSubtitle
                                                                        style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}
                                                                    </CardSubtitle>
                                                                    <Collapse style={styles.subtitle}
                                                                              isOpen={this.state.collapse}>
                                                                        <DropdownItem
                                                                            style={styles.divider_margin}
                                                                            divider/>
                                                                        Anim pariatur cliche reprehenderit,
                                                                        enim eiusmod high life accusamus
                                                                        terry richardson ad squid. Nihil
                                                                        anim keffiyeh helvetica, craft beer
                                                                        labore wes anderson cred
                                                                        nesciunt sapiente ea proident.
                                                                    </Collapse>
                                                                </CardBody>
                                                            </Card>
                                                        </Col>
                                                } else {
                                                    if((structure.properties.adresse.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.cp.toString().includes(this.state.filtre_barre))||(structure.properties.ville.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.denomination_structure.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.sous_categorie.toLowerCase().includes(this.state.filtre_barre))){
                                                        ret =
                                                            <Col xs="12" xl="6">
                                                                <Card style={styles.cardItem}>
                                                                    <CardHeader
                                                                        onClick={() => this.flyTo(structure)}
                                                                        style={styles.cardHeader}>{structure.properties.denomination_structure}</CardHeader>
                                                                    <CardBody>
                                                                        <CardSubtitle
                                                                            style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}
                                                                        </CardSubtitle>
                                                                        <Collapse style={styles.subtitle}
                                                                                  isOpen={this.state.collapse}>
                                                                            <DropdownItem
                                                                                style={styles.divider_margin}
                                                                                divider/>
                                                                            Anim pariatur cliche
                                                                            reprehenderit,
                                                                            enim eiusmod high life accusamus
                                                                            terry richardson ad squid. Nihil
                                                                            anim keffiyeh helvetica, craft
                                                                            beer labore wes anderson cred
                                                                            nesciunt sapiente ea proident.
                                                                        </Collapse>
                                                                    </CardBody>

                                                                </Card>
                                                            </Col>
                                                    }
                                                }
                                            }
                                            break;
                                        case 'Enfants':
                                            if (structure.properties.type_personne.includes(this.state.filtre_age)) {
                                                if (this.state.filtre_barre === "Aucun") {
                                                    ret =
                                                        <Col xs="12" xl="6">
                                                            <Card style={styles.cardItem}>
                                                                <CardHeader
                                                                    onClick={() => this.flyTo(structure)}
                                                                    style={styles.cardHeader}>{structure.properties.denomination_structure}</CardHeader>
                                                                <CardBody>
                                                                    <CardSubtitle
                                                                        style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}
                                                                    </CardSubtitle>
                                                                    <Collapse style={styles.subtitle}
                                                                              isOpen={this.state.collapse}>
                                                                        <DropdownItem
                                                                            style={styles.divider_margin}
                                                                            divider/>
                                                                        Anim pariatur cliche reprehenderit,
                                                                        enim eiusmod high life accusamus
                                                                        terry richardson ad squid. Nihil
                                                                        anim keffiyeh helvetica, craft beer
                                                                        labore wes anderson cred
                                                                        nesciunt sapiente ea proident.
                                                                    </Collapse>
                                                                </CardBody>
                                                            </Card>
                                                        </Col>
                                                } else {
                                                    if((structure.properties.adresse.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.cp.toString().includes(this.state.filtre_barre))||(structure.properties.ville.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.denomination_structure.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.sous_categorie.toLowerCase().includes(this.state.filtre_barre))){
                                                        ret =
                                                            <Col xs="12" xl="6">
                                                                <Card style={styles.cardItem}>
                                                                    <CardHeader
                                                                        onClick={() => this.flyTo(structure)}
                                                                        style={styles.cardHeader}>{structure.properties.denomination_structure}</CardHeader>
                                                                    <CardBody>
                                                                        <CardSubtitle
                                                                            style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}
                                                                        </CardSubtitle>
                                                                        <Collapse style={styles.subtitle}
                                                                                  isOpen={this.state.collapse}>
                                                                            <DropdownItem
                                                                                style={styles.divider_margin}
                                                                                divider/>
                                                                            Anim pariatur cliche
                                                                            reprehenderit,
                                                                            enim eiusmod high life accusamus
                                                                            terry richardson ad squid. Nihil
                                                                            anim keffiyeh helvetica, craft
                                                                            beer labore wes anderson cred
                                                                            nesciunt sapiente ea proident.
                                                                        </Collapse>
                                                                    </CardBody>
                                                                </Card>
                                                            </Col>
                                                    }
                                                }
                                            }
                                            break;
                                        case 'Personnes âgées':
                                            if (structure.properties.type_personne.includes(this.state.filtre_age)) {
                                                if (this.state.filtre_barre === "Aucun") {
                                                    ret =
                                                        <Col xs="12" xl="6">
                                                            <Card style={styles.cardItem}>
                                                                <CardHeader
                                                                    onClick={() => this.flyTo(structure)}
                                                                    style={styles.cardHeader}>{structure.properties.denomination_structure}</CardHeader>
                                                                <CardBody>
                                                                    <CardSubtitle
                                                                        style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}
                                                                    </CardSubtitle>
                                                                    <Collapse style={styles.subtitle}
                                                                              isOpen={this.state.collapse}>
                                                                        <DropdownItem
                                                                            style={styles.divider_margin}
                                                                            divider/>
                                                                        Anim pariatur cliche reprehenderit,
                                                                        enim eiusmod high life accusamus
                                                                        terry richardson ad squid. Nihil
                                                                        anim keffiyeh helvetica, craft beer
                                                                        labore wes anderson cred
                                                                        nesciunt sapiente ea proident.
                                                                    </Collapse>
                                                                </CardBody>
                                                            </Card>
                                                        </Col>
                                                } else {
                                                    if((structure.properties.adresse.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.cp.toString().includes(this.state.filtre_barre))||(structure.properties.ville.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.denomination_structure.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.sous_categorie.toLowerCase().includes(this.state.filtre_barre))){
                                                        ret =
                                                            <Col xs="12" xl="6">
                                                                <Card style={styles.cardItem}>
                                                                    <CardHeader
                                                                        onClick={() => this.flyTo(structure)}
                                                                        style={styles.cardHeader}>{structure.properties.denomination_structure}</CardHeader>
                                                                    <CardBody>
                                                                        <CardSubtitle
                                                                            style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}
                                                                        </CardSubtitle>
                                                                        <Collapse style={styles.subtitle}
                                                                                  isOpen={this.state.collapse}>
                                                                            <DropdownItem
                                                                                style={styles.divider_margin}
                                                                                divider/>
                                                                            Anim pariatur cliche
                                                                            reprehenderit,
                                                                            enim eiusmod high life accusamus
                                                                            terry richardson ad squid. Nihil
                                                                            anim keffiyeh helvetica, craft
                                                                            beer labore wes anderson cred
                                                                            nesciunt sapiente ea proident.
                                                                        </Collapse>
                                                                    </CardBody>
                                                                </Card>
                                                            </Col>
                                                    }
                                                }
                                            }
                                            break;
                                    }
                                }
                                return ret;
                        }
                        return ret;
                    })};

                </Container>
            </section>
        );
    }

    /*

     */
}