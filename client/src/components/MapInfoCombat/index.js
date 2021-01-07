import React from "react";
import "./style.css";


function MapInfoCombat(props) {
    
    return (

        <div>
            <div className="map-stats">
                <p>Tier: {props.locdata ? props.locdata.tier : ""}</p>
                <p>Name: {props.locdata ? props.locdata.name : ""}</p>
                <p>Experience: {props.locdata ? props.locdata.experience : ""}</p>
            </div>
        </div>

    )
}

export default MapInfoCombat;
