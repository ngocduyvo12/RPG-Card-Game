import React, { Component } from "react";
import "./player-stat.css"

class Player extends Component {

    render() {
        return (
            <>
                <div className="player-stat-fix">
                    <h3>Name: {this.props.userName}</h3>
                    <h5>Level: {this.props.lvl}</h5>
                    <h5>Attack: {this.props.attack}</h5>
                    <h5>Defense: {this.props.defense}</h5>
                    <h5>Health: {this.props.health}</h5>
                </div>
            </>
        )
    }
}

export default Player;