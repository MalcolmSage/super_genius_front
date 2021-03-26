import React, { Component } from "react";
import Song from "./Song/Song"

class Songs extends Component {
  render() {
    // let test = this.props.artists.map(item => {console.log(item)})
    let aSong = [];
    for (let i=0; i<this.props.songs.length; i++) {
      let newSongObject = this.props.songs[i];
      aSong.push(<Song key={newSongObject._id} deleteSong={this.props.deleteSong} _id={newSongObject._id} name={newSongObject.name} playcount={newSongObject.playcount} url={newSongObject.url}/>)
    }
    return (
      <div>
        <h1>Songs</h1>
        <p>A music app based on data from LastFM</p>
        {aSong}
      </div>
    );
  }
}

export default Songs;




