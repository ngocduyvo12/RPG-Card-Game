import React from "react";
import "./style.css";

function EnemyCards(props) {
    console.log(props)
    return (
        <>
            <div className="img-container enemy-img-container">
                <img id="enemy-card" alt={props.monster ? props.monster.name : ""} src={`${process.env.PUBLIC_URL}/img/cards/${props.monster ? props.monster.image : ""}`} />
            </div>
            <div className="enemy-stats">
                <p>Name: {props.monster ? props.monster.name : ""}</p>
                <p>Health: {props.hitpoints}</p>
                <p>Attack: {props.attack}</p>
                <p>Defense: {props.defense}</p>
            </div>
        </>
    )
}

export default EnemyCards;
