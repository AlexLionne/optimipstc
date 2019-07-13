import React from 'react';
import {Group} from '@vx/group';
import {Tree} from '@vx/hierarchy';
import {LinkHorizontal} from '@vx/shape';
import {hierarchy} from 'd3-hierarchy';
import {LinearGradient} from '@vx/gradient';
import styles from '../css/styles'
import anime from "../anime.es";
import {Card, CardBody, CardImg, CardText, CardTitle} from "reactstrap";
import test from "../assets/images/test.png"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTimes} from '@fortawesome/free-solid-svg-icons'
import posed from "react-pose/lib/index";


const peach = '#fd9b93';
const pink = '#fe6e9e';
const transparent = 'transparent';

const CardAnim = posed.div({
    hidden: {opacity: 0},
    visible: {opacity: 1}
});


/**
 *
 * @param obj
 * @param list
 * @returns {*}
 */
function containsObject(obj, list) {
    return list.some(elem => (elem.data.name === obj.data.name && elem.data.name !== " "))
}

/**
 *
 * @param obj
 * @param list
 * @returns {*}
 */
function containsAdvancedObject(obj, list) {
    return list.some(elem => (elem.source.data.name === obj.source.data.name && elem.source.data.name !== " "))
}


class ParcoursSoins extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            node: null,
            card_isopen: false,
        }
    }

    setNode = (node) => {
        if (node.data.text !== null) {
            this.setState({node: node});
            this.setState({card_isopen: true});
        }

    };
    closeCard = () => {
        this.setState({card_isopen: !this.state.card_isopen});
    };

    Node = ({node}) => {

        const width = node.data.size;
        const height = 30;
        const centerX = -width / 2;
        const centerY = -height / 2;
        const isRoot = node.depth === 0;
        const isParent = !!node.children || node.data.common_child !== null;

        if (isRoot) return <this.RootNode node={node}/>;
        if (isParent) return <this.ParentNode node={node}/>;

        return (
            <Group top={node.x} left={node.y}>
                <rect
                    height={height}
                    width={width}
                    y={centerY.toString()}
                    x={centerX.toString()}
                    fill={node.data.color}
                    rx={15}
                    onClick={() => {
                        this.setNode(node);
                    }}
                />
                <text
                    dy={'.33em'}
                    fontSize={this.props.options.textSize}
                    fontFamily="Arial"
                    textAnchor={'middle'}
                    fill={this.props.options.textColor}
                    style={{pointerEvents: 'none'}}
                >
                    {node.data.name}
                </text>
            </Group>
        );
    };

    RootNode = ({node}) => {
        return (
            <Group top={node.x} left={node.y}>
                <circle r={8 * node.data.name.length} fill="url('#lg')"/>
                <text
                    fontWeight={"bold"}
                    dy={'.33em'}
                    fontSize={this.props.options.textSize}
                    fontFamily="Arial"
                    textAnchor={'middle'}
                    style={{pointerEvents: 'none'}}
                    fill={this.props.options.textColor}
                >
                    {node.data.name}
                </text>
            </Group>
        );
    };

    ParentNode = ({node}) => {
        const width = node.data.size;
        const height = 30;
        const centerX = -width / 2;
        const centerY = -height / 2;
        return (
            <Group top={node.x} left={node.y}>
                <rect
                    height={height}
                    width={width}
                    y={centerY.toString()}
                    x={centerX.toString()}
                    rx={15}
                    fill={node.data.name === " " ? transparent : node.data.color}
                    onClick={
                        () => {
                            this.setNode(node);
                        }}
                    strokeWidth={node.data.name === " " ? 0 : 1}/>

                <text
                    dy={'.33em'}
                    fontSize={this.props.options.textSize}
                    fontFamily="Arial"
                    textAnchor={'middle'}
                    style={{pointerEvents: 'none'}}
                    fill={this.props.options.textColor}
                >
                    {node.data.name}
                </text>
            </Group>
        );
    };


    resize = () => this.forceUpdate();

    componentDidMount() {
        window.addEventListener('resize', this.resize)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resize)
    }

    animate() {
        anime({
            targets: '.vx-link',
            strokeDashoffset: [anime.setDashoffset, 0],
            easing: 'easeInOutSine',
            duration: 1500,
            delay: function (el, i) {
                return i * 250
            },
            direction: 'alternate',
            loop: false
        })
    };

    render() {
        let width = this.props.parentWidth;
        let height = 600;
        const options = this.props.options;
        const tree = this.props.schema;
        const data = hierarchy(tree);
        const margin = {
            top: 100,
            left: 100,
            right: 200,
            bottom: 24
        };
        let sources = [];
        let final_sources = [];

        const yMax = height - margin.top - margin.bottom;
        const xMax = width - margin.left - margin.right;
        return (<div style={{width: width, height: height, overflowX: 'auto'}}>
            <svg width={width} height={height}>
                <LinearGradient id="lg" from={peach} to={pink}/>
                <rect width={width} rx={14} height={height} fill={options.backgroundColor}/>
                <Tree root={data} size={[yMax, xMax]}>
                    {tree => {
                        return (
                            <Group top={margin.top} left={margin.left}>
                                {tree.links().map((link, i) => {

                                    if (link.source.data.common_child === link.target.data.id) {
                                        if (!containsObject(link.target, sources)) {
                                            sources.push(link.target);
                                        }

                                    }
                                    if (link.target.data.common_child !== null) {
                                        if (!containsObject(link.target, sources)) {
                                            sources.push(link.target);
                                        }
                                    }
                                    sources.map((source, i) => {
                                        if (source.data.common_child !== null) {
                                            let child_id = source.data.common_child;
                                            sources.map((sub_source, j) => {
                                                if (sub_source.data.id === child_id) {
                                                    if (!containsAdvancedObject({
                                                        source: source,
                                                        target: sub_source
                                                    }, final_sources)) {
                                                        final_sources.push({source: source, target: sub_source})
                                                    }
                                                }
                                            });
                                        }
                                    });
                                    if (link.target.data.visible !== undefined) {
                                        if (this.props[Object.keys(link.target.data.visible)[0]] !== undefined) {
                                            if (this.props[Object.keys(link.target.data.visible)[0]] === link.target.data.visible[Object.keys(link.target.data.visible)[0]]) {
                                                return (<LinkHorizontal
                                                    key={'link-' + i}
                                                    data={link}
                                                    stroke={options.lineColor}
                                                    strokeWidth={options.lineHeight}
                                                    fill="none"
                                                />);
                                            }
                                        }
                                    } else {
                                        return (<LinkHorizontal
                                            key={'link-' + i}
                                            data={link}
                                            stroke={options.lineColor}
                                            strokeWidth={options.lineHeight}
                                            fill="none"
                                        />);
                                    }
                                })}
                                {final_sources.map((source, j) => {
                                    if (source.source.data.visible !== undefined) {
                                        if (this.props[Object.keys(source.source.data.visible)[0]] === source.source.data.visible[Object.keys(source.source.data.visible)[0]]) {
                                            return (<LinkHorizontal
                                                key={'link-' + j + 10}
                                                data={source}
                                                stroke={options.lineColor}
                                                strokeWidth={options.lineHeight}
                                                fill="none"
                                            />);
                                        }
                                    } else {
                                        return (
                                            <LinkHorizontal
                                                key={'link-' + j + 10}
                                                data={source}
                                                stroke={options.lineColor}
                                                strokeWidth={options.lineHeight}
                                                fill="none"
                                            />
                                        );
                                    }
                                })}
                                {tree.descendants().map((node, i) => {
                                        if (node.data.illustration !== null) {

                                        }
                                        if (node.data.visible !== undefined) {
                                            if (this.props[Object.keys(node.data.visible)[0]] !== undefined) {
                                                if (this.props[Object.keys(node.data.visible)[0]] === node.data.visible[Object.keys(node.data.visible)[0]]) {
                                                    console.log(node);
                                                    return (<this.Node key={`node-${i}`} node={node}/>);
                                                }
                                            }
                                        } else {
                                            return <this.Node key={`node-${i}`} node={node}/>;
                                        }

                                        // si on veut animer les branches
                                        //this.animate(node)
                                    }
                                )}
                            </Group>
                        );

                    }
                    }
                </Tree>
            </svg>
            <CardAnim pose={this.state.card_isopen ? 'visible' : 'hidden'}>
                <Card style={styles.card_detail}>
                    <CardBody>
                        <CardTitle style={{
                            width: 'auto',
                            fontWeight: 'bold',
                            color: '#000',
                            display: 'inline-block'
                        }}>{this.state.node !== null ? this.state.node.data.name : null}</CardTitle>
                        <FontAwesomeIcon color={"#000"} style={{float: 'right', display: 'inline-block'}}
                                         onClick={this.closeCard} icon={faTimes}/>
                        <CardText>
                            {this.state.node !== null ? this.state.node.data.text : null}
                        </CardText>
                    </CardBody>
                </Card>
            </CardAnim>

        </div>);

    }

}

export default ParcoursSoins;