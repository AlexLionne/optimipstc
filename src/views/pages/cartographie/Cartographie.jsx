import React from 'react';


import ReactMapboxGl, {Feature, Layer} from "react-mapbox-gl";
import styles from '../../../css/styles';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faInfo, faMailBulk, faMap, faPhone, faSearch, faUser} from '@fortawesome/free-solid-svg-icons'
import Autocomplete from "../../Autocomplete"


import axios from 'axios';
import _ from 'lodash';

import {
    Button,
    Card,
    CardBody,
    CardHeader,
    CardSubtitle,
    Col,
    Collapse,
    Container,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    ListGroup,
    ListGroupItem,
    Row
} from "reactstrap";


export default class TCSevere extends React.Component {

    constructor() {
        super();
        let ctx = this;
        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false,
            value: "",
            codes: [],
            collapse: false,
            hover: null,
            markers: [],
            markers_zips: [],
            types: [],
            lng: 1.4333,
            zoom: [10],
            selected: null,
            lat: 43.6000
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


    flyTo = (marker) => {
        //scroll to top
        //Fly to marker
        Object.keys(marker).map((key, i) => {
            console.log(key);
        });
        window.scrollTo(0, 0);
        this.setState({lng: marker.longitude, lat: marker.latitude, zoom: [15], selected: marker})
        //display card info
    };

    getIcon = (marker) => {
        if (marker.type === "Lieu de Vie") {
            return "garden-15";
        } else if (marker.type === "Association") {
            return "marker-15";
        } else if (marker.type === "Centre de Soins de Suite et de Réadaptation") {
            return "marker-15";
        } else if (marker.type === "Secteur Médico-Social") {
            return "marker-15";
        } else if (marker.type === "Service de Rééducation Neurologique") {
            return "marker-15";
        } else if (marker.type === "Service de Rééducation Polyvalent") {
            return "marker-15";
        } else {
            //marker par defaut
            return "marker-15";
        }
    };

    getNames = () => {
        const grouped = _.groupBy(this.state.markers, lieu => lieu.nom);
        let array = [];
        Object.keys(grouped).map((key, idx) => {
            array[key] = Object.keys(grouped)[idx]
        });
        this.setState({markers_names: Object.keys(grouped)});
    };
    getZip = () => {
        let code_array = [];
        let grouped;
        this.state.markers.map((marker, id) => {
            axios.get(
                "https://api.mapbox.com/geocoding/v5/mapbox.places/" + marker.longitude + "," + marker.latitude + ".json?access_token=pk.eyJ1Ijoib3B0aW1pcHN0YyIsImEiOiJjanFwZTkzNXMwMG1oNDJydHNqbnRnb3Y3In0.ltciym2mWxIxH-4hJIHKRw")
                .then(res => {
                    let code = {marker: marker, code: res.data.features[1].text, region: res.data.features[3].text};
                    code_array.push(code);

                    if (code_array.length === this.state.markers.length) {
                        grouped = _.groupBy(code_array, code => code.region);
                        let array = [];
                        Object.keys(grouped).map((key, id) => {
                            let markers = [];
                            Object.values(grouped)[id].map((marker, idx) => {
                                markers.push({structure: marker.marker, code: marker.code});
                            });
                            array.push({markers: markers, region: key});
                        });
                        this.setState({markers_zips: array});
                    }
                });
        });
    };
    getMails = () => {
        const grouped = _.groupBy(this.state.markers, lieu => lieu.mail);
        let array = [];
        Object.keys(grouped).map((key, idx) => {
            array[key] = Object.keys(grouped)[idx]
        });
        this.setState({markers_mails: Object.keys(grouped)});
    };
    getTypes = () => {
        const grouped = _.groupBy(this.state.markers, lieu => lieu.type);
        let array = [];
        Object.keys(grouped).map((key, idx) => {
            array[key] = Object.keys(grouped)[idx]
        });
        this.setState({markers_types: Object.keys(grouped)});
    };

    icon = (key) => {
        switch (key) {
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

    render() {

        const Map = ReactMapboxGl({
            accessToken: "pk.eyJ1IjoidmFsZW50aW5kZWxweSIsImEiOiJjanZjM2pqNjAxZWw5NDRteWI2bmVnMGJpIn0.dwS7LAXg_MLPkvZKkgK_yA"
        });

        return (
            <section>
                <Container>
                    <Row>
                        <Col style={styles.map} sm="12" md={{size: 12, offset: 0}}>
                            <h2 style={styles.section_titre}>
                                Filtres de recherche
                            </h2>
                            <div style={styles.map_filter}>
                                <Autocomplete placeholder="Nom"
                                              suggestions={this.state.markers_names}/>
                            </div>
                            <Row style={styles.marginBottom}>
                                <Col xs="6" sm="6">
                                    <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                                        <DropdownToggle caret>
                                            Département
                                        </DropdownToggle>
                                        <DropdownMenu style={styles.dropdown}>
                                            <Row>
                                                {this.state.markers_zips.length > 0 ?
                                                    this.state.markers_zips.map((marker, i) => {
                                                        return (
                                                            <Col xs="4">
                                                                <DropdownItem key={i}>{marker.region}</DropdownItem>
                                                                {/*marker.markers.map((m,i)=>{
                                                                            return (<DropdownItem key={i} header>{m.code}</DropdownItem>)
                                                                        })*/}
                                                            </Col>
                                                        )

                                                    })
                                                    :
                                                    console.log(this.state.markers_zips.length)}
                                            </Row>
                                        </DropdownMenu>
                                    </Dropdown>

                                </Col>
                                <Col xs="6" sm="6">
                                    <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                                        <DropdownToggle caret>
                                            Type de structure
                                        </DropdownToggle>
                                        <DropdownMenu style={styles.dropdown}>
                                            <Row>
                                                {this.state.types.length > 0 ?
                                                    this.state.type.map((type, i) => {
                                                        return (
                                                            <Col xs="4">
                                                                <DropdownItem key={i}>{type}</DropdownItem>
                                                                {/*marker.markers.map((m,i)=>{
                                                                            return (<DropdownItem key={i} header>{m.code}</DropdownItem>)
                                                                        })*/}
                                                            </Col>
                                                        )

                                                    })
                                                    :
                                                    console.log(this.state.markers_zips.length)}
                                            </Row>
                                        </DropdownMenu>
                                    </Dropdown>

                                </Col>
                            </Row>
                            <Row style={styles.marginBottom}>
                                <Col sm={{size: 2, order: 2, offset: 10}}>
                                    <Button style={styles.w_100} onClick={this.query} outline
                                            color="primary">Rechercher</Button>
                                </Col>
                            </Row>
                            <DropdownItem style={styles.divider_margin} divider/>
                            <Map
                                movingMethod="jumpTo"
                                zoom={this.state.zoom}
                                style="mapbox://styles/optimipstc/cjqpecocn09hv2smowo6gy56u"
                                center={[this.state.lng, this.state.lat]}
                                containerStyle={{
                                    height: "500px",
                                    width: "100%",
                                    borderRadius: '2px',
                                    position: 'relative'
                                }}>

                                {this.state.selected !== null ?
                                    <Card style={styles.cardMap}>
                                        <CardHeader onClick={null}
                                                    style={styles.cardHeader}>{this.state.selected.nom}</CardHeader>
                                        <CardBody>
                                            <ListGroup flush>
                                                {Object.keys(this.state.selected).map((key, i) => {
                                                    if (!Number.isInteger(parseInt(key)) &&
                                                        !key.match(/^(id|longitude|latitude|created_at|updated_at|nom)$/) && this.state.selected[key] !== ""
                                                        && this.state.selected[key] !== "Non communiqué"
                                                    ) {
                                                        if (key.match(/^(site_web)$/)) {
                                                            return (
                                                                <ListGroupItem tag="a" target="_blank"
                                                                               href={"http://" + this.state.selected[key]}>
                                                                    <FontAwesomeIcon style={styles.icon_left}
                                                                                     icon={this.icon(key)}/>
                                                                    <p style={styles.inline}>
                                                                        {key} : {this.state.selected[key]}</p>
                                                                </ListGroupItem>
                                                            );
                                                        } else {
                                                            return (
                                                                <ListGroupItem tag="p"> <FontAwesomeIcon
                                                                    style={styles.icon_left} icon={this.icon(key)}/> <p
                                                                    style={styles.inline}> {this.state.selected[key]}</p>
                                                                </ListGroupItem>
                                                            );
                                                        }
                                                    }
                                                })}
                                            </ListGroup>
                                        </CardBody>

                                    </Card>
                                    : null}

                                <Layer
                                    type="symbol"
                                    layout={{
                                        'icon-image': ['get', 'icon'],
                                        'icon-size': 1.5
                                    }}
                                    id="marker">
                                    {
                                        this.state.markers.map((marker, idx) => {
                                            return (
                                                <Feature
                                                    key={idx}
                                                    properties={{icon: this.getIcon(marker)}}
                                                    coordinates={[marker.longitude, marker.latitude]}/>
                                            );
                                        })
                                    }
                                </Layer>
                            </Map>
                        </Col>
                    </Row>
                </Container>

                <Container>
                    <Row>
                        <Col xs="12" sm="12">
                            <h2 style={styles.section_titre}>
                                Liste des structures
                            </h2>
                        </Col>
                        {
                            this.state.markers.map((marker, i) => {
                                return (
                                    <Col xs="6" sm="3">
                                        <Card style={styles.cardItem}>
                                            <CardHeader onClick={() => this.flyTo(marker)}
                                                        style={styles.cardHeader}>{marker.nom}</CardHeader>
                                            <CardBody>
                                                <CardSubtitle style={styles.subtitle}>{marker.adresse}</CardSubtitle>
                                                <Collapse style={styles.subtitle} isOpen={this.state.collapse}>
                                                    <DropdownItem style={styles.divider_margin} divider/>
                                                    Anim pariatur cliche reprehenderit,
                                                    enim eiusmod high life accusamus terry richardson ad squid. Nihil
                                                    anim keffiyeh helvetica, craft beer labore wes anderson cred
                                                    nesciunt sapiente ea proident.
                                                </Collapse>
                                            </CardBody>
                                            <img width="100%"
                                                 src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180"
                                                 alt="Card image cap"/>
                                        </Card>
                                    </Col>

                                )
                            })
                        }

                    </Row>
                </Container>
            </section>
        );
    }

    /*

     */
}