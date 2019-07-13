import React, {Component} from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBell, faBug, faCheck, faExclamationTriangle, faTimes} from '@fortawesome/free-solid-svg-icons'
import colors from '../css/colors'


const time = 4000;

function NotificationText({color, text}) {
    return <p style={{color: color}} className={'notification_text'}>{text}</p>
}

function NotificationIcon({color, icon, onClick}) {
    return <FontAwesomeIcon color={color} className={'notification_icon'} icon={icon} onClick={onClick}/>

}


class Avatar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            verbose: props.verbose,
            message: props.message,
            defaut_color: colors.colorPrimary,
            active: true,
        };
        let ctx = this;
        setTimeout(function () {
            ctx.setState({active: false});
            if (props.action) props.action();
        }, time)


    }

    close = () => {
        this.setState({active: false})
    };

    render() {
        const {verbose, message, active} = this.state;
        let className = '';
        let icon = null;
        switch (verbose) {
            case 'success' :
                className = 'n_green';
                icon = faCheck;
                break;
            case 'warning' :
                className = 'n_orange';
                icon = faExclamationTriangle;
                break;
            case 'error' :
                className = 'n_red';
                icon = faBug;
                break;
            case 'information' :
                className = 'n_default';
                icon = faBell;
                break;
            default :
                className = 'n_default';
                icon = faBell;
                break
        }
        return (
            <div className={active ? className + ' notification visible' : className + ' notification invisible'}>
                <NotificationIcon icon={icon}/>
                <NotificationText text={message}/>
                <NotificationIcon icon={faTimes} onClick={this.close}/>
            </div>
        );
    }
}


export default Avatar;
