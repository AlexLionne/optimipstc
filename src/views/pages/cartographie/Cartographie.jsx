import React, { Component } from 'react'
import ReactMapGL, {Marker, Popup} from 'react-map-gl';

import Geocoder from 'react-map-gl-geocoder';
import 'mapbox-gl/dist/mapbox-gl.css';
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css';
import styles from '../../../css/styles';
import '../../../css/container.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faInfo} from '@fortawesome/free-solid-svg-icons'
import {  faPhone } from '@fortawesome/free-solid-svg-icons'
import {  faMap } from '@fortawesome/free-solid-svg-icons'
import {  faMailBulk } from '@fortawesome/free-solid-svg-icons'
import {  faSearch } from '@fortawesome/free-solid-svg-icons'
import {  faUser } from '@fortawesome/free-solid-svg-icons'
import Autocomplete from "../../Autocomplete"
import * as structuresOcc from "../../../models/datas.json";
import marker_img from '../../../assets/images/hospital.png'
import img_hos from '../../../assets/images/img_hos.png'
import img_aeso from '../../../assets/images/img_aeso.png'
import img_phi from '../../../assets/images/img_phi.png'
import img_pro from '../../../assets/images/img_pro.png'
import img_r from '../../../assets/images/img_r.png'
import img_sad from '../../../assets/images/img_sad.png'
import img_scol from '../../../assets/images/img_scol.png'
import img_sml from '../../../assets/images/img_sml.png'
import hospital from '../../../assets/images/hospital.png'
import loupe from '../../../assets/images/loupe.png'
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
import close from "../../../assets/images/close-button.png";

export default class TCSevere extends React.Component {

    constructor(props) {
        super(props);
        let ctx = this;
        this.toggle = this.toggle.bind(this);
        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
        this.state = {
            dropdownOpen: false,
            dropdownOpen2: false,
            visibility: "none",
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
                zoom: 7
            },
            selectedStructure: null
        };

        axios.get('http://localhost:8888/')
            .then(res => {
                let data = res.data;
                ctx.setState({markers: data});
                ctx.getNames();
                ctx.getZip();
                ctx.getMails();
                ctx.getTypes();
            });

    }

    toggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    onMouseEnter() {
        this.setState({dropdownOpen2: true});
    }

    onMouseLeave() {
        this.setState({dropdownOpen2: false});
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

    // if you are happy with Geocoder default settings, you can just use handleViewportChange directly
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

    flyTo = (marker)=>{
        //scroll to top
        //Fly to marker
        Object.keys(marker).map((key,i)=>{
            console.log(key);
        });
        window.scrollTo(0, 0);
        this.setState({lng:marker.longitude,lat:marker.latitude,zoom:[15],selected:marker})
        //display card info
    };

    onSelect = (value) => {
        this.setState({value: value});
        this.setState({longitude: value.longitude});
        this.setState({latitude: value.latitude});
    };

    render() {

        return (
            <section>
                <Container fluid>
                    <Row className={'row-equipe'}>
                        <Col xs="12" xl="12">
                            <ReactMapGL
                                minZoom={6}
                                ref={this.mapRef}
                                {...this.state.viewport}
                                onViewportChange={this.handleViewportChange}
                                mapboxApiAccessToken="pk.eyJ1Ijoib3B0aW1pcHMtdGMiLCJhIjoiY2p4NGQzdGhpMDRkcTQwbXJqOXFta2JnbiJ9.FxL7vUlE5Egy4_N-MQHxMw">
                                <div className="filtres-actifs">
                                    <strong><p className="center-filtres">
                                        <h3>Filtres actifs</h3>
                                    </p>
                                    </strong>
                                    <hr/>
                                        Filtre de catégorie : {this.state.filtre}<br/>
                                        Filtre d'âge : {this.state.filtre_age}
                                </div>
                                <Col xs="4" xl="4">
                                    <Col xs="6" xl="6">
                                        <div className="position-responsive">
                                    <Dropdown className="margin-top-5" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                                        <DropdownToggle>
                                            Filtres
                                        </DropdownToggle>
                                            <DropdownMenu>
                                                <div className="dropdownmenu-responsive">
                                            <DropdownItem header>Filtres par catégorie</DropdownItem>
                                            <DropdownItem onClick={(e) => {
                                                e.preventDefault();
                                                // eslint-disable-next-line no-undef
                                                this.state.viewport.zoom = 7;
                                                this.setState({filtre: "Services de Médecine & Chirurgie"});
                                                this.setState({filtre_age: "Aucun"});
                                            }}><button className="marker-btn"><img src={img_hos} alt="Structure"/>Services de Médecine & Chirurgie</button></DropdownItem>
                                            <DropdownItem onClick={(e) => {
                                                e.preventDefault();
                                                // eslint-disable-next-line no-undef
                                                this.state.viewport.zoom = 7;
                                                this.setState({filtre: "Structures de Rééducation"});
                                                this.setState({filtre_age: "Aucun"});
                                            }}><button className="marker-btn"><img src={img_r} alt="Structure"/>Structures de Rééducation</button></DropdownItem>
                                            <DropdownItem onClick={(e) => {
                                                e.preventDefault();
                                                // eslint-disable-next-line no-undef
                                                this.state.viewport.zoom = 7;
                                                this.setState({filtre: "Structures Médico-sociales & Lieux de vie"});
                                                this.setState({filtre_age: "Aucun"});
                                            }}><button className="marker-btn"><img src={img_sml} alt="Structure"/>Structures Médico-sociales & Lieux de vie</button></DropdownItem>
                                            <DropdownItem onClick={(e) => {
                                                e.preventDefault();
                                                // eslint-disable-next-line no-undef
                                                this.state.viewport.zoom = 7;
                                                this.setState({filtre: "Associations & Structures Occupationnelles"});
                                                this.setState({filtre_age: "Aucun"});
                                            }}><button className="marker-btn"><img src={img_aeso} alt="Structure"/>Associations & Structures Occupationnelles</button></DropdownItem>
                                            <DropdownItem onClick={(e) => {
                                                e.preventDefault();
                                                // eslint-disable-next-line no-undef
                                                this.state.viewport.zoom = 7;
                                                this.setState({filtre: "Réinsertion Professionnelle"});
                                                this.setState({filtre_age: "Aucun"});
                                            }}><button className="marker-btn"><img src={img_pro} alt="Structure"/></button>SRéinsertion Professionnelle</DropdownItem>
                                            <DropdownItem onClick={(e) => {
                                                e.preventDefault();
                                                // eslint-disable-next-line no-undef
                                                this.state.viewport.zoom = 7;
                                                this.setState({filtre: "Service d'Accompagnement à Domicile"});
                                                this.setState({filtre_age: "Aucun"});
                                            }}><button className="marker-btn"><img src={img_sad} alt="Structure"/></button>Service d'Accompagnement à Domicile</DropdownItem>
                                            <DropdownItem onClick={(e) => {
                                                e.preventDefault();
                                                // eslint-disable-next-line no-undef
                                                this.state.viewport.zoom = 7;
                                                this.setState({filtre: "Accompagnement Scolaire"});
                                                this.setState({filtre_age: "Aucun"});
                                            }}><button className="marker-btn"><img src={img_scol} alt="Structure"/></button>Accompagnement Scolaire</DropdownItem>
                                            <DropdownItem onClick={(e) => {
                                                e.preventDefault();
                                                // eslint-disable-next-line no-undef
                                                this.state.viewport.zoom = 7;
                                                this.setState({filtre: "Structures de Psychiatrie et d’Accompagnement Psychologique"});
                                                this.setState({filtre_age: "Aucun"});
                                            }}><button className="marker-btn"><img src={img_phi} alt="Structure"/></button>Structures de Psychiatrie et d’Accompagnement Psychologique</DropdownItem>
                                            <DropdownItem onClick={(e) => {
                                                e.preventDefault();
                                                // eslint-disable-next-line no-undef
                                                this.state.viewport.zoom = 7;
                                                this.setState({filtre: "Professionnels libéraux (formés au TC)"});
                                                this.setState({filtre_age: "Aucun"});
                                            }}><button className="marker-btn"><img src={hospital} alt="Structure"/></button>Professionnels libéraux (formés au traumatisme crânien)</DropdownItem>
                                            <DropdownItem divider />
                                            <DropdownItem onClick={(e) => {
                                                e.preventDefault();
                                                // eslint-disable-next-line no-undef
                                                this.state.viewport.zoom = 7;
                                                this.setState({filtre: "Aucun"});
                                                this.setState({filtre_age: "Aucun"});
                                            }}>Aucun filtre</DropdownItem>
                                            <DropdownItem divider />
                                            <DropdownItem header>Filtres par âge</DropdownItem>
                                            <DropdownItem onClick={(e) => {
                                                e.preventDefault();
                                                // eslint-disable-next-line no-undef
                                                this.state.viewport.zoom = 7;
                                                this.setState({filtre_age: "Enfants"});
                                            }}>Enfant</DropdownItem>
                                            <DropdownItem onClick={(e) => {
                                                e.preventDefault();
                                                // eslint-disable-next-line no-undef
                                                this.state.viewport.zoom = 7;
                                                this.setState({filtre_age: "Adultes"});
                                            }}>Adulte</DropdownItem>
                                            <DropdownItem onClick={(e) => {
                                                e.preventDefault();
                                                // eslint-disable-next-line no-undef
                                                this.state.viewport.zoom = 7;
                                                this.setState({filtre_age: "Personnes âgées"});
                                            }}>Personnes âgées</DropdownItem>
                                            <DropdownItem divider />
                                            <DropdownItem onClick={(e) => {
                                                e.preventDefault();
                                                // eslint-disable-next-line no-undef
                                                this.state.viewport.zoom = 7;
                                                this.setState({filtre_age: "Aucun"});
                                            }}>Aucun filtre</DropdownItem>
                                        </div>
                                        </DropdownMenu>
                                    </Dropdown>
                                    <Button className="margin-top-5" onClick={(e) => {
                                        e.preventDefault();
                                        // eslint-disable-next-line no-undef
                                        this.state.viewport.zoom = 7;
                                        this.setState({filtre_age: "Aucun"});
                                        this.setState({filtre: "Aucun"});
                                        this.setState({filtre_barre: "Aucun"});
                                    }}>Aucun filtre</Button>
                                        </div>
                                    </Col>
                                </Col>
                                <Col xs="4" xl="4">
                                    <div className="position-responsive-bar">
                                                                            <input placeholder="Nom, sous-catégorie, ..." className="mapboxgl-ctrl-geocoder recherche" id="searchbar" type="text"
                                       onKeyDown={(e) => {
                                    this.state.viewport.zoom = 7;
                                    let key = e.key;
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
                                            else if((key === "CapsLock")||(key === "Shift")||(key === "Enter")||(key === "Dead")){}
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
                                </Col>
                                {structuresOcc.features.map((structure) => {
                                    let ret = null;
                                    let icon;
                                    if(structure.properties.categorie.includes("Structures de Rééducation")){
                                        icon = img_r;
                                    }
                                    else if(structure.properties.categorie.includes("Structures Médico-sociales & Lieux de vie")){
                                        icon = img_sml;
                                    }
                                    else if(structure.properties.categorie.includes("Associations & Structures Occupationnelles")){
                                        icon = img_aeso;
                                    }
                                    else if(structure.properties.categorie.includes("Services de Médecine & Chirurgie")){
                                        icon = img_hos;
                                    }
                                    else if(structure.properties.categorie.includes("SRéinsertion Professionnelle")){
                                        icon = img_pro;
                                    }
                                    else if(structure.properties.categorie.includes("Service d'Accompagnement à Domicile")){
                                        icon = img_sad;
                                    }
                                    else if(structure.properties.categorie.includes("Accompagnement Scolaire")){
                                        icon = img_scol;
                                    }
                                    else if(structure.properties.categorie.includes("Structures de Psychiatrie et d’Accompagnement Psychologique")){
                                        icon = img_phi;
                                    }
                                    switch(this.state.filtre) {
                                        case 'Aucun':
                                            switch (this.state.filtre_age) {
                                                case 'Aucun':
                                                    if (this.state.filtre_barre === "Aucun") {
                                                        ret =
                                                            <Marker key={structure.denomination_structure}
                                                                    offsetLeft={-13}
                                                                    offsetTop={-25}
                                                                    latitude={structure.geometry.coordinates[1]}
                                                                    longitude={structure.geometry.coordinates[0]}>
                                                                <div>
                                                                    <button onClick={(e) => {
                                                                        e.preventDefault();
                                                                        // eslint-disable-next-line no-undef
                                                                        this.setState({selectedStructure: structure});
                                                                    }} className="marker-btn"><img src={icon}
                                                                                                   alt="Structure"/>
                                                                    </button>
                                                                </div>
                                                            </Marker>
                                                    } else {
                                                        if((structure.properties.adresse.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.cp.toString().includes(this.state.filtre_barre))||(structure.properties.ville.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.denomination_structure.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.sous_categorie.toLowerCase().includes(this.state.filtre_barre))){
                                                            ret =
                                                                <Marker key={structure.denomination_structure}
                                                                        offsetLeft={-13}
                                                                        offsetTop={-25}
                                                                        latitude={structure.geometry.coordinates[1]}
                                                                        longitude={structure.geometry.coordinates[0]}>
                                                                    <div>
                                                                        <button onClick={(e) => {
                                                                            e.preventDefault();
                                                                            // eslint-disable-next-line no-undef
                                                                            this.setState({selectedStructure: structure});
                                                                        }} className="marker-btn"><img src={icon}
                                                                                                       alt="Structure"/>
                                                                        </button>
                                                                    </div>
                                                                </Marker>
                                                        }
                                                    }
                                                    break;
                                                case 'Adultes':
                                                    if (structure.properties.type_personne.includes(this.state.filtre_age)) {
                                                        if (this.state.filtre_barre === "Aucun") {
                                                            ret =
                                                                <Marker key={structure.denomination_structure}
                                                                        offsetLeft={-13}
                                                                        offsetTop={-25}
                                                                        latitude={structure.geometry.coordinates[1]}
                                                                        longitude={structure.geometry.coordinates[0]}>
                                                                    <div>
                                                                        <button onClick={(e) => {
                                                                            e.preventDefault();
                                                                            // eslint-disable-next-line no-undef
                                                                            this.setState({selectedStructure: structure});
                                                                        }} className="marker-btn"><img src={icon}
                                                                                                       alt="Structure"/>
                                                                        </button>
                                                                    </div>
                                                                </Marker>
                                                        } else {
                                                            if((structure.properties.adresse.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.cp.toString().includes(this.state.filtre_barre))||(structure.properties.ville.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.denomination_structure.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.sous_categorie.toLowerCase().includes(this.state.filtre_barre))){
                                                                ret =
                                                                    <Marker key={structure.denomination_structure}
                                                                            offsetLeft={-13}
                                                                            offsetTop={-25}
                                                                            latitude={structure.geometry.coordinates[1]}
                                                                            longitude={structure.geometry.coordinates[0]}>
                                                                        <div>
                                                                            <button onClick={(e) => {
                                                                                e.preventDefault();
                                                                                // eslint-disable-next-line no-undef
                                                                                this.setState({selectedStructure: structure});
                                                                            }} className="marker-btn"><img src={icon}
                                                                                                           alt="Structure"/>
                                                                            </button>
                                                                        </div>
                                                                    </Marker>
                                                            }
                                                        }
                                                    }
                                                    break;
                                                case 'Enfants':
                                                    if (structure.properties.type_personne.includes(this.state.filtre_age)) {
                                                        if (this.state.filtre_barre === "Aucun") {
                                                            ret =
                                                                <Marker key={structure.denomination_structure}
                                                                        offsetLeft={-13}
                                                                        offsetTop={-25}
                                                                        latitude={structure.geometry.coordinates[1]}
                                                                        longitude={structure.geometry.coordinates[0]}>
                                                                    <div>
                                                                        <button onClick={(e) => {
                                                                            e.preventDefault();
                                                                            // eslint-disable-next-line no-undef
                                                                            this.setState({selectedStructure: structure});
                                                                        }} className="marker-btn"><img src={icon}
                                                                                                       alt="Structure"/>
                                                                        </button>
                                                                    </div>
                                                                </Marker>
                                                        } else {
                                                            if((structure.properties.adresse.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.cp.toString().includes(this.state.filtre_barre))||(structure.properties.ville.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.denomination_structure.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.sous_categorie.toLowerCase().includes(this.state.filtre_barre))){
                                                                ret =
                                                                    <Marker key={structure.denomination_structure}
                                                                            offsetLeft={-13}
                                                                            offsetTop={-25}
                                                                            latitude={structure.geometry.coordinates[1]}
                                                                            longitude={structure.geometry.coordinates[0]}>
                                                                        <div>
                                                                            <button onClick={(e) => {
                                                                                e.preventDefault();
                                                                                // eslint-disable-next-line no-undef
                                                                                this.setState({selectedStructure: structure});
                                                                            }} className="marker-btn"><img src={icon}
                                                                                                           alt="Structure"/>
                                                                            </button>
                                                                        </div>
                                                                    </Marker>
                                                            }
                                                        }
                                                    }
                                                    break;
                                                case 'Personnes âgées':
                                                    if (structure.properties.type_personne.includes(this.state.filtre_age)) {
                                                        if (this.state.filtre_barre === "Aucun") {
                                                            ret =
                                                                <Marker key={structure.denomination_structure}
                                                                        offsetLeft={-13}
                                                                        offsetTop={-25}
                                                                        latitude={structure.geometry.coordinates[1]}
                                                                        longitude={structure.geometry.coordinates[0]}>
                                                                    <div>
                                                                        <button onClick={(e) => {
                                                                            e.preventDefault();
                                                                            // eslint-disable-next-line no-undef
                                                                            this.setState({selectedStructure: structure});
                                                                        }} className="marker-btn"><img src={icon}
                                                                                                       alt="Structure"/>
                                                                        </button>
                                                                    </div>
                                                                </Marker>
                                                        } else {
                                                            if((structure.properties.adresse.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.cp.toString().includes(this.state.filtre_barre))||(structure.properties.ville.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.denomination_structure.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.sous_categorie.toLowerCase().includes(this.state.filtre_barre))){
                                                                ret =
                                                                    <Marker key={structure.denomination_structure}
                                                                            offsetLeft={-13}
                                                                            offsetTop={-25}
                                                                            latitude={structure.geometry.coordinates[1]}
                                                                            longitude={structure.geometry.coordinates[0]}>
                                                                        <div>
                                                                            <button onClick={(e) => {
                                                                                e.preventDefault();
                                                                                // eslint-disable-next-line no-undef
                                                                                this.setState({selectedStructure: structure});
                                                                            }} className="marker-btn"><img src={icon}
                                                                                                           alt="Structure"/>
                                                                            </button>
                                                                        </div>
                                                                    </Marker>
                                                            }
                                                        }
                                                    }
                                                    break;
                                            }
                                            return ret;
                                        case "Structures Médico-sociales & Lieux de vie":
                                            if (structure.properties.categorie === this.state.filtre) {
                                                console.log("t'es vraiment trop con");
                                                switch (this.state.filtre_age) {
                                                    case 'Aucun':
                                                        if (this.state.filtre_barre === "Aucun") {
                                                            ret =
                                                                <Marker key={structure.denomination_structure}
                                                                        offsetLeft={-13}
                                                                        offsetTop={-25}
                                                                        latitude={structure.geometry.coordinates[1]}
                                                                        longitude={structure.geometry.coordinates[0]}>
                                                                    <div>
                                                                        <button onClick={(e) => {
                                                                            e.preventDefault();
                                                                            // eslint-disable-next-line no-undef
                                                                            this.setState({selectedStructure: structure});
                                                                        }} className="marker-btn"><img src={icon}
                                                                                                       alt="Structure"/>
                                                                        </button>
                                                                    </div>
                                                                </Marker>
                                                        } else {
                                                            if((structure.properties.adresse.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.cp.toString().includes(this.state.filtre_barre))||(structure.properties.ville.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.denomination_structure.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.sous_categorie.toLowerCase().includes(this.state.filtre_barre))){
                                                                ret =
                                                                    <Marker key={structure.denomination_structure}
                                                                            offsetLeft={-13}
                                                                            offsetTop={-25}
                                                                            latitude={structure.geometry.coordinates[1]}
                                                                            longitude={structure.geometry.coordinates[0]}>
                                                                        <div>
                                                                            <button onClick={(e) => {
                                                                                e.preventDefault();
                                                                                // eslint-disable-next-line no-undef
                                                                                this.setState({selectedStructure: structure});
                                                                            }} className="marker-btn"><img src={icon}
                                                                                                           alt="Structure"/>
                                                                            </button>
                                                                        </div>
                                                                    </Marker>
                                                            }
                                                        }
                                                        break;
                                                    case 'Adultes':
                                                        if (structure.properties.type_personne.includes(this.state.filtre_age)) {
                                                            if (this.state.filtre_barre === "Aucun") {
                                                                ret =
                                                                    <Marker key={structure.denomination_structure}
                                                                            offsetLeft={-13}
                                                                            offsetTop={-25}
                                                                            latitude={structure.geometry.coordinates[1]}
                                                                            longitude={structure.geometry.coordinates[0]}>
                                                                        <div>
                                                                            <button onClick={(e) => {
                                                                                e.preventDefault();
                                                                                // eslint-disable-next-line no-undef
                                                                                this.setState({selectedStructure: structure});
                                                                            }} className="marker-btn"><img src={icon}
                                                                                                           alt="Structure"/>
                                                                            </button>
                                                                        </div>
                                                                    </Marker>
                                                            } else {
                                                                if((structure.properties.adresse.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.cp.toString().includes(this.state.filtre_barre))||(structure.properties.ville.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.denomination_structure.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.sous_categorie.toLowerCase().includes(this.state.filtre_barre))){
                                                                    ret =
                                                                        <Marker key={structure.denomination_structure}
                                                                                offsetLeft={-13}
                                                                                offsetTop={-25}
                                                                                latitude={structure.geometry.coordinates[1]}
                                                                                longitude={structure.geometry.coordinates[0]}>
                                                                            <div>
                                                                                <button onClick={(e) => {
                                                                                    e.preventDefault();
                                                                                    // eslint-disable-next-line no-undef
                                                                                    this.setState({selectedStructure: structure});
                                                                                }} className="marker-btn"><img
                                                                                    src={icon} alt="Structure"/>
                                                                                </button>
                                                                            </div>
                                                                        </Marker>
                                                                }
                                                            }
                                                        }
                                                        break;
                                                    case 'Enfants':
                                                        if (structure.properties.type_personne.includes(this.state.filtre_age)) {
                                                            if (this.state.filtre_barre === "Aucun") {
                                                                ret =
                                                                    <Marker key={structure.denomination_structure}
                                                                            offsetLeft={-13}
                                                                            offsetTop={-25}
                                                                            latitude={structure.geometry.coordinates[1]}
                                                                            longitude={structure.geometry.coordinates[0]}>
                                                                        <div>
                                                                            <button onClick={(e) => {
                                                                                e.preventDefault();
                                                                                // eslint-disable-next-line no-undef
                                                                                this.setState({selectedStructure: structure});
                                                                            }} className="marker-btn"><img src={icon}
                                                                                                           alt="Structure"/>
                                                                            </button>
                                                                        </div>
                                                                    </Marker>
                                                            } else {
                                                                if((structure.properties.adresse.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.cp.toString().includes(this.state.filtre_barre))||(structure.properties.ville.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.denomination_structure.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.sous_categorie.toLowerCase().includes(this.state.filtre_barre))){
                                                                    ret =
                                                                        <Marker key={structure.denomination_structure}                                    offsetLeft={-13}
                                                                                offsetTop={-25}
                                                                                latitude={structure.geometry.coordinates[1]}
                                                                                longitude={structure.geometry.coordinates[0]}>
                                                                            <div>
                                                                                <button onClick={(e) => {
                                                                                    e.preventDefault();
                                                                                    // eslint-disable-next-line no-undef
                                                                                    this.setState({selectedStructure: structure});
                                                                                }} className="marker-btn"><img
                                                                                    src={icon} alt="Structure"/>
                                                                                </button>
                                                                            </div>
                                                                        </Marker>
                                                                }
                                                            }
                                                        }
                                                        break;
                                                    case 'Personnes âgées':
                                                        if (structure.properties.type_personne.includes(this.state.filtre_age)) {
                                                            if (this.state.filtre_barre === "Aucun") {
                                                                ret =
                                                                    <Marker key={structure.denomination_structure}
                                                                            offsetLeft={-13}
                                                                            offsetTop={-25}
                                                                            latitude={structure.geometry.coordinates[1]}
                                                                            longitude={structure.geometry.coordinates[0]}>
                                                                        <div>
                                                                            <button onClick={(e) => {
                                                                                e.preventDefault();
                                                                                // eslint-disable-next-line no-undef
                                                                                this.setState({selectedStructure: structure});
                                                                            }} className="marker-btn"><img src={icon}
                                                                                                           alt="Structure"/>
                                                                            </button>
                                                                        </div>
                                                                    </Marker>
                                                            } else {
                                                                if((structure.properties.adresse.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.cp.toString().includes(this.state.filtre_barre))||(structure.properties.ville.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.denomination_structure.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.sous_categorie.toLowerCase().includes(this.state.filtre_barre))){
                                                                    ret =
                                                                        <Marker key={structure.denomination_structure}
                                                                                offsetLeft={-13}
                                                                                offsetTop={-25}
                                                                                latitude={structure.geometry.coordinates[1]}
                                                                                longitude={structure.geometry.coordinates[0]}>
                                                                            <div>
                                                                                <button onClick={(e) => {
                                                                                    e.preventDefault();
                                                                                    // eslint-disable-next-line no-undef
                                                                                    this.setState({selectedStructure: structure});
                                                                                }} className="marker-btn"><img
                                                                                    src={icon} alt="Structure"/>
                                                                                </button>
                                                                            </div>
                                                                        </Marker>
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
                                                                <Marker key={structure.denomination_structure}
                                                                        offsetLeft={-13}
                                                                        offsetTop={-25}
                                                                        latitude={structure.geometry.coordinates[1]}
                                                                        longitude={structure.geometry.coordinates[0]}>
                                                                    <div>
                                                                        <button onClick={(e) => {
                                                                            e.preventDefault();
                                                                            // eslint-disable-next-line no-undef
                                                                            this.setState({selectedStructure: structure});
                                                                        }} className="marker-btn"><img src={icon}
                                                                                                       alt="Structure"/>
                                                                        </button>
                                                                    </div>
                                                                </Marker>
                                                        } else {
                                                            if((structure.properties.adresse.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.cp.toString().includes(this.state.filtre_barre))||(structure.properties.ville.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.denomination_structure.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.sous_categorie.toLowerCase().includes(this.state.filtre_barre))){
                                                                ret =
                                                                    <Marker key={structure.denomination_structure}
                                                                            offsetLeft={-13}
                                                                            offsetTop={-25}
                                                                            latitude={structure.geometry.coordinates[1]}
                                                                            longitude={structure.geometry.coordinates[0]}>
                                                                        <div>
                                                                            <button onClick={(e) => {
                                                                                e.preventDefault();
                                                                                // eslint-disable-next-line no-undef
                                                                                this.setState({selectedStructure: structure});
                                                                            }} className="marker-btn"><img src={icon}
                                                                                                           alt="Structure"/>
                                                                            </button>
                                                                        </div>
                                                                    </Marker>
                                                            }
                                                        }
                                                        break;
                                                    case 'Adultes':
                                                        ret = ((structure.properties.type_personne.includes(this.state.filtre_age)) && (structure.properties.categorie === this.state.filtre)) ?
                                                            <Marker key={structure.denomination_structure}
                                                                    offsetLeft={-13}
                                                                    offsetTop={-25}
                                                                    latitude={structure.geometry.coordinates[1]}
                                                                    longitude={structure.geometry.coordinates[0]}>
                                                                <div>
                                                                    <button onClick={(e) => {
                                                                        e.preventDefault();
                                                                        // eslint-disable-next-line no-undef
                                                                        this.setState({selectedStructure: structure});
                                                                    }} className="marker-btn"><img src={icon}
                                                                                                   alt="Structure"/>
                                                                    </button>
                                                                </div>
                                                            </Marker>
                                                            : null;
                                                        break;
                                                    case 'Enfants':
                                                        ret = ((structure.properties.type_personne.includes(this.state.filtre_age)) && (structure.properties.categorie === this.state.filtre)) ?
                                                            <Marker key={structure.denomination_structure}
                                                                    offsetLeft={-13}
                                                                    offsetTop={-25}
                                                                    latitude={structure.geometry.coordinates[1]}
                                                                    longitude={structure.geometry.coordinates[0]}>
                                                                <div>
                                                                    <button onClick={(e) => {
                                                                        e.preventDefault();
                                                                        // eslint-disable-next-line no-undef
                                                                        this.setState({selectedStructure: structure});
                                                                    }} className="marker-btn"><img src={icon}
                                                                                                   alt="Structure"/>
                                                                    </button>
                                                                </div>
                                                            </Marker>
                                                            : null;
                                                        break;
                                                    case 'Personnes âgées':
                                                        ret = ((structure.properties.type_personne.includes(this.state.filtre_age)) && (structure.properties.categorie === this.state.filtre)) ?
                                                            <Marker key={structure.denomination_structure}
                                                                    offsetLeft={-13}
                                                                    offsetTop={-25}
                                                                    latitude={structure.geometry.coordinates[1]}
                                                                    longitude={structure.geometry.coordinates[0]}>
                                                                <div>
                                                                    <button onClick={(e) => {
                                                                        e.preventDefault();
                                                                        // eslint-disable-next-line no-undef
                                                                        this.setState({selectedStructure: structure});
                                                                    }} className="marker-btn"><img src={icon}
                                                                                                   alt="Structure"/>
                                                                    </button>
                                                                </div>
                                                            </Marker>
                                                            : null;
                                                        break;
                                                }
                                            }
                                            return ret;
                                        case "Structures de Rééducation":
                                            if (structure.properties.categorie === this.state.filtre) {
                                                switch (this.state.filtre_age) {
                                                    case 'Aucun':
                                                        if (this.state.filtre_barre === "Aucun") {
                                                            ret =
                                                                <Marker key={structure.denomination_structure}
                                                                        offsetLeft={-13}
                                                                        offsetTop={-25}
                                                                        latitude={structure.geometry.coordinates[1]}
                                                                        longitude={structure.geometry.coordinates[0]}>
                                                                    <div>
                                                                        <button onClick={(e) => {
                                                                            e.preventDefault();
                                                                            // eslint-disable-next-line no-undef
                                                                            this.setState({selectedStructure: structure});
                                                                        }} className="marker-btn"><img src={icon}
                                                                                                       alt="Structure"/>
                                                                        </button>
                                                                    </div>
                                                                </Marker>
                                                        } else {
                                                            if((structure.properties.adresse.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.cp.toString().includes(this.state.filtre_barre))||(structure.properties.ville.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.denomination_structure.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.sous_categorie.toLowerCase().includes(this.state.filtre_barre))){
                                                                ret =
                                                                    <Marker key={structure.denomination_structure}
                                                                            offsetLeft={-13}
                                                                            offsetTop={-25}
                                                                            latitude={structure.geometry.coordinates[1]}
                                                                            longitude={structure.geometry.coordinates[0]}>
                                                                        <div>
                                                                            <button onClick={(e) => {
                                                                                e.preventDefault();
                                                                                // eslint-disable-next-line no-undef
                                                                                this.setState({selectedStructure: structure});
                                                                            }} className="marker-btn"><img src={icon}
                                                                                                           alt="Structure"/>
                                                                            </button>
                                                                        </div>
                                                                    </Marker>
                                                            }
                                                        }
                                                        break;
                                                    case 'Adultes':
                                                        ret = ((structure.properties.type_personne.includes(this.state.filtre_age)) && (structure.properties.categorie === this.state.filtre)) ?
                                                            <Marker key={structure.denomination_structure}
                                                                    offsetLeft={-13}
                                                                    offsetTop={-25}
                                                                    latitude={structure.geometry.coordinates[1]}
                                                                    longitude={structure.geometry.coordinates[0]}>
                                                                <div>
                                                                    <button onClick={(e) => {
                                                                        e.preventDefault();
                                                                        // eslint-disable-next-line no-undef
                                                                        this.setState({selectedStructure: structure});
                                                                    }} className="marker-btn"><img src={icon}
                                                                                                   alt="Structure"/>
                                                                    </button>
                                                                </div>
                                                            </Marker>
                                                            : null;
                                                        break;
                                                    case 'Enfants':
                                                        ret = ((structure.properties.type_personne.includes(this.state.filtre_age)) && (structure.properties.categorie === this.state.filtre)) ?
                                                            <Marker key={structure.denomination_structure}
                                                                    offsetLeft={-13}
                                                                    offsetTop={-25}
                                                                    latitude={structure.geometry.coordinates[1]}
                                                                    longitude={structure.geometry.coordinates[0]}>
                                                                <div>
                                                                    <button onClick={(e) => {
                                                                        e.preventDefault();
                                                                        // eslint-disable-next-line no-undef
                                                                        this.setState({selectedStructure: structure});
                                                                    }} className="marker-btn"><img src={icon}
                                                                                                   alt="Structure"/>
                                                                    </button>
                                                                </div>
                                                            </Marker>
                                                            : null;
                                                        break;
                                                    case 'Personnes âgées':
                                                        ret = ((structure.properties.type_personne.includes(this.state.filtre_age)) && (structure.properties.categorie === this.state.filtre)) ?
                                                            <Marker key={structure.denomination_structure}
                                                                    offsetLeft={-13}
                                                                    offsetTop={-25}
                                                                    latitude={structure.geometry.coordinates[1]}
                                                                    longitude={structure.geometry.coordinates[0]}>
                                                                <div>
                                                                    <button onClick={(e) => {
                                                                        e.preventDefault();
                                                                        // eslint-disable-next-line no-undef
                                                                        this.setState({selectedStructure: structure});
                                                                    }} className="marker-btn"><img src={icon}
                                                                                                   alt="Structure"/>
                                                                    </button>
                                                                </div>
                                                            </Marker>
                                                            : null;
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
                                                                <Marker key={structure.denomination_structure}
                                                                        offsetLeft={-13}
                                                                        offsetTop={-25}
                                                                        latitude={structure.geometry.coordinates[1]}
                                                                        longitude={structure.geometry.coordinates[0]}>
                                                                    <div>
                                                                        <button onClick={(e) => {
                                                                            e.preventDefault();
                                                                            // eslint-disable-next-line no-undef
                                                                            this.setState({selectedStructure: structure});
                                                                        }} className="marker-btn"><img src={icon}
                                                                                                       alt="Structure"/>
                                                                        </button>
                                                                    </div>
                                                                </Marker>
                                                        } else {
                                                            if((structure.properties.adresse.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.cp.toString().includes(this.state.filtre_barre))||(structure.properties.ville.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.denomination_structure.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.sous_categorie.toLowerCase().includes(this.state.filtre_barre))){
                                                                ret =
                                                                    <Marker key={structure.denomination_structure}
                                                                            offsetLeft={-13}
                                                                            offsetTop={-25}
                                                                            latitude={structure.geometry.coordinates[1]}
                                                                            longitude={structure.geometry.coordinates[0]}>
                                                                        <div>
                                                                            <button onClick={(e) => {
                                                                                e.preventDefault();
                                                                                // eslint-disable-next-line no-undef
                                                                                this.setState({selectedStructure: structure});
                                                                            }} className="marker-btn"><img src={icon}
                                                                                                           alt="Structure"/>
                                                                            </button>
                                                                        </div>
                                                                    </Marker>
                                                            }
                                                        }
                                                        break;
                                                    case 'Adultes':
                                                        if (structure.properties.type_personne.includes(this.state.filtre_age)) {
                                                            if (this.state.filtre_barre === "Aucun") {
                                                                ret =
                                                                    <Marker key={structure.denomination_structure}
                                                                            offsetLeft={-13}
                                                                            offsetTop={-25}
                                                                            latitude={structure.geometry.coordinates[1]}
                                                                            longitude={structure.geometry.coordinates[0]}>
                                                                        <div>
                                                                            <button onClick={(e) => {
                                                                                e.preventDefault();
                                                                                // eslint-disable-next-line no-undef
                                                                                this.setState({selectedStructure: structure});
                                                                            }} className="marker-btn"><img src={icon}
                                                                                                           alt="Structure"/>
                                                                            </button>
                                                                        </div>
                                                                    </Marker>
                                                            } else {
                                                                if((structure.properties.adresse.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.cp.toString().includes(this.state.filtre_barre))||(structure.properties.ville.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.denomination_structure.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.sous_categorie.toLowerCase().includes(this.state.filtre_barre))){
                                                                    ret =
                                                                        <Marker key={structure.denomination_structure}
                                                                                offsetLeft={-13}
                                                                                offsetTop={-25}
                                                                                latitude={structure.geometry.coordinates[1]}
                                                                                longitude={structure.geometry.coordinates[0]}>
                                                                            <div>
                                                                                <button onClick={(e) => {
                                                                                    e.preventDefault();
                                                                                    // eslint-disable-next-line no-undef
                                                                                    this.setState({selectedStructure: structure});
                                                                                }} className="marker-btn"><img
                                                                                    src={icon} alt="Structure"/>
                                                                                </button>
                                                                            </div>
                                                                        </Marker>
                                                                }
                                                            }
                                                        }
                                                        break;
                                                    case 'Enfants':
                                                        if (structure.properties.type_personne.includes(this.state.filtre_age)) {
                                                            if (this.state.filtre_barre === "Aucun") {
                                                                ret =
                                                                    <Marker key={structure.denomination_structure}
                                                                            offsetLeft={-13}
                                                                            offsetTop={-25}
                                                                            latitude={structure.geometry.coordinates[1]}
                                                                            longitude={structure.geometry.coordinates[0]}>
                                                                        <div>
                                                                            <button onClick={(e) => {
                                                                                e.preventDefault();
                                                                                // eslint-disable-next-line no-undef
                                                                                this.setState({selectedStructure: structure});
                                                                            }} className="marker-btn"><img src={icon}
                                                                                                           alt="Structure"/>
                                                                            </button>
                                                                        </div>
                                                                    </Marker>
                                                            } else {
                                                                if((structure.properties.adresse.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.cp.toString().includes(this.state.filtre_barre))||(structure.properties.ville.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.denomination_structure.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.sous_categorie.toLowerCase().includes(this.state.filtre_barre))){
                                                                    ret =
                                                                        <Marker key={structure.denomination_structure}
                                                                                offsetLeft={-13}
                                                                                offsetTop={-25}
                                                                                latitude={structure.geometry.coordinates[1]}
                                                                                longitude={structure.geometry.coordinates[0]}>
                                                                            <div>
                                                                                <button onClick={(e) => {
                                                                                    e.preventDefault();
                                                                                    // eslint-disable-next-line no-undef
                                                                                    this.setState({selectedStructure: structure});
                                                                                }} className="marker-btn"><img
                                                                                    src={icon} alt="Structure"/>
                                                                                </button>
                                                                            </div>
                                                                        </Marker>
                                                                }
                                                            }
                                                        }
                                                        break;
                                                    case 'Personnes âgées':
                                                        if (structure.properties.type_personne.includes(this.state.filtre_age)) {
                                                            if (this.state.filtre_barre === "Aucun") {
                                                                ret =
                                                                    <Marker key={structure.denomination_structure}
                                                                            offsetLeft={-13}
                                                                            offsetTop={-25}
                                                                            latitude={structure.geometry.coordinates[1]}
                                                                            longitude={structure.geometry.coordinates[0]}>
                                                                        <div>
                                                                            <button onClick={(e) => {
                                                                                e.preventDefault();
                                                                                // eslint-disable-next-line no-undef
                                                                                this.setState({selectedStructure: structure});
                                                                            }} className="marker-btn"><img src={icon}
                                                                                                           alt="Structure"/>
                                                                            </button>
                                                                        </div>
                                                                    </Marker>
                                                            } else {
                                                                if((structure.properties.adresse.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.cp.toString().includes(this.state.filtre_barre))||(structure.properties.ville.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.denomination_structure.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.sous_categorie.toLowerCase().includes(this.state.filtre_barre))){
                                                                    ret =
                                                                        <Marker key={structure.denomination_structure}
                                                                                offsetLeft={-13}
                                                                                offsetTop={-25}
                                                                                latitude={structure.geometry.coordinates[1]}
                                                                                longitude={structure.geometry.coordinates[0]}>
                                                                            <div>
                                                                                <button onClick={(e) => {
                                                                                    e.preventDefault();
                                                                                    // eslint-disable-next-line no-undef
                                                                                    this.setState({selectedStructure: structure});
                                                                                }} className="marker-btn"><img
                                                                                    src={icon} alt="Structure"/>
                                                                                </button>
                                                                            </div>
                                                                        </Marker>
                                                                }
                                                            }
                                                        }
                                                        break;
                                                }
                                            }
                                            return ret;
                                        case "Réinsertion Professionnelle":
                                            if (structure.properties.categorie === this.state.filtre) {
                                                switch (this.state.filtre_age) {
                                                    case 'Aucun':
                                                        if (this.state.filtre_barre === "Aucun") {
                                                            ret =
                                                                <Marker key={structure.denomination_structure}
                                                                        offsetLeft={-13}
                                                                        offsetTop={-25}
                                                                        latitude={structure.geometry.coordinates[1]}
                                                                        longitude={structure.geometry.coordinates[0]}>
                                                                    <div>
                                                                        <button onClick={(e) => {
                                                                            e.preventDefault();
                                                                            // eslint-disable-next-line no-undef
                                                                            this.setState({selectedStructure: structure});
                                                                        }} className="marker-btn"><img src={icon}
                                                                                                       alt="Structure"/>
                                                                        </button>
                                                                    </div>
                                                                </Marker>
                                                        } else {
                                                            if((structure.properties.adresse.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.cp.toString().includes(this.state.filtre_barre))||(structure.properties.ville.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.denomination_structure.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.sous_categorie.toLowerCase().includes(this.state.filtre_barre))){
                                                                ret =
                                                                    <Marker key={structure.denomination_structure}
                                                                            offsetLeft={-13}
                                                                            offsetTop={-25}
                                                                            latitude={structure.geometry.coordinates[1]}
                                                                            longitude={structure.geometry.coordinates[0]}>
                                                                        <div>
                                                                            <button onClick={(e) => {
                                                                                e.preventDefault();
                                                                                // eslint-disable-next-line no-undef
                                                                                this.setState({selectedStructure: structure});
                                                                            }} className="marker-btn"><img src={icon}
                                                                                                           alt="Structure"/>
                                                                            </button>
                                                                        </div>
                                                                    </Marker>
                                                            }
                                                        }
                                                        break;
                                                    case 'Adultes':
                                                        if (structure.properties.type_personne.includes(this.state.filtre_age)) {
                                                            if (this.state.filtre_barre === "Aucun") {
                                                                ret =
                                                                    <Marker key={structure.denomination_structure}
                                                                            offsetLeft={-13}
                                                                            offsetTop={-25}
                                                                            latitude={structure.geometry.coordinates[1]}
                                                                            longitude={structure.geometry.coordinates[0]}>
                                                                        <div>
                                                                            <button onClick={(e) => {
                                                                                e.preventDefault();
                                                                                // eslint-disable-next-line no-undef
                                                                                this.setState({selectedStructure: structure});
                                                                            }} className="marker-btn"><img src={icon}
                                                                                                           alt="Structure"/>
                                                                            </button>
                                                                        </div>
                                                                    </Marker>
                                                            } else {
                                                                if((structure.properties.adresse.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.cp.toString().includes(this.state.filtre_barre))||(structure.properties.ville.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.denomination_structure.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.sous_categorie.toLowerCase().includes(this.state.filtre_barre))){
                                                                    ret =
                                                                        <Marker key={structure.denomination_structure}
                                                                                offsetLeft={-13}
                                                                                offsetTop={-25}
                                                                                latitude={structure.geometry.coordinates[1]}
                                                                                longitude={structure.geometry.coordinates[0]}>
                                                                            <div>
                                                                                <button onClick={(e) => {
                                                                                    e.preventDefault();
                                                                                    // eslint-disable-next-line no-undef
                                                                                    this.setState({selectedStructure: structure});
                                                                                }} className="marker-btn"><img
                                                                                    src={icon} alt="Structure"/>
                                                                                </button>
                                                                            </div>
                                                                        </Marker>
                                                                }
                                                            }
                                                        }
                                                        break;
                                                    case 'Enfants':
                                                        if (structure.properties.type_personne.includes(this.state.filtre_age)) {
                                                            if (this.state.filtre_barre === "Aucun") {
                                                                ret =
                                                                    <Marker key={structure.denomination_structure}
                                                                            offsetLeft={-13}
                                                                            offsetTop={-25}
                                                                            latitude={structure.geometry.coordinates[1]}
                                                                            longitude={structure.geometry.coordinates[0]}>
                                                                        <div>
                                                                            <button onClick={(e) => {
                                                                                e.preventDefault();
                                                                                // eslint-disable-next-line no-undef
                                                                                this.setState({selectedStructure: structure});
                                                                            }} className="marker-btn"><img src={icon}
                                                                                                           alt="Structure"/>
                                                                            </button>
                                                                        </div>
                                                                    </Marker>
                                                            } else {
                                                                if((structure.properties.adresse.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.cp.toString().includes(this.state.filtre_barre))||(structure.properties.ville.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.denomination_structure.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.sous_categorie.toLowerCase().includes(this.state.filtre_barre))){
                                                                    ret =
                                                                        <Marker key={structure.denomination_structure}
                                                                                offsetLeft={-13}
                                                                                offsetTop={-25}
                                                                                latitude={structure.geometry.coordinates[1]}
                                                                                longitude={structure.geometry.coordinates[0]}>
                                                                            <div>
                                                                                <button onClick={(e) => {
                                                                                    e.preventDefault();
                                                                                    // eslint-disable-next-line no-undef
                                                                                    this.setState({selectedStructure: structure});
                                                                                }} className="marker-btn"><img
                                                                                    src={icon} alt="Structure"/>
                                                                                </button>
                                                                            </div>
                                                                        </Marker>
                                                                }
                                                            }
                                                        }
                                                        break;
                                                    case 'Personnes âgées':
                                                        if (structure.properties.type_personne.includes(this.state.filtre_age)) {
                                                            if (this.state.filtre_barre === "Aucun") {
                                                                ret =
                                                                    <Marker key={structure.denomination_structure}
                                                                            offsetLeft={-13}
                                                                            offsetTop={-25}
                                                                            latitude={structure.geometry.coordinates[1]}
                                                                            longitude={structure.geometry.coordinates[0]}>
                                                                        <div>
                                                                            <button onClick={(e) => {
                                                                                e.preventDefault();
                                                                                // eslint-disable-next-line no-undef
                                                                                this.setState({selectedStructure: structure});
                                                                            }} className="marker-btn"><img src={icon}
                                                                                                           alt="Structure"/>
                                                                            </button>
                                                                        </div>
                                                                    </Marker>
                                                            } else {
                                                                if((structure.properties.adresse.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.cp.toString().includes(this.state.filtre_barre))||(structure.properties.ville.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.denomination_structure.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.sous_categorie.toLowerCase().includes(this.state.filtre_barre))){
                                                                    ret =
                                                                        <Marker key={structure.denomination_structure}
                                                                                offsetLeft={-13}
                                                                                offsetTop={-25}
                                                                                latitude={structure.geometry.coordinates[1]}
                                                                                longitude={structure.geometry.coordinates[0]}>
                                                                            <div>
                                                                                <button onClick={(e) => {
                                                                                    e.preventDefault();
                                                                                    // eslint-disable-next-line no-undef
                                                                                    this.setState({selectedStructure: structure});
                                                                                }} className="marker-btn"><img
                                                                                    src={icon} alt="Structure"/>
                                                                                </button>
                                                                            </div>
                                                                        </Marker>
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
                                                                <Marker key={structure.denomination_structure}
                                                                        offsetLeft={-13}
                                                                        offsetTop={-25}
                                                                        latitude={structure.geometry.coordinates[1]}
                                                                        longitude={structure.geometry.coordinates[0]}>
                                                                    <div>
                                                                        <button onClick={(e) => {
                                                                            e.preventDefault();
                                                                            // eslint-disable-next-line no-undef
                                                                            this.setState({selectedStructure: structure});
                                                                        }} className="marker-btn"><img src={icon}
                                                                                                       alt="Structure"/>
                                                                        </button>
                                                                    </div>
                                                                </Marker>
                                                        } else {
                                                            if((structure.properties.adresse.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.cp.toString().includes(this.state.filtre_barre))||(structure.properties.ville.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.denomination_structure.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.sous_categorie.toLowerCase().includes(this.state.filtre_barre))){
                                                                ret =
                                                                    <Marker key={structure.denomination_structure}
                                                                            offsetLeft={-13}
                                                                            offsetTop={-25}
                                                                            latitude={structure.geometry.coordinates[1]}
                                                                            longitude={structure.geometry.coordinates[0]}>
                                                                        <div>
                                                                            <button onClick={(e) => {
                                                                                e.preventDefault();
                                                                                // eslint-disable-next-line no-undef
                                                                                this.setState({selectedStructure: structure});
                                                                            }} className="marker-btn"><img src={icon}
                                                                                                           alt="Structure"/>
                                                                            </button>
                                                                        </div>
                                                                    </Marker>
                                                            }
                                                        }
                                                        break;
                                                    case 'Adultes':
                                                        if (structure.properties.type_personne.includes(this.state.filtre_age)) {
                                                            if (this.state.filtre_barre === "Aucun") {
                                                                ret =
                                                                    <Marker key={structure.denomination_structure}
                                                                            offsetLeft={-13}
                                                                            offsetTop={-25}
                                                                            latitude={structure.geometry.coordinates[1]}
                                                                            longitude={structure.geometry.coordinates[0]}>
                                                                        <div>
                                                                            <button onClick={(e) => {
                                                                                e.preventDefault();
                                                                                // eslint-disable-next-line no-undef
                                                                                this.setState({selectedStructure: structure});
                                                                            }} className="marker-btn"><img src={icon}
                                                                                                           alt="Structure"/>
                                                                            </button>
                                                                        </div>
                                                                    </Marker>
                                                            } else {
                                                                if((structure.properties.adresse.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.cp.toString().includes(this.state.filtre_barre))||(structure.properties.ville.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.denomination_structure.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.sous_categorie.toLowerCase().includes(this.state.filtre_barre))){
                                                                    ret =
                                                                        <Marker key={structure.denomination_structure}
                                                                                offsetLeft={-13}
                                                                                offsetTop={-25}
                                                                                latitude={structure.geometry.coordinates[1]}
                                                                                longitude={structure.geometry.coordinates[0]}>
                                                                            <div>
                                                                                <button onClick={(e) => {
                                                                                    e.preventDefault();
                                                                                    // eslint-disable-next-line no-undef
                                                                                    this.setState({selectedStructure: structure});
                                                                                }} className="marker-btn"><img
                                                                                    src={icon} alt="Structure"/>
                                                                                </button>
                                                                            </div>
                                                                        </Marker>
                                                                }
                                                            }
                                                        }
                                                        break;
                                                    case 'Enfants':
                                                        if (structure.properties.type_personne.includes(this.state.filtre_age)) {
                                                            if (this.state.filtre_barre === "Aucun") {
                                                                ret =
                                                                    <Marker key={structure.denomination_structure}
                                                                            offsetLeft={-13}
                                                                            offsetTop={-25}
                                                                            latitude={structure.geometry.coordinates[1]}
                                                                            longitude={structure.geometry.coordinates[0]}>
                                                                        <div>
                                                                            <button onClick={(e) => {
                                                                                e.preventDefault();
                                                                                // eslint-disable-next-line no-undef
                                                                                this.setState({selectedStructure: structure});
                                                                            }} className="marker-btn"><img src={icon}
                                                                                                           alt="Structure"/>
                                                                            </button>
                                                                        </div>
                                                                    </Marker>
                                                            } else {
                                                                if((structure.properties.adresse.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.cp.toString().includes(this.state.filtre_barre))||(structure.properties.ville.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.denomination_structure.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.sous_categorie.toLowerCase().includes(this.state.filtre_barre))){
                                                                    ret =
                                                                        <Marker key={structure.denomination_structure}
                                                                                offsetLeft={-13}
                                                                                offsetTop={-25}
                                                                                latitude={structure.geometry.coordinates[1]}
                                                                                longitude={structure.geometry.coordinates[0]}>
                                                                            <div>
                                                                                <button onClick={(e) => {
                                                                                    e.preventDefault();
                                                                                    // eslint-disable-next-line no-undef
                                                                                    this.setState({selectedStructure: structure});
                                                                                }} className="marker-btn"><img
                                                                                    src={icon} alt="Structure"/>
                                                                                </button>
                                                                            </div>
                                                                        </Marker>
                                                                }
                                                            }
                                                        }
                                                        break;
                                                    case 'Personnes âgées':
                                                        if (structure.properties.type_personne.includes(this.state.filtre_age)) {
                                                            if (this.state.filtre_barre === "Aucun") {
                                                                ret =
                                                                    <Marker key={structure.denomination_structure}
                                                                            offsetLeft={-13}
                                                                            offsetTop={-25}
                                                                            latitude={structure.geometry.coordinates[1]}
                                                                            longitude={structure.geometry.coordinates[0]}>
                                                                        <div>
                                                                            <button onClick={(e) => {
                                                                                e.preventDefault();
                                                                                // eslint-disable-next-line no-undef
                                                                                this.setState({selectedStructure: structure});
                                                                            }} className="marker-btn"><img src={icon}
                                                                                                           alt="Structure"/>
                                                                            </button>
                                                                        </div>
                                                                    </Marker>
                                                            } else {
                                                                if((structure.properties.adresse.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.cp.toString().includes(this.state.filtre_barre))||(structure.properties.ville.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.denomination_structure.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.sous_categorie.toLowerCase().includes(this.state.filtre_barre))){
                                                                    ret =
                                                                        <Marker key={structure.denomination_structure}
                                                                                offsetLeft={-13}
                                                                                offsetTop={-25}
                                                                                latitude={structure.geometry.coordinates[1]}
                                                                                longitude={structure.geometry.coordinates[0]}>
                                                                            <div>
                                                                                <button onClick={(e) => {
                                                                                    e.preventDefault();
                                                                                    // eslint-disable-next-line no-undef
                                                                                    this.setState({selectedStructure: structure});
                                                                                }} className="marker-btn"><img
                                                                                    src={icon} alt="Structure"/>
                                                                                </button>
                                                                            </div>
                                                                        </Marker>
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
                                                                <Marker key={structure.denomination_structure}
                                                                        offsetLeft={-13}
                                                                        offsetTop={-25}
                                                                        latitude={structure.geometry.coordinates[1]}
                                                                        longitude={structure.geometry.coordinates[0]}>
                                                                    <div>
                                                                        <button onClick={(e) => {
                                                                            e.preventDefault();
                                                                            // eslint-disable-next-line no-undef
                                                                            this.setState({selectedStructure: structure});
                                                                        }} className="marker-btn"><img src={icon}
                                                                                                       alt="Structure"/>
                                                                        </button>
                                                                    </div>
                                                                </Marker>
                                                        } else {
                                                            if((structure.properties.adresse.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.cp.toString().includes(this.state.filtre_barre))||(structure.properties.ville.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.denomination_structure.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.sous_categorie.toLowerCase().includes(this.state.filtre_barre))){
                                                                ret =
                                                                    <Marker key={structure.denomination_structure}
                                                                            offsetLeft={-13}
                                                                            offsetTop={-25}
                                                                            latitude={structure.geometry.coordinates[1]}
                                                                            longitude={structure.geometry.coordinates[0]}>
                                                                        <div>
                                                                            <button onClick={(e) => {
                                                                                e.preventDefault();
                                                                                // eslint-disable-next-line no-undef
                                                                                this.setState({selectedStructure: structure});
                                                                            }} className="marker-btn"><img src={icon}
                                                                                                           alt="Structure"/>
                                                                            </button>
                                                                        </div>
                                                                    </Marker>
                                                            }
                                                        }
                                                        break;
                                                    case 'Adultes':
                                                        if (structure.properties.type_personne.includes(this.state.filtre_age)) {
                                                            if (this.state.filtre_barre === "Aucun") {
                                                                ret =
                                                                    <Marker key={structure.denomination_structure}
                                                                            offsetLeft={-13}
                                                                            offsetTop={-25}
                                                                            latitude={structure.geometry.coordinates[1]}
                                                                            longitude={structure.geometry.coordinates[0]}>
                                                                        <div>
                                                                            <button onClick={(e) => {
                                                                                e.preventDefault();
                                                                                // eslint-disable-next-line no-undef
                                                                                this.setState({selectedStructure: structure});
                                                                            }} className="marker-btn"><img src={icon}
                                                                                                           alt="Structure"/>
                                                                            </button>
                                                                        </div>
                                                                    </Marker>
                                                            } else {
                                                                if((structure.properties.adresse.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.cp.toString().includes(this.state.filtre_barre))||(structure.properties.ville.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.denomination_structure.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.sous_categorie.toLowerCase().includes(this.state.filtre_barre))){
                                                                    ret =
                                                                        <Marker key={structure.denomination_structure}
                                                                                offsetLeft={-13}
                                                                                offsetTop={-25}
                                                                                latitude={structure.geometry.coordinates[1]}
                                                                                longitude={structure.geometry.coordinates[0]}>
                                                                            <div>
                                                                                <button onClick={(e) => {
                                                                                    e.preventDefault();
                                                                                    // eslint-disable-next-line no-undef
                                                                                    this.setState({selectedStructure: structure});
                                                                                }} className="marker-btn"><img
                                                                                    src={icon} alt="Structure"/>
                                                                                </button>
                                                                            </div>
                                                                        </Marker>
                                                                }
                                                            }
                                                        }
                                                        break;
                                                    case 'Enfants':
                                                        if (structure.properties.type_personne.includes(this.state.filtre_age)) {
                                                            if (this.state.filtre_barre === "Aucun") {
                                                                ret =
                                                                    <Marker key={structure.denomination_structure}
                                                                            offsetLeft={-13}
                                                                            offsetTop={-25}
                                                                            latitude={structure.geometry.coordinates[1]}
                                                                            longitude={structure.geometry.coordinates[0]}>
                                                                        <div>
                                                                            <button onClick={(e) => {
                                                                                e.preventDefault();
                                                                                // eslint-disable-next-line no-undef
                                                                                this.setState({selectedStructure: structure});
                                                                            }} className="marker-btn"><img src={icon}
                                                                                                           alt="Structure"/>
                                                                            </button>
                                                                        </div>
                                                                    </Marker>
                                                            } else {
                                                                if((structure.properties.adresse.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.cp.toString().includes(this.state.filtre_barre))||(structure.properties.ville.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.denomination_structure.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.sous_categorie.toLowerCase().includes(this.state.filtre_barre))){
                                                                    ret =
                                                                        <Marker key={structure.denomination_structure}
                                                                                offsetLeft={-13}
                                                                                offsetTop={-25}
                                                                                latitude={structure.geometry.coordinates[1]}
                                                                                longitude={structure.geometry.coordinates[0]}>
                                                                            <div>
                                                                                <button onClick={(e) => {
                                                                                    e.preventDefault();
                                                                                    // eslint-disable-next-line no-undef
                                                                                    this.setState({selectedStructure: structure});
                                                                                }} className="marker-btn"><img
                                                                                    src={icon} alt="Structure"/>
                                                                                </button>
                                                                            </div>
                                                                        </Marker>
                                                                }
                                                            }
                                                        }
                                                        break;
                                                    case 'Personnes âgées':
                                                        if (structure.properties.type_personne.includes(this.state.filtre_age)) {
                                                            if (this.state.filtre_barre === "Aucun") {
                                                                ret =
                                                                    <Marker key={structure.denomination_structure}
                                                                            offsetLeft={-13}
                                                                            offsetTop={-25}
                                                                            latitude={structure.geometry.coordinates[1]}
                                                                            longitude={structure.geometry.coordinates[0]}>
                                                                        <div>
                                                                            <button onClick={(e) => {
                                                                                e.preventDefault();
                                                                                // eslint-disable-next-line no-undef
                                                                                this.setState({selectedStructure: structure});
                                                                            }} className="marker-btn"><img src={icon}
                                                                                                           alt="Structure"/>
                                                                            </button>
                                                                        </div>
                                                                    </Marker>
                                                            } else {
                                                                if((structure.properties.adresse.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.cp.toString().includes(this.state.filtre_barre))||(structure.properties.ville.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.denomination_structure.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.sous_categorie.toLowerCase().includes(this.state.filtre_barre))){
                                                                    ret =
                                                                        <Marker key={structure.denomination_structure}
                                                                                offsetLeft={-13}
                                                                                offsetTop={-25}
                                                                                latitude={structure.geometry.coordinates[1]}
                                                                                longitude={structure.geometry.coordinates[0]}>
                                                                            <div>
                                                                                <button onClick={(e) => {
                                                                                    e.preventDefault();
                                                                                    // eslint-disable-next-line no-undef
                                                                                    this.setState({selectedStructure: structure});
                                                                                }} className="marker-btn"><img
                                                                                    src={icon} alt="Structure"/>
                                                                                </button>
                                                                            </div>
                                                                        </Marker>
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
                                                                <Marker key={structure.denomination_structure}
                                                                        offsetLeft={-13}
                                                                        offsetTop={-25}
                                                                        latitude={structure.geometry.coordinates[1]}
                                                                        longitude={structure.geometry.coordinates[0]}>
                                                                    <div>
                                                                        <button onClick={(e) => {
                                                                            e.preventDefault();
                                                                            // eslint-disable-next-line no-undef
                                                                            this.setState({selectedStructure: structure});
                                                                        }} className="marker-btn"><img src={icon}
                                                                                                       alt="Structure"/>
                                                                        </button>
                                                                    </div>
                                                                </Marker>
                                                        } else {
                                                            if((structure.properties.adresse.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.cp.toString().includes(this.state.filtre_barre))||(structure.properties.ville.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.denomination_structure.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.sous_categorie.toLowerCase().includes(this.state.filtre_barre))){
                                                                ret =
                                                                    <Marker key={structure.denomination_structure}
                                                                            offsetLeft={-13}
                                                                            offsetTop={-25}
                                                                            latitude={structure.geometry.coordinates[1]}
                                                                            longitude={structure.geometry.coordinates[0]}>
                                                                        <div>
                                                                            <button onClick={(e) => {
                                                                                e.preventDefault();
                                                                                // eslint-disable-next-line no-undef
                                                                                this.setState({selectedStructure: structure});
                                                                            }} className="marker-btn"><img src={icon}
                                                                                                           alt="Structure"/>
                                                                            </button>
                                                                        </div>
                                                                    </Marker>
                                                            }
                                                        }
                                                        break;
                                                    case 'Adultes':
                                                        if (structure.properties.type_personne.includes(this.state.filtre_age)) {
                                                            if (this.state.filtre_barre === "Aucun") {
                                                                ret =
                                                                    <Marker key={structure.denomination_structure}
                                                                            offsetLeft={-13}
                                                                            offsetTop={-25}
                                                                            latitude={structure.geometry.coordinates[1]}
                                                                            longitude={structure.geometry.coordinates[0]}>
                                                                        <div>
                                                                            <button onClick={(e) => {
                                                                                e.preventDefault();
                                                                                // eslint-disable-next-line no-undef
                                                                                this.setState({selectedStructure: structure});
                                                                            }} className="marker-btn"><img src={icon}
                                                                                                           alt="Structure"/>
                                                                            </button>
                                                                        </div>
                                                                    </Marker>
                                                            } else {
                                                                if((structure.properties.adresse.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.cp.toString().includes(this.state.filtre_barre))||(structure.properties.ville.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.denomination_structure.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.sous_categorie.toLowerCase().includes(this.state.filtre_barre))){
                                                                    ret =
                                                                        <Marker key={structure.denomination_structure}
                                                                                offsetLeft={-13}
                                                                                offsetTop={-25}
                                                                                latitude={structure.geometry.coordinates[1]}
                                                                                longitude={structure.geometry.coordinates[0]}>
                                                                            <div>
                                                                                <button onClick={(e) => {
                                                                                    e.preventDefault();
                                                                                    // eslint-disable-next-line no-undef
                                                                                    this.setState({selectedStructure: structure});
                                                                                }} className="marker-btn"><img
                                                                                    src={icon} alt="Structure"/>
                                                                                </button>
                                                                            </div>
                                                                        </Marker>
                                                                }
                                                            }
                                                        }
                                                        break;
                                                    case 'Enfants':
                                                        if (structure.properties.type_personne.includes(this.state.filtre_age)) {
                                                            if (this.state.filtre_barre === "Aucun") {
                                                                ret =
                                                                    <Marker key={structure.denomination_structure}
                                                                            offsetLeft={-13}
                                                                            offsetTop={-25}
                                                                            latitude={structure.geometry.coordinates[1]}
                                                                            longitude={structure.geometry.coordinates[0]}>
                                                                        <div>
                                                                            <button onClick={(e) => {
                                                                                e.preventDefault();
                                                                                // eslint-disable-next-line no-undef
                                                                                this.setState({selectedStructure: structure});
                                                                            }} className="marker-btn"><img src={icon}
                                                                                                           alt="Structure"/>
                                                                            </button>
                                                                        </div>
                                                                    </Marker>
                                                            } else {
                                                                if((structure.properties.adresse.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.cp.toString().includes(this.state.filtre_barre))||(structure.properties.ville.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.denomination_structure.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.sous_categorie.toLowerCase().includes(this.state.filtre_barre))){
                                                                    ret =
                                                                        <Marker key={structure.denomination_structure}
                                                                                offsetLeft={-13}
                                                                                offsetTop={-25}
                                                                                latitude={structure.geometry.coordinates[1]}
                                                                                longitude={structure.geometry.coordinates[0]}>
                                                                            <div>
                                                                                <button onClick={(e) => {
                                                                                    e.preventDefault();
                                                                                    // eslint-disable-next-line no-undef
                                                                                    this.setState({selectedStructure: structure});
                                                                                }} className="marker-btn"><img
                                                                                    src={icon} alt="Structure"/>
                                                                                </button>
                                                                            </div>
                                                                        </Marker>
                                                                }
                                                            }
                                                        }
                                                        break;
                                                    case 'Personnes âgées':
                                                        if (structure.properties.type_personne.includes(this.state.filtre_age)) {
                                                            if (this.state.filtre_barre === "Aucun") {
                                                                ret =
                                                                    <Marker key={structure.denomination_structure}
                                                                            offsetLeft={-13}
                                                                            offsetTop={-25}
                                                                            latitude={structure.geometry.coordinates[1]}
                                                                            longitude={structure.geometry.coordinates[0]}>
                                                                        <div>
                                                                            <button onClick={(e) => {
                                                                                e.preventDefault();
                                                                                // eslint-disable-next-line no-undef
                                                                                this.setState({selectedStructure: structure});
                                                                            }} className="marker-btn"><img src={icon}
                                                                                                           alt="Structure"/>
                                                                            </button>
                                                                        </div>
                                                                    </Marker>
                                                            } else {
                                                                if((structure.properties.adresse.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.cp.toString().includes(this.state.filtre_barre))||(structure.properties.ville.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.denomination_structure.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.sous_categorie.toLowerCase().includes(this.state.filtre_barre))){
                                                                    ret =
                                                                        <Marker key={structure.denomination_structure}
                                                                                offsetLeft={-13}
                                                                                offsetTop={-25}
                                                                                latitude={structure.geometry.coordinates[1]}
                                                                                longitude={structure.geometry.coordinates[0]}>
                                                                            <div>
                                                                                <button onClick={(e) => {
                                                                                    e.preventDefault();
                                                                                    // eslint-disable-next-line no-undef
                                                                                    this.setState({selectedStructure: structure});
                                                                                }} className="marker-btn"><img
                                                                                    src={icon} alt="Structure"/>
                                                                                </button>
                                                                            </div>
                                                                        </Marker>
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
                                                                <Marker key={structure.denomination_structure}
                                                                        offsetLeft={-13}
                                                                        offsetTop={-25}
                                                                        latitude={structure.geometry.coordinates[1]}
                                                                        longitude={structure.geometry.coordinates[0]}>
                                                                    <div>
                                                                        <button onClick={(e) => {
                                                                            e.preventDefault();
                                                                            // eslint-disable-next-line no-undef
                                                                            this.setState({selectedStructure: structure});
                                                                        }} className="marker-btn"><img src={icon}
                                                                                                       alt="Structure"/>
                                                                        </button>
                                                                    </div>
                                                                </Marker>
                                                        } else {
                                                            if((structure.properties.adresse.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.cp.toString().includes(this.state.filtre_barre))||(structure.properties.ville.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.denomination_structure.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.sous_categorie.toLowerCase().includes(this.state.filtre_barre))){
                                                                ret =
                                                                    <Marker key={structure.denomination_structure}
                                                                            offsetLeft={-13}
                                                                            offsetTop={-25}
                                                                            latitude={structure.geometry.coordinates[1]}
                                                                            longitude={structure.geometry.coordinates[0]}>
                                                                        <div>
                                                                            <button onClick={(e) => {
                                                                                e.preventDefault();
                                                                                // eslint-disable-next-line no-undef
                                                                                this.setState({selectedStructure: structure});
                                                                            }} className="marker-btn"><img src={icon}
                                                                                                           alt="Structure"/>
                                                                            </button>
                                                                        </div>
                                                                    </Marker>
                                                            }
                                                        }
                                                        break;
                                                    case 'Adultes':
                                                        if (structure.properties.type_personne.includes(this.state.filtre_age)) {
                                                            if (this.state.filtre_barre === "Aucun") {
                                                                ret =
                                                                    <Marker key={structure.denomination_structure}
                                                                            offsetLeft={-13}
                                                                            offsetTop={-25}
                                                                            latitude={structure.geometry.coordinates[1]}
                                                                            longitude={structure.geometry.coordinates[0]}>
                                                                        <div>
                                                                            <button onClick={(e) => {
                                                                                e.preventDefault();
                                                                                // eslint-disable-next-line no-undef
                                                                                this.setState({selectedStructure: structure});
                                                                            }} className="marker-btn"><img src={icon}
                                                                                                           alt="Structure"/>
                                                                            </button>
                                                                        </div>
                                                                    </Marker>
                                                            } else {
                                                                if((structure.properties.adresse.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.cp.toString().includes(this.state.filtre_barre))||(structure.properties.ville.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.denomination_structure.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.sous_categorie.toLowerCase().includes(this.state.filtre_barre))){
                                                                    ret =
                                                                        <Marker key={structure.denomination_structure}
                                                                                offsetLeft={-13}
                                                                                offsetTop={-25}
                                                                                latitude={structure.geometry.coordinates[1]}
                                                                                longitude={structure.geometry.coordinates[0]}>
                                                                            <div>
                                                                                <button onClick={(e) => {
                                                                                    e.preventDefault();
                                                                                    // eslint-disable-next-line no-undef
                                                                                    this.setState({selectedStructure: structure});
                                                                                }} className="marker-btn"><img
                                                                                    src={icon} alt="Structure"/>
                                                                                </button>
                                                                            </div>
                                                                        </Marker>
                                                                }
                                                            }
                                                        }
                                                        break;
                                                    case 'Enfants':
                                                        if (structure.properties.type_personne.includes(this.state.filtre_age)) {
                                                            if (this.state.filtre_barre === "Aucun") {
                                                                ret =
                                                                    <Marker key={structure.denomination_structure}
                                                                            offsetLeft={-13}
                                                                            offsetTop={-25}
                                                                            latitude={structure.geometry.coordinates[1]}
                                                                            longitude={structure.geometry.coordinates[0]}>
                                                                        <div>
                                                                            <button onClick={(e) => {
                                                                                e.preventDefault();
                                                                                // eslint-disable-next-line no-undef
                                                                                this.setState({selectedStructure: structure});
                                                                            }} className="marker-btn"><img src={icon}
                                                                                                           alt="Structure"/>
                                                                            </button>
                                                                        </div>
                                                                    </Marker>
                                                            } else {
                                                                if((structure.properties.adresse.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.cp.toString().includes(this.state.filtre_barre))||(structure.properties.ville.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.denomination_structure.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.sous_categorie.toLowerCase().includes(this.state.filtre_barre))){
                                                                    ret =
                                                                        <Marker key={structure.denomination_structure}
                                                                                offsetLeft={-13}
                                                                                offsetTop={-25}
                                                                                latitude={structure.geometry.coordinates[1]}
                                                                                longitude={structure.geometry.coordinates[0]}>
                                                                            <div>
                                                                                <button onClick={(e) => {
                                                                                    e.preventDefault();
                                                                                    // eslint-disable-next-line no-undef
                                                                                    this.setState({selectedStructure: structure});
                                                                                }} className="marker-btn"><img
                                                                                    src={icon} alt="Structure"/>
                                                                                </button>
                                                                            </div>
                                                                        </Marker>
                                                                }
                                                            }
                                                        }
                                                        break;
                                                    case 'Personnes âgées':
                                                        if (structure.properties.type_personne.includes(this.state.filtre_age)) {
                                                            if (this.state.filtre_barre === "Aucun") {
                                                                ret =
                                                                    <Marker key={structure.denomination_structure}
                                                                            offsetLeft={-13}
                                                                            offsetTop={-25}
                                                                            latitude={structure.geometry.coordinates[1]}
                                                                            longitude={structure.geometry.coordinates[0]}>
                                                                        <div>
                                                                            <button onClick={(e) => {
                                                                                e.preventDefault();
                                                                                // eslint-disable-next-line no-undef
                                                                                this.setState({selectedStructure: structure});
                                                                            }} className="marker-btn"><img src={icon}
                                                                                                           alt="Structure"/>
                                                                            </button>
                                                                        </div>
                                                                    </Marker>
                                                            } else {
                                                                if((structure.properties.adresse.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.cp.toString().includes(this.state.filtre_barre))||(structure.properties.ville.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.denomination_structure.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.sous_categorie.toLowerCase().includes(this.state.filtre_barre))){
                                                                    ret =
                                                                        <Marker key={structure.denomination_structure}
                                                                                offsetLeft={-13}
                                                                                offsetTop={-25}
                                                                                latitude={structure.geometry.coordinates[1]}
                                                                                longitude={structure.geometry.coordinates[0]}>
                                                                            <div>
                                                                                <button onClick={(e) => {
                                                                                    e.preventDefault();
                                                                                    // eslint-disable-next-line no-undef
                                                                                    this.setState({selectedStructure: structure});

                                                                                }} className="marker-btn"><img
                                                                                    src={icon} alt="Structure"/>
                                                                                </button>
                                                                            </div>
                                                                        </Marker>
                                                                }
                                                            }
                                                        }
                                                        break;
                                                }
                                                return ret;
                                            }
                                    }
                                    return ret;
                                })};
                                        {this.state.selectedStructure ? (
                                                <div id="structure" className="structure-active">
                                                    <strong><p className="center-filtres">
                                                        <h3>Structure <Button  color="link"  className="right btn-close-cb" onClick={() => {
                                                            this.setState({selectedStructure: null});
                                                        }}><img src={close} alt="Close button"></img></Button><br/><br/>
                                                            <a href={this.state.selectedStructure.properties.site_internet} target="_blank">{this.state.selectedStructure.properties.denomination_structure}</a>
                                                        </h3>
                                                    </p>
                                                    </strong>
                                                    <hr/>
                                                    <p>
                                                        <strong>Catégorie : </strong>{this.state.selectedStructure.properties.categorie}<br/>
                                                        <strong>Sous-catégorie : </strong>{this.state.selectedStructure.properties.sous_categorie}<br/>
                                                        <strong>Adresse : </strong>{this.state.selectedStructure.properties.adresse}<br/>  {this.state.selectedStructure.properties.cp}<br/> {this.state.selectedStructure.properties.ville}<br/><br/>
                                                        <strong>Téléphone : </strong>{this.state.selectedStructure.properties.telephone}<br/>
                                                        <strong>Fax : </strong>{this.state.selectedStructure.properties.fax}<br/>
                                                        <strong>Mail : </strong>{this.state.selectedStructure.properties.contact_mail}<br/><br/>
                                                        <strong>Statut structure : </strong>{this.state.selectedStructure.properties.statut_structure}<br/>
                                                        <strong>Activités : </strong>{this.state.selectedStructure.properties.activites}<br/>
                                                        <strong>Organisme de rattachement : </strong> {this.state.selectedStructure.properties.organisme_rattachement}<br/>
                                                        <strong>Objectif : </strong> {this.state.selectedStructure.properties.objectif_structure}<br/>
                                                        <strong>Tranche d'âge prise en charge : </strong>{this.state.selectedStructure.properties.type_personne}<br/><br/>
                                                        <strong>Nécessite une orientation MDPH : </strong>{this.state.selectedStructure.properties.necessite_une_orientation_MDPH}<br/>
                                                        <strong>La demande doit être effectuée par le patient ou l'entourage : </strong>{this.state.selectedStructure.properties.demande_effectue_patient_entourage}<br/>
                                                        <strong>Un document médical doit être rempli par un médecin : </strong>{this.state.selectedStructure.properties.document_medical_a_remplir_par_medecin}<br/>
                                                    </p>
                                                </div>
                                        ) : null}
                                    </ReactMapGL>
                        </Col>
                    </Row>
                </Container>
                <Container>
                    <Row>
                        <Col xs="12" sm="12">
                            <h2 style={styles.section_titre}>
                                Résultat de recherche des structures
                            </h2>
                        </Col>
                            {structuresOcc.features.map((structure) => {
                                    let ret = null;
                                    switch(this.state.filtre){
                                        case 'Aucun':
                                            switch(this.state.filtre_age){
                                                case 'Aucun':
                                                    if(this.state.filtre_barre === "Aucun"){
                                                        ret =
                                                            <Col xs="6" sm="3">
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
                                                        if((structure.properties.denomination_structure.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.sous_categorie.toLowerCase().includes(this.state.filtre_barre))){
                                                            ret =
                                                                <Col xs="6" sm="3">
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
                                                                <Col xs="6" sm="3">
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
                                                            if((structure.properties.denomination_structure.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.sous_categorie.toLowerCase().includes(this.state.filtre_barre))){
                                                                ret =
                                                                    <Col xs="6" sm="3">
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
                                                                <Col xs="6" sm="3">
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
                                                            if((structure.properties.denomination_structure.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.sous_categorie.toLowerCase().includes(this.state.filtre_barre))){
                                                                ret =
                                                                    <Col xs="6" sm="3">
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
                                                                <Col xs="6" sm="3">
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
                                                            if((structure.properties.denomination_structure.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.sous_categorie.toLowerCase().includes(this.state.filtre_barre))){
                                                                ret =
                                                                    <Col xs="6" sm="3">
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
                                                                <Col xs="6" sm="3">
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
                                                                    <Col xs="6" sm="3">
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
                                                                    <Col xs="6" sm="3">
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
                                                                        <Col xs="6" sm="3">
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
                                                                    <Col xs="6" sm="3">
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
                                                                        <Col xs="6" sm="3">
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
                                                                    <Col xs="6" sm="3">
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
                                                                        <Col xs="6" sm="3">
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
                                                                <Col xs="6" sm="3">
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
                                                                    <Col xs="6" sm="3">
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
                                                                    <Col xs="6" sm="3">
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
                                                                        <Col xs="6" sm="3">
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
                                                                    <Col xs="6" sm="3">
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
                                                                        <Col xs="6" sm="3">
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
                                                                    <Col xs="6" sm="3">
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
                                                                        <Col xs="6" sm="3">
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
                                                                <Col xs="6" sm="3">
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
                                                                    <Col xs="6" sm="3">
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
                                                                    <Col xs="6" sm="3">
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
                                                                        <Col xs="6" sm="3">
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
                                                                    <Col xs="6" sm="3">
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
                                                                        <Col xs="6" sm="3">
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
                                                                    <Col xs="6" sm="3">
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
                                                                        <Col xs="6" sm="3">
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
                                                                <Col xs="6" sm="3">
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
                                                                    <Col xs="6" sm="3">
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
                                                                    <Col xs="6" sm="3">
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
                                                                        <Col xs="6" sm="3">
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
                                                                    <Col xs="6" sm="3">
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
                                                                        <Col xs="6" sm="3">
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
                                                                    <Col xs="6" sm="3">
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
                                                                        <Col xs="6" sm="3">
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
                                                                <Col xs="6" sm="3">
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
                                                                    <Col xs="6" sm="3">
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
                                                                    <Col xs="6" sm="3">
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
                                                                        <Col xs="6" sm="3">
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
                                                                    <Col xs="6" sm="3">
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
                                                                        <Col xs="6" sm="3">
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
                                                                    <Col xs="6" sm="3">
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
                                                                        <Col xs="6" sm="3">
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
                                                                <Col xs="6" sm="3">
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
                                                                    <Col xs="6" sm="3">
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
                                                                    <Col xs="6" sm="3">
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
                                                                        <Col xs="6" sm="3">
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
                                                                    <Col xs="6" sm="3">
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
                                                                        <Col xs="6" sm="3">
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
                                                                    <Col xs="6" sm="3">
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
                                                                        <Col xs="6" sm="3">
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
                                                                <Col xs="6" sm="3">
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
                                                                    <Col xs="6" sm="3">
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
                                                                    <Col xs="6" sm="3">
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
                                                                        <Col xs="6" sm="3">
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
                                                                    <Col xs="6" sm="3">
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
                                                                        <Col xs="6" sm="3">
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
                                                                    <Col xs="6" sm="3">
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
                                                                        <Col xs="6" sm="3">
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
                                                                <Col xs="6" sm="3">
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
                                                                    <Col xs="6" sm="3">
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
                                                                    <Col xs="6" sm="3">
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
                                                                        <Col xs="6" sm="3">
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
                                                                    <Col xs="6" sm="3">
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
                                                                        <Col xs="6" sm="3">
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
                                                                    <Col xs="6" sm="3">
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
                                                                        <Col xs="6" sm="3">
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
                                                                <Col xs="6" sm="3">
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
                                                                    <Col xs="6" sm="3">
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
                                                                    <Col xs="6" sm="3">
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
                                                                        <Col xs="6" sm="3">
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
                                                                    <Col xs="6" sm="3">
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
                                                                        <Col xs="6" sm="3">
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
                                                                    <Col xs="6" sm="3">
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
                                                                        <Col xs="6" sm="3">
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
                    </Row>
                </Container>
            </section>
        );
    }

    /*

     */
}