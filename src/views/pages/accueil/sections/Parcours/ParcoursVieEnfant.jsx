import React from 'react';
import {
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

export default class SectionTwo extends React.Component {
    constructor(props){
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
            modalAidant: false,
            modalSESSAD: false,
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
            modalIME: false,
            modalIEM: false,
            modalPPS: false,
            modalAESH: false,
            modalULIS: false,
            modalACPE: false,
            modalAT: false,
            modalCNED: false,
            modalPsySco: false,
            modalSEGPA: false,
            modalSIPFP: false
        }
    }
    triggerModalAuxVie = () =>{
        this.setState({modalAuxVie:!this.state.modalAuxVie})
    };

    triggerModalIDE = () =>{
        this.setState({modalIDE:!this.state.modalIDE})
    };

    triggerModalAidant = () =>{
        this.setState({modalAidant:!this.state.modalAidant})
    };

    triggerModalSESSAD = () =>{
        this.setState({modalSESSAD:!this.state.modalSESSAD})
    };

    triggerModalAmenLog = () =>{
        this.setState({modalAmenLog:!this.state.modalAmenLog})
    };

    triggerModalVehic = () =>{
        this.setState({modalVehic:!this.state.modalVehic})
    };

    triggerModalMM = () =>{
        this.setState({modalMM:!this.state.modalMM})
    };

    triggerModalPPS = () =>{
        this.setState({modalPPS:!this.state.modalPPS})
    };

    triggerModalAESH = () =>{
        this.setState({modalAESH:!this.state.modalAESH})
    };

    triggerModalULIS = () =>{
        this.setState({modalULIS:!this.state.modalULIS})
    };

    triggerModalAFTC = () =>{
        this.setState({modalAFTC:!this.state.modalAFTC})
    };

    triggerModalDeplac= () =>{
        this.setState({modalDeplac:!this.state.modalDeplac})
    };

    triggerModalSport= () =>{
        this.setState({modalSport:!this.state.modalSport})
    };

    triggerModalACPE= () =>{
        this.setState({modalACPE:!this.state.modalACPE})
    };
    triggerModalIEM= () =>{
        this.setState({modalIEM:!this.state.modalIEM})
    };

    triggerModalESAT= () =>{
        this.setState({modalESAT:!this.state.modalESAT})
    };

    triggerModalAT= () =>{
        this.setState({modalAT:!this.state.modalAT})
    };

    triggerModalCNED= () =>{
        this.setState({modalCNED:!this.state.modalCNED})
    };

    triggerModalPsySco= () =>{
        this.setState({modalPsySco:!this.state.modalPsySco})
    };

    triggerModalSEGPA= () =>{
        this.setState({modalSEGPA:!this.state.modalSEGPA})
    };

    triggerModalSIPFP= () =>{
        this.setState({modalSIPFP:!this.state.modalSIPFP})
    };

    triggerModalIME= () =>{
        this.setState({modalIME:!this.state.modalIME})
    };
    render() {
        return (
            <section className={'section'}>
                <img style={{position:'absolute',top:0,bottom:0,right:0,margin:'auto'}} height={'100%'} width={'auto'} src={header2}/>
                <Container fluid className={'container-justify'}>
                    <Row>
                        <Col xs='9' xl='6' className={'testtt'}>
                            <h2 className={'titre TCL'}>
                                Parcours de vie
                            </h2><br/>
                            À l'issue de la prise en charge initiale, même si le patient est stabilisé, le suivi médical et la prise en charge rééducative nécessitent d'être poursuivis. En parallèle, un parcours de vie se met en place.<br/>
                            Les dispositifs d'aide sont nombreux et il n'est pas toujours facile de s'y retrouver.<br/>
                            Nous vous présentons ci-dessous les principales personnes, dispositifs et structures dont vous pouvez avoir besoin.<br/>
                            Des informations supplémentaires apparaissent en cliquant sur la case correspondante.                            <br/><br/>
                        </Col>
                    </Row>
                    <Row className={'justify-content-start'}>
                        <Col xs="6" xl="3">
                            <Card>
                                <CardTitle className={'titre'}>
                                    Domicile
                                </CardTitle>
                                <CardBody>
                                    <Card className={'container-set-bis reposition text-center'}>
                                        <CardTitle className={'titre'}>
                                            Aides humaines
                                        </CardTitle>
                                        <CardBody className={'TCL-interface'}>
                                            <a onClick={this.triggerModalAuxVie} href={"#"} className={'link'}> Auxilaire de vie </a><br/>
                                            <a onClick={this.triggerModalIDE} href={"#"} className={'link'}> IDE </a><br/>
                                            <a onClick={this.triggerModalAidant} href={"#"} className={'link'}> Aidant </a><br/>
                                        </CardBody>
                                    </Card>
                                    <Card className={'container-set-bis reposition text-center'}>
                                        <CardTitle className={'titre'}>
                                            Services de coordination
                                        </CardTitle>
                                        <CardBody className={"TCL-interface"}>
                                            <a onClick={this.triggerModalSESSAD} href={"#"} className={'link'}> SESSAD </a><br/>
                                        </CardBody>
                                    </Card>
                                    <Card className={'container-set-bis reposition text-center'}>
                                        <CardTitle className={'titre'}>
                                            Aides matérielles
                                        </CardTitle>
                                        <CardBody className={"TCL-interface"}>
                                            <a onClick={this.triggerModalAmenLog} href={"#"} className={'link'}> Aménagement du logement </a><br/>
                                            <a onClick={this.triggerModalVehic} href={"#"} className={'link'}> Véhicule  </a><br/>
                                            <a onClick={this.triggerModalMM} href={"#"} className={'link'}> Matériel médical </a><br/>
                                        </CardBody>
                                    </Card>
                                    <Card>
                                        <CardTitle className={'titre'}>
                                            Insertion sociale
                                        </CardTitle>
                                        <CardBody className={'TCL-interface'}>
                                            <a onClick={this.triggerModalDeplac} href={"#"} className={'link'}> Aide aux déplacements </a><br/>
                                            <a onClick={this.triggerModalSport} href={"#"} className={'link'}> Sport, loisirs </a><br/>
                                        </CardBody>
                                    </Card>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col xs="6" xl="4">
                            <Card>
                                <CardTitle className={'titre'}>
                                    Scolarité
                                </CardTitle>
                                <CardBody className={'TCL-interface'}>
                                    <a onClick={this.triggerModalPPS} href={"#"} className={'link'}> PPS </a><br/>
                                    <a onClick={this.triggerModalAESH} href={"#"} className={'link'}> AESH </a><br/>
                                    <a onClick={this.triggerModalULIS} href={"#"} className={'link'}> ULIS </a><br/>
                                    <a onClick={this.triggerModalACPE} href={"#"} className={'link'}> Aménagement conditions de passation des examens </a><br/>
                                    <a onClick={this.triggerModalAT} href={"#"} className={'link'}> Aides techniques </a><br/>
                                    <a onClick={this.triggerModalCNED} href={"#"} className={'link'}> CNED </a><br/>
                                    <a onClick={this.triggerModalPsySco} href={"#"} className={'link'}> Psychologue scolaire </a><br/>
                                    <a onClick={this.triggerModalSEGPA} href={"#"} className={'link'}> SEGPA </a><br/>
                                    <a onClick={this.triggerModalSIPFP} href={"#"} className={'link'}> SIPFP </a><br/>
                                </CardBody>
                            </Card>
                            <Card>
                                <CardTitle className={'titre'}>
                                    Associations
                                </CardTitle>
                                <CardBody className={'TCL-interface'}>
                                    <a onClick={this.triggerModalAFTC} href={"#"} className={'link'}> AFTC </a><br/>
                                </CardBody>
                            </Card>
                            <Card>
                                <CardTitle className={'titre'}>
                                    Etablissement medico-social
                                </CardTitle>
                                <CardBody className={'TCL-interface'}>
                                    <a onClick={this.triggerModalIME} href={"#"} className={'link'}>IME </a><br/>
                                    <a onClick={this.triggerModalIEM} href={"#"} className={'link'}> IEM </a><br/>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        Pour plus d'informations sur l'hébergement, les allocations ou encore le travail, deux liens s'offrent à vous :
                        <ul>
                            <li>
                                <a href='https://www.service-public.fr/particuliers/vosdroits/N12230'>Service public - Vos droits</a>
                            </li>
                            <li>
                                <a href='https://travail-emploi.gouv.fr/emploi/emploi-et-handicap/prevention-et-maintien-dans-l-emploi/'>
                                    Emploi et handicap - Prévention et maintien dans l'emploi</a>
                            </li>
                        </ul>
                    </Row>
                </Container>
                <Modal className={'tc_modal'} isOpen={this.state.modalAuxVie} fade={false} centered>
                    <ModalHeader >Auxiliaire de vie</ModalHeader>
                    <ModalBody>
                        Personne qui vient à domicile pour aider à réaliser les activités de la vie quotidienne comme :  toilette, habillage, courses, repas, déplacements, participation à la vie sociale. Elle doit s’adapter aux capacités et à la pathologie de la personne pour favoriser son autonomie.<br/>
                        Pour qui : personne en situation de handicap, personne âgée en perte d’autonomie<br/>
                        Comment : demande auprès d’un prestataire de services, ou d’une association d’aides à domicile<br/>
                        Prise en charge : PCH pour les moins de 60ans, APA pour les plus 60ans<br/>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.triggerModalAuxVie} className={'buttonSecondary'} centered>Fermer</Button>
                    </ModalFooter>
                </Modal>
                <Modal className={'tc_modal'} isOpen={this.state.modalIDE} fade={false} centered>
                    <ModalHeader >IDE</ModalHeader>
                    <ModalBody>
                        Pour l’aide à la prise des médicaments, l’aide aux soins d’hygiène, faire les prises de sang, les pansements.<br/>
                        Comment :  prescription médicale, sur ordonnance.<br/>
                        Prise en charge : Sécurité sociale.<br/>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.triggerModalIDE} className={'buttonSecondary'}>Fermer</Button>
                    </ModalFooter>
                </Modal>
                <Modal className={'tc_modal'} isOpen={this.state.modalSESSAD} fade={false} centered>
                    <ModalHeader >Service d'Education Specialisée et de Soins à Domicile</ModalHeader>
                    <ModalBody>
                        Service mobile du secteur médico-social, il apporte aux familles conseils et accompagnement dans le but de favoriser l'inclusion scolaire et l'autonomie. Il met en place des actions de soins, de rééducation et d’enseignement dans les lieux de vie de l’élève handicapé.<br/>
                        Comment : décidé lors de l’élaboration du PPS par la CDAPH (MDPH)<br/>
                        Prise en charge : Sécurité sociale<br/>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.triggerModalSESSAD} className={'buttonSecondary'}>Fermer</Button>
                    </ModalFooter>
                </Modal>
                <Modal className={'tc_modal'} isOpen={this.state.modalAidant} fade={false} centered>
                    <ModalHeader >Aidant</ModalHeader>
                    <ModalBody>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.triggerModalAidant} className={'buttonSecondary'}>Fermer</Button>
                    </ModalFooter>
                </Modal>
                <Modal className={'tc_modal'} isOpen={this.state.modalPPS} fade={false} centered>
                    <ModalHeader >Plan Personnalisé de Scolarisation</ModalHeader>
                    <ModalBody>
                        Il s’agit d’un acte écrit qui sert à définir les besoins particuliers de l’élève dans sa scolarisation. Par exemple en aménageant l’emploi du temps pour permettre de poursuivre la rééducation, en demandant un accompagnement humain, du matériel pédagogique adapté…<br/>
                        Il est élaboré à l’aide d’une équipe pluridisciplinaire de la MDPH qui évalue les besoins.<br/>
                        Il peut concerner la scolarisation en maternelle, primaire ou secondaire.<br/>
                        Pour qui : élève en situation de handicap<br/>
                        Comment : la demande est faite auprès de la MDPH, par l’élève s’il est majeur et par les parents s’il est mineur. Il est préférable d’en parler avec l'enseignant référent avant.<br/>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.triggerModalPPS} className={'buttonSecondary'}>Fermer</Button>
                    </ModalFooter>
                </Modal>
                <Modal className={'tc_modal'} isOpen={this.state.modalAESH} fade={false} centered>
                    <ModalHeader >Accompagnant d'Elèves en Situation de Handicap</ModalHeader>
                    <ModalBody>
                        C’est une personne chargée de l’accompagnement de l’élève en situation de handicap pour l’aider à accomplir des gestes qu'il ne peut faire seul, faciliter le contact avec ses camarades de classe, tout en veillant à l'encourager dans ses progrès en autonomie. Elle travaille en collaboration avec l'enseignant. Il peut s’agir d’une aide individualisée en milieu ordinaire, ou collective dans les classes ULIS par exemple.<br/>
                        Pour qui : élève en situation de handicap<br/>
                        Comment : la demande est faite auprès de la MDPH pour être inclus dans le PPS. Une fois que le domaine d’activité et le quota d’heures est défini l’ AESH est recruté par le rectorat<br/>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.triggerModalAESH} className={'buttonSecondary'}>Fermer</Button>
                    </ModalFooter>
                </Modal>
                <Modal className={'tc_modal'} isOpen={this.state.modalULIS} fade={false} centered>
                    <ModalHeader >Unité Localisée pour l'Inclusion Scolaire</ModalHeader>
                    <ModalBody>
                        Classes qui réunissent des élèves qui ont un même type de handicap ou des besoins éducatifs proches. Accueil de 10 élèves maximum. Existe pour primaire, collège et lycée.<br/>
                        Pour qui : élève en situation de handicap dont la scolarisation en classe ordinaire n’est pas adaptée<br/>
                        Comment : l’admission est décidée lors de l’élaboration du PPS par la CDAPH (MDPH)<br/>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.triggerModalULIS} className={'buttonSecondary'}>Fermer</Button>
                    </ModalFooter>
                </Modal>
                <Modal className={'tc_modal'} isOpen={this.state.modalACPE} fade={false} centered>
                    <ModalHeader >Aménagement des conditions de passation des examens</ModalHeader>
                    <ModalBody>
                        WIP
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.triggerModalACPE} className={'buttonSecondary'}>Fermer</Button>
                    </ModalFooter>
                </Modal>
                <Modal className={'tc_modal'} isOpen={this.state.modalAmenLog} fade={false} centered>
                    <ModalHeader >Aménagement du logement</ModalHeader>
                    <ModalBody>
                        WIP
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.triggerModalAmenLog} className={'buttonSecondary'}>Fermer</Button>
                    </ModalFooter>
                </Modal>
                <Modal className={'tc_modal'} isOpen={this.state.modalVehic} fade={false} centered>
                    <ModalHeader >Véhicule</ModalHeader>
                    <ModalBody>
                        WIP
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.triggerModalVehic} className={'buttonSecondary'}>Fermer</Button>
                    </ModalFooter>
                </Modal>
                <Modal className={'tc_modal'} isOpen={this.state.modalMM} fade={false} centered>
                    <ModalHeader >Matériel médical</ModalHeader>
                    <ModalBody>
                        WIP
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.triggerModalMM} className={'buttonSecondary'}>Fermer</Button>
                    </ModalFooter>
                </Modal>
                <Modal className={'tc_modal'} isOpen={this.state.modalAT} fade={false} centered>
                    <ModalHeader >Aides techniques</ModalHeader>
                    <ModalBody>
                        WIP
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.triggerModalAT} className={'buttonSecondary'}>Fermer</Button>
                    </ModalFooter>
                </Modal>
                <Modal className={'tc_modal'} isOpen={this.state.modalCNED} fade={false} centered>
                    <ModalHeader>Centre National d'Enseignement à Distance</ModalHeader>
                    <ModalBody>
                        WIP
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.triggerModalCNED} className={'buttonSecondary'}>Fermer</Button>
                    </ModalFooter>
                </Modal>
                <Modal className={'tc_modal'} isOpen={this.state.modalAFTC} fade={false} centered>
                    <ModalHeader >Association Francaise des Traumatisés Crâniens</ModalHeader>
                    <ModalBody>
                        Il s’agit d’une association qui regroupe les personnes et leurs familles atteintes par une lésion cérébrale acquise. Elle permet de faciliter le contact entre les blessés et les familles, de les conseiller et les soutenir tout au long de la prise en charge. Elle représente et défend les intérêts et les droits auprès des instances décisionnelles, participe à des actions de prévention des accidents
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.triggerModalAFTC} className={'buttonSecondary'}>Fermer</Button>
                    </ModalFooter>
                </Modal>
                <Modal className={'tc_modal'} isOpen={this.state.modalPsySco} fade={false} centered>
                    <ModalHeader >Psychologue scolaire</ModalHeader>
                    <ModalBody>

                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.triggerModalPsySco} className={'buttonSecondary'}>Fermer</Button>
                    </ModalFooter>
                </Modal>
                <Modal className={'tc_modal'} isOpen={this.state.modalIME} fade={false} centered>
                    <ModalHeader >Institut Médico Educatif</ModalHeader>
                    <ModalBody>
                        Etablissement qui accueille les enfants handicapés, l’objectif est de dispenser une éducation et un enseignement spécialisé pour favoriser l’intégration dans les différents domaines de la vie, permettre une formation générale et professionnelle. Possible en externat et en internat.<br/>
                        Pour qui : enfants et adolescents handicapés présentant une déficience à prédominance intellectuelle<br/>
                        Comment : demande faite par la famille après notification de la MDPH<br/>
                        Prise en charge : Sécurité sociale<br/>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.triggerModalIME} className={'buttonSecondary'}>Fermer</Button>
                    </ModalFooter>
                </Modal>
                <Modal className={'tc_modal'} isOpen={this.state.modalDeplac} fade={false} centered>
                    <ModalHeader >Aide aux déplacements</ModalHeader>
                    <ModalBody>
                        WIP
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.triggerModalDeplac} className={'buttonSecondary'}>Fermer</Button>
                    </ModalFooter>
                </Modal>
                <Modal className={'tc_modal'} isOpen={this.state.modalSport} fade={false} centered>
                    <ModalHeader >Sport, loisirs</ModalHeader>
                    <ModalBody>
                        WIP
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.triggerModalSport} className={'buttonSecondary'}>Fermer</Button>
                    </ModalFooter>
                </Modal>
                <Modal className={'tc_modal'} isOpen={this.state.modalIEM} fade={false} centered>
                    <ModalHeader >Institut d'Education Motrice</ModalHeader>
                    <ModalBody>
                        Etablissement qui prend en charge les enfants dont la déficience motrice nécessite le recours à des moyens spécifiques pour le suivi médical, la rééducation, l’éducation spécialisée, la formation générale et professionnelle. L'accueil se fait en externat ou en internat.<br/>
                        Pour qui : enfants ou adolescents présentant un handicap moteur, associé ou non à un handicap cognitif, empêchant la scolarité en milieu ordinaire<br/>
                        Comment : l’admission est décidée lors de l’élaboration du PPS par la CDAPH (MDPH)<br/>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.triggerModalIEM} className={'buttonSecondary'}>Fermer</Button>
                    </ModalFooter>
                </Modal>
                <Modal className={'tc_modal'} isOpen={this.state.modalSEGPA} fade={false} centered>
                    <ModalHeader >Section d'Enseignement Général et Professionnel Adapté</ModalHeader>
                    <ModalBody>
                        Classe  qui accueille les jeunes de la 6e à la 3e ne maîtrisant pas toutes les connaissances et compétences attendues en fin de primaire. Intégrée dans un collège ordinaire, avec un maximum de 16 élèves pour individualiser le parcours de chacun.<br/>
                        Comment : proposée par l’équipe pédagogique de l’établissement<br/>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.triggerModalSEGPA} className={'buttonSecondary'}>Fermer</Button>
                    </ModalFooter>
                </Modal>
                <Modal className={'tc_modal'} isOpen={this.state.modalSIPFP} fade={false} centered>
                    <ModalHeader >Section d'Initiation et de Première Formation Professionnelle</ModalHeader>
                    <ModalBody>
                        Il accueille des adolescents handicapés pour apporter un complément de formation générale et une formation professionnelle adaptée à leur handicap. Il les prépare à l’exercice d’une activité professionnelle.<br/>
                        Pour qui : personne en situation de handicap de 14 à 20 ans<br/>
                        Comment : demande à faire auprès de la MDPH<br/>
                        Prise en charge : Sécurité sociale<br/>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.triggerModalSIPFP} className={'buttonSecondary'}>Fermer</Button>
                    </ModalFooter>
                </Modal>
            </section>
        );
    }
}