import React from "react";

function Artist(props) {
    return(
        <div>
            <h1>{props.name}</h1>
            <p>{props.playcount}</p>
            <p>{props.url}</p>
        </div>
    )
}

export default Artist;