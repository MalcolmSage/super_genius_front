import React from "react";

function Song(props) {
    return(
        <div>
            <h1>{props.name}</h1>
            <p>{"playcount " + props.playcount}</p>
        </div>
    )
}

export default Song;