import React from "react";
import firebase from "../firebase";
import View from "./View";

class Controller extends React.Component {

    componentDidMount(){
        this.getRoutes();

    }

    constructor(props){
        super(props);
        this.state ={
            route : this.props.route,
            view:'Accueil', //vue par defaut
        };

    }

    getRoutes = () =>{
        let ctx = this;
        let app_route = ctx.state.route;
        firebase.database().ref('/routes').once('value').then(function (snapshot) {
            Object.values(snapshot.val()).map((route,i)=>{
                if (route === app_route){
                    ctx.setState({view:Object.keys(snapshot.val())[i]});
                    //si ce n'est pas égal a la route par defaut, on redirige
                    //if( window.location.pathname !== '/') window.location = app_route+Object.keys(snapshot.val())[i]; // "/acceuil" etc
                }else{
                    ctx.setState({view:'Accueil'});
                }
            })
        });

    };


    render(){
        let route = this.state.route;

        return(
            <div>
            <View route={route} />
            </div>

        )
    }


}


export default Controller;