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
import img_mas from '../../../assets/images/img_mas.png'
import img_fam from '../../../assets/images/img_fam.png'
import img_hos from '../../../assets/images/img_hos.png'
import img_ssr from '../../../assets/images/img_ssr.png'

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
        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
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
            filtre: "NaN",
            filtre_age: "NaN",
            filtre_barre: "NaN",
            viewport: {
                width: 400,
                height: 400,
                latitude: 43.6000,
                longitude: 1.4333,
                zoom: 8
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

    getIcon = (marker)=>{
        if(marker.type === "Lieu de Vie"){
            return "garden-15";
        }else if(marker.type === "Association"){
            return "marker-15";
        }else if(marker.type === "Centre de Soins de Suite et de Réadaptation"){
            return "marker-15";
        }else if(marker.type === "Secteur Médico-Social"){
            return "marker-15";
        }else if(marker.type === "Service de Rééducation Neurologique"){
            return "marker-15";
        }else if(marker.type === "Service de Rééducation Polyvalent"){
            return "marker-15";
        }else{
            //marker par defaut
            return "marker-15";
        }
    };

    getNames = () =>{
        const grouped = _.groupBy(this.state.markers, lieu => lieu.nom);
        let array = [];
        Object.keys(grouped).map((key,idx) => {
            array[key] = Object.keys(grouped)[idx]
        });
        this.setState({markers_names:Object.keys(grouped)});
    };
    getZip = () =>{
        let code_array = [];
        let grouped;
        this.state.markers.map((marker, id) => {
            axios.get(
                "https://api.mapbox.com/geocoding/v5/mapbox.places/" + marker.longitude + "," + marker.latitude + ".json?access_token=pk.eyJ1Ijoib3B0aW1pcHN0YyIsImEiOiJjanFwZTkzNXMwMG1oNDJydHNqbnRnb3Y3In0.ltciym2mWxIxH-4hJIHKRw")
                .then(res => {
                    let code = {marker:marker,code:res.data.features[1].text,region:res.data.features[3].text};
                    code_array.push(code);
                    if(code_array.length === this.state.markers.length){
                        grouped = _.groupBy(code_array, code => code.region);
                        let array = [];
                        Object.keys(grouped).map((key,id) => {
                            let markers = [];
                            Object.values(grouped)[id].map((marker,idx)=>{
                                markers.push({structure : marker.marker, code:marker.code});
                            });
                            array.push({markers : markers,region:key});
                        });
                        this.setState({markers_zips:array});
                    }
                });
        });
    };
    getMails = () =>{
        const grouped = _.groupBy(this.state.markers, lieu => lieu.mail);
        let array = [];
        Object.keys(grouped).map((key,idx) => {
            array[key] = Object.keys(grouped)[idx]
        });
        this.setState({markers_mails:Object.keys(grouped)});
    };
    getTypes = () =>{
        const grouped = _.groupBy(this.state.markers, lieu => lieu.type);
        let array = [];
        Object.keys(grouped).map((key,idx) => {
            array[key] = Object.keys(grouped)[idx]
        });
        this.setState({markers_types:Object.keys(grouped)});
    };

    icon = (key)=>{
        switch(key){
            case 'type' :
                return faInfo;
            case 'num_tel' :
                return faPhone;
            case 'mail' :
                return faMailBulk;
            case 'adresse' :
                return faMap;
            case 'site_web' :
                return faSearch;
            case 'age' :
                return faUser;
            case 'age' :
                return faInfo;
            default :
                return faInfo;
        }
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
                    <Row className={'row-top-5'}>
                        <Col xs="12" xl="12">
                            <ReactMapGL
                                ref={this.mapRef}
                                {...this.state.viewport}
                                onViewportChange={this.handleViewportChange}
                                mapboxApiAccessToken="pk.eyJ1Ijoib3B0aW1pcHN0YyIsImEiOiJjanFwZTkzNXMwMG1oNDJydHNqbnRnb3Y3In0.ltciym2mWxIxH-4hJIHKRw">
                                <Geocoder

                                    placeholder="Recherche par adresse"
                                    mapRef={this.mapRef}
                                    onViewportChange={this.handleGeocoderViewportChange}
                                    mapboxApiAccessToken="pk.eyJ1Ijoib3B0aW1pcHN0YyIsImEiOiJjanFwZTkzNXMwMG1oNDJydHNqbnRnb3Y3In0.ltciym2mWxIxH-4hJIHKRw"
                                />
                                <Col xs="4" xl="4">
                                    <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                                        <DropdownToggle caret>
                                            Filtres
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            <DropdownItem header>Filtres par catégorie</DropdownItem>
                                            <DropdownItem onClick={(e) => {
                                                e.preventDefault();
                                                // eslint-disable-next-line no-undef
                                                this.setState({filtre: "Service de Médecine & Chirurgie"});
                                                this.setState({filtre_age: "NaN"});
                                            }}> Service de Médecine & Chirurgie</DropdownItem>
                                            <DropdownItem onClick={(e) => {
                                                e.preventDefault();
                                                // eslint-disable-next-line no-undef
                                                this.setState({filtre: "Structures de Rééducation"});
                                                this.setState({filtre_age: "NaN"});
                                            }}>Structures de Rééducation</DropdownItem>
                                            <DropdownItem onClick={(e) => {
                                                e.preventDefault();
                                                // eslint-disable-next-line no-undef
                                                this.setState({filtre: "Structure médico-sociales & Lieux de vie"});
                                                this.setState({filtre_age: "NaN"});
                                            }}>Structure médico-sociales & Lieux de vie</DropdownItem>
                                            <DropdownItem onClick={(e) => {
                                                e.preventDefault();
                                                // eslint-disable-next-line no-undef
                                                this.setState({filtre: "Association & Structures occupationnelles"});
                                                this.setState({filtre_age: "NaN"});
                                            }}>Association & Structures occupationnelles</DropdownItem>
                                            <DropdownItem onClick={(e) => {
                                                e.preventDefault();
                                                // eslint-disable-next-line no-undef
                                                this.setState({filtre: "Réinsertion professionnelle"});
                                                this.setState({filtre_age: "NaN"});
                                            }}>Réinsertion professionnelle</DropdownItem>
                                            <DropdownItem onClick={(e) => {
                                                e.preventDefault();
                                                // eslint-disable-next-line no-undef
                                                this.setState({filtre: "Service d'Accompagnement à Domicile"});
                                                this.setState({filtre_age: "NaN"});
                                            }}>Service d'Accompagnement à Domicile</DropdownItem>
                                            <DropdownItem onClick={(e) => {
                                                e.preventDefault();
                                                // eslint-disable-next-line no-undef
                                                this.setState({filtre: "Accompagnement scolaire"});
                                                this.setState({filtre_age: "NaN"});
                                            }}>Accompagnement scolaire</DropdownItem>
                                            <DropdownItem onClick={(e) => {
                                                e.preventDefault();
                                                // eslint-disable-next-line no-undef
                                                this.setState({filtre: "Structures de psychiatrie et accompagnement psychologique"});
                                                this.setState({filtre_age: "NaN"});
                                            }}>Structures de psychiatrie et accompagnement psychologique</DropdownItem>
                                            <DropdownItem onClick={(e) => {
                                                e.preventDefault();
                                                // eslint-disable-next-line no-undef
                                                this.setState({filtre: "Professionnels libéraux (formés au TC)"});
                                                this.setState({filtre_age: "NaN"});
                                            }}>Professionnels libéraux (formés au TC)</DropdownItem>
                                            <DropdownItem onClick={(e) => {
                                                e.preventDefault();
                                                // eslint-disable-next-line no-undef
                                                this.setState({filtre: "NaN"});
                                                this.setState({filtre_age: "NaN"});
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
                                            <DropdownItem onClick={(e) => {
                                                e.preventDefault();
                                                // eslint-disable-next-line no-undef
                                                this.setState({filtre_age: "NaN"});
                                            }}>Aucun filtre</DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>
                                </Col>
                                <Col xs="4" xl="4">
                                <input placeholder="Nom, sous-catégorie, ..." className="mapboxgl-ctrl-geocoder recherche" id="test" type="text" onKeyDown={(e) => {
                                    let key = e.key;
                                    let touche = e.keyCode;
                                    let nom = String.fromCharCode(touche);
                                            if(key === "Backspace"){
                                                if(this.state.filtre_barre === "NaN"){
                                                    this.setState({filtre_barre: "NaN"});
                                                }
                                                else {
                                                    this.setState({filtre_barre: this.state.filtre_barre.substr(-20, this.state.filtre_barre.length - 1)})
                                                }
                                            }
                                            else if(key === "Space"){
                                                if(this.state.filtre_barre === "NaN"){
                                                    this.setState({filtre_barre: "NaN"});
                                                }
                                                else {
                                                    this.setState({filtre_barre: this.state.filtre_barre + ' '});
                                                }
                                            }
                                            else if((key === "CapsLock")||(key === "Shift")||(key === "Enter")||(key === "Dead")){}
                                            else{
                                                if(this.state.filtre_barre === "NaN"){
                                                    this.setState({filtre_barre: e.key.toLowerCase()});
                                                }
                                                else {
                                                    this.setState({filtre_barre: this.state.filtre_barre + e.key.toLowerCase()});
                                                }
                                            }
                                    }
                                }/>
                                </Col>
                                {structuresOcc.features.map((structure) => {
                                    let ret = null;
                                    let icon;
                                    if(structure.properties.denomination_structure.includes("FAM")){
                                        icon = img_fam;
                                    }
                                    else if(structure.properties.denomination_structure.includes("MAS")){
                                        icon = img_mas;
                                    }
                                    else if(structure.properties.denomination_structure.includes("SSR")){
                                        icon = img_ssr;
                                    }
                                    else if(structure.properties.denomination_structure.includes("CHU")){
                                        icon = img_hos;
                                    }
                                    else if(structure.properties.denomination_structure.includes("Hospitalier")){
                                        icon = img_hos;
                                    }
                                    else if(structure.properties.denomination_structure.includes("Clinique")||(structure.properties.denomination_structure.includes("clinique"))){
                                        icon = img_hos;
                                    }
                                    else if(structure.properties.denomination_structure.includes("Hôpital")){
                                        icon = img_hos;
                                    }
                                    else{
                                        icon = marker_img;
                                    }
                                    switch(this.state.filtre){
                                        case 'NaN':
                                            switch(this.state.filtre_age){
                                                case 'NaN':
                                                    if(this.state.filtre_barre === "NaN"){
                                                        ret =
                                                            <Marker key={structure.denomination_structure}
                                                                    latitude={structure.geometry.coordinates[1]}
                                                                    longitude={structure.geometry.coordinates[0]}>
                                                                <div><button onClick={(e) => {
                                                                    e.preventDefault();
                                                                    // eslint-disable-next-line no-undef
                                                                    this.setState({selectedStructure: structure});
                                                                }} className="marker-btn"><img src={icon} alt="Structure"/> </button></div>
                                                            </Marker>
                                                    }
                                                    else{
                                                        if((structure.properties.denomination_structure.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.sous_categorie.toLowerCase().includes(this.state.filtre_barre))){
                                                            ret =
                                                                    <Marker key={structure.denomination_structure}
                                                                            latitude={structure.geometry.coordinates[1]}
                                                                            longitude={structure.geometry.coordinates[0]}>
                                                                        <div><button onClick={(e) => {
                                                                            e.preventDefault();
                                                                            // eslint-disable-next-line no-undef
                                                                            this.setState({selectedStructure: structure});
                                                                        }} className="marker-btn"><img src={icon} alt="Structure"/> </button></div>
                                                                    </Marker>
                                                        }
                                                    }
                                                    break;
                                                case 'Adultes':
                                                    if(structure.properties.type_personne.includes(this.state.filtre_age)){
                                                        if(this.state.filtre_barre === "NaN"){
                                                            ret =
                                                                <Marker key={structure.denomination_structure}
                                                                        latitude={structure.geometry.coordinates[1]}
                                                                        longitude={structure.geometry.coordinates[0]}>
                                                                    <div><button onClick={(e) => {
                                                                        e.preventDefault();
                                                                        // eslint-disable-next-line no-undef
                                                                        this.setState({selectedStructure: structure});
                                                                    }} className="marker-btn"><img src={icon} alt="Structure"/> </button></div>
                                                                </Marker>
                                                        }
                                                        else{
                                                            if((structure.properties.denomination_structure.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.sous_categorie.toLowerCase().includes(this.state.filtre_barre))){
                                                                ret =
                                                                    <Marker key={structure.denomination_structure}
                                                                            latitude={structure.geometry.coordinates[1]}
                                                                            longitude={structure.geometry.coordinates[0]}>
                                                                        <div><button onClick={(e) => {
                                                                            e.preventDefault();
                                                                            // eslint-disable-next-line no-undef
                                                                            this.setState({selectedStructure: structure});
                                                                        }} className="marker-btn"><img src={icon} alt="Structure"/> </button></div>
                                                                    </Marker>
                                                            }
                                                        }
                                                    }
                                                    break;
                                                case 'Enfants':
                                                    if(structure.properties.type_personne.includes(this.state.filtre_age)){
                                                        if(this.state.filtre_barre === "NaN"){
                                                            ret =
                                                                <Marker key={structure.denomination_structure}
                                                                        latitude={structure.geometry.coordinates[1]}
                                                                        longitude={structure.geometry.coordinates[0]}>
                                                                    <div><button onClick={(e) => {
                                                                        e.preventDefault();
                                                                        // eslint-disable-next-line no-undef
                                                                        this.setState({selectedStructure: structure});
                                                                    }} className="marker-btn"><img src={icon} alt="Structure"/> </button></div>
                                                                </Marker>
                                                        }
                                                        else{
                                                            if((structure.properties.denomination_structure.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.sous_categorie.toLowerCase().includes(this.state.filtre_barre))){
                                                                ret =
                                                                    <Marker key={structure.denomination_structure}
                                                                            latitude={structure.geometry.coordinates[1]}
                                                                            longitude={structure.geometry.coordinates[0]}>
                                                                        <div><button onClick={(e) => {
                                                                            e.preventDefault();
                                                                            // eslint-disable-next-line no-undef
                                                                            this.setState({selectedStructure: structure});
                                                                        }} className="marker-btn"><img src={icon} alt="Structure"/> </button></div>
                                                                    </Marker>
                                                            }
                                                        }
                                                    }
                                                    break;
                                                case 'Personnes âgées':
                                                    if(structure.properties.type_personne.includes(this.state.filtre_age)){
                                                        if(this.state.filtre_barre === "NaN"){
                                                            ret =
                                                                <Marker key={structure.denomination_structure}
                                                                        latitude={structure.geometry.coordinates[1]}
                                                                        longitude={structure.geometry.coordinates[0]}>
                                                                    <div><button onClick={(e) => {
                                                                        e.preventDefault();
                                                                        // eslint-disable-next-line no-undef
                                                                        this.setState({selectedStructure: structure});
                                                                    }} className="marker-btn"><img src={icon} alt="Structure"/> </button></div>
                                                                </Marker>
                                                        }
                                                        else{
                                                            if((structure.properties.denomination_structure.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.sous_categorie.toLowerCase().includes(this.state.filtre_barre))){
                                                                ret =
                                                                    <Marker key={structure.denomination_structure}
                                                                            latitude={structure.geometry.coordinates[1]}
                                                                            longitude={structure.geometry.coordinates[0]}>
                                                                        <div><button onClick={(e) => {
                                                                            e.preventDefault();
                                                                            // eslint-disable-next-line no-undef
                                                                            this.setState({selectedStructure: structure});
                                                                        }} className="marker-btn"><img src={icon} alt="Structure"/> </button></div>
                                                                    </Marker>
                                                            }
                                                        }
                                                    }
                                                    break;
                                            }
                                            return ret;
                                        case "Structure médico-sociales & Lieux de vie":
                                            switch(this.state.filtre_age){
                                                case 'NaN':
                                                    if(this.state.filtre_barre === "NaN"){
                                                        ret =
                                                            <Marker key={structure.denomination_structure}
                                                                    latitude={structure.geometry.coordinates[1]}
                                                                    longitude={structure.geometry.coordinates[0]}>
                                                                <div><button onClick={(e) => {
                                                                    e.preventDefault();
                                                                    // eslint-disable-next-line no-undef
                                                                    this.setState({selectedStructure: structure});
                                                                }} className="marker-btn"><img src={icon} alt="Structure"/> </button></div>
                                                            </Marker>
                                                    }
                                                    else{
                                                        if((structure.properties.denomination_structure.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.sous_categorie.toLowerCase().includes(this.state.filtre_barre))){
                                                            ret =
                                                                <Marker key={structure.denomination_structure}
                                                                        latitude={structure.geometry.coordinates[1]}
                                                                        longitude={structure.geometry.coordinates[0]}>
                                                                    <div><button onClick={(e) => {
                                                                        e.preventDefault();
                                                                        // eslint-disable-next-line no-undef
                                                                        this.setState({selectedStructure: structure});
                                                                    }} className="marker-btn"><img src={icon} alt="Structure"/> </button></div>
                                                                </Marker>
                                                        }
                                                    }
                                                    break;
                                                case 'Adultes':
                                                    if(structure.properties.type_personne.includes(this.state.filtre_age)){
                                                        if(this.state.filtre_barre === "NaN"){
                                                            ret =
                                                                <Marker key={structure.denomination_structure}
                                                                        latitude={structure.geometry.coordinates[1]}
                                                                        longitude={structure.geometry.coordinates[0]}>
                                                                    <div><button onClick={(e) => {
                                                                        e.preventDefault();
                                                                        // eslint-disable-next-line no-undef
                                                                        this.setState({selectedStructure: structure});
                                                                    }} className="marker-btn"><img src={icon} alt="Structure"/> </button></div>
                                                                </Marker>
                                                        }
                                                        else{
                                                            if((structure.properties.denomination_structure.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.sous_categorie.toLowerCase().includes(this.state.filtre_barre))){
                                                                ret =
                                                                    <Marker key={structure.denomination_structure}
                                                                            latitude={structure.geometry.coordinates[1]}
                                                                            longitude={structure.geometry.coordinates[0]}>
                                                                        <div><button onClick={(e) => {
                                                                            e.preventDefault();
                                                                            // eslint-disable-next-line no-undef
                                                                            this.setState({selectedStructure: structure});
                                                                        }} className="marker-btn"><img src={icon} alt="Structure"/> </button></div>
                                                                    </Marker>
                                                            }
                                                        }
                                                    }
                                                    break;
                                                case 'Enfants':
                                                    if(structure.properties.type_personne.includes(this.state.filtre_age)){
                                                        if(this.state.filtre_barre === "NaN"){
                                                            ret =
                                                                <Marker key={structure.denomination_structure}
                                                                        latitude={structure.geometry.coordinates[1]}
                                                                        longitude={structure.geometry.coordinates[0]}>
                                                                    <div><button onClick={(e) => {
                                                                        e.preventDefault();
                                                                        // eslint-disable-next-line no-undef
                                                                        this.setState({selectedStructure: structure});
                                                                    }} className="marker-btn"><img src={icon} alt="Structure"/> </button></div>
                                                                </Marker>
                                                        }
                                                        else{
                                                            if((structure.properties.denomination_structure.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.sous_categorie.toLowerCase().includes(this.state.filtre_barre))){
                                                                ret =
                                                                    <Marker key={structure.denomination_structure}
                                                                            latitude={structure.geometry.coordinates[1]}
                                                                            longitude={structure.geometry.coordinates[0]}>
                                                                        <div><button onClick={(e) => {
                                                                            e.preventDefault();
                                                                            // eslint-disable-next-line no-undef
                                                                            this.setState({selectedStructure: structure});
                                                                        }} className="marker-btn"><img src={icon} alt="Structure"/> </button></div>
                                                                    </Marker>
                                                            }
                                                        }
                                                    }
                                                    break;
                                                case 'Personnes âgées':
                                                    if(structure.properties.type_personne.includes(this.state.filtre_age)){
                                                        if(this.state.filtre_barre === "NaN"){
                                                            ret =
                                                                <Marker key={structure.denomination_structure}
                                                                        latitude={structure.geometry.coordinates[1]}
                                                                        longitude={structure.geometry.coordinates[0]}>
                                                                    <div><button onClick={(e) => {
                                                                        e.preventDefault();
                                                                        // eslint-disable-next-line no-undef
                                                                        this.setState({selectedStructure: structure});
                                                                    }} className="marker-btn"><img src={icon} alt="Structure"/> </button></div>
                                                                </Marker>
                                                        }
                                                        else{
                                                            if((structure.properties.denomination_structure.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.sous_categorie.toLowerCase().includes(this.state.filtre_barre))){
                                                                ret =
                                                                    <Marker key={structure.denomination_structure}
                                                                            latitude={structure.geometry.coordinates[1]}
                                                                            longitude={structure.geometry.coordinates[0]}>
                                                                        <div><button onClick={(e) => {
                                                                            e.preventDefault();
                                                                            // eslint-disable-next-line no-undef
                                                                            this.setState({selectedStructure: structure});
                                                                        }} className="marker-btn"><img src={icon} alt="Structure"/> </button></div>
                                                                    </Marker>
                                                            }
                                                        }
                                                    }
                                                    break;
                                            }
                                            return ret;
                                        case "Service de Médecine & Chirurgie":
                                            switch(this.state.filtre_age){
                                                case 'NaN':
                                                    if(this.state.filtre_barre === "NaN"){
                                                        ret =
                                                            <Marker key={structure.denomination_structure}
                                                                    latitude={structure.geometry.coordinates[1]}
                                                                    longitude={structure.geometry.coordinates[0]}>
                                                                <div><button onClick={(e) => {
                                                                    e.preventDefault();
                                                                    // eslint-disable-next-line no-undef
                                                                    this.setState({selectedStructure: structure});
                                                                }} className="marker-btn"><img src={icon} alt="Structure"/> </button></div>
                                                            </Marker>
                                                    }
                                                    else{
                                                        if((structure.properties.denomination_structure.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.sous_categorie.toLowerCase().includes(this.state.filtre_barre))){
                                                            ret =
                                                                <Marker key={structure.denomination_structure}
                                                                        latitude={structure.geometry.coordinates[1]}
                                                                        longitude={structure.geometry.coordinates[0]}>
                                                                    <div><button onClick={(e) => {
                                                                        e.preventDefault();
                                                                        // eslint-disable-next-line no-undef
                                                                        this.setState({selectedStructure: structure});
                                                                    }} className="marker-btn"><img src={icon} alt="Structure"/> </button></div>
                                                                </Marker>
                                                        }
                                                    }
                                                    break;
                                                case 'Adultes':
                                                    ret = ((structure.properties.type_personne.includes(this.state.filtre_age)) && (structure.properties.categorie === this.state.filtre)) ?
                                                        <Marker key={structure.denomination_structure}
                                                                latitude={structure.geometry.coordinates[1]}
                                                                longitude={structure.geometry.coordinates[0]}>
                                                            <div><button onClick={(e) => {
                                                                e.preventDefault();
                                                                // eslint-disable-next-line no-undef
                                                                this.setState({selectedStructure: structure});
                                                            }} className="marker-btn"><img src={icon} alt="Structure"/> </button></div>
                                                        </Marker>
                                                        : null;
                                                    break;
                                                case 'Enfants':
                                                    ret = ((structure.properties.type_personne.includes(this.state.filtre_age)) && (structure.properties.categorie === this.state.filtre)) ?
                                                        <Marker key={structure.denomination_structure}
                                                                latitude={structure.geometry.coordinates[1]}
                                                                longitude={structure.geometry.coordinates[0]}>
                                                            <div><button onClick={(e) => {
                                                                e.preventDefault();
                                                                // eslint-disable-next-line no-undef
                                                                this.setState({selectedStructure: structure});
                                                            }} className="marker-btn"><img src={icon} alt="Structure"/> </button></div>
                                                        </Marker>
                                                        : null;
                                                    break;
                                                case 'Personnes âgées':
                                                    ret = ((structure.properties.type_personne.includes(this.state.filtre_age)) && (structure.properties.categorie === this.state.filtre)) ?
                                                        <Marker key={structure.denomination_structure}
                                                                latitude={structure.geometry.coordinates[1]}
                                                                longitude={structure.geometry.coordinates[0]}>
                                                            <div><button onClick={(e) => {
                                                                e.preventDefault();
                                                                // eslint-disable-next-line no-undef
                                                                this.setState({selectedStructure: structure});
                                                            }} className="marker-btn"><img src={icon} alt="Structure"/> </button></div>
                                                        </Marker>
                                                        : null;
                                                    break;
                                            }
                                            return ret;
                                        case "Structures de Rééducation":
                                            switch(this.state.filtre_age){
                                                case 'NaN':
                                                    if(this.state.filtre_barre === "NaN"){
                                                        ret =
                                                            <Marker key={structure.denomination_structure}
                                                                    latitude={structure.geometry.coordinates[1]}
                                                                    longitude={structure.geometry.coordinates[0]}>
                                                                <div><button onClick={(e) => {
                                                                    e.preventDefault();
                                                                    // eslint-disable-next-line no-undef
                                                                    this.setState({selectedStructure: structure});
                                                                }} className="marker-btn"><img src={icon} alt="Structure"/> </button></div>
                                                            </Marker>
                                                    }
                                                    else{
                                                        if((structure.properties.denomination_structure.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.sous_categorie.toLowerCase().includes(this.state.filtre_barre))){
                                                            ret =
                                                                <Marker key={structure.denomination_structure}
                                                                        latitude={structure.geometry.coordinates[1]}
                                                                        longitude={structure.geometry.coordinates[0]}>
                                                                    <div><button onClick={(e) => {
                                                                        e.preventDefault();
                                                                        // eslint-disable-next-line no-undef
                                                                        this.setState({selectedStructure: structure});
                                                                    }} className="marker-btn"><img src={icon} alt="Structure"/> </button></div>
                                                                </Marker>
                                                        }
                                                    }
                                                    break;
                                                case 'Adultes':
                                                    ret = ((structure.properties.type_personne.includes(this.state.filtre_age)) && (structure.properties.categorie === this.state.filtre)) ?
                                                        <Marker key={structure.denomination_structure}
                                                                latitude={structure.geometry.coordinates[1]}
                                                                longitude={structure.geometry.coordinates[0]}>
                                                            <div><button onClick={(e) => {
                                                                e.preventDefault();
                                                                // eslint-disable-next-line no-undef
                                                                this.setState({selectedStructure: structure});
                                                            }} className="marker-btn"><img src={icon} alt="Structure"/> </button></div>
                                                        </Marker>
                                                        : null;
                                                    break;
                                                case 'Enfants':
                                                    ret = ((structure.properties.type_personne.includes(this.state.filtre_age)) && (structure.properties.categorie === this.state.filtre)) ?
                                                            <Marker key={structure.denomination_structure}
                                                                    latitude={structure.geometry.coordinates[1]}
                                                                    longitude={structure.geometry.coordinates[0]}>
                                                                <div><button onClick={(e) => {
                                                                    e.preventDefault();
                                                                    // eslint-disable-next-line no-undef
                                                                    this.setState({selectedStructure: structure});
                                                                }} className="marker-btn"><img src={icon} alt="Structure"/> </button></div>
                                                            </Marker>
                                                            : null;
                                                            break;
                                                case 'Personnes âgées':
                                                    ret = ((structure.properties.type_personne.includes(this.state.filtre_age)) && (structure.properties.categorie === this.state.filtre)) ?
                                                        <Marker key={structure.denomination_structure}
                                                                latitude={structure.geometry.coordinates[1]}
                                                                longitude={structure.geometry.coordinates[0]}>
                                                            <div><button onClick={(e) => {
                                                                e.preventDefault();
                                                                // eslint-disable-next-line no-undef
                                                                this.setState({selectedStructure: structure});
                                                            }} className="marker-btn"><img src={icon} alt="Structure"/> </button></div>
                                                        </Marker>
                                                        : null;
                                                    break;
                                            }
                                            return ret;
                                        case "Association & Structures occupationnelles":
                                            switch(this.state.filtre_age){
                                                case 'NaN':
                                                    if(this.state.filtre_barre === "NaN"){
                                                        ret =
                                                            <Marker key={structure.denomination_structure}
                                                                    latitude={structure.geometry.coordinates[1]}
                                                                    longitude={structure.geometry.coordinates[0]}>
                                                                <div><button onClick={(e) => {
                                                                    e.preventDefault();
                                                                    // eslint-disable-next-line no-undef
                                                                    this.setState({selectedStructure: structure});
                                                                }} className="marker-btn"><img src={icon} alt="Structure"/> </button></div>
                                                            </Marker>
                                                    }
                                                    else{
                                                        if((structure.properties.denomination_structure.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.sous_categorie.toLowerCase().includes(this.state.filtre_barre))){
                                                            ret =
                                                                <Marker key={structure.denomination_structure}
                                                                        latitude={structure.geometry.coordinates[1]}
                                                                        longitude={structure.geometry.coordinates[0]}>
                                                                    <div><button onClick={(e) => {
                                                                        e.preventDefault();
                                                                        // eslint-disable-next-line no-undef
                                                                        this.setState({selectedStructure: structure});
                                                                    }} className="marker-btn"><img src={icon} alt="Structure"/> </button></div>
                                                                </Marker>
                                                        }
                                                    }
                                                    break;
                                                case 'Adultes':
                                                    if(structure.properties.type_personne.includes(this.state.filtre_age)){
                                                        if(this.state.filtre_barre === "NaN"){
                                                            ret =
                                                                <Marker key={structure.denomination_structure}
                                                                        latitude={structure.geometry.coordinates[1]}
                                                                        longitude={structure.geometry.coordinates[0]}>
                                                                    <div><button onClick={(e) => {
                                                                        e.preventDefault();
                                                                        // eslint-disable-next-line no-undef
                                                                        this.setState({selectedStructure: structure});
                                                                    }} className="marker-btn"><img src={icon} alt="Structure"/> </button></div>
                                                                </Marker>
                                                        }
                                                        else{
                                                            if((structure.properties.denomination_structure.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.sous_categorie.toLowerCase().includes(this.state.filtre_barre))){
                                                                ret =
                                                                    <Marker key={structure.denomination_structure}
                                                                            latitude={structure.geometry.coordinates[1]}
                                                                            longitude={structure.geometry.coordinates[0]}>
                                                                        <div><button onClick={(e) => {
                                                                            e.preventDefault();
                                                                            // eslint-disable-next-line no-undef
                                                                            this.setState({selectedStructure: structure});
                                                                        }} className="marker-btn"><img src={icon} alt="Structure"/> </button></div>
                                                                    </Marker>
                                                            }
                                                        }
                                                    }
                                                    break;
                                                case 'Enfants':
                                                    if(structure.properties.type_personne.includes(this.state.filtre_age)){
                                                        if(this.state.filtre_barre === "NaN"){
                                                            ret =
                                                                <Marker key={structure.denomination_structure}
                                                                        latitude={structure.geometry.coordinates[1]}
                                                                        longitude={structure.geometry.coordinates[0]}>
                                                                    <div><button onClick={(e) => {
                                                                        e.preventDefault();
                                                                        // eslint-disable-next-line no-undef
                                                                        this.setState({selectedStructure: structure});
                                                                    }} className="marker-btn"><img src={icon} alt="Structure"/> </button></div>
                                                                </Marker>
                                                        }
                                                        else{
                                                            if((structure.properties.denomination_structure.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.sous_categorie.toLowerCase().includes(this.state.filtre_barre))){
                                                                ret =
                                                                    <Marker key={structure.denomination_structure}
                                                                            latitude={structure.geometry.coordinates[1]}
                                                                            longitude={structure.geometry.coordinates[0]}>
                                                                        <div><button onClick={(e) => {
                                                                            e.preventDefault();
                                                                            // eslint-disable-next-line no-undef
                                                                            this.setState({selectedStructure: structure});
                                                                        }} className="marker-btn"><img src={icon} alt="Structure"/> </button></div>
                                                                    </Marker>
                                                            }
                                                        }
                                                    }
                                                    break;
                                                case 'Personnes âgées':
                                                    if(structure.properties.type_personne.includes(this.state.filtre_age)){
                                                        if(this.state.filtre_barre === "NaN"){
                                                            ret =
                                                                <Marker key={structure.denomination_structure}
                                                                        latitude={structure.geometry.coordinates[1]}
                                                                        longitude={structure.geometry.coordinates[0]}>
                                                                    <div><button onClick={(e) => {
                                                                        e.preventDefault();
                                                                        // eslint-disable-next-line no-undef
                                                                        this.setState({selectedStructure: structure});
                                                                    }} className="marker-btn"><img src={icon} alt="Structure"/> </button></div>
                                                                </Marker>
                                                        }
                                                        else{
                                                            if((structure.properties.denomination_structure.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.sous_categorie.toLowerCase().includes(this.state.filtre_barre))){
                                                                ret =
                                                                    <Marker key={structure.denomination_structure}
                                                                            latitude={structure.geometry.coordinates[1]}
                                                                            longitude={structure.geometry.coordinates[0]}>
                                                                        <div><button onClick={(e) => {
                                                                            e.preventDefault();
                                                                            // eslint-disable-next-line no-undef
                                                                            this.setState({selectedStructure: structure});
                                                                        }} className="marker-btn"><img src={icon} alt="Structure"/> </button></div>
                                                                    </Marker>
                                                            }
                                                        }
                                                    }
                                                    break;
                                            }
                                            return ret;
                                        case "Réinsertion professionnelle":
                                            switch(this.state.filtre_age){
                                                case 'NaN':
                                                    if(this.state.filtre_barre === "NaN"){
                                                        ret =
                                                            <Marker key={structure.denomination_structure}
                                                                    latitude={structure.geometry.coordinates[1]}
                                                                    longitude={structure.geometry.coordinates[0]}>
                                                                <div><button onClick={(e) => {
                                                                    e.preventDefault();
                                                                    // eslint-disable-next-line no-undef
                                                                    this.setState({selectedStructure: structure});
                                                                }} className="marker-btn"><img src={icon} alt="Structure"/> </button></div>
                                                            </Marker>
                                                    }
                                                    else{
                                                        if((structure.properties.denomination_structure.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.sous_categorie.toLowerCase().includes(this.state.filtre_barre))){
                                                            ret =
                                                                <Marker key={structure.denomination_structure}
                                                                        latitude={structure.geometry.coordinates[1]}
                                                                        longitude={structure.geometry.coordinates[0]}>
                                                                    <div><button onClick={(e) => {
                                                                        e.preventDefault();
                                                                        // eslint-disable-next-line no-undef
                                                                        this.setState({selectedStructure: structure});
                                                                    }} className="marker-btn"><img src={icon} alt="Structure"/> </button></div>
                                                                </Marker>
                                                        }
                                                    }
                                                    break;
                                                case 'Adultes':
                                                    if(structure.properties.type_personne.includes(this.state.filtre_age)){
                                                        if(this.state.filtre_barre === "NaN"){
                                                            ret =
                                                                <Marker key={structure.denomination_structure}
                                                                        latitude={structure.geometry.coordinates[1]}
                                                                        longitude={structure.geometry.coordinates[0]}>
                                                                    <div><button onClick={(e) => {
                                                                        e.preventDefault();
                                                                        // eslint-disable-next-line no-undef
                                                                        this.setState({selectedStructure: structure});
                                                                    }} className="marker-btn"><img src={icon} alt="Structure"/> </button></div>
                                                                </Marker>
                                                        }
                                                        else{
                                                            if((structure.properties.denomination_structure.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.sous_categorie.toLowerCase().includes(this.state.filtre_barre))){
                                                                ret =
                                                                    <Marker key={structure.denomination_structure}
                                                                            latitude={structure.geometry.coordinates[1]}
                                                                            longitude={structure.geometry.coordinates[0]}>
                                                                        <div><button onClick={(e) => {
                                                                            e.preventDefault();
                                                                            // eslint-disable-next-line no-undef
                                                                            this.setState({selectedStructure: structure});
                                                                        }} className="marker-btn"><img src={icon} alt="Structure"/> </button></div>
                                                                    </Marker>
                                                            }
                                                        }
                                                    }
                                                    break;
                                                case 'Enfants':
                                                    if(structure.properties.type_personne.includes(this.state.filtre_age)){
                                                        if(this.state.filtre_barre === "NaN"){
                                                            ret =
                                                                <Marker key={structure.denomination_structure}
                                                                        latitude={structure.geometry.coordinates[1]}
                                                                        longitude={structure.geometry.coordinates[0]}>
                                                                    <div><button onClick={(e) => {
                                                                        e.preventDefault();
                                                                        // eslint-disable-next-line no-undef
                                                                        this.setState({selectedStructure: structure});
                                                                    }} className="marker-btn"><img src={icon} alt="Structure"/> </button></div>
                                                                </Marker>
                                                        }
                                                        else{
                                                            if((structure.properties.denomination_structure.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.sous_categorie.toLowerCase().includes(this.state.filtre_barre))){
                                                                ret =
                                                                    <Marker key={structure.denomination_structure}
                                                                            latitude={structure.geometry.coordinates[1]}
                                                                            longitude={structure.geometry.coordinates[0]}>
                                                                        <div><button onClick={(e) => {
                                                                            e.preventDefault();
                                                                            // eslint-disable-next-line no-undef
                                                                            this.setState({selectedStructure: structure});
                                                                        }} className="marker-btn"><img src={icon} alt="Structure"/> </button></div>
                                                                    </Marker>
                                                            }
                                                        }
                                                    }
                                                    break;
                                                case 'Personnes âgées':
                                                    if(structure.properties.type_personne.includes(this.state.filtre_age)){
                                                        if(this.state.filtre_barre === "NaN"){
                                                            ret =
                                                                <Marker key={structure.denomination_structure}
                                                                        latitude={structure.geometry.coordinates[1]}
                                                                        longitude={structure.geometry.coordinates[0]}>
                                                                    <div><button onClick={(e) => {
                                                                        e.preventDefault();
                                                                        // eslint-disable-next-line no-undef
                                                                        this.setState({selectedStructure: structure});
                                                                    }} className="marker-btn"><img src={icon} alt="Structure"/> </button></div>
                                                                </Marker>
                                                        }
                                                        else{
                                                            if((structure.properties.denomination_structure.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.sous_categorie.toLowerCase().includes(this.state.filtre_barre))){
                                                                ret =
                                                                    <Marker key={structure.denomination_structure}
                                                                            latitude={structure.geometry.coordinates[1]}
                                                                            longitude={structure.geometry.coordinates[0]}>
                                                                        <div><button onClick={(e) => {
                                                                            e.preventDefault();
                                                                            // eslint-disable-next-line no-undef
                                                                            this.setState({selectedStructure: structure});
                                                                        }} className="marker-btn"><img src={icon} alt="Structure"/> </button></div>
                                                                    </Marker>
                                                            }
                                                        }
                                                    }
                                                    break;
                                            }
                                            return ret;
                                        case "Accompagnement scolaire":
                                            switch(this.state.filtre_age){
                                                case 'NaN':
                                                    if(this.state.filtre_barre === "NaN"){
                                                        ret =
                                                            <Marker key={structure.denomination_structure}
                                                                    latitude={structure.geometry.coordinates[1]}
                                                                    longitude={structure.geometry.coordinates[0]}>
                                                                <div><button onClick={(e) => {
                                                                    e.preventDefault();
                                                                    // eslint-disable-next-line no-undef
                                                                    this.setState({selectedStructure: structure});
                                                                }} className="marker-btn"><img src={icon} alt="Structure"/> </button></div>
                                                            </Marker>
                                                    }
                                                    else{
                                                        if((structure.properties.denomination_structure.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.sous_categorie.toLowerCase().includes(this.state.filtre_barre))){
                                                            ret =
                                                                <Marker key={structure.denomination_structure}
                                                                        latitude={structure.geometry.coordinates[1]}
                                                                        longitude={structure.geometry.coordinates[0]}>
                                                                    <div><button onClick={(e) => {
                                                                        e.preventDefault();
                                                                        // eslint-disable-next-line no-undef
                                                                        this.setState({selectedStructure: structure});
                                                                    }} className="marker-btn"><img src={icon} alt="Structure"/> </button></div>
                                                                </Marker>
                                                        }
                                                    }
                                                    break;
                                                case 'Adultes':
                                                    if(structure.properties.type_personne.includes(this.state.filtre_age)){
                                                        if(this.state.filtre_barre === "NaN"){
                                                            ret =
                                                                <Marker key={structure.denomination_structure}
                                                                        latitude={structure.geometry.coordinates[1]}
                                                                        longitude={structure.geometry.coordinates[0]}>
                                                                    <div><button onClick={(e) => {
                                                                        e.preventDefault();
                                                                        // eslint-disable-next-line no-undef
                                                                        this.setState({selectedStructure: structure});
                                                                    }} className="marker-btn"><img src={icon} alt="Structure"/> </button></div>
                                                                </Marker>
                                                        }
                                                        else{
                                                            if((structure.properties.denomination_structure.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.sous_categorie.toLowerCase().includes(this.state.filtre_barre))){
                                                                ret =
                                                                    <Marker key={structure.denomination_structure}
                                                                            latitude={structure.geometry.coordinates[1]}
                                                                            longitude={structure.geometry.coordinates[0]}>
                                                                        <div><button onClick={(e) => {
                                                                            e.preventDefault();
                                                                            // eslint-disable-next-line no-undef
                                                                            this.setState({selectedStructure: structure});
                                                                        }} className="marker-btn"><img src={icon} alt="Structure"/> </button></div>
                                                                    </Marker>
                                                            }
                                                        }
                                                    }
                                                    break;
                                                case 'Enfants':
                                                    if(structure.properties.type_personne.includes(this.state.filtre_age)){
                                                        if(this.state.filtre_barre === "NaN"){
                                                            ret =
                                                                <Marker key={structure.denomination_structure}
                                                                        latitude={structure.geometry.coordinates[1]}
                                                                        longitude={structure.geometry.coordinates[0]}>
                                                                    <div><button onClick={(e) => {
                                                                        e.preventDefault();
                                                                        // eslint-disable-next-line no-undef
                                                                        this.setState({selectedStructure: structure});
                                                                    }} className="marker-btn"><img src={icon} alt="Structure"/> </button></div>
                                                                </Marker>
                                                        }
                                                        else{
                                                            if((structure.properties.denomination_structure.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.sous_categorie.toLowerCase().includes(this.state.filtre_barre))){
                                                                ret =
                                                                    <Marker key={structure.denomination_structure}
                                                                            latitude={structure.geometry.coordinates[1]}
                                                                            longitude={structure.geometry.coordinates[0]}>
                                                                        <div><button onClick={(e) => {
                                                                            e.preventDefault();
                                                                            // eslint-disable-next-line no-undef
                                                                            this.setState({selectedStructure: structure});
                                                                        }} className="marker-btn"><img src={icon} alt="Structure"/> </button></div>
                                                                    </Marker>
                                                            }
                                                        }
                                                    }
                                                    break;
                                                case 'Personnes âgées':
                                                    if(structure.properties.type_personne.includes(this.state.filtre_age)){
                                                        if(this.state.filtre_barre === "NaN"){
                                                            ret =
                                                                <Marker key={structure.denomination_structure}
                                                                        latitude={structure.geometry.coordinates[1]}
                                                                        longitude={structure.geometry.coordinates[0]}>
                                                                    <div><button onClick={(e) => {
                                                                        e.preventDefault();
                                                                        // eslint-disable-next-line no-undef
                                                                        this.setState({selectedStructure: structure});
                                                                    }} className="marker-btn"><img src={icon} alt="Structure"/> </button></div>
                                                                </Marker>
                                                        }
                                                        else{
                                                            if((structure.properties.denomination_structure.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.sous_categorie.toLowerCase().includes(this.state.filtre_barre))){
                                                                ret =
                                                                    <Marker key={structure.denomination_structure}
                                                                            latitude={structure.geometry.coordinates[1]}
                                                                            longitude={structure.geometry.coordinates[0]}>
                                                                        <div><button onClick={(e) => {
                                                                            e.preventDefault();
                                                                            // eslint-disable-next-line no-undef
                                                                            this.setState({selectedStructure: structure});
                                                                        }} className="marker-btn"><img src={icon} alt="Structure"/> </button></div>
                                                                    </Marker>
                                                            }
                                                        }
                                                    }
                                                    break;
                                            }
                                            return ret;
                                        case "Structures de psychiatrie et accompagnement psychologique":
                                            switch(this.state.filtre_age){
                                                case 'NaN':
                                                    if(this.state.filtre_barre === "NaN"){
                                                        ret =
                                                            <Marker key={structure.denomination_structure}
                                                                    latitude={structure.geometry.coordinates[1]}
                                                                    longitude={structure.geometry.coordinates[0]}>
                                                                <div><button onClick={(e) => {
                                                                    e.preventDefault();
                                                                    // eslint-disable-next-line no-undef
                                                                    this.setState({selectedStructure: structure});
                                                                }} className="marker-btn"><img src={icon} alt="Structure"/> </button></div>
                                                            </Marker>
                                                    }
                                                    else{
                                                        if((structure.properties.denomination_structure.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.sous_categorie.toLowerCase().includes(this.state.filtre_barre))){
                                                            ret =
                                                                <Marker key={structure.denomination_structure}
                                                                        latitude={structure.geometry.coordinates[1]}
                                                                        longitude={structure.geometry.coordinates[0]}>
                                                                    <div><button onClick={(e) => {
                                                                        e.preventDefault();
                                                                        // eslint-disable-next-line no-undef
                                                                        this.setState({selectedStructure: structure});
                                                                    }} className="marker-btn"><img src={icon} alt="Structure"/> </button></div>
                                                                </Marker>
                                                        }
                                                    }
                                                    break;
                                                case 'Adultes':
                                                    if(structure.properties.type_personne.includes(this.state.filtre_age)){
                                                        if(this.state.filtre_barre === "NaN"){
                                                            ret =
                                                                <Marker key={structure.denomination_structure}
                                                                        latitude={structure.geometry.coordinates[1]}
                                                                        longitude={structure.geometry.coordinates[0]}>
                                                                    <div><button onClick={(e) => {
                                                                        e.preventDefault();
                                                                        // eslint-disable-next-line no-undef
                                                                        this.setState({selectedStructure: structure});
                                                                    }} className="marker-btn"><img src={icon} alt="Structure"/> </button></div>
                                                                </Marker>
                                                        }
                                                        else{
                                                            if((structure.properties.denomination_structure.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.sous_categorie.toLowerCase().includes(this.state.filtre_barre))){
                                                                ret =
                                                                    <Marker key={structure.denomination_structure}
                                                                            latitude={structure.geometry.coordinates[1]}
                                                                            longitude={structure.geometry.coordinates[0]}>
                                                                        <div><button onClick={(e) => {
                                                                            e.preventDefault();
                                                                            // eslint-disable-next-line no-undef
                                                                            this.setState({selectedStructure: structure});
                                                                        }} className="marker-btn"><img src={icon} alt="Structure"/> </button></div>
                                                                    </Marker>
                                                            }
                                                        }
                                                    }
                                                    break;
                                                case 'Enfants':
                                                    if(structure.properties.type_personne.includes(this.state.filtre_age)){
                                                        if(this.state.filtre_barre === "NaN"){
                                                            ret =
                                                                <Marker key={structure.denomination_structure}
                                                                        latitude={structure.geometry.coordinates[1]}
                                                                        longitude={structure.geometry.coordinates[0]}>
                                                                    <div><button onClick={(e) => {
                                                                        e.preventDefault();
                                                                        // eslint-disable-next-line no-undef
                                                                        this.setState({selectedStructure: structure});
                                                                    }} className="marker-btn"><img src={icon} alt="Structure"/> </button></div>
                                                                </Marker>
                                                        }
                                                        else{
                                                            if((structure.properties.denomination_structure.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.sous_categorie.toLowerCase().includes(this.state.filtre_barre))){
                                                                ret =
                                                                    <Marker key={structure.denomination_structure}
                                                                            latitude={structure.geometry.coordinates[1]}
                                                                            longitude={structure.geometry.coordinates[0]}>
                                                                        <div><button onClick={(e) => {
                                                                            e.preventDefault();
                                                                            // eslint-disable-next-line no-undef
                                                                            this.setState({selectedStructure: structure});
                                                                        }} className="marker-btn"><img src={icon} alt="Structure"/> </button></div>
                                                                    </Marker>
                                                            }
                                                        }
                                                    }
                                                    break;
                                                case 'Personnes âgées':
                                                    if(structure.properties.type_personne.includes(this.state.filtre_age)){
                                                        if(this.state.filtre_barre === "NaN"){
                                                            ret =
                                                                <Marker key={structure.denomination_structure}
                                                                        latitude={structure.geometry.coordinates[1]}
                                                                        longitude={structure.geometry.coordinates[0]}>
                                                                    <div><button onClick={(e) => {
                                                                        e.preventDefault();
                                                                        // eslint-disable-next-line no-undef
                                                                        this.setState({selectedStructure: structure});
                                                                    }} className="marker-btn"><img src={icon} alt="Structure"/> </button></div>
                                                                </Marker>
                                                        }
                                                        else{
                                                            if((structure.properties.denomination_structure.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.sous_categorie.toLowerCase().includes(this.state.filtre_barre))){
                                                                ret =
                                                                    <Marker key={structure.denomination_structure}
                                                                            latitude={structure.geometry.coordinates[1]}
                                                                            longitude={structure.geometry.coordinates[0]}>
                                                                        <div><button onClick={(e) => {
                                                                            e.preventDefault();
                                                                            // eslint-disable-next-line no-undef
                                                                            this.setState({selectedStructure: structure});
                                                                        }} className="marker-btn"><img src={icon} alt="Structure"/> </button></div>
                                                                    </Marker>
                                                            }
                                                        }
                                                    }
                                                    break;
                                            }
                                            return ret;
                                        case "Professionnels libéraux (formés au TC)":
                                            switch(this.state.filtre_age){
                                                case 'NaN':
                                                    if(this.state.filtre_barre === "NaN"){
                                                        ret =
                                                            <Marker key={structure.denomination_structure}
                                                                    latitude={structure.geometry.coordinates[1]}
                                                                    longitude={structure.geometry.coordinates[0]}>
                                                                <div><button onClick={(e) => {
                                                                    e.preventDefault();
                                                                    // eslint-disable-next-line no-undef
                                                                    this.setState({selectedStructure: structure});
                                                                }} className="marker-btn"><img src={icon} alt="Structure"/> </button></div>
                                                            </Marker>
                                                    }
                                                    else{
                                                        if((structure.properties.denomination_structure.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.sous_categorie.toLowerCase().includes(this.state.filtre_barre))){
                                                            ret =
                                                                <Marker key={structure.denomination_structure}
                                                                        latitude={structure.geometry.coordinates[1]}
                                                                        longitude={structure.geometry.coordinates[0]}>
                                                                    <div><button onClick={(e) => {
                                                                        e.preventDefault();
                                                                        // eslint-disable-next-line no-undef
                                                                        this.setState({selectedStructure: structure});
                                                                    }} className="marker-btn"><img src={icon} alt="Structure"/> </button></div>
                                                                </Marker>
                                                        }
                                                    }
                                                    break;
                                                case 'Adultes':
                                                    if(structure.properties.type_personne.includes(this.state.filtre_age)){
                                                        if(this.state.filtre_barre === "NaN"){
                                                            ret =
                                                                <Marker key={structure.denomination_structure}
                                                                        latitude={structure.geometry.coordinates[1]}
                                                                        longitude={structure.geometry.coordinates[0]}>
                                                                    <div><button onClick={(e) => {
                                                                        e.preventDefault();
                                                                        // eslint-disable-next-line no-undef
                                                                        this.setState({selectedStructure: structure});
                                                                    }} className="marker-btn"><img src={icon} alt="Structure"/> </button></div>
                                                                </Marker>
                                                        }
                                                        else{
                                                            if((structure.properties.denomination_structure.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.sous_categorie.toLowerCase().includes(this.state.filtre_barre))){
                                                                ret =
                                                                    <Marker key={structure.denomination_structure}
                                                                            latitude={structure.geometry.coordinates[1]}
                                                                            longitude={structure.geometry.coordinates[0]}>
                                                                        <div><button onClick={(e) => {
                                                                            e.preventDefault();
                                                                            // eslint-disable-next-line no-undef
                                                                            this.setState({selectedStructure: structure});
                                                                        }} className="marker-btn"><img src={icon} alt="Structure"/> </button></div>
                                                                    </Marker>
                                                            }
                                                        }
                                                    }
                                                    break;
                                                case 'Enfants':
                                                    if(structure.properties.type_personne.includes(this.state.filtre_age)){
                                                        if(this.state.filtre_barre === "NaN"){
                                                            ret =
                                                                <Marker key={structure.denomination_structure}
                                                                        latitude={structure.geometry.coordinates[1]}
                                                                        longitude={structure.geometry.coordinates[0]}>
                                                                    <div><button onClick={(e) => {
                                                                        e.preventDefault();
                                                                        // eslint-disable-next-line no-undef
                                                                        this.setState({selectedStructure: structure});
                                                                    }} className="marker-btn"><img src={icon} alt="Structure"/> </button></div>
                                                                </Marker>
                                                        }
                                                        else{
                                                            if((structure.properties.denomination_structure.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.sous_categorie.toLowerCase().includes(this.state.filtre_barre))){
                                                                ret =
                                                                    <Marker key={structure.denomination_structure}
                                                                            latitude={structure.geometry.coordinates[1]}
                                                                            longitude={structure.geometry.coordinates[0]}>
                                                                        <div><button onClick={(e) => {
                                                                            e.preventDefault();
                                                                            // eslint-disable-next-line no-undef
                                                                            this.setState({selectedStructure: structure});
                                                                        }} className="marker-btn"><img src={icon} alt="Structure"/> </button></div>
                                                                    </Marker>
                                                            }
                                                        }
                                                    }
                                                    break;
                                                case 'Personnes âgées':
                                                    if(structure.properties.type_personne.includes(this.state.filtre_age)){
                                                        if(this.state.filtre_barre === "NaN"){
                                                            ret =
                                                                <Marker key={structure.denomination_structure}
                                                                        latitude={structure.geometry.coordinates[1]}
                                                                        longitude={structure.geometry.coordinates[0]}>
                                                                    <div><button onClick={(e) => {
                                                                        e.preventDefault();
                                                                        // eslint-disable-next-line no-undef
                                                                        this.setState({selectedStructure: structure});
                                                                    }} className="marker-btn"><img src={icon} alt="Structure"/> </button></div>
                                                                </Marker>
                                                        }
                                                        else{
                                                            if((structure.properties.denomination_structure.toLowerCase().includes(this.state.filtre_barre))||(structure.properties.sous_categorie.toLowerCase().includes(this.state.filtre_barre))){
                                                                ret =
                                                                    <Marker key={structure.denomination_structure}
                                                                            latitude={structure.geometry.coordinates[1]}
                                                                            longitude={structure.geometry.coordinates[0]}>
                                                                        <div><button onClick={(e) => {
                                                                            e.preventDefault();
                                                                            // eslint-disable-next-line no-undef
                                                                            this.setState({selectedStructure: structure});
                                                                        }} className="marker-btn"><img src={icon} alt="Structure"/> </button></div>
                                                                    </Marker>
                                                            }
                                                        }
                                                    }
                                                    break;
                                            }
                                            return ret;
                                    }
                                    return ret;
                                })};
                                        {this.state.selectedStructure ? (
                                            <Popup
                                            latitude={this.state.selectedStructure.geometry.coordinates[1]}
                                            longitude={this.state.selectedStructure.geometry.coordinates[0]}
                                            onClose={() => {
                                                this.setState({selectedStructure: null});
                                            }}
                                            >
                                                <div>
                                                    <h3><a href={this.state.selectedStructure.properties.site_internet} target="_blank">
                                                        <strong>Structure : </strong>{this.state.selectedStructure.properties.denomination_structure}</a>
                                                    </h3>
                                                    <p>
                                                        <strong>Catégorie : </strong><p>{this.state.selectedStructure.properties.categorie}</p>
                                                        <strong>Sous-catégorie : </strong><p>{this.state.selectedStructure.properties.sous_categorie}</p>
                                                        <strong>Adresse : </strong><p>{this.state.selectedStructure.properties.adresse} {this.state.selectedStructure.properties.cp} {this.state.selectedStructure.properties.ville}</p>
                                                        <strong>Téléphone : </strong><p>{this.state.selectedStructure.properties.telephone}</p>
                                                        <strong>Mail : </strong><p>{this.state.selectedStructure.properties.contact_mail}</p>
                                                        <strong>Statut structure : </strong><p>{this.state.selectedStructure.properties.statut_structure}</p>
                                                        <strong>Activités : </strong><p>{this.state.selectedStructure.properties.activites}</p>
                                                        <strong>Tranche d'âge prise en charge : </strong><p>{this.state.selectedStructure.properties.type_personne}</p>
                                                        <strong>Nécessite une notification MDPH : </strong><p>{this.state.selectedStructure.properties.necessite_une_notification_MDPH}</p>
                                                        <strong>La demande doit être effectuée par le patient ou l'entourage : </strong><p>{this.state.selectedStructure.properties.demande_effectue_patient_entourage}</p>
                                                        <strong>Un document médical doit être rempli par le médecin traitant : </strong><p>{this.state.selectedStructure.properties.document_medical_a_remplir_par_medecin}</p>
                                                    </p>
                                                </div>
                                            </Popup>
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
                                        case 'NaN':
                                            switch(this.state.filtre_age){
                                                case 'NaN':
                                                    if(this.state.filtre_barre === "NaN"){
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
                                                        if(this.state.filtre_barre === "NaN"){
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
                                                        if(this.state.filtre_barre === "NaN"){
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
                                                        if(this.state.filtre_barre === "NaN"){
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
                                        case "Structure médico-sociales & Lieux de vie":
                                            switch(this.state.filtre_age){
                                                case 'NaN':
                                                    if(this.state.filtre_barre === "NaN"){
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
                                                        if(this.state.filtre_barre === "NaN"){
                                                            ret =
                                                                <Col xs="6" sm="3">
                                                                <Card style={styles.cardItem}>
                                                                    <CardHeader onClick={()=>this.flyTo(structure)} style={styles.cardHeader}>{structure.properties.denomination_structure}</CardHeader>
                                                                    <CardBody>
                                                                        <CardSubtitle style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}</CardSubtitle>
                                                                        <Collapse style={styles.subtitle} isOpen={this.state.collapse}>
                                                                            <DropdownItem style={styles.divider_margin}divider />
                                                                            Anim pariatur cliche reprehenderit,
                                                                            enim eiusmod high life accusamus terry richardson ad squid. Nihil
                                                                            anim keffiyeh helvetica, craft beer labore wes anderson cred
                                                                            nesciunt sapiente ea proident.
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
                                                                            <CardSubtitle style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}</CardSubtitle>
                                                                            <Collapse style={styles.subtitle} isOpen={this.state.collapse}>
                                                                                <DropdownItem style={styles.divider_margin}divider />
                                                                                Anim pariatur cliche reprehenderit,
                                                                                enim eiusmod high life accusamus terry richardson ad squid. Nihil
                                                                                anim keffiyeh helvetica, craft beer labore wes anderson cred
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
                                                    if(structure.properties.type_personne.includes(this.state.filtre_age)){
                                                        if(this.state.filtre_barre === "NaN"){
                                                            ret =
                                                                <Col xs="6" sm="3">
                                                                <Card style={styles.cardItem}>
                                                                    <CardHeader onClick={()=>this.flyTo(structure)} style={styles.cardHeader}>{structure.properties.denomination_structure}</CardHeader>
                                                                    <CardBody>
                                                                        <CardSubtitle style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}</CardSubtitle>
                                                                        <Collapse style={styles.subtitle} isOpen={this.state.collapse}>
                                                                            <DropdownItem style={styles.divider_margin}divider />
                                                                            Anim pariatur cliche reprehenderit,
                                                                            enim eiusmod high life accusamus terry richardson ad squid. Nihil
                                                                            anim keffiyeh helvetica, craft beer labore wes anderson cred
                                                                            nesciunt sapiente ea proident.
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
                                                                            <CardSubtitle style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}</CardSubtitle>
                                                                            <Collapse style={styles.subtitle} isOpen={this.state.collapse}>
                                                                                <DropdownItem style={styles.divider_margin}divider />
                                                                                Anim pariatur cliche reprehenderit,
                                                                                enim eiusmod high life accusamus terry richardson ad squid. Nihil
                                                                                anim keffiyeh helvetica, craft beer labore wes anderson cred
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
                                                    if(structure.properties.type_personne.includes(this.state.filtre_age)){
                                                        if(this.state.filtre_barre === "NaN"){
                                                            ret =
                                                                <Col xs="6" sm="3">
                                                                <Card style={styles.cardItem}>
                                                                    <CardHeader onClick={()=>this.flyTo(structure)} style={styles.cardHeader}>{structure.properties.denomination_structure}</CardHeader>
                                                                    <CardBody>
                                                                        <CardSubtitle style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}</CardSubtitle>
                                                                        <Collapse style={styles.subtitle} isOpen={this.state.collapse}>
                                                                            <DropdownItem style={styles.divider_margin}divider />
                                                                            Anim pariatur cliche reprehenderit,
                                                                            enim eiusmod high life accusamus terry richardson ad squid. Nihil
                                                                            anim keffiyeh helvetica, craft beer labore wes anderson cred
                                                                            nesciunt sapiente ea proident.
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
                                                                            <CardSubtitle style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}</CardSubtitle>
                                                                            <Collapse style={styles.subtitle} isOpen={this.state.collapse}>
                                                                                <DropdownItem style={styles.divider_margin}divider />
                                                                                Anim pariatur cliche reprehenderit,
                                                                                enim eiusmod high life accusamus terry richardson ad squid. Nihil
                                                                                anim keffiyeh helvetica, craft beer labore wes anderson cred
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
                                            return ret;
                                        case "Service de Médecine & Chirurgie":
                                            switch(this.state.filtre_age){
                                                case 'NaN':
                                                    if(this.state.filtre_barre === "NaN"){
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
                                                        if(this.state.filtre_barre === "NaN"){
                                                            ret =
                                                                <Col xs="6" sm="3">
                                                                <Card style={styles.cardItem}>
                                                                    <CardHeader onClick={()=>this.flyTo(structure)} style={styles.cardHeader}>{structure.properties.denomination_structure}</CardHeader>
                                                                    <CardBody>
                                                                        <CardSubtitle style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}</CardSubtitle>
                                                                        <Collapse style={styles.subtitle} isOpen={this.state.collapse}>
                                                                            <DropdownItem style={styles.divider_margin}divider />
                                                                            Anim pariatur cliche reprehenderit,
                                                                            enim eiusmod high life accusamus terry richardson ad squid. Nihil
                                                                            anim keffiyeh helvetica, craft beer labore wes anderson cred
                                                                            nesciunt sapiente ea proident.
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
                                                                            <CardSubtitle style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}</CardSubtitle>
                                                                            <Collapse style={styles.subtitle} isOpen={this.state.collapse}>
                                                                                <DropdownItem style={styles.divider_margin}divider />
                                                                                Anim pariatur cliche reprehenderit,
                                                                                enim eiusmod high life accusamus terry richardson ad squid. Nihil
                                                                                anim keffiyeh helvetica, craft beer labore wes anderson cred
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
                                                    if(structure.properties.type_personne.includes(this.state.filtre_age)){
                                                        if(this.state.filtre_barre === "NaN"){
                                                            ret =
                                                                <Col xs="6" sm="3">
                                                                <Card style={styles.cardItem}>
                                                                    <CardHeader onClick={()=>this.flyTo(structure)} style={styles.cardHeader}>{structure.properties.denomination_structure}</CardHeader>
                                                                    <CardBody>
                                                                        <CardSubtitle style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}</CardSubtitle>
                                                                        <Collapse style={styles.subtitle} isOpen={this.state.collapse}>
                                                                            <DropdownItem style={styles.divider_margin}divider />
                                                                            Anim pariatur cliche reprehenderit,
                                                                            enim eiusmod high life accusamus terry richardson ad squid. Nihil
                                                                            anim keffiyeh helvetica, craft beer labore wes anderson cred
                                                                            nesciunt sapiente ea proident.
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
                                                                            <CardSubtitle style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}</CardSubtitle>
                                                                            <Collapse style={styles.subtitle} isOpen={this.state.collapse}>
                                                                                <DropdownItem style={styles.divider_margin}divider />
                                                                                Anim pariatur cliche reprehenderit,
                                                                                enim eiusmod high life accusamus terry richardson ad squid. Nihil
                                                                                anim keffiyeh helvetica, craft beer labore wes anderson cred
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
                                                    if(structure.properties.type_personne.includes(this.state.filtre_age)){
                                                        if(this.state.filtre_barre === "NaN"){
                                                            ret =
                                                                <Col xs="6" sm="3">
                                                                <Card style={styles.cardItem}>
                                                                    <CardHeader onClick={()=>this.flyTo(structure)} style={styles.cardHeader}>{structure.properties.denomination_structure}</CardHeader>
                                                                    <CardBody>
                                                                        <CardSubtitle style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}</CardSubtitle>
                                                                        <Collapse style={styles.subtitle} isOpen={this.state.collapse}>
                                                                            <DropdownItem style={styles.divider_margin}divider />
                                                                            Anim pariatur cliche reprehenderit,
                                                                            enim eiusmod high life accusamus terry richardson ad squid. Nihil
                                                                            anim keffiyeh helvetica, craft beer labore wes anderson cred
                                                                            nesciunt sapiente ea proident.
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
                                                                            <CardSubtitle style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}</CardSubtitle>
                                                                            <Collapse style={styles.subtitle} isOpen={this.state.collapse}>
                                                                                <DropdownItem style={styles.divider_margin}divider />
                                                                                Anim pariatur cliche reprehenderit,
                                                                                enim eiusmod high life accusamus terry richardson ad squid. Nihil
                                                                                anim keffiyeh helvetica, craft beer labore wes anderson cred
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
                                            return ret;
                                        case "Structures de Rééducation":
                                            switch(this.state.filtre_age){
                                                case 'NaN':
                                                    if(this.state.filtre_barre === "NaN"){
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
                                                        if(this.state.filtre_barre === "NaN"){
                                                            ret =
                                                                <Col xs="6" sm="3">
                                                                <Card style={styles.cardItem}>
                                                                    <CardHeader onClick={()=>this.flyTo(structure)} style={styles.cardHeader}>{structure.properties.denomination_structure}</CardHeader>
                                                                    <CardBody>
                                                                        <CardSubtitle style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}</CardSubtitle>
                                                                        <Collapse style={styles.subtitle} isOpen={this.state.collapse}>
                                                                            <DropdownItem style={styles.divider_margin}divider />
                                                                            Anim pariatur cliche reprehenderit,
                                                                            enim eiusmod high life accusamus terry richardson ad squid. Nihil
                                                                            anim keffiyeh helvetica, craft beer labore wes anderson cred
                                                                            nesciunt sapiente ea proident.
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
                                                                            <CardSubtitle style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}</CardSubtitle>
                                                                            <Collapse style={styles.subtitle} isOpen={this.state.collapse}>
                                                                                <DropdownItem style={styles.divider_margin}divider />
                                                                                Anim pariatur cliche reprehenderit,
                                                                                enim eiusmod high life accusamus terry richardson ad squid. Nihil
                                                                                anim keffiyeh helvetica, craft beer labore wes anderson cred
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
                                                    if(structure.properties.type_personne.includes(this.state.filtre_age)){
                                                        if(this.state.filtre_barre === "NaN"){
                                                            ret =
                                                                <Col xs="6" sm="3">
                                                                <Card style={styles.cardItem}>
                                                                    <CardHeader onClick={()=>this.flyTo(structure)} style={styles.cardHeader}>{structure.properties.denomination_structure}</CardHeader>
                                                                    <CardBody>
                                                                        <CardSubtitle style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}</CardSubtitle>
                                                                        <Collapse style={styles.subtitle} isOpen={this.state.collapse}>
                                                                            <DropdownItem style={styles.divider_margin}divider />
                                                                            Anim pariatur cliche reprehenderit,
                                                                            enim eiusmod high life accusamus terry richardson ad squid. Nihil
                                                                            anim keffiyeh helvetica, craft beer labore wes anderson cred
                                                                            nesciunt sapiente ea proident.
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
                                                                            <CardSubtitle style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}</CardSubtitle>
                                                                            <Collapse style={styles.subtitle} isOpen={this.state.collapse}>
                                                                                <DropdownItem style={styles.divider_margin}divider />
                                                                                Anim pariatur cliche reprehenderit,
                                                                                enim eiusmod high life accusamus terry richardson ad squid. Nihil
                                                                                anim keffiyeh helvetica, craft beer labore wes anderson cred
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
                                                    if(structure.properties.type_personne.includes(this.state.filtre_age)){
                                                        if(this.state.filtre_barre === "NaN"){
                                                            ret =
                                                                <Col xs="6" sm="3">
                                                                <Card style={styles.cardItem}>
                                                                    <CardHeader onClick={()=>this.flyTo(structure)} style={styles.cardHeader}>{structure.properties.denomination_structure}</CardHeader>
                                                                    <CardBody>
                                                                        <CardSubtitle style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}</CardSubtitle>
                                                                        <Collapse style={styles.subtitle} isOpen={this.state.collapse}>
                                                                            <DropdownItem style={styles.divider_margin}divider />
                                                                            Anim pariatur cliche reprehenderit,
                                                                            enim eiusmod high life accusamus terry richardson ad squid. Nihil
                                                                            anim keffiyeh helvetica, craft beer labore wes anderson cred
                                                                            nesciunt sapiente ea proident.
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
                                                                            <CardSubtitle style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}</CardSubtitle>
                                                                            <Collapse style={styles.subtitle} isOpen={this.state.collapse}>
                                                                                <DropdownItem style={styles.divider_margin}divider />
                                                                                Anim pariatur cliche reprehenderit,
                                                                                enim eiusmod high life accusamus terry richardson ad squid. Nihil
                                                                                anim keffiyeh helvetica, craft beer labore wes anderson cred
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
                                            return ret;
                                        case "Association & Structures occupationnelles":
                                            switch(this.state.filtre_age){
                                                case 'NaN':
                                                    if(this.state.filtre_barre === "NaN"){
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
                                                        if(this.state.filtre_barre === "NaN"){
                                                            ret =
                                                                <Col xs="6" sm="3">
                                                                <Card style={styles.cardItem}>
                                                                    <CardHeader onClick={()=>this.flyTo(structure)} style={styles.cardHeader}>{structure.properties.denomination_structure}</CardHeader>
                                                                    <CardBody>
                                                                        <CardSubtitle style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}</CardSubtitle>
                                                                        <Collapse style={styles.subtitle} isOpen={this.state.collapse}>
                                                                            <DropdownItem style={styles.divider_margin}divider />
                                                                            Anim pariatur cliche reprehenderit,
                                                                            enim eiusmod high life accusamus terry richardson ad squid. Nihil
                                                                            anim keffiyeh helvetica, craft beer labore wes anderson cred
                                                                            nesciunt sapiente ea proident.
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
                                                                            <CardSubtitle style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}</CardSubtitle>
                                                                            <Collapse style={styles.subtitle} isOpen={this.state.collapse}>
                                                                                <DropdownItem style={styles.divider_margin}divider />
                                                                                Anim pariatur cliche reprehenderit,
                                                                                enim eiusmod high life accusamus terry richardson ad squid. Nihil
                                                                                anim keffiyeh helvetica, craft beer labore wes anderson cred
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
                                                    if(structure.properties.type_personne.includes(this.state.filtre_age)){
                                                        if(this.state.filtre_barre === "NaN"){
                                                            ret =
                                                                <Col xs="6" sm="3">
                                                                <Card style={styles.cardItem}>
                                                                    <CardHeader onClick={()=>this.flyTo(structure)} style={styles.cardHeader}>{structure.properties.denomination_structure}</CardHeader>
                                                                    <CardBody>
                                                                        <CardSubtitle style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}</CardSubtitle>
                                                                        <Collapse style={styles.subtitle} isOpen={this.state.collapse}>
                                                                            <DropdownItem style={styles.divider_margin}divider />
                                                                            Anim pariatur cliche reprehenderit,
                                                                            enim eiusmod high life accusamus terry richardson ad squid. Nihil
                                                                            anim keffiyeh helvetica, craft beer labore wes anderson cred
                                                                            nesciunt sapiente ea proident.
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
                                                                            <CardSubtitle style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}</CardSubtitle>
                                                                            <Collapse style={styles.subtitle} isOpen={this.state.collapse}>
                                                                                <DropdownItem style={styles.divider_margin}divider />
                                                                                Anim pariatur cliche reprehenderit,
                                                                                enim eiusmod high life accusamus terry richardson ad squid. Nihil
                                                                                anim keffiyeh helvetica, craft beer labore wes anderson cred
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
                                                    if(structure.properties.type_personne.includes(this.state.filtre_age)){
                                                        if(this.state.filtre_barre === "NaN"){
                                                            ret =
                                                                <Col xs="6" sm="3">
                                                                <Card style={styles.cardItem}>
                                                                    <CardHeader onClick={()=>this.flyTo(structure)} style={styles.cardHeader}>{structure.properties.denomination_structure}</CardHeader>
                                                                    <CardBody>
                                                                        <CardSubtitle style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}</CardSubtitle>
                                                                        <Collapse style={styles.subtitle} isOpen={this.state.collapse}>
                                                                            <DropdownItem style={styles.divider_margin}divider />
                                                                            Anim pariatur cliche reprehenderit,
                                                                            enim eiusmod high life accusamus terry richardson ad squid. Nihil
                                                                            anim keffiyeh helvetica, craft beer labore wes anderson cred
                                                                            nesciunt sapiente ea proident.
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
                                                                            <CardSubtitle style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}</CardSubtitle>
                                                                            <Collapse style={styles.subtitle} isOpen={this.state.collapse}>
                                                                                <DropdownItem style={styles.divider_margin}divider />
                                                                                Anim pariatur cliche reprehenderit,
                                                                                enim eiusmod high life accusamus terry richardson ad squid. Nihil
                                                                                anim keffiyeh helvetica, craft beer labore wes anderson cred
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
                                            return ret;
                                        case "Réinsertion professionnelle":
                                            switch(this.state.filtre_age){
                                                case 'NaN':
                                                    if(this.state.filtre_barre === "NaN"){
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
                                                        if(this.state.filtre_barre === "NaN"){
                                                            ret =
                                                                <Col xs="6" sm="3">
                                                                <Card style={styles.cardItem}>
                                                                    <CardHeader onClick={()=>this.flyTo(structure)} style={styles.cardHeader}>{structure.properties.denomination_structure}</CardHeader>
                                                                    <CardBody>
                                                                        <CardSubtitle style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}</CardSubtitle>
                                                                        <Collapse style={styles.subtitle} isOpen={this.state.collapse}>
                                                                            <DropdownItem style={styles.divider_margin}divider />
                                                                            Anim pariatur cliche reprehenderit,
                                                                            enim eiusmod high life accusamus terry richardson ad squid. Nihil
                                                                            anim keffiyeh helvetica, craft beer labore wes anderson cred
                                                                            nesciunt sapiente ea proident.
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
                                                                            <CardSubtitle style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}</CardSubtitle>
                                                                            <Collapse style={styles.subtitle} isOpen={this.state.collapse}>
                                                                                <DropdownItem style={styles.divider_margin}divider />
                                                                                Anim pariatur cliche reprehenderit,
                                                                                enim eiusmod high life accusamus terry richardson ad squid. Nihil
                                                                                anim keffiyeh helvetica, craft beer labore wes anderson cred
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
                                                    if(structure.properties.type_personne.includes(this.state.filtre_age)){
                                                        if(this.state.filtre_barre === "NaN"){
                                                            ret =
                                                                <Col xs="6" sm="3">
                                                                <Card style={styles.cardItem}>
                                                                    <CardHeader onClick={()=>this.flyTo(structure)} style={styles.cardHeader}>{structure.properties.denomination_structure}</CardHeader>
                                                                    <CardBody>
                                                                        <CardSubtitle style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}</CardSubtitle>
                                                                        <Collapse style={styles.subtitle} isOpen={this.state.collapse}>
                                                                            <DropdownItem style={styles.divider_margin}divider />
                                                                            Anim pariatur cliche reprehenderit,
                                                                            enim eiusmod high life accusamus terry richardson ad squid. Nihil
                                                                            anim keffiyeh helvetica, craft beer labore wes anderson cred
                                                                            nesciunt sapiente ea proident.
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
                                                                            <CardSubtitle style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}</CardSubtitle>
                                                                            <Collapse style={styles.subtitle} isOpen={this.state.collapse}>
                                                                                <DropdownItem style={styles.divider_margin}divider />
                                                                                Anim pariatur cliche reprehenderit,
                                                                                enim eiusmod high life accusamus terry richardson ad squid. Nihil
                                                                                anim keffiyeh helvetica, craft beer labore wes anderson cred
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
                                                    if(structure.properties.type_personne.includes(this.state.filtre_age)){
                                                        if(this.state.filtre_barre === "NaN"){
                                                            ret =
                                                                <Col xs="6" sm="3">
                                                                <Card style={styles.cardItem}>
                                                                    <CardHeader onClick={()=>this.flyTo(structure)} style={styles.cardHeader}>{structure.properties.denomination_structure}</CardHeader>
                                                                    <CardBody>
                                                                        <CardSubtitle style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}</CardSubtitle>
                                                                        <Collapse style={styles.subtitle} isOpen={this.state.collapse}>
                                                                            <DropdownItem style={styles.divider_margin}divider />
                                                                            Anim pariatur cliche reprehenderit,
                                                                            enim eiusmod high life accusamus terry richardson ad squid. Nihil
                                                                            anim keffiyeh helvetica, craft beer labore wes anderson cred
                                                                            nesciunt sapiente ea proident.
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
                                                                            <CardSubtitle style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}</CardSubtitle>
                                                                            <Collapse style={styles.subtitle} isOpen={this.state.collapse}>
                                                                                <DropdownItem style={styles.divider_margin}divider />
                                                                                Anim pariatur cliche reprehenderit,
                                                                                enim eiusmod high life accusamus terry richardson ad squid. Nihil
                                                                                anim keffiyeh helvetica, craft beer labore wes anderson cred
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
                                            return ret;
                                        case "Accompagnement scolaire":
                                            switch(this.state.filtre_age){
                                                case 'NaN':
                                                    if(this.state.filtre_barre === "NaN"){
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
                                                        if(this.state.filtre_barre === "NaN"){
                                                            ret =
                                                                <Col xs="6" sm="3">
                                                                <Card style={styles.cardItem}>
                                                                    <CardHeader onClick={()=>this.flyTo(structure)} style={styles.cardHeader}>{structure.properties.denomination_structure}</CardHeader>
                                                                    <CardBody>
                                                                        <CardSubtitle style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}</CardSubtitle>
                                                                        <Collapse style={styles.subtitle} isOpen={this.state.collapse}>
                                                                            <DropdownItem style={styles.divider_margin}divider />
                                                                            Anim pariatur cliche reprehenderit,
                                                                            enim eiusmod high life accusamus terry richardson ad squid. Nihil
                                                                            anim keffiyeh helvetica, craft beer labore wes anderson cred
                                                                            nesciunt sapiente ea proident.
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
                                                                            <CardSubtitle style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}</CardSubtitle>
                                                                            <Collapse style={styles.subtitle} isOpen={this.state.collapse}>
                                                                                <DropdownItem style={styles.divider_margin}divider />
                                                                                Anim pariatur cliche reprehenderit,
                                                                                enim eiusmod high life accusamus terry richardson ad squid. Nihil
                                                                                anim keffiyeh helvetica, craft beer labore wes anderson cred
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
                                                    if(structure.properties.type_personne.includes(this.state.filtre_age)){
                                                        if(this.state.filtre_barre === "NaN"){
                                                            ret =
                                                                <Col xs="6" sm="3">
                                                                <Card style={styles.cardItem}>
                                                                    <CardHeader onClick={()=>this.flyTo(structure)} style={styles.cardHeader}>{structure.properties.denomination_structure}</CardHeader>
                                                                    <CardBody>
                                                                        <CardSubtitle style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}</CardSubtitle>
                                                                        <Collapse style={styles.subtitle} isOpen={this.state.collapse}>
                                                                            <DropdownItem style={styles.divider_margin}divider />
                                                                            Anim pariatur cliche reprehenderit,
                                                                            enim eiusmod high life accusamus terry richardson ad squid. Nihil
                                                                            anim keffiyeh helvetica, craft beer labore wes anderson cred
                                                                            nesciunt sapiente ea proident.
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
                                                                            <CardSubtitle style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}</CardSubtitle>
                                                                            <Collapse style={styles.subtitle} isOpen={this.state.collapse}>
                                                                                <DropdownItem style={styles.divider_margin}divider />
                                                                                Anim pariatur cliche reprehenderit,
                                                                                enim eiusmod high life accusamus terry richardson ad squid. Nihil
                                                                                anim keffiyeh helvetica, craft beer labore wes anderson cred
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
                                                    if(structure.properties.type_personne.includes(this.state.filtre_age)){
                                                        if(this.state.filtre_barre === "NaN"){
                                                            ret =
                                                                <Col xs="6" sm="3">
                                                                <Card style={styles.cardItem}>
                                                                    <CardHeader onClick={()=>this.flyTo(structure)} style={styles.cardHeader}>{structure.properties.denomination_structure}</CardHeader>
                                                                    <CardBody>
                                                                        <CardSubtitle style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}</CardSubtitle>
                                                                        <Collapse style={styles.subtitle} isOpen={this.state.collapse}>
                                                                            <DropdownItem style={styles.divider_margin}divider />
                                                                            Anim pariatur cliche reprehenderit,
                                                                            enim eiusmod high life accusamus terry richardson ad squid. Nihil
                                                                            anim keffiyeh helvetica, craft beer labore wes anderson cred
                                                                            nesciunt sapiente ea proident.
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
                                                                            <CardSubtitle style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}</CardSubtitle>
                                                                            <Collapse style={styles.subtitle} isOpen={this.state.collapse}>
                                                                                <DropdownItem style={styles.divider_margin}divider />
                                                                                Anim pariatur cliche reprehenderit,
                                                                                enim eiusmod high life accusamus terry richardson ad squid. Nihil
                                                                                anim keffiyeh helvetica, craft beer labore wes anderson cred
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
                                            return ret;
                                        case "Structures de psychiatrie et accompagnement psychologique":
                                            switch(this.state.filtre_age){
                                                case 'NaN':
                                                    if(this.state.filtre_barre === "NaN"){
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
                                                        if(this.state.filtre_barre === "NaN"){
                                                            ret =
                                                                <Col xs="6" sm="3">
                                                                <Card style={styles.cardItem}>
                                                                    <CardHeader onClick={()=>this.flyTo(structure)} style={styles.cardHeader}>{structure.properties.denomination_structure}</CardHeader>
                                                                    <CardBody>
                                                                        <CardSubtitle style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}</CardSubtitle>
                                                                        <Collapse style={styles.subtitle} isOpen={this.state.collapse}>
                                                                            <DropdownItem style={styles.divider_margin}divider />
                                                                            Anim pariatur cliche reprehenderit,
                                                                            enim eiusmod high life accusamus terry richardson ad squid. Nihil
                                                                            anim keffiyeh helvetica, craft beer labore wes anderson cred
                                                                            nesciunt sapiente ea proident.
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
                                                                            <CardSubtitle style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}</CardSubtitle>
                                                                            <Collapse style={styles.subtitle} isOpen={this.state.collapse}>
                                                                                <DropdownItem style={styles.divider_margin}divider />
                                                                                Anim pariatur cliche reprehenderit,
                                                                                enim eiusmod high life accusamus terry richardson ad squid. Nihil
                                                                                anim keffiyeh helvetica, craft beer labore wes anderson cred
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
                                                    if(structure.properties.type_personne.includes(this.state.filtre_age)){
                                                        if(this.state.filtre_barre === "NaN"){
                                                            ret =
                                                                <Col xs="6" sm="3">
                                                                <Card style={styles.cardItem}>
                                                                    <CardHeader onClick={()=>this.flyTo(structure)} style={styles.cardHeader}>{structure.properties.denomination_structure}</CardHeader>
                                                                    <CardBody>
                                                                        <CardSubtitle style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}</CardSubtitle>
                                                                        <Collapse style={styles.subtitle} isOpen={this.state.collapse}>
                                                                            <DropdownItem style={styles.divider_margin}divider />
                                                                            Anim pariatur cliche reprehenderit,
                                                                            enim eiusmod high life accusamus terry richardson ad squid. Nihil
                                                                            anim keffiyeh helvetica, craft beer labore wes anderson cred
                                                                            nesciunt sapiente ea proident.
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
                                                                            <CardSubtitle style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}</CardSubtitle>
                                                                            <Collapse style={styles.subtitle} isOpen={this.state.collapse}>
                                                                                <DropdownItem style={styles.divider_margin}divider />
                                                                                Anim pariatur cliche reprehenderit,
                                                                                enim eiusmod high life accusamus terry richardson ad squid. Nihil
                                                                                anim keffiyeh helvetica, craft beer labore wes anderson cred
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
                                                    if(structure.properties.type_personne.includes(this.state.filtre_age)){
                                                        if(this.state.filtre_barre === "NaN"){
                                                            ret =
                                                                <Col xs="6" sm="3">
                                                                <Card style={styles.cardItem}>
                                                                    <CardHeader onClick={()=>this.flyTo(structure)} style={styles.cardHeader}>{structure.properties.denomination_structure}</CardHeader>
                                                                    <CardBody>
                                                                        <CardSubtitle style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}</CardSubtitle>
                                                                        <Collapse style={styles.subtitle} isOpen={this.state.collapse}>
                                                                            <DropdownItem style={styles.divider_margin}divider />
                                                                            Anim pariatur cliche reprehenderit,
                                                                            enim eiusmod high life accusamus terry richardson ad squid. Nihil
                                                                            anim keffiyeh helvetica, craft beer labore wes anderson cred
                                                                            nesciunt sapiente ea proident.
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
                                                                            <CardSubtitle style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}</CardSubtitle>
                                                                            <Collapse style={styles.subtitle} isOpen={this.state.collapse}>
                                                                                <DropdownItem style={styles.divider_margin}divider />
                                                                                Anim pariatur cliche reprehenderit,
                                                                                enim eiusmod high life accusamus terry richardson ad squid. Nihil
                                                                                anim keffiyeh helvetica, craft beer labore wes anderson cred
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
                                            return ret;
                                        case "Professionnels libéraux (formés au TC)":
                                            switch(this.state.filtre_age){
                                                case 'NaN':
                                                    if(this.state.filtre_barre === "NaN"){
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
                                                    break;
                                                case 'Adultes':
                                                    if(structure.properties.type_personne.includes(this.state.filtre_age)){
                                                        if(this.state.filtre_barre === "NaN"){
                                                            ret =
                                                                <Col xs="6" sm="3">
                                                                <Card style={styles.cardItem}>
                                                                    <CardHeader onClick={()=>this.flyTo(structure)} style={styles.cardHeader}>{structure.properties.denomination_structure}</CardHeader>
                                                                    <CardBody>
                                                                        <CardSubtitle style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}</CardSubtitle>
                                                                        <Collapse style={styles.subtitle} isOpen={this.state.collapse}>
                                                                            <DropdownItem style={styles.divider_margin}divider />
                                                                            Anim pariatur cliche reprehenderit,
                                                                            enim eiusmod high life accusamus terry richardson ad squid. Nihil
                                                                            anim keffiyeh helvetica, craft beer labore wes anderson cred
                                                                            nesciunt sapiente ea proident.
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
                                                                            <CardSubtitle style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}</CardSubtitle>
                                                                            <Collapse style={styles.subtitle} isOpen={this.state.collapse}>
                                                                                <DropdownItem style={styles.divider_margin}divider />
                                                                                Anim pariatur cliche reprehenderit,
                                                                                enim eiusmod high life accusamus terry richardson ad squid. Nihil
                                                                                anim keffiyeh helvetica, craft beer labore wes anderson cred
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
                                                    if(structure.properties.type_personne.includes(this.state.filtre_age)){
                                                        if(this.state.filtre_barre === "NaN"){
                                                            ret =
                                                                <Col xs="6" sm="3">
                                                                <Card style={styles.cardItem}>
                                                                    <CardHeader onClick={()=>this.flyTo(structure)} style={styles.cardHeader}>{structure.properties.denomination_structure}</CardHeader>
                                                                    <CardBody>
                                                                        <CardSubtitle style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}</CardSubtitle>
                                                                        <Collapse style={styles.subtitle} isOpen={this.state.collapse}>
                                                                            <DropdownItem style={styles.divider_margin}divider />
                                                                            Anim pariatur cliche reprehenderit,
                                                                            enim eiusmod high life accusamus terry richardson ad squid. Nihil
                                                                            anim keffiyeh helvetica, craft beer labore wes anderson cred
                                                                            nesciunt sapiente ea proident.
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
                                                                            <CardSubtitle style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}</CardSubtitle>
                                                                            <Collapse style={styles.subtitle} isOpen={this.state.collapse}>
                                                                                <DropdownItem style={styles.divider_margin}divider />
                                                                                Anim pariatur cliche reprehenderit,
                                                                                enim eiusmod high life accusamus terry richardson ad squid. Nihil
                                                                                anim keffiyeh helvetica, craft beer labore wes anderson cred
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
                                                    if(structure.properties.type_personne.includes(this.state.filtre_age)){
                                                        if(this.state.filtre_barre === "NaN"){
                                                            ret =
                                                                <Col xs="6" sm="3">
                                                                <Card style={styles.cardItem}>
                                                                    <CardHeader onClick={()=>this.flyTo(structure)} style={styles.cardHeader}>{structure.properties.denomination_structure}</CardHeader>
                                                                    <CardBody>
                                                                        <CardSubtitle style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}</CardSubtitle>
                                                                        <Collapse style={styles.subtitle} isOpen={this.state.collapse}>
                                                                            <DropdownItem style={styles.divider_margin}divider />
                                                                            Anim pariatur cliche reprehenderit,
                                                                            enim eiusmod high life accusamus terry richardson ad squid. Nihil
                                                                            anim keffiyeh helvetica, craft beer labore wes anderson cred
                                                                            nesciunt sapiente ea proident.
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
                                                                            <CardSubtitle style={styles.subtitle}>{structure.properties.adresse}<br/>{structure.properties.cp}<br/>{structure.properties.ville}</CardSubtitle>
                                                                            <Collapse style={styles.subtitle} isOpen={this.state.collapse}>
                                                                                <DropdownItem style={styles.divider_margin}divider />
                                                                                Anim pariatur cliche reprehenderit,
                                                                                enim eiusmod high life accusamus terry richardson ad squid. Nihil
                                                                                anim keffiyeh helvetica, craft beer labore wes anderson cred
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