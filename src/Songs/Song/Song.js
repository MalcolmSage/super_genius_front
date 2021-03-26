import React from "react";

function Song(props) {
    return(
        <div>
            <h1>{props.name}</h1>
            <p>{"playcount " + props.playcount}</p>
            <button onClick={()=> props.deleteSong(props._id)}></button>
        </div>
    )
}

export default Song;