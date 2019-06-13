import React from "react";
import '../../../css/index.css'
import {
    Button,
    Card,
    CardBody,
    CardImg,
    CardText,
    CardTitle,
    Col,
    Container,
    Input,
    ListGroup,
    ListGroupItem,
    Row
} from "reactstrap";
import Autocomplete from "../../Autocomplete";
import Structure from '../../../models/Struture'
import firebase from '../../../firebase'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome/index.es";
import {faInfo, faMailBulk, faMap, faPhone, faSearch, faTimes, faUser} from "@fortawesome/free-solid-svg-icons/index";
import {reactLocalStorage} from "reactjs-localstorage";


const storage = firebase.storage();
const images_reference = storage.ref('/optimips/centres');
let add = [];

Number.prototype.padLeft = function (base, chr) {
    var len = (String(base || 10).length - String(this).length) + 1;
    return len > 0 ? new Array(len).join(chr || '0') + this : this;
};

class Index extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            activeItem: 0,
            selected: null,
            isLoading: true,
            structures: [],
            structures_noms: [],
            form: [],
            actionMessage: null,
            new_structure: false,
        };
        this.getStructures();
    }


    setStructure = (id) => {
        let ctx = this;
        this.state.structures.map((structure, i) => {
            if (structure.id === id) {
                ctx.setState({selected: structure});
            }
        });
    };
    close = () => {
        this.setState({selected: null});
    };

    demanderModification = () => {
        let mail = undefined;
        let nom = undefined;
        console.log(this.state.selected);
        this.state.form.map((item, i) => {
            if (item.name === 'nom') {
                nom = item.value;
            } else if (item.name === 'mail') {
                mail = item.value;
            }
        });

        let d = new Date,
            dformat =
                [(d.getMonth() + 1).padLeft(),
                    d.getDate().padLeft(),
                    d.getFullYear()].join('/') + ' ' +
                [d.getHours().padLeft(),
                    d.getMinutes().padLeft(),
                    d.getSeconds().padLeft()].join(':');

        let id = firebase.database().ref('demandes/').push().key;
        firebase.database().ref('demandes/' + id).set({
            uid: firebase.auth().currentUser.uid,
            id: id,
            nom: this.state.selected.nom === undefined ? nom : this.state.selected.nom,
            mail: this.state.selected.mail === undefined ? mail : this.state.selected.mail,
            time: dformat,
            data: this.state.form,
            etat: 0, // 0 en cours 1 validée, 2 refusée
        });
    };


    handleChange = (event) => {
        let data = {
            name: event.target.name,
            value: event.target.value,
            oldValue: this.state.selected[event.target.name] === undefined ? 'aucune donnée' : this.state.selected[event.target.name]
        };
        let found = false;
        let idx = 0;
        this.state.form.map((item, i) => {
            if (data.name === item.name) {
                found = true;
                idx = i;
            }
        });
        if (found) {
            add[idx] = data;
        } else {
            add.push(data);
        }
        this.setState({form: add});
        console.log(add)
    };

    createStructutre = () => {
        this.setState({selected: new Structure()});
        this.setState({new_structure: true});
        console.log(new Structure())
    };
    getStructures = () => {
        let ctx = this;
        if (reactLocalStorage.getObject('structures') === null) {
            firebase.database().ref('structures/').once('value', function (snapshot) {
                snapshot.val().map((structure, i) => {
                    ctx.state.structures.push(structure);
                    ctx.state.structures_noms.push(structure.nom);
                });
            }).then(() => {
                ctx.setState({isLoading: false});
            })
        } else {
            Object.values(reactLocalStorage.getObject('structures')).map((id, i) => {
                firebase.database().ref('structures/').once('value', function (snapshot) {
                    snapshot.val().map((structure, i) => {
                        if (structure.id === id) {
                            ctx.state.structures.push(structure);
                            ctx.state.structures_noms.push(structure.nom);
                        }
                    })
                }).then(() => {
                    ctx.setState({isLoading: false});
                })
            })
        }
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
        return (
            <div className={'root'}>

                {this.state.structures.length > 1 ?
                    <Autocomplete placeholder="Rechercher" isLoading={this.state.isLoading}
                                  suggestions={this.state.structures_noms}/> : null}

                <Container className={'container pt10'}>
                    <h1 className={'titre'}>Liste des structures</h1>
                    <Button className={'btn_ajouter_structure'} onClick={() => this.createStructutre()}>ajouter</Button>
                    <Row>
                        {this.state.structures.map((structure, i) => {
                            return (
                                <Col xs="12" sm="3">
                                    <Card className={'card'} onClick={() => {
                                        this.setStructure(structure.id)
                                    }}>
                                        <CardImg top width="100%"
                                                 src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180"
                                                 alt="Card image cap"/>
                                        <CardBody>
                                            <CardTitle
                                                className={'structure_carte_titre'}>{structure.nom}</CardTitle>
                                        </CardBody>
                                    </Card>
                                </Col>
                            );
                        })}
                        {this.state.selected !== null ?
                            <Card className={'card bottom card_structures'}>
                                <CardBody>
                                    <CardTitle style={{
                                        width: 'auto',
                                        fontWeight: 'bold',
                                        color: '#000',
                                        display: 'inline-block'
                                    }} className={'titre'}>{this.state.selected.nom}</CardTitle>
                                    <FontAwesomeIcon color={"#000"} style={{float: 'right', display: 'inline-block'}}
                                                     onClick={this.close} icon={faTimes}/>
                                    <div className={'header'}
                                         style={{background: "url(https://images.unsplash.com/photo-1552933150-44bb4d074b72?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80)  no-repeat center center fixed"}}>
                                        <Button className={'header_btn'} outline color="primary">Changer</Button>
                                    </div>
                                    <div className={'btn_wrapper'}>
                                        {!this.state.new_structure ?
                                            <div>
                                                <Button className={'field_btn color_secondary'} outline>Supprimer le
                                                    centre</Button>
                                                <Button className={'field_btn color_primary'} outline
                                                        disabled={this.state.form.length === 0}
                                                        onClick={this.demanderModification}>Demande de
                                                    modification</Button>

                                            </div>
                                            :
                                            <Button className={'field_btn color_primary'} outline
                                                    disabled={this.state.form.length === 0}
                                                    onClick={this.demanderModification}>Demande de création</Button>

                                        }

                                    </div>
                                    <CardText>
                                        <ListGroup>
                                            {Object.keys(this.state.selected).map((key, i) => {
                                                let textual_key = '';
                                                switch (key) {
                                                    case 'date' :
                                                        textual_key = "Créé le";
                                                        break;
                                                    case 'denomination_structure':
                                                        textual_key = "Nom";
                                                        break;
                                                    case 'organisme_gestionnaire':
                                                        textual_key = "Organisme gestionnaire";
                                                        break;
                                                    case 'categorie':
                                                        textual_key = "categorie";
                                                        break;
                                                    case 'sous_categorie':
                                                        textual_key = "Sous-categorie";
                                                        break;
                                                    case 'adresse':
                                                        textual_key = "Adresse";
                                                        break;
                                                    case 'cp':
                                                        textual_key = "Code postal";
                                                        break;
                                                    case 'ville':
                                                        textual_key = "Ville";
                                                        break;
                                                    case 'téléphone':
                                                        textual_key = "Numéro de téléphone";
                                                        break;
                                                    case 'fax':
                                                        textual_key = "Numéro de fax";
                                                        break;
                                                    case 'contact_mail':
                                                        textual_key = "Adresse mail";
                                                        break;
                                                    case 'site_internet':
                                                        textual_key = "Site internet";
                                                        break;
                                                    case 'statut_structure':
                                                        textual_key = "Statut";
                                                        break;
                                                    case "activites":
                                                        textual_key = "Activités";
                                                        break;
                                                    case "age":
                                                        textual_key = "Age";
                                                        break;
                                                    case "nécessite_une_notification_MDPH":
                                                        textual_key = "Besoin d'une notification MDPH";
                                                        break;
                                                    case "demande_effectue_patient_entourage":
                                                        textual_key = "Demande à effectuer par le patient ou l'entourage";
                                                        break;
                                                    case "document_medical_a_remplir_par_medecin":
                                                        textual_key = "Document médical à faire remplir par le médecin";
                                                        break;
                                                    case "Latitude":
                                                        textual_key = "Latitude";
                                                        break;
                                                    case "Longitude":
                                                        textual_key = "Longitude";
                                                        break;
                                                }
                                                if (!Number.isInteger(parseInt(key)) &&
                                                    !key.match(/^(id)$/) && this.state.selected[key] !== ""
                                                /*&& this.state.selected[key] !== "Non communiqué"*/ //on affiche quand meme toutes les infos
                                                ) {
                                                    return (
                                                        <ListGroupItem style={{position: 'relative'}} tag="p">
                                                            <FontAwesomeIcon className={'icon_left colorAdmin'}
                                                                             icon={this.icon(key)}/>
                                                            <p className={'inline bold mr-24 colorAdmin'}>
                                                                {textual_key} </p>
                                                            <Input name={key} onChange={this.handleChange}
                                                                   className={'inline edit-input'}
                                                                   defaultValue={this.state.selected[key]}/>
                                                        </ListGroupItem>
                                                    );
                                                }
                                            })}
                                        </ListGroup></CardText>
                                </CardBody>
                            </Card>
                            : null}
                    </Row>

                </Container>
            </div>

        )
    }
}

export default Index;