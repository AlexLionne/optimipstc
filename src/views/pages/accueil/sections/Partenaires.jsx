import React from 'react';
import Collapsible from 'react-collapsible';
import {Card, CardBody, CardImg, CardText, CardTitle, Col, Collapse, Container, Media, Row,} from 'reactstrap';
import '../../../../css/index.css';
import '../../../../css/container.css';
import header2 from '../../../../assets/images/header2.png';
import ars from '../../../../assets/images/ars_occitanie.png';
import chu from '../../../../assets/images/chu.jpg';
import isis from '../../../../assets/images/isis.jpg';
import irit from '../../../../assets/images/irit.png';
import inserm from '../../../../assets/images/inserm.jpg';
import ymca from '../../../../assets/images/ymca.jpg';
import unaftc from '../../../../assets/images/unaftc.png';
import chum from '../../../../assets/images/chum.png';
import IHNPS from '../../../../assets/images/IHNPS.jpg';

export default class SectionTwo extends React.Component {

    constructor(props){
        super(props);
    }



    render() {
        var open = 3;
        return (

            <section className={'section'}>
                <img style={{position:'absolute',top:0,bottom:0,right:0,margin:'auto'}} height={'100%'} width={'auto'} src={header2}/>
                <Container  className={'second-container-set'}>
                    <h2>
                        Nos partenaires / Instances
                    </h2>
                    <Row>
                        <Col xs="9">
                            <Card>
                            <Collapsible trigger="Agence Régionale de Santé Occitanie">
                                <div  className={'img-center'}>
                                <a href="https://www.occitanie.ars.sante.fr" target="_blank">
                                    <img src={ars} alt="ARS" className={'img-equipe'}></img>
                                </a>
                                </div>
                                <p>L’Agence Régionale de Santé de la région Occitanie (ARS) qui agit en concertation avec l’ensemble des acteurs du monde de la santé dans chaque territoire de la grande région Occitanie sur des missions portant sur l’ensemble des domaines de la santé : prévention et promotion de la santé, veille et sécurité sanitaire, santé environnementale, organisation de l’offre de soins de premier recours et dans les établissements de santé, accompagnement dans les structures médico-sociales.</p>
                            </Collapsible>
                                <Collapsible trigger="Institut des Handicaps Neurologiques, Psychiatriques et Sensoriels ">
                                    <div  className={'img-center'}>
                                        <a href="https://www.chu-toulouse.fr/-institut-des-handicaps-neurologiques-" target="_blank">
                                            <img src={IHNPS} alt="IHNPS" className={'img-equipe-unaftc'}></img>
                                        </a>
                                    </div>
                                    <p>
                                        Le projet est réalisé dans le cadre de l’Institut des Handicaps Neurologiques, Psychiatriques et Sensoriels (IHNPS) qui regroupe les forces de soin, recherche et enseignement des différents pôles médicaux et médico-techniques du CHU de Toulouse autour de la thématique commune des handicaps invisibles. Face au défi majeur que représentent les handicaps cognitifs, psychiques et sensoriels, l'Institut HNPS a pour mission de promouvoir une démarche d'excellence en termes de recherche clinique et de soins médicaux dédiés à ces pathologies, en s'appuyant sur les forces scientifiques et médicales des équipes du CHU de Toulouse.<br/>
                                        Afin de proposer une prise en charge optimale des handicaps neurologiques, psychiatriques et sensoriels pour chaque individu, les missions de l'Institut HNPS sont de :<br/>
                                        <ul>
                                            <li>
                                                décloisonner les disciplines et les professions, afin de fédérer et de mutualiser les savoir-faire des différents acteurs du soin et de la prise en charge des patients présentant un ou des handicaps ;
                                            </li>
                                            <li>
                                                générer du savoir et faire émerger des hypothèses et des projets de recherche innovants autour de la notion de handicap ;
                                            </li>
                                            <li>
                                                favoriser la transmission des connaissances autour du handicap.
                                            </li>
                                        </ul>
                                    </p>
                                </Collapsible>
                                <Collapsible trigger="FHU sur les Handicaps Cognitifs, Psychiques et Sensoriels">
                                    <div  className={'img-center'}>
                                        <a href="http://tmbi.fr/fhu-hopes/" target="_blank">
                                            <img src={chu} alt="FHU HoPeS" className={'img-equipe'}></img>
                                        </a>
                                    </div>
                                    <p>
                                        Le projet est soutenu par la Fédération Hospitalo-Universitaire (FHU) sur les Handicaps Cognitifs, Psychiques et Sensoriels (HoPeS), elle-même soutenue par les trois tutelles. Coordonnée par les Professeurs Christophe Arbus (Psychiatrie et Psychologie Médicale), Jérémie Pariente (Neurologie cognitive et Neuropsychologie), et Déborah Méligne (Cheffe de Projet), elle englobe les différentes disciplines qui touchent à la thématique des handicaps dans le cadre de pathologies chroniques dans le champ des maladies neurologiques, psychiatriques et sensorielles et rassemble depuis 2016 les acteurs du soin, de la formation et de la recherche autour des handicaps invisibles. Son but : fédérer les expertises complémentaires, optimiser la lisibilité et la visibilité de la recherche et renforcer les synergies entre soin, enseignement et recherche. Sa création repose sur une base d'interactions fortes entre ces différentes disciplines. Une perspective originale « tout au long de la vie » a été choisie afin de proposer une vision globale de l'enfance à l'âge adulte et 3 axes thématiques ont été identifiés : 1) Dépistage, diagnostic et interventions précoces ; 2) Suivi et évaluation tout au long de la vie ; 3) Prévention, remédiation et réadaptation.
                                    </p>
                                </Collapsible>
                            <Collapsible trigger="CHU Toulouse">
                                <div  className={'img-center'}>
                                    <a href="https://www.chu-toulouse.fr" target="_blank">
                                        <img src={chu} alt="CHU Toulouse" className={'img-equipe'}></img>
                                    </a>
                                </div>
                                    <CardText>Au cœur de la région Occitanie Ouest et d’une agglomération au taux de croissance démographique soutenu, le Centre Hospitalier Universitaire (CHU) de Toulouse est la structure sanitaire de référence. Il prend en charge environ 280 000 malades et 800 000 consultants chaque année, ce qui le situe au quatrième rang des hôpitaux français en terme d’activité. Dans le domaine des soins, le CHU de Toulouse se distingue, depuis 20 ans, en tête des palmarès réalisés par la presse nationale. Par ailleurs, le développement de l'excellence est l'une des priorités du projet d'établissement du CHU de Toulouse "Stratégie Horizon 2018". Cela passe par l'intensification de la recherche, afin de placer à parts égales cette activité avec la mission de soin et d'enseignement, permettant de répondre pleinement à la vocation universitaire. Cet objectif majeur du plan stratégique a conduit à mieux structurer la recherche du CHU en regroupant les équipes des pôles cliniques et médico-techniques en Instituts et en FHU pour dynamiser, mieux organiser, fédérer et valoriser les forces de recherche dans le but de faire bénéficier rapidement les patients des dernières innovations. Au sein du CHU, notre projet est tout spécialement supporté par la Direction de la Recherche et De l'Innovation (DRDI) CHU de Toulouse et la Direction des systèmes d’information et de l’organisation (DSIO) CHU de Toulouse.</CardText>
                            </Collapsible>
                                <Collapsible trigger="CHU Montpellier">
                                    <div  className={'img-center'}>
                                        <a href="http://www.chu-montpellier.fr/fr/patients-et-visiteurs/" target="_blank">
                                            <img top src={chum} alt="CHU Montpellier" className={'img-equipe'}></img>
                                        </a>
                                    </div>
                                    <p>Lieu historique d'exercice de la médecine, avec la plus vieille faculté du monde occidental toujours en activité, Montpellier a toujours été profondément marquée par l'histoire de ses hôpitaux. Le Centre Hospitalier Universitaire de Montpellier est désormais l’un des premiers centres français en termes d’activités de référence, de recherche et d’enseignement. Il répond ainsi aux besoins de proximité des 700 000 habitants de Montpellier et du Cœur Hérault, tout en intégrant son offre de soins dans des prises en charge territorialisées. Le CHU de Montpellier a pour missions fondamentales le soin, l'enseignement, la recherche, mais aussi la prévention, l'éducation en santé et la lutte contre l'exclusion sociale. Il s'organise son offre de soin autour de 13 pôles hospitalo-universitaires regroupant toutes les spécialités médico-chirurgicales et répartis dans plusieurs sites géographiques au nord-est de Montpellier. La recherche clinique quant à elle représente une activité phare au sein du CHU de Montpellier. Plus de 1200 essais cliniques sont en cours au CHU en 2018, soit de promotion CHU, soit de promotion industrielle, soit de promotion en partenariat avec un autre établissement public.</p>
                                </Collapsible>
                            <Collapsible trigger="Ecole d'Ingénieurs ISIS">
                                <div  className={'img-center'}>
                                <a href="http://isis.univ-jfc.fr" target="_blank">
                                    <img src={isis} alt="Ecole ISIS" className={'img-equipe'}></img>
                                </a>
                                </div>
                                <CardText>L’école d’ingénieurs ISIS Castres est une entité de l’Institut National Universitaire Jean-François Champollion (4000 étudiants) et partenaire du groupe INSA. ISIS délivre des diplômes d’ingénieur en Informatique pour la santé. Cette école compte aujourd’hui dans les leaders Français en ingénierie dédiée à la santé. La recherche en e-santé a débuté il y a une dizaine d’année avec une équipe multidisciplinaire d’enseignants chercheurs rattachés aux différents laboratoires Toulousains. ISIS représente aujourd’hui l’antenne ‘santé’ du laboratoire de recherche en informatique de Toulouse (IRIT) sur le Tarn. Cette école possède un living lab CHL (Connected Health Lab) qui a été lancé il y a quatre ans dans l’objectif d’accélérer l’innovation dans l'écosystème de la e-santé. Autant les experts internes qu’externes au CHL peuvent être fédéré ensemble autour de projets R&D innovants. Le CHL est une plateforme technologique de 220 m2 dont la vocation est d’évaluer des usages et des pratiques de santé connectée. À ce titre, il est reconnu comme un living lab et est membre du forum des living labs en santé et autonomie (réseau national). Par son positionnement stratégique, le CHL offre une infrastructure et des services pour faciliter l’innovation ouverte au service du progrès de la santé publique autour de la notion de parcours du patient (parcours de vie, de santé et de soins). Il dispose de 5 pièces emblématiques des épisodes de santé en établissement hospitalier ou au domicile. En tant que Living lab, le CHL favorise le développement d’approches centrées utilisateur qui permettent de réduire les écarts entre la communauté d’ingénierie, les acteurs socio-économiques ainsi que la communauté industrielle.</CardText>
                            </Collapsible>
                            <Collapsible trigger="Institut de Recherche Informatique de Toulouse">
                                <div  className={'img-center'}>
                                <a href="https://www.irit.fr" target="_blank">
                                    <img src={irit} alt="IRIT" className={'img-equipe'}></img>
                                </a>
                                </div>
                                <p>L’Institut de Recherche en Informatique de Toulouse (IRIT, CNRS/UMR 5505) représente un des plus forts potentiels de la recherche en informatique en France avec un effectif global de près de 700 personnes dont 254 chercheurs et enseignants-chercheurs, 256 doctorants, 120 chercheurs contractuels post-docs et invités, 43 ingénieurs et administratifs. Les 24 équipes de recherche du laboratoire sont structurées en sept départements qui couvrent l’ensemble des domaines de l’informatique actuelle. L’équipe SIG (Systèmes d’Informations Généralisés) du département gestion de données, est l’équipe rassemblant le plus important effectif (21 permanents, environ 30 doctorants et post-doctorants). Ses recherches s’articulent autour de l’intégration de données et de connaissances hétérogènes, de la modélisation et de la manipulation des masses de données (data warehouses/data marts, data lakes, multi-stores noSQL), et de l’analyse des données massives (big data), en particulier par des approches de fouilles de données (data mining), d’apprentissage automatique (machine learning), et du développement des réseaux neuronaux artificiels (deep learning)</p>
                            </Collapsible>
                            <Collapsible trigger="Institut National de la Santé et de la Recherche Médicale">
                                <div  className={'img-center'}>
                                <a href="http://www.u1027.inserm.fr" target="_blank">
                                    <img src={inserm} alt="INSERM" className={'img-equipe-inserm'}></img>
                                </a>
                                </div>
                                <p>L’Inserm, Institut National de Santé et de Recherche Médicale; notamment l’Unité Mixte de Recherche 1214, Toulouse NeuroImaging Center (ToNIC), qui a pour objectif principal l'étude du cerveau humain et des principales pathologies qui l'affectent http://tonic.inserm.fr/ et l’unité 1027, pôle de recherche en épidémiologie et santé publique qui vise à mieux comprendre et analyser les enjeux médicaux et sociétaux dans les domaines des maladies chroniques et des handicaps aux différents âges de la vie.</p>
                            </Collapsible>
                            <Collapsible trigger="Association YMCA">
                                <div  className={'img-center'}>
                                <a href="https://ymca.fr" target="_blank">
                                    <img src={ymca} alt="Association YMCA" className={'img-equipe-inserm'}></img>
                                </a>
                                </div>
                                <p>L’Association YMCA de Colomiers qui accueille et accompagne toute personne en situation de handicap d’exclusion ou de discrimination dans la réalisation de sa vie avec (1) un ESAT (320 personnes accueillies) pour les personnes qui n’ont pas la capacité de travail requise en entreprise ordinaire ou adaptée ; (2) du soutien de projet professionnel de salariés en situation de handicap (200 salariés au total) ; (3) un hébergement pour les travailleurs ou adultes handicapés (160 places d’hébergement) ; (4) un accompagnement en Milieu Ouvert pour le soutien de personnesen situation de handicap dans la vie de tous les jours ; (5) des modules de formation des publics en situation de handicap.</p>
                            </Collapsible>
                            <Collapsible trigger="Association UnafTC">
                                <div  className={'img-center'}>
                                <a href="http://www.traumacranien.org" target="_blank">
                                    <img src={unaftc} alt="Association UnafTC" className={'img-equipe-unaftc'}></img>
                                </a>
                                </div>
                                <p>L'Union Nationale des Associations de Familles de Traumatisés crâniens et de Cérébro-lésés créée en 1986. Il s'agit d'une association loi 1901 à but non lucratif reconnue d'intérêt général qui regroupe 52 Associations de Familles de Traumatisés crâniens et de Cérébro-lésés (AFTC), 96 établissements et services dédiés à l'accueil des personnes cérébro-lésées et 40 Groupes d'Entraide Mutuelle (GEM) portés par des associations de personnes cérébro-lésées. L’AFTC 31 est extrêmement active.</p>
                            </Collapsible>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>
        );
    }
}