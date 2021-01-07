import React, { Component } from "react";
import { Link } from 'react-router-dom';
import Druid from "../Druid"
import Warrior from "../Warrior"
import Mage from "../Mage"
import API from "../../utils/API"
import "./style.css";

class Welcome extends Component {

    state = {
        class: "",
        redirect: false
    }

    componentDidMount() {
        this.createNewCardsForUser()
    }
    
    createNewCardsForUser = () => {
        API.initCards(this.props.match.params.id)
        .then(res => console.log(res))
        .catch(err => console.log(err))

    }

    classInfo = () => {
        if (this.state.class === "") {
            return <h3>Select A Class For More Information</h3>
        } else if (this.state.class === "Druid") {
            return <Druid />
        } else if (this.state.class === "Warrior") {
            return <Warrior />
        } else if (this.state.class === "Mage") {
            return <Mage />
        }
    }

    showPlay = () => {
        if (this.state.redirect) {
            return <Link to={`/home/${this.props.match.params.id}`}><button className="btn-lg btn-dark">Play Now</button></Link>
        } else {
            return <h3>Please Choose A Class Above To Start Playing!</h3>
        }
    }

    setRedirect = () => {
        this.setState({
            redirect: true
        })
    }

    selectDruid = (event) => {
        event.preventDefault()
        this.setState({ class: "Druid" });
        this.setRedirect();
    }

    selectWarrior = (event) => {
        event.preventDefault()
        this.setState({ class: "Warrior" });
        this.setRedirect();
    }

    selectMage = (event) => {
        event.preventDefault()
        this.setState({ class: "Mage" });
        this.setRedirect();
    }

    render() {
        return (
            <div className="container jumbotron" id="class-choice">
                <h1>Welcome To Reign of React</h1>
                <p>Thank you for joining us on this adventure, to begin playing, please select from available classes below.</p>
                <p>Once you have selected a class, you will be awarded with four random cards and the game will begin, best of luck!</p>
                <div className="row">
                    <div className="col-md-4 class-available">
                        <h3>Currently Available Classes:</h3>
                        <button className="btn-lg btn-success" onClick={this.selectDruid}>Druid</button>
                        <button className="btn-lg btn-danger" onClick={this.selectWarrior}>Warrior</button>
                        <button className="btn-lg btn-primary" onClick={this.selectMage}>Mage</button>
                    </div>
                    <div className="col-md-8 class-description">
                        {this.classInfo()}
                    </div>
                    <div className="col-md-12 random-card">
                        {this.showPlay()}
                    </div>
                </div>
            </div>
        )
    }
}

export default Welcome;
