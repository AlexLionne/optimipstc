import React from 'react';
import {
    CardText,
    Col,
    Container,
    ListGroup,
    ListGroupItem,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Row,
    Table,
} from 'reactstrap';
import {Card, CardBody, Button, CardTitle, UncontrolledCollapse} from 'reactstrap';
import '../../../../../css/index.css'
import '../../../../../css/container.css'
import header2 from "../../../../../assets/images/header2.png";
import Collapsible from "react-collapsible";
import ars from "../../../../../assets/images/ars_occitanie.png";
import IHNPS from "../../../../../assets/images/IHNPS.jpg";
import chu from "../../../../../assets/images/chu.jpg";
import chum from "../../../../../assets/images/chum.png";
import chun from "../../../../../assets/images/chun.jpeg";
import isis from "../../../../../assets/images/isis.jpg";
import irit from "../../../../../assets/images/irit.png";
import imt from "../../../../../assets/images/imt.jpg";
import inserm from "../../../../../assets/images/inserm.jpg";
import ymca from "../../../../../assets/images/ymca.jpg";
import unaftc from "../../../../../assets/images/unaftc.png";
import close from "../../../../../assets/images/close-button.png";

export default class SectionTwo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalMPR: false,
            modalSRPR: false,
            modalUE: false,
            modalKine: false,
            modalErgo: false,
            modalOrtho: false,
            modalOTP: false,
            modalYMCA: false,
            modalNP: false,
            modalNC: false,
            modalMR: false,
            modalNeuro: false,
            modalMT: false,
            modalID: false,
            modalAuxVie: false,
            modalAM: false,
            modalAidant: false,
            modalSAVS: false,
            modalSAMSAH: false,
            modalSSIAD: false,
            modalSAAD: false,
            modalAmenLog: false,
            modalVehic: false,
            modalMM: false,
            modalMAS: false,
            modalFAM: false,
            modalFoyer: false,
            modalAFTC: false,
            modalGEM: false,
            modalDeplac: false,
            modalSport: false,
            modalMTra: false,
            modalAdapt: false,
            modalESAT: false,
            modalUEROS: false,
            modalCOMETE: false,
            modalCAPE: false,
            modalSSMETH: false,
            modalCMI: false,
            modalRQTH: false,
            modalPCH: false,
            modalORI: false,
            modalAAH: false,
            modalEVC: false,
            open1: false,
            open2: false,
            open3: false,
            open4: false,
            open5: false,
            open6: false,
            open7: false,
            open8: false,
            open9: false,
            open10: false,
            open11: false,
            open12: false,
            open21: false,
            open22: false,
            open23: false
        }
    }

    triggerModalAuxVie = () => {
        this.setState({modalAuxVie: !this.state.modalAuxVie})
    };

    triggerModalIDE = () => {
        this.setState({modalIDE: !this.state.modalIDE})
    };

    triggerModalAM = () => {
        this.setState({modalAM: !this.state.modalAM})
    };

    triggerModalAidant = () => {
        this.setState({modalAidant: !this.state.modalAidant})
    };

    triggerModalSAVS = () => {
        this.setState({modalSAVS: !this.state.modalSAVS})
    };

    triggerModalSAMSAH = () => {
        this.setState({modalSAMSAH: !this.state.modalSAMSAH})
    };

    triggerModalSSIAD = () => {
        this.setState({modalSSIAD: !this.state.modalSSIAD})
    };
    triggerModalSAAD = () => {
        this.setState({modalSAAD: !this.state.modalSAAD})
    };

    triggerModalAmenLog = () => {
        this.setState({modalAmenLog: !this.state.modalAmenLog})
    };
    triggerModalCMI = () => {
        this.setState({modalCMI: !this.state.modalCMI})
    };
    triggerModalRQTH = () => {
        this.setState({modalRQTH: !this.state.modalRQTH})
    };
    triggerModalPCH = () => {
        this.setState({modalPCH: !this.state.modalPCH})
    };
    triggerModalOri= () => {
        this.setState({modalOri: !this.state.modalOri})
    };
    triggerModalAAH= () => {
        this.setState({modalAAH: !this.state.modalAAH})
    };

    triggerModalVehic = () => {
        this.setState({modalVehic: !this.state.modalVehic})
    };

    triggerModalMM = () => {
        this.setState({modalMM: !this.state.modalMM})
    };

    triggerModalMAS = () => {
        this.setState({modalMAS: !this.state.modalMAS})
    };

    triggerModalFAM = () => {
        this.setState({modalFAM: !this.state.modalFAM})
    };

    triggerModalFoyer = () => {
        this.setState({modalFoyer: !this.state.modalFoyer})
    };

    triggerModalAFTC = () => {
        this.setState({modalAFTC: !this.state.modalAFTC})
    };

    triggerModalGEM = () => {
        this.setState({modalGEM: !this.state.modalGEM})
    };

    triggerModalYMCA = () => {
        this.setState({modalYMCA: !this.state.modalYMCA})
    };

    triggerModalDeplac = () => {
        this.setState({modalDeplac: !this.state.modalDeplac})
    };

    triggerModalSport = () => {
        this.setState({modalSport: !this.state.modalSport})
    };

    triggerModalMTra = () => {
        this.setState({modalMTra: !this.state.modalMTra})
    };
    triggerModalAdapt = () => {
        this.setState({modalAdapt: !this.state.modalAdapt})
    };

    triggerModalESAT = () => {
        this.setState({modalESAT: !this.state.modalESAT})
    };

    triggerModalUEROS = () => {
        this.setState({modalUEROS: !this.state.modalUEROS})
    };

    triggerModalCOMETE = () => {
        this.setState({modalCOMETE: !this.state.modalCOMETE})
    };

    triggerModalCAPE = () => {
        this.setState({modalCAPE: !this.state.modalCAPE})
    };

    triggerModalSMMETH = () => {
        this.setState({modalSMMETH: !this.state.modalSMMETH})
    };
    triggerModalMPR = () => {
        this.setState({modalMPR: !this.state.modalMPR})
    };

    triggerModalSRPR = () => {
        this.setState({modalSRPR: !this.state.modalSRPR})
    };

    triggerModalUE = () => {
        this.setState({modalUE: !this.state.modalUE})
    };

    triggerModalKine = () => {
        this.setState({modalKine: !this.state.modalKine})
    };

    triggerModalErgo = () => {
        this.setState({modalErgo: !this.state.modalErgo})
    };

    triggerModalOrtho = () => {
        this.setState({modalOrtho: !this.state.modalOrtho})
    };

    triggerModalOTP = () => {
        this.setState({modalOTP: !this.state.modalOTP})
    };
    triggerModalYMCA = () => {
        this.setState({modalYMCA: !this.state.modalYMCA})
    };

    triggerModalNP = () => {
        this.setState({modalNP: !this.state.modalNP})
    };

    triggerModalNC = () => {
        this.setState({modalNC: !this.state.modalNC})
    };

    triggerModalMR = () => {
        this.setState({modalMR: !this.state.modalMR})
    };

    triggerModalNeuro = () => {
        this.setState({modalNeuro: !this.state.modalNeuro})
    };

    triggerModalMT = () => {
        this.setState({modalMT: !this.state.modalMT})
    };
    triggerModalEVC= () => {
        this.setState({modalEVC: !this.state.modalEVC})
    };
    render() {
        return (
            <section className={'section'}>
                <Container fluid  className={'container-justify'}>
                    <Row className="row-equipe">
                        <Col xs='12' xl='12' className={'pm'}>
                            <div className={'action-responsive'}>
                                À l'issue de la prise en charge initiale, même si le patient est stabilisé, le suivi médical
                                et la prise en charge rééducative nécessitent d'être poursuivis. En parallèle, un parcours
                                de vie se met en place.<br/>
                                Les dispositifs d'aide sont nombreux et il n'est pas toujours facile de s'y retrouver.<br/>
                                Nous vous présentons ci-dessous les principales personnes, dispositifs et structures dont
                                vous pouvez avoir besoin.<br/>
                                Des informations supplémentaires apparaissent en cliquant sur la case correspondante.
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="12" xl="6">
                            <h2 className={'titre TCL'}>
                                Parcours médical
                            </h2><br/>
                            <Card className={'container-set'}>
                                <Collapsible
                                    open={this.state.open21}
                                    onOpening={() => {
                                        // eslint-disable-next-line no-undef
                                        this.setState({open21: true});
                                        this.setState({open22: false});
                                        this.setState({open23: false});
                                    }}
                                    onClosing={() => {
                                        this.setState({open21: false});
                                    }}
                                    trigger="Services d'hospitalisation" className={'clp1'}>
                                    <div className="text-align-parcours">
                                        <a onClick={this.triggerModalMPR} className={'link'}> Service
                                            MPR </a><br/>
                                        <a onClick={this.triggerModalSRPR}
                                           className={'link'}> SRPR </a><br/>
                                        <a onClick={this.triggerModalUE}  className={'link'}> Unité
                                            Eveil </a><br/>
                                        <a onClick={this.triggerModalEVC} className={'link'}> Unité
                                            EVC-EPR </a><br/>
                                        <Button color="link" className={'button-interface'} onClick={() => {
                                            this.setState({open21: false});
                                        }}><img src={close} alt="Close button"></img></Button>
                                    </div>
                                </Collapsible>
                                <Collapsible open={this.state.open22}
                                             onOpening={() => {
                                                 // eslint-disable-next-line no-undef
                                                 this.setState({open21: false});
                                                 this.setState({open22: true});
                                                 this.setState({open23: false});
                                             }}
                                             onClosing={() =>
                                                 this.setState({open22: false})}
                                             trigger="Rééducateurs" className={'clp2'}>
                                    <div className="text-align-parcours">
                                        <a onClick={this.triggerModalKine}
                                           className={'link'}> Kinésithérapeute </a><br/>
                                        <a onClick={this.triggerModalErgo}
                                           className={'link'}> Ergothérapeute </a><br/>
                                        <a onClick={this.triggerModalOrtho}
                                           className={'link'}> Orthophoniste </a><br/>
                                        <a onClick={this.triggerModalOTP}
                                           className={'link'}> Orthoptiste </a><br/>
                                        <a onClick={this.triggerModalNP}
                                           className={'link'}> Neuropsychologue </a><br/>
                                        <Button color="link" className={'button-interface'} onClick={() => {
                                            this.setState({open22: false});
                                        }}><img src={close} alt="Close button"></img></Button>
                                    </div>
                                </Collapsible>
                                <Collapsible
                                    open={this.state.open23}
                                    onOpening={() => {
                                        // eslint-disable-next-line no-undef
                                        this.setState({open21: false});
                                        this.setState({open22: false});
                                        this.setState({open23: true});
                                    }}
                                    onClosing={() => {
                                        this.setState({open23: false});
                                    }}
                                    trigger="Suivi médical" className={'clp3'}>
                                    <div className="text-align-parcours">
                                        <a onClick={this.triggerModalNC}
                                           className={'link'}> Neurochirurgien </a><br/>
                                        <a onClick={this.triggerModalMR}  className={'link'}> Médecin
                                            de MPR</a><br/>
                                        <a onClick={this.triggerModalNeuro}
                                           className={'link'}> Neurologue </a><br/>
                                        <a onClick={this.triggerModalMT}  className={'link'}> Médecin
                                            traitant </a><br/>
                                        <Button color="link" className={'button-interface'} onClick={() => {
                                            this.setState({open23: false});
                                        }}><img src={close} alt="Close button"></img></Button>
                                    </div>
                                </Collapsible>
                            </Card>
                        </Col>

                        <Col xs="12" xl="6">
                            <h2 className={'titre TCL'}>
                                Parcours de vie
                            </h2><br/>
                            <Card className={'container-set'}>
                                <h3 className={'titre'}>Aide à domicile</h3>
                                <Collapsible
                                    open={this.state.open1}
                                    onOpening={() => {
                                        // eslint-disable-next-line no-undef
                                        this.setState({open1: true});
                                        this.setState({open2: false});
                                        this.setState({open3: false});
                                        this.setState({open4: false});
                                        this.setState({open5: false});
                                        this.setState({open6: false});
                                        this.setState({open7: false});
                                        this.setState({open8: false});
                                        this.setState({open9: false});
                                        this.setState({open10: false});
                                        this.setState({open11: false});
                                        this.setState({open12: false});
                                    }}
                                    onClosing={() => {
                                        this.setState({open1: false});
                                    }}
                                    trigger="Aides humaines" className={'clp1'}>
                                    <div className="text-align-parcours">
                                        <a onClick={this.triggerModalAuxVie}
                                           className={'link'}> Auxilaire de vie </a><br/>
                                        <a onClick={this.triggerModalIDE}
                                           className={'link'}> Infirmier(e) </a><br/>
                                        <a onClick={this.triggerModalAM} className={'link'}> Aide
                                            ménagère </a><br/>
                                        <a onClick={this.triggerModalAidant}
                                           className={'link'}> Aidant </a><br/>
                                        <Button color="link" className={'button-interface'} onClick={() => {
                                            this.setState({open1: false});
                                        }}><img src={close} alt="Close button"></img></Button>
                                    </div>
                                </Collapsible>
                                <Collapsible open={this.state.open2}
                                             onOpening={() => {
                                                 // eslint-disable-next-line no-undef
                                                 this.setState({open1: false});
                                                 this.setState({open2: true});
                                                 this.setState({open3: false});
                                                 this.setState({open4: false});
                                                 this.setState({open5: false});
                                                 this.setState({open6: false});
                                                 this.setState({open7: false});
                                                 this.setState({open8: false});
                                                 this.setState({open9: false});
                                                 this.setState({open10: false});
                                                 this.setState({open11: false});
                                                 this.setState({open12: false});
                                             }}
                                             onClosing={() =>
                                                 this.setState({open2: false})}
                                             trigger="Services de coordination des soins" className={'clp2'}>
                                    <div className="text-align-parcours">
                                        <a onClick={this.triggerModalSAMSAH}
                                           className={'link'}> SAMSAH </a><br/>
                                        <a onClick={this.triggerModalSAVS}
                                           className={'link'}> SAVS </a><br/>
                                        <a onClick={this.triggerModalSSIAD}
                                           className={'link'}> SSIAD </a><br/>
                                        <a onClick={this.triggerModalSAAD}
                                           className={'link'}> SAAD </a><br/>
                                        <Button color="link" className={'button-interface'} onClick={() => {
                                            this.setState({open2: false});
                                        }}><img src={close} alt="Close button"></img></Button>
                                    </div>
                                </Collapsible>
                                <Collapsible
                                    open={this.state.open3}
                                    onOpening={() => {
                                        // eslint-disable-next-line no-undef
                                        this.setState({open1: false});
                                        this.setState({open2: false});
                                        this.setState({open3: true});
                                        this.setState({open4: false});
                                        this.setState({open5: false});
                                        this.setState({open6: false});
                                        this.setState({open7: false});
                                        this.setState({open8: false});
                                        this.setState({open9: false});
                                        this.setState({open10: false});
                                        this.setState({open11: false});
                                        this.setState({open12: false});
                                    }}
                                    onClosing={() => {
                                        this.setState({open3: false});
                                    }}
                                    trigger="Aides matérielles" className={'clp3'}>
                                    <div className="text-align-parcours">
                                        <a onClick={this.triggerModalAmenLog}
                                           className={'link'}> Aménagement du logement </a><br/>
                                        <a onClick={this.triggerModalVehic}
                                           className={'link'}> Aménagement du véhicule </a><br/>
                                        <a onClick={this.triggerModalMM} className={'link'}> Matériel
                                            médical </a><br/>
                                        <Button color="link" className={'button-interface'} onClick={() => {
                                            this.setState({open3: false});
                                        }}><img src={close} alt="Close button"></img></Button>
                                    </div>
                                </Collapsible>
                            </Card>
                            <Card className={'container-set'}>
                                <h3 className={'titre'}>Aide à la vie sociale</h3>
                                <Collapsible
                                    open={this.state.open4}
                                    onOpening={() => {
                                        // eslint-disable-next-line no-undef
                                        this.setState({open1: false});
                                        this.setState({open2: false});
                                        this.setState({open3: false});
                                        this.setState({open4: true});
                                        this.setState({open5: false});
                                        this.setState({open6: false});
                                        this.setState({open7: false});
                                        this.setState({open8: false});
                                        this.setState({open9: false});
                                        this.setState({open10: false});
                                        this.setState({open11: false});
                                        this.setState({open12: false});
                                    }}
                                    onClosing={() => {
                                        this.setState({open4: false});
                                    }}
                                    trigger="Insertion sociale" className={'clp4'}>
                                    <div className="text-align-parcours">
                                        <a onClick={this.triggerModalDeplac} className={'link'}> Aide aux
                                            déplacements </a><br/>
                                        <a onClick={this.triggerModalSport} className={'link'}> Sport,
                                            loisirs adaptés </a><br/>
                                        <Button color="link" className={'button-interface'} onClick={() => {
                                            this.setState({open4: false});
                                        }}><img src={close} alt="Close button"></img></Button>
                                    </div>
                                </Collapsible>
                                <Collapsible
                                    open={this.state.open5}
                                    onOpening={() => {
                                        // eslint-disable-next-line no-undef
                                        this.setState({open1: false});
                                        this.setState({open2: false});
                                        this.setState({open3: false});
                                        this.setState({open4: false});
                                        this.setState({open5: true});
                                        this.setState({open6: false});
                                        this.setState({open7: false});
                                        this.setState({open8: false});
                                        this.setState({open9: false});
                                        this.setState({open10: false});
                                        this.setState({open11: false});
                                        this.setState({open12: false});
                                    }}
                                    onClosing={() => {
                                        this.setState({open5: false});
                                    }}
                                    trigger="Établissements médico-sociaux" className={'clp5'}>
                                    <div className="text-align-parcours">
                                        <a onClick={this.triggerModalMAS} className={'link'}> MAS </a><br/>
                                        <a onClick={this.triggerModalFAM} className={'link'}> FAM </a><br/>
                                        <a onClick={this.triggerModalFoyer} className={'link'}> Foyer de vie </a><br/>
                                        <Button color="link" className={'button-interface'} onClick={() => {
                                            this.setState({open5: false});
                                        }}><img src={close} alt="Close button"></img></Button>
                                    </div>
                                </Collapsible>
                                <Collapsible
                                    open={this.state.open11}
                                    onOpening={() => {
                                        // eslint-disable-next-line no-undef
                                        this.setState({open1: false});
                                        this.setState({open2: false});
                                        this.setState({open3: false});
                                        this.setState({open4: false});
                                        this.setState({open5: false});
                                        this.setState({open6: false});
                                        this.setState({open7: false});
                                        this.setState({open8: false});
                                        this.setState({open9: false});
                                        this.setState({open10: false});
                                        this.setState({open11: true});
                                        this.setState({open12: false});
                                    }}
                                    onClosing={() => {
                                        this.setState({open11: false});
                                    }}
                                    trigger="Associations de soutien" className={'clp5'}>
                                    <div className="text-align-parcours">
                                        <a onClick={this.triggerModalAFTC} className={'link'}> AFTC </a><br/>
                                        <a onClick={this.triggerModalGEM} className={'link'}> GEM </a><br/>
                                        <a onClick={this.triggerModalYMCA} className={'link'}> YMCA </a><br/>
                                        <Button color="link" className={'button-interface'} onClick={() => {
                                            this.setState({open11: false});
                                        }}><img src={close} alt="Close button"></img></Button>
                                    </div>
                                </Collapsible>
                            </Card>
                            <Card className={'container-set'}>
                                <h3 className={'titre'}>Aide à la vie professionnelle</h3>
                                <Collapsible
                                    open={this.state.open6}
                                    onOpening={() => {
                                        // eslint-disable-next-line no-undef
                                        this.setState({open1: false});
                                        this.setState({open2: false});
                                        this.setState({open3: false});
                                        this.setState({open4: false});
                                        this.setState({open5: false});
                                        this.setState({open6: true});
                                        this.setState({open7: false});
                                        this.setState({open8: false});
                                        this.setState({open9: false});
                                        this.setState({open10: false});
                                        this.setState({open11: false});
                                        this.setState({open12: false});
                                    }}
                                    onClosing={() => {
                                        this.setState({open6: false});
                                    }}
                                    trigger="Insertion professionnelle" className={'clp6'}>
                                    <div className="text-align-parcours">
                                        <a onClick={this.triggerModalMTra} className={'link'}>Médecine du
                                            travail </a><br/>
                                        <a onClick={this.triggerModalAdapt} className={'link'}> Adaptation de
                                            poste </a><br/>
                                        <a onClick={this.triggerModalESAT} className={'link'}> Atelier protégé
                                            ESAT </a><br/><br/>
                                        <Button color="link" className={'button-interface'} onClick={() => {
                                            this.setState({open6: false});
                                        }}><img src={close} alt="Close button"></img></Button>
                                    </div>
                                </Collapsible>
                                <Collapsible
                                    open={this.state.open7}
                                    onOpening={() => {
                                        // eslint-disable-next-line no-undef
                                        this.setState({open1: false});
                                        this.setState({open2: false});
                                        this.setState({open3: false});
                                        this.setState({open4: false});
                                        this.setState({open5: false});
                                        this.setState({open6: false});
                                        this.setState({open7: true});
                                        this.setState({open8: false});
                                        this.setState({open9: false});
                                        this.setState({open10: false});
                                        this.setState({open11: false});
                                        this.setState({open12: false});
                                    }}
                                    onClosing={() => {
                                        this.setState({open7: false});
                                    }}
                                    trigger="Services d'accompagnement" className={'clp7'}>
                                    <div className="text-align-parcours">
                                        <a onClick={this.triggerModalUEROS}
                                           className={'link'}> UEROS </a><br/>
                                        <a onClick={this.triggerModalCOMETE}
                                           className={'link'}> COMETE </a><br/>
                                        <a onClick={this.triggerModalCAPE} className={'link'}> CAP
                                            EMPLOI </a><br/>
                                        <Button color="link" className={'button-interface'} onClick={() => {
                                            this.setState({open7: false});
                                        }}><img src={close} alt="Close button"></img></Button>
                                    </div>
                                </Collapsible>
                            </Card>
                            <Card className={'container-set'}>
                                <h3 className={'titre'}>MDPH</h3>
                                    <div className="text-align-parcours">
                                        <p className={'clp5'}>
                                        <a onClick={this.triggerModalCMI} className={'link divmdph'}>Carte Mobilité Inclusion (CMI) </a><br/>
                                        </p>
                                        <p className={'clp5'}>
                                        <a onClick={this.triggerModalRQTH} className={'link divmdph'}>RQTH </a><br/>
                                        </p>
                                        <p className={'clp6'}>
                                        <a onClick={this.triggerModalPCH} className={'link divmdph'}> PCH</a><br/>
                                        </p>
                                        <p className={'clp6'}>
                                        <a onClick={this.triggerModalOri}className={'link divmdph'}> Orientation</a><br/>
                                        </p>
                                        <p className={'clp7'}>
                                        <a onClick={this.triggerModalAAH} className={'link divmdph'}> Allocation aux adultes handicapés (AAH)</a><br/>
                                        </p>
                                    </div>
                            </Card>
                        </Col>
                    </Row>
                    <Row><p>
                        Pour plus d'informations sur les aides et les allocations existantes :
                    </p><br/>
                        <a href='https://www.service-public.fr/particuliers/vosdroits/N12230' className="sp">Service public -
                            Vos droits</a>
                    </Row>
                </Container>
                <Modal className={'tc_modal'} isOpen={this.state.modalAuxVie} fade={false} centered>
                    <ModalHeader>Auxiliaire de vie sociale</ModalHeader>
                    <ModalBody>
                        Personne qui vient à domicile pour aider à réaliser les activités de la vie quotidienne comme :  toilette, habillage, courses, repas, déplacements, participation à la vie sociale. Elle doit s’adapter aux capacités et à la pathologie de la personne pour favoriser son autonomie.<br/>
                        Pour qui : personne en situation de handicap, personne âgée en perte d’autonomie.<br/>
                        Comment : demande auprès d’un prestataire de services, ou d’une association d’aides à domicile.<br/>
                        Prise en charge : PCH pour les moins de 60 ans, APA pour les plus de 60 ans.<br/>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.triggerModalAuxVie} className={'buttonSecondary'} centered>Fermer</Button>
                    </ModalFooter>
                </Modal>
                <Modal className={'tc_modal'} isOpen={this.state.modalIDE} fade={false} centered>
                    <ModalHeader>IDE</ModalHeader>
                    <ModalBody>
                        Pour l’aide à la prise des médicaments, l’aide aux soins d’hygiène, faire les prises de sang,
                        les pansements.<br/>
                        Comment : prescription médicale, sur ordonnance.<br/>
                        Prise en charge : Sécurité sociale.<br/>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.triggerModalIDE} className={'buttonSecondary'}>Fermer</Button>
                    </ModalFooter>
                </Modal>
                <Modal className={'tc_modal'} isOpen={this.state.modalAM} fade={false} centered>
                    <ModalHeader>Aide-ménagère</ModalHeader>
                    <ModalBody>
                        Entretien de la maison et aide possible pour la préparation des repas et les courses<br/>
                        Pour qui : personne ayant difficultés pour accomplir les principales tâches ménagères<br/>
                        Comment : demande du patient ou de la famille<br/>
                    </ModalBody>Prise en charge : varie selon la situation : APA pour les plus de 60 ans, caisse de sécurité sociale ou caisse de retraite ou la mutuelle.
                    <ModalFooter>
                        <Button onClick={this.triggerModalAM} className={'buttonSecondary'}>Fermer</Button>
                    </ModalFooter>
                </Modal>
                <Modal className={'tc_modal'} isOpen={this.state.modalAidant} fade={false} centered>
                    <ModalHeader>Aidant</ModalHeader>
                    <ModalBody>

                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.triggerModalAidant} className={'buttonSecondary'}>Fermer</Button>
                    </ModalFooter>
                </Modal>
                <Modal className={'tc_modal'} isOpen={this.state.modalSAVS} fade={false} centered>
                    <ModalHeader>Service d'Accompagnement à la Vie Sociale</ModalHeader>
                    <ModalBody>
                        Même système que le SAMSAH mais ne s’occupe pas du domaine médical et paramédical.<br/>
                        Il apporte des conseils et aides pratiques pour tout ce qui concerne la vie courante,
                        l'alimentation, les démarches administratives, le logement, le travail, les loisirs, la gestion
                        budgétaire, etc.<br/>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.triggerModalSAVS} className={'buttonSecondary'}>Fermer</Button>
                    </ModalFooter>
                </Modal>
                <Modal className={'tc_modal'} isOpen={this.state.modalSAMSAH} fade={false} centered>
                    <ModalHeader>Service d'Accompagnement Médico-Social pour Adultes Handicapés</ModalHeader>
                    <ModalBody>
                        Une équipe pluridisciplinaire évalue les besoins en matière de logement, vis sociale, accès aux soins…<br/>
                        Puis aide à la coordination de ce projet de soins, assure un suivi médical, paramédical, psychologique. L’objectif est d’aider au maintien à domicile.<br/>
                        Pour qui : adultes en situation de handicap entre 20 et 60 ans.<br/>
                        Comment : la demande d’ « orientation SAMSAH » est faite sur le dossier de la MDPH rempli par le médecin. La commission de la MDPH prendra la décision.<br/>
                        Prise en charge : Assurance Maladie pour la partie soins, Conseil Général pour la partie accompagnement.
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.triggerModalSAMSAH} className={'buttonSecondary'}>Fermer</Button>
                    </ModalFooter>
                </Modal>
                <Modal className={'tc_modal'} isOpen={this.state.modalSSIAD} fade={false} centered>
                    <ModalHeader>Service de soins infirmiers à domicile</ModalHeader>
                    <ModalBody>
                        Structure comprenant des infirmiers/ères et des aides-soignants. Elle assure les actes infirmiers et les aides aux soins d’hygiène nécessaires à la personne.<br/>
                        Pour qui : personnes dépendantes à domicile, ou établissement non médicalisé.<br/>
                        Comment : prescription médicale, sur ordonnance.<br/>
                        Prise en charge : sécurité sociale.<br/>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.triggerModalSSIAD} className={'buttonSecondary'}>Fermer</Button>
                    </ModalFooter>
                </Modal>
                <Modal className={'tc_modal'} isOpen={this.state.modalSAAD} fade={false} centered>
                    <ModalHeader>Service d'Accompagnement à Domicile</ModalHeader>
                    <ModalBody>
                        Il s’agit d’un organisme privé ou public qui met en place des prestations de services ménagers par un/une <a href="#" onClick={() => {
                        this.triggerModalSAAD();
                        this.triggerModalAM()
                    }}> aide ménagère</a>, et des prestations d'aide à domicile avec un/une <a href="#" onClick={() => {
                        this.triggerModalSAAD();
                        this.triggerModalAuxVie()
                    }}>auxilliaire de vie sociale.</a> Attention ce service ne gère pas les <a  href="#" onClick={() => {
                        this.triggerModalSAAD();
                        this.triggerModalIDE()
                    }}>infirmiers à domicile.</a>
                        Pour qui : personnes en situation de handicap ou personnes âgées.
                        Comment : il faut contacter directement un SAAD proche de chez vous.
                        Prise en charge : elle varie en fonction de la situation de la personne, de son âge et du lieu d’habitation. Plusieurs financements possibles : PCH pour les moins de 60 ans, APA pour les plus de 60 ans, caisse de retraite, aide sociale mutuelle.
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.triggerModalSAAD} className={'buttonSecondary'}>Fermer</Button>
                    </ModalFooter>
                </Modal>
                <Modal className={'tc_modal'} isOpen={this.state.modalAmenLog} fade={false} centered>
                    <ModalHeader>Aménagement du logement</ModalHeader>
                    <ModalBody>
                        Des aides financières peuvent être demandées si votre handicap nécessite une modification de votre logement. Il y a plusieurs possibilités de financement :
                        <ul>
                            <li>
                                via la <a href="https://www.service-public.fr/particuliers/vosdroits/F14202" target="_blank">PCH aide au logement</a> pour les moins de 60 ans<br/>
                                Comment :  à demander sur le dossier de la MDPH. Un ergothérapeute de la MDPH peut parfois venir évaluer la demande à domicile.
                            </li>
                            <li>
                                via l’APA pour les plus de 60 ans. Sous conditions de ressources.
                            </li>
                            <li>
                                via la caisse de retraite ou caisse de retraite complémentaire
                            </li>
                            <li>
                                via une déduction fiscale
                            </li>
                            <li>
                                via l’ANAH (Agence Nationale de l’Habitat). Vous pouvez vous rapprocher de l'antenne <a href="https://www.soliha.fr" target="_blank">SOLIAH</a> de votre département pour être aidé dans vos démarches.
                            </li>
                        </ul><br/>
                        Attention il est souvent nécessaire de déposer votre dossier d’aides financières avant de débuter les travaux.<br/><br/>
                        Si vous êtes locataire : vous devez demander un accord écrit du bailleur pour la réalisation de travaux d’aménagements ou de transformation du logement, les travaux ne sont pas à la charge du bailleur. Si vous êtes locataire d’un logement social : faire une demande de travaux auprès du bailleur social ; si les travaux ne sont pas possibles il doit vous proposer un autre logement adapté.
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.triggerModalAmenLog} className={'buttonSecondary'}>Fermer</Button>
                    </ModalFooter>
                </Modal>
                <Modal className={'tc_modal'} isOpen={this.state.modalVehic} fade={false} centered>
                    <ModalHeader>Aménagement du véhicule</ModalHeader>
                    <ModalBody>
                        - Le handicap nécessite de modifier le poste de conduite <br/><br/>
                        Pour qui : personne titulaire du permis de conduire ET portant la mention restrictive d'un poste de conduite adapté.
                        <br/>
                        Prise en charge : PCH aménagement du véhicule, assurance, CPAM, AGEFIPH si le véhicule est utilisé pour le travail.
                        <br/>
                        Comment : demande sur le certificat MDPH pour obtenir la PCH. Demande des dossiers spécifiques pour les autres organismes.
                        <br/>
                        - Le handicap nécessite un aménagement de véhicule pour le passager. Par exemple : rampe d’accès, treuil). Seul certaines assurances prendront en charge ce type d’aménagement.<br/>
                        Prise en charge : PCH aménagement du véhicule ou certaines assurances.
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.triggerModalVehic} className={'buttonSecondary'}>Fermer</Button>
                    </ModalFooter>
                </Modal>
                <Modal className={'tc_modal'} isOpen={this.state.modalMM} fade={false} centered>
                    <ModalHeader>Matériel médical</ModalHeader>
                    <ModalBody>
                        Le matériel médical est habituellement soumis à prescription médicale (ordonnance) et une partie est remboursée par la Sécurité Sociale.
                        <br/><br/>
                        CERAHTEC est une base de données sur les aides techniques destinées aux personnes handicapées et/ou âgées quel que soit le type de handicap moteur, sensoriel, psychique ou mental.<br/><br/>
                        En ce qui concerne l’appareillage, les fauteuils roulants c’est la MDPH qui finance avec la <a href="https://www.service-public.fr/particuliers/vosdroits/F14202" target="_blank">PCH.</a>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.triggerModalMM} className={'buttonSecondary'}>Fermer</Button>
                    </ModalFooter>
                </Modal>
                <Modal className={'tc_modal'} isOpen={this.state.modalSRPR} fade={false} centered>
                    <ModalHeader>Service de Rééducation Post Réanimation</ModalHeader>
                    <ModalBody>
                        Service qui accueille les patients au décours d’un séjour en réanimation, quand la rééducation peut être débutée mais que les soins médicaux sont encore lourds, complexes et nécessitent une surveillance continue. En Occitanie il n’existe qu’une unité de 6 lits à Toulouse.
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.triggerModalSRPR} className={'buttonSecondary'}>Fermer</Button>
                    </ModalFooter>
                </Modal>
                <Modal className={'tc_modal'} isOpen={this.state.modalUE} fade={false} centered>
                    <ModalHeader>Unite Eveil</ModalHeader>
                    <ModalBody>
                        Service qui accueille les patients en phase d’éveil. Il s’agit souvent de traumatisés crâniens sévères qui ont vécus un long séjour en réanimation, qui sont maintenant plus stables sur le plan vital, mais restent en état de conscience altérée. Les complications médicales et les décès restent fréquents à ce stade. L’objectif du service est d’apporter un environnement propice à l’éveil, avec des stimulations visuelles (photos par exemple), auditives (voix des proches, musique), présence de l’entourage, etc…
                        <br/><br/>
                        Si le patient récupère un état de conscience suffisant il rejoindra un service de rééducation.
                        <br/>
                        Si le patient ne se réveille pas ou que son niveau de conscience reste altéré, l’orientation vers une Unité EVC-EPR (Etat Végétatif Chronique- Etat Pauci Relationnel) se discutera.
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.triggerModalUE} className={'buttonSecondary'}>Fermer</Button>
                    </ModalFooter>
                </Modal>
                <Modal className={'tc_modal'} isOpen={this.state.modalAFTC} fade={false} centered>
                    <ModalHeader>Association Francaise des Traumatisés Crâniens</ModalHeader>
                    <ModalBody>
                        Il s’agit d’une association qui regroupe les personnes et leurs familles atteintes par une
                        lésion cérébrale acquise. Elle permet de faciliter le contact entre les blessés et les familles,
                        de les conseiller et les soutenir tout au long de la prise en charge. Elle représente et défend
                        les intérêts et les droits auprès des instances décisionnelles, participe à des actions de
                        prévention des accidents
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.triggerModalAFTC} className={'buttonSecondary'}>Fermer</Button>
                    </ModalFooter>
                </Modal>
                <Modal className={'tc_modal'} isOpen={this.state.modalGEM} fade={false} centered>
                    <ModalHeader>Groupe d'entraide mutuelle</ModalHeader>
                    <ModalBody>
                        Lieu ouvert aux personnes cérébrolésées, encadré par des animateurs et des bénévoles et financé
                        par l’Agence Régionale de Santé. C’est un lieu de rencontres, d’échanges, d’entraide et de
                        loisirs partagés.
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.triggerModalGEM} className={'buttonSecondary'}>Fermer</Button>
                    </ModalFooter>
                </Modal>
                <Modal className={'tc_modal'} isOpen={this.state.modalYMCA} fade={false} centered>
                    <ModalHeader>YMCA</ModalHeader>
                    <ModalBody>
                        Unité de Soutien et d'Accompagnement aux Personnes Cérébrolésées. Association régionale qui gère
                        des établissements sociaux et médico-sociaux agréés, notamment un ESAT, une entreprise adaptée,
                        un centre de rééducation professionnelle, et des foyers d’hébergement. Elle accueille également
                        des personnes cérébro lésées pour des activités rééducatives (individuelles ou
                        collectives).<br/>
                        Pour qui : personne en situation de handicap<br/>
                        Comment : il faut demander une notification d’orientation sur le certificat MDPH rempli par le
                        médecin.<br/>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.triggerModalYMCA} className={'buttonSecondary'}>Fermer</Button>
                    </ModalFooter>
                </Modal>
                <Modal className={'tc_modal'} isOpen={this.state.modalDeplac} fade={false} centered>
                    <ModalHeader>Aide aux déplacements</ModalHeader>
                    <ModalBody>
                        <ul>
                            <li>
                                Pour les rendez vous médicaux en lien avec votre handicap: ambulance, VSL ou remboursement d’un trajet en véhicule personnel. Prise en charge par la CPAM. Comment : bon de transport à demander à remplir par le médecin AVANT le rendez vous.
                            </li>
                            <li>
                                Pour se rendre au travail : l’ AGEFIPH peut financer des moyens de transport (aménagement véhicule personnel, taxis, autre)
                            </li>
                            <li>
                                Carte Mobilité Inclusion : permet une priorité d’accès dans les transports en commun, les espaces et salles d’attente, les établissements publics, accès aux places de stationnement pour personne à mobilité réduite.
                                <br/>
                                Pour qui : handicap avec taux d’incapacité permanente d’au moins 80%.
                                <br/>
                                Comment : à demander sur le dossier MDPH
                            </li>
                            <li>
                                Services de transport à la demande, spécifiques dans certaines villes ou départements (ex : Mobibus à Toulouse). Vous pouvez demander conseil à votre assistante sociale ou dans votre mairie.
                            </li>
                            <li>
                                Vous pouvez essayer la plateforme collaborative Jaccede (version site web et mobile) détaille l'accessibilité de nombreux lieux publiques et magasins.
                            </li>
                        </ul>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.triggerModalDeplac} className={'buttonSecondary'}>Fermer</Button>
                    </ModalFooter>
                </Modal>
                <Modal className={'tc_modal'} isOpen={this.state.modalSport} fade={false} centered>
                    <ModalHeader>Sport et loisirs adaptés</ModalHeader>
                    <ModalBody>
                        Des structures (centres sportifs, associations…) proposent des sports ou des activités de loisirs adaptées au handicap moteur ou cognitif.
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.triggerModalSport} className={'buttonSecondary'}>Fermer</Button>
                    </ModalFooter>
                </Modal>
                <Modal className={'tc_modal'} isOpen={this.state.modalMTra} fade={false} centered>
                    <ModalHeader>Médecine du travail</ModalHeader>
                    <ModalBody>
                        Son rôle est de vérifier que vous êtes en capacité de travailler sur votre poste, et si ce n’est pas le cas de discuter des possibilités d’aménagement du poste avec votre employeur. Une consultation avec le médecin du travail est obligatoire avant de reprendre votre activité si vous avez eu un arrêt de travail supérieur à 30 jours.
                        <br/><br/>
                        Son accord est également nécessaire si une reprise à temps partiel pour raison thérapeutique est envisagée.
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.triggerModalMTra} className={'buttonSecondary'}>Fermer</Button>
                    </ModalFooter>
                </Modal>
                <Modal className={'tc_modal'} isOpen={this.state.modalAdapt} fade={false} centered>
                    <ModalHeader>Adaptation de poste</ModalHeader>
                    <ModalBody>
                        Le salarié peut demander à bénéficier d’adaptations des conditions de travail à son état de
                        santé. Il peut s’agir d’adaptation des horaires (pour permettre une sieste en cas de
                        fatigabilité par exemple), de télétravail, d’aménagement technique (rampe d’accès, bureau adapté
                        par exemple). Cela doit être discuté avec l’employeur et le médecin du travail ; un certificat
                        médical justifiant l’état de santé peut être demandé.<br/>
                        L’entreprise peut obtenir des aides financières via l’Agefiph pour réaliser les aménagements ou
                        acheter du matériel adapté.<br/>

                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.triggerModalAdapt} className={'buttonSecondary'}>Fermer</Button>
                    </ModalFooter>
                </Modal>
                <Modal className={'tc_modal'} isOpen={this.state.modalESAT} fade={false} centered>
                    <ModalHeader>Etablissements et Services d'Aide par le Travail</ModalHeader>
                    <ModalBody>
                        Il s’agit de structures qui permettent aux personnes en situation de handicap grave de réaliser
                        leur activité professionnelle en bénéficiant d'un soutien médico-social et éducatif dans un
                        milieu protégé. Les travailleurs sont rémunérés entre 55 % et 110 % du SMIC. Il y a souvent un
                        foyer d’hébergement associé à la structure.<br/>
                        Pour qui : personne qui ne peut pas travailler dans une entreprise ordinaire ou une entreprise
                        adaptée. Car la capacité de travail ne dépasse pas le 1/3 de celle d'une personne valide, ou si
                        la personne a besoin de soutiens médicaux, éducatifs, sociaux et psychologiques. Il faut avoir
                        au moins 20 ans.<br/>
                        Comment : la demande de « notification RQTH avec orientation vers un Esat » est faite sur le
                        certificat de la MDPH rempli par le médecin. La commission de la MDPH (CDAPH) prendra la
                        décision.<br/>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.triggerModalESAT} className={'buttonSecondary'}>Fermer</Button>
                    </ModalFooter>
                </Modal>
                <Modal className={'tc_modal'} isOpen={this.state.modalUEROS} fade={false} centered>
                    <ModalHeader>Unité d'Evaluation, de Réentrainemenet de d'Orientation
                        Socioprofessionnelle</ModalHeader>
                    <ModalBody>
                        Une équipe pluri disciplinaire (médecin, ergothérapeute, psychologue / neuropsychologue, chargé
                        d’insertion, formateur, assistant de service social, secrétaire) va étudier les possibilités de
                        réinsertion sociale et/ou professionnelle. L’objectif est d’élaborer et de mettre en œuvre un
                        programme de réentrainement individualisé pour optimiser ses capacités et de construire un
                        projet d’insertion.<br/>
                        Pour qui : adultes de 18 à 60 ans en situation de handicap suite à une lésion cérébrale acquise,
                        avec notification RQTH (Reconnaissance de la qualité de travailleur handicapé : cf en bas).<br/>
                        Comment : la demande de « notification UEROS » est faite sur le certificat de la MDPH rempli par
                        le médecin. La commission de la MDPH prendra la décision.<br/>
                        Et les propositions d’orientation après l’évaluation de l’UEROS doivent aussi être validées par
                        la MDPH.<br/>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.triggerModalUEROS} className={'buttonSecondary'}>Fermer</Button>
                    </ModalFooter>
                </Modal>
                <Modal className={'tc_modal'} isOpen={this.state.modalCOMETE} fade={false} centered>
                    <ModalHeader>COMETE</ModalHeader>
                    <ModalBody>
                        Association présente dans certains services de Médecine Physique et de Réadaptation. Avec les
                        compétences d’une équipe pluri disciplinaire l’objectif est la prise en charge précoce des
                        problématiques socio-professionnelles des patients hospitalisés.<br/>
                        Pour qui : personnes hospitalisées ou suivis en établissement associé à une cellule Comète.<br/>
                        Comment : le médecin peut proposer une prise en charge si la personne est volontaire.<br/>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.triggerModalCOMETE} className={'buttonSecondary'}>Fermer</Button>
                    </ModalFooter>
                </Modal>
                <Modal className={'tc_modal'} isOpen={this.state.modalCAPE} fade={false} centered>
                    <ModalHeader> Cap Emploi </ModalHeader>
                    <ModalBody>
                        Service public d'accès et de maintien dans l'emploi. Il accueille, informe et conseille la personne en situation de
                        handicap et les entreprises en vue d’une insertion professionnelle, d’une transition
                        professionnelle ou d’une formation ; en milieu ordinaire de travail.<br/>
                        Pour qui : les entreprises et les personnes reconnues travailleur handicapé <a href="#" onClick={()=> {
                            this.triggerModalCAPE();
                            this.triggerModalRQTH();
                    }}>(RQTH)</a> par la
                        MDPH<br/>
                        Comment : faire la demande auprès de la MDPH puis de votre conseiller Cap Emploi<br/>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.triggerModalCAPE} className={'buttonSecondary'}>Fermer</Button>
                    </ModalFooter>
                </Modal>
                <Modal className={'tc_modal'} isOpen={this.state.modalSMMETH} fade={false} centered>
                    <ModalHeader>Service d'Appui au Maintien en Emploi des Travailleurs Handicapés</ModalHeader>
                    <ModalBody>
                        Son objectif est d’aider les salariés et les entreprises à trouver une solution de maintien dans
                        l’emploi quand celui n’est pas possible dans les conditions actuelles en raison du handicap du
                        salarié. Il peut alors proposer des aménagements matériels, de temps de travail, demander des
                        aides financières.<br/>
                        Pour qui : personnes reconnues travailleur handicapé ou en voie de le devenir<br/>
                        Comment : intervient sur demande de la Médecine du Travail.<br/>

                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.triggerModalSMMETH} className={'buttonSecondary'}>Fermer</Button>
                    </ModalFooter>
                </Modal>
                <Modal className={'tc_modal'} isOpen={this.state.modalMAS} fade={false} centered>
                    <ModalHeader>Maison d'accueil spécialisé</ModalHeader>
                    <ModalBody>
                        Structure d’hébergement qui accueille des adultes avec handicap grave et dont les capacités de
                        décision et d'action dans les actes de la vie quotidienne sont altérées. On y propose des
                        activités d'éveil ou occupationnelles, des soins médicaux et paramédicaux adaptés<br/>
                        Pour qui : adulte nécessitant le recours à une tierce personne pour les actes de la vie courante
                        ainsi qu'une surveillance médicale et des soins constants.<br/>
                        Comment : demande d'orientation MDPH sur le dossier MDPH<br/>
                        Prise en charge : Sécurité sociale + participation financière aux frais d'hébergement et d'entretien demandée au résident, plafonnée en fonction des revenus.<br/>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.triggerModalMAS} className={'buttonSecondary'}>Fermer</Button>
                    </ModalFooter>
                </Modal>
                <Modal className={'tc_modal'} isOpen={this.state.modalFAM} fade={false} centered>
                    <ModalHeader>Foyer d'Accueil Médicalisé</ModalHeader>
                    <ModalBody>
                        Structure d'hébergement qui accueille des adultes avec handicap grave. Elle permet un
                        accompagnement pour effectuer les actes essentiels de la vie courante, une aide éducative, des
                        soins médicaux et paramédicaux adaptés.<br/>
                        Pour qui : adulte nécessitant le recours à une tierce personne pour les actes de la vie courante
                        ainsi qu'une surveillance médicale et des soins constants.<br/>
                        En principe, le foyer d'accueil médicalisé (Fam) accueille des personnes un peu moins
                        dépendantes que celles hébergées en maison d'accueil spécialisée (Mas), mais dans la pratique,
                        les publics sont sensiblement les mêmes.<br/>
                        Comment : demande d'orientation FAM sur le dossier MDPH<br/>
                        Prise en charge : Sécurité Sociale + participation aux frais d'hébergement et d'entretien
                        demandée au résident, plafonnée en fonction des revenus.<br/>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.triggerModalFAM} className={'buttonSecondary'}>Fermer</Button>
                    </ModalFooter>
                </Modal>
                <Modal className={'tc_modal'} isOpen={this.state.modalFoyer} fade={false} centered>
                    <ModalHeader>Foyer de vie</ModalHeader>
                    <ModalBody>
                        Etablissement qui accueille des adultes handicapés ayant une certaine autonomie pour leur
                        proposer des animations, des activités ludiques et éducatives en fonction de leur handicap. Il
                        peut s’agir d’un accueil temporaire, de jour ou en internat.<br/>
                        Pour qui : adultes avec taux d'incapacité d'au moins 50 % et ne relevant ni d'un établissement
                        et service d'aide par le travail (Ésat), ni d'une maison d'accueil spécialisée (Mas), ni d'un
                        foyer d'accueil médicalisé (Fam).<br/>
                        Comment : demande d'orientation en Foyer de vie sur le dossier MDPH<br/>
                        Prise en charge : Sécurité Sociale + participation aux frais d'hébergement et d'entretien
                        demandée au résident, plafonnée en fonction des revenus.<br/>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.triggerModalFoyer} className={'buttonSecondary'}>Fermer</Button>
                    </ModalFooter>
                </Modal>
                <Modal className={'tc_modal'} isOpen={this.state.modalKine} fade={false} centered>
                    <ModalHeader>Kinésithérapeute</ModalHeader>
                    <ModalBody>
                        Prend en charge les troubles loco-moteurs, par exemple : renforcement musculaire, travail de la
                        marche, de l’équilibre, étirements contre la spasticité, verticalisation…<br/>
                        En SSR ou en libéral.<br/>
                        Pour qui : personne avec difficultés motrices<br/>
                        Comment : prescription médicale<br/>
                        Prise en charge : Sécurité sociale<br/>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.triggerModalKine} className={'buttonSecondary'} centered>Fermer</Button>
                    </ModalFooter>
                </Modal>
                <Modal className={'tc_modal'} isOpen={this.state.modalErgo} fade={false} centered>
                    <ModalHeader>Ergothérapeute</ModalHeader>
                    <ModalBody>
                        Travaille surtout l’autonomie, cherche des adaptations techniques pour pallier les difficultés.
                        Aide également dans le choix du fauteuil roulant et les autres appareillages.<br/>
                        Peut intervenir à domicile pour évaluer et adapter l’environnement. Intervient aussi dans la
                        réadaptation professionnelle.<br/>
                        Comment : Prescription médicale en SSR, et sur demande du patient ou de la famille en
                        libéral<br/>
                        Prise en charge : non pris en charge par la Sécurité Sociale en libéral, possibilité de
                        financement par la PCH pour les adultes et par l’AEEH (Allocation Education Enfant Handicapé)
                        pour les enfants. Certaines mutuelles peuvent financer aussi.<br/>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.triggerModalErgo} className={'buttonSecondary'}>Fermer</Button>
                    </ModalFooter>
                </Modal>
                <Modal className={'tc_modal'} isOpen={this.state.modalOrtho} fade={false} centered>
                    <ModalHeader>Orthophoniste</ModalHeader>
                    <ModalBody>
                        Rééducation des troubles du langage, des fonctions cognitives, de la communication et de la
                        déglutition.<br/>
                        La demande est faite par la personne Traumatisée Crânienne, sa famille ou son médecin.<br/>
                        Comment : en SSR ou en libéral. Sur Prescription médicale.<br/>
                        Prise en charge : Sécurité Sociale<br/>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.triggerModalOrtho} className={'buttonSecondary'}>Fermer</Button>
                    </ModalFooter>
                </Modal>
                <Modal className={'tc_modal'} isOpen={this.state.modalOTP} fade={false} centered>
                    <ModalHeader>Orthoptiste</ModalHeader>
                    <ModalBody>
                        Son rôle est l’évaluation des capacités visuelles du patient, et leur rééducation en essayant
                        d’améliorer l’équilibre et l’efficacité de la vision<br/>
                        Comment : SSR ou libéral. Sur prescription médicale<br/>
                        Prise en charge : Sécurité sociale<br/>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.triggerModalOTP} className={'buttonSecondary'}>Fermer</Button>
                    </ModalFooter>
                </Modal>
                <Modal className={'tc_modal'} isOpen={this.state.modalYMCA} fade={false} centered>
                    <ModalHeader>YMCA</ModalHeader>
                    <ModalBody>
                        Unité de Soutien et d'Accompagnement aux Personnes Cérébrolésées. Association régionale qui gère
                        des établissements sociaux et médico-sociaux agréés, notamment un ESAT, une entreprise adaptée,
                        un centre de rééducation professionnelle, et des foyers d’hébergement. Elle accueille également
                        des personnes cérébro lésées pour des activités rééducatives (individuelles ou
                        collectives).<br/>
                        Pour qui : personne en situation de handicap<br/>
                        Comment : il faut demander une notification d’orientation sur le certificat MDPH rempli par le
                        médecin.<br/>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.triggerModalYMCA} className={'buttonSecondary'}>Fermer</Button>
                    </ModalFooter>
                </Modal>
                <Modal className={'tc_modal'} isOpen={this.state.modalNP} fade={false} centered>
                    <ModalHeader>Neuropsychologue</ModalHeader>
                    <ModalBody>
                        Bilan et rééducation des fonctions cognitives, et accompagnement psychologique. Explique le
                        fonctionnement des fonctions cognitives, travaille la prise de conscience des troubles puis
                        utilise des techniques de rééducation et réadaptation des fonctions cognitives.<br/>
                        Comment : en SSR surtout, ou en libéral<br/>
                        Prise en charge : non remboursé par la sécurité sociale en libéral, une partie peut être prise
                        en charge par la mutuelle<br/>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.triggerModalNP} className={'buttonSecondary'}>Fermer</Button>
                    </ModalFooter>
                </Modal>
                <Modal className={'tc_modal'} isOpen={this.state.modalNC} fade={false} centered>
                    <ModalHeader>Neurochirurgien</ModalHeader>
                    <ModalBody>
                        Médecin chirurgien spécialisé dans la chirurgie du cerveau et du système nerveux. En cas de traumatisme crânien grave, en fonction de l’état du patient et des résultats de l’imagerie, il peut être amené à opérer un hématome cérébral en urgence. D’autres chirurgies peuvent être programmées sans urgence.
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.triggerModalNC} className={'buttonSecondary'}>Fermer</Button>
                    </ModalFooter>
                </Modal>
                <Modal className={'tc_modal'} isOpen={this.state.modalMR} fade={false} centered>
                    <ModalHeader>Médecin de MPR</ModalHeader>
                    <ModalBody>
                        Il coordonne le projet de rééducation et de réinsertion. En réajustant les objectifs en fonction de l’évolution, de l’état clinique, des avis des différents thérapeutes et du patient et son entourage. Il est aussi responsable des problèmes médicaux pendant l’hospitalisation.
                        Le médecin rééducateur travaille habituellement dans un centre de rééducation ou un <Button color="link" onClick={this.triggerModalMPR}>service de MPR</Button>. Après votre sortie d’hospitalisation il continuera à vous suivre en consultation et réaliser si besoin les injections de toxine botulique.

                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.triggerModalMR} className={'buttonSecondary'}>Fermer</Button>
                    </ModalFooter>
                </Modal>
                <Modal className={'tc_modal'} isOpen={this.state.modalNeuro} fade={false} centered>
                    <ModalHeader>Neurologue</ModalHeader>
                    <ModalBody>
                        Médecin spécialiste qui intervient parfois dans la prise en charge des traumatisés crâniens. En cas d’épilepsie par exemple le suivi par un neurologue est indispensable.
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.triggerModalNeuro} className={'buttonSecondary'}>Fermer</Button>
                    </ModalFooter>
                </Modal>
                <Modal className={'tc_modal'} isOpen={this.state.modalMT} fade={false} centered>
                    <ModalHeader>Médecin traitant</ModalHeader>
                    <ModalBody>
                        De la même manière que pour une personne qui n’a pas eu de traumatisme crânien il est important d’avoir un médecin généraliste proche de chez vous, qui vous connait et que vous avez déclaré comme médecin traitant auprès de la Sécurité Sociale. Il assure le suivi médical et est en lien avec les autres médecins (rééducateur, neurochirurgien, psychiatre…).
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.triggerModalMT} className={'buttonSecondary'}>Fermer</Button>
                    </ModalFooter>
                </Modal>
                <Modal className={'tc_modal'} isOpen={this.state.modalMPR} fade={false} centered>
                    <ModalHeader>Service de Médecine Physique et de Réadaptation</ModalHeader>
                    <ModalBody>
                        Service spécialisé qui prend en charge la rééducation et la réadaptation des patients. Une équipe pluridisciplinaire coordonne le programme de rééducation, fixe des objectifs et prépare un projet de réinsertion avec le patient et son entourage. Dans un service de MPR neurologique l’équipe est habituellement composée de kinésithérapeute, orthophoniste, assistante sociale, ergothérapeute, psychomotricien, psychologue, neuropsychologue, médecin rééducateur.
                        <br/><br/>
                        Un service de MPR peut être spécialisé en pathologie neurologique, ou loco-motrice ou être polyvalent.
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.triggerModalMPR} className={'buttonSecondary'}>Fermer</Button>
                    </ModalFooter>
                </Modal>
                <Modal className={'tc_modal'} isOpen={this.state.modalSRPR} fade={false} centered>
                    <ModalHeader>Service de Rééducation Post Réanimation</ModalHeader>
                    <ModalBody>
                        Service qui accueille les patients au décours d’un séjour en réanimation, quand la rééducation peut être débutée mais que les soins médicaux sont encore lourds, complexes et nécessitent une surveillance continue. En Occitanie il n’existe qu’une unité de 6 lits à Toulouse.
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.triggerModalSRPR} className={'buttonSecondary'}>Fermer</Button>
                    </ModalFooter>
                </Modal>
                <Modal className={'tc_modal'} isOpen={this.state.modalUE} fade={false} centered>
                    <ModalHeader>Unité Eveil</ModalHeader>
                    <ModalBody>
                        Service qui accueille les patients en phase d’éveil. Il s’agit souvent de traumatisés crâniens sévères qui ont vécus un long séjour en réanimation, qui sont maintenant plus stables sur le plan vital, mais restent en état de conscience altérée. Les complications médicales et les décès restent fréquents à ce stade. L’objectif du service est d’apporter un environnement propice à l’éveil, avec des stimulations visuelles (photos par exemple), auditives (voix des proches, musique), présence de l’entourage, etc…
                        <br/><br/>
                        Si le patient récupère un état de conscience suffisant il rejoindra un service de rééducation.
                        <br/>
                        Si le patient ne se réveille pas ou que son niveau de conscience reste altéré, l’orientation vers une Unité EVC-EPR (Etat Végétatif Chronique- Etat Pauci Relationnel) se discutera.
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.triggerModalUE} className={'buttonSecondary'}>Fermer</Button>
                    </ModalFooter>
                </Modal>
                <Modal className={'tc_modal'} isOpen={this.state.modalEVC} fade={false} centered>
                    <ModalHeader>Unité EVC-EPR</ModalHeader>
                    <ModalBody>
                        Service qui accueille les patients en Etat Végétatif Chronique ou en Etat Pauci Relationnel. Il s’agit d’hospitalisations au long cours. Les soins à apporter sont importants auprès de ces patients avec un état de conscience altéré, et le retour à domicile est rarement envisageable. Les services de ce type sont peu nombreux et malheureusement il n’est pas toujours possible d’en trouver à proximité du domicile.
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.triggerModalEVC} className={'buttonSecondary'}>Fermer</Button>
                    </ModalFooter>
                </Modal>
                <Modal className={'tc_modal'} isOpen={this.state.modalCMI} fade={false} centered>
                    <ModalHeader>Carte Mobilité Inclusion (CMI)</ModalHeader>
                    <ModalBody>
                        Elle permet une priorité d’accès dans les transports en commun, les espaces et salles d’attente, les établissements publics, accès aux places de stationnement pour personne à mobilité réduite.<br/>
                        Il existe 3 types de CMI : « invalidité », « priorité » et « stationnement ».<br/>
                        Pour qui : handicap avec taux d’incapacité permanente d’au moins 80%.<br/><br/>
                        Pour plus d’informations, cliquez <a href="https://www.service-public.fr/particuliers/vosdroits/F34049" target="_blank">ici</a>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.triggerModalCMI} className={'buttonSecondary'}>Fermer</Button>
                    </ModalFooter>
                </Modal>
                <Modal className={'tc_modal'} isOpen={this.state.modalRQTH} fade={false} centered>
                    <ModalHeader>RQTH</ModalHeader>
                    <ModalBody>
                        Reconnaissance en qualité de travailleur handicapé. Il s’agit d’une décision administrative rendue par la commission de la MDPH. L’obtention de cette reconnaissance permet d’avoir accès à un ensemble d’aides spécifiques au maintien dans l’emploi et à l’insertion professionnelle. Elle permet notamment d’avoir accès aux services Cap Emploi et aux aides de l’ Agefiph.<br/><br/>
                        Lorsque la qualité de travailleur handicapé est reconnu, elle s'accompagne d'une orientation vers :
                        <ul>
                            <li>
                                un établissement ou service d'aide par le travail (ESAT),
                            </li>
                            <li>
                                vers le marché du travail
                            </li>
                            <li>
                                ou vers un centre de rééducation professionnelle.
                            </li>
                        </ul><br/>
                        Pour qui : « toute personne dont les possibilités d’obtenir ou de conserver un emploi sont effectivement réduites par suite de l’altération d’une ou plusieurs fonctions physique, sensorielle, mentale ou psychique ».<br/><br/>
                        Comment : : la demande est faite sur le dossier de la MDPH. La MDPH peut vous demander d'effectuer une visite médicale.
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.triggerModalRQTH} className={'buttonSecondary'}>Fermer</Button>
                    </ModalFooter>
                </Modal>
                <Modal className={'tc_modal'} isOpen={this.state.modalPCH} fade={false} centered>
                    <ModalHeader>PCH</ModalHeader>
                    <ModalBody>
                        Participation totale ou partielle pour financer des aides à domicile, et des aides techniques, par exemple pour l’aménagement du domicile ou de la voiture.<br/><br/>
                        Pour qui : personne avec difficulté grave ou absolue dans les activités essentielles de la vie quotidienne. Il faut avoir moins de 60 ans (ou > 60ans si exerce une activité professionnelle).<br/><br/>
                        Comment : demande faite sur le dossier MDPH qui décide du montant en fonction du degré d'autonomie, de l’âge, et du lieu de résidence . Financé par le Département.<br/><br/>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.triggerModalPCH} className={'buttonSecondary'}>Fermer</Button>
                    </ModalFooter>
                </Modal>
                <Modal className={'tc_modal'} isOpen={this.state.modalOri} fade={false} centered>
                    <ModalHeader>Orientation</ModalHeader>
                    <ModalBody>
                        Après examen du dossier MDPH, la CDAPH décidera de l'orientation de :
                        <ul>
                            <li>
                                la scloralisation et la formation pour l'enfant handicapé,
                            </li>
                            <li>
                                l'orientation professionnelle et la formation des adultes handicapés,
                            </li>
                            <li>
                                l'orientation en établissement médico-social.
                            </li>
                        </ul>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.triggerModalOri} className={'buttonSecondary'}>Fermer</Button>
                    </ModalFooter>
                </Modal>
                <Modal className={'tc_modal'} isOpen={this.state.modalAAH} fade={false} centered>
                    <ModalHeader>Allocation aux adultes handicapés</ModalHeader>
                    <ModalBody>
                        Aide financière qui permet d'assurer un minimum de ressources. Cette aide est attribuée sous réserve de respecter des critères d’incapacité, d'âge, de résidence et de ressources. Son montant vient compléter les éventuelles autres ressources de la personne en situation de handicap.
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.triggerModalAAH} className={'buttonSecondary'}>Fermer</Button>
                    </ModalFooter>
                </Modal>
            </section>
        );
    }
}