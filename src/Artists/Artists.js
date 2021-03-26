import React, { Component } from "react";
import Artist from "./Artist/Artist"

class Artists extends Component {
  render() {
    // let test = this.props.artists.map(item => {console.log(item)})
    let anArtist = [];
    for (let i=0; i<this.props.artists.length; i++) {
      let newArtistObject = this.props.artists[i];
      anArtist.push(<Artist key={newArtistObject._id} name={newArtistObject.name} playcount={newArtistObject.playcount} url={newArtistObject.url}/>)
    }
    return (
      <div>
        <h1>Artists</h1>
        <p>A music app based on data from LastFM</p>
        {anArtist}
      </div>
    );
  }
}

export default Artists;




