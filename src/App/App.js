import React, { Component } from "react";
import Home from "../Home/Home";
import Artists from "../Artists/Artists"
import Songs from "../Songs/Songs"
import "./App.css";
import {Route, Link} from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artists: [],
      songs: [],
      test: "something"
    };
  }

  componentDidMount(){
    const urlA = "https://super-genius-back.herokuapp.com/artist"
    const urlB = "https://super-genius-back.herokuapp.com/songs"
    fetch(urlA)
    .then(response=>response.json())
    .then(data=>{
      // console.log(data)
      this.setState({artists: data})
    })
    fetch(urlB)
    .then(response=>response.json())
    .then(data=>{
      // console.log(data)
      this.setState({songs: data})
    })

  }
  deleteSong = (id) => {
    console.log("deleted me:",id)
    fetch('https://super-genius-back.herokuapp.com/songs/'+id,{method: "DELETE"})
    .then(resp=>resp.json())
    .then(deleteResp=>{
      const updatedSongs = this.state.songs.filter(song=>song._id!==id)
      this.setState({songs: updatedSongs})
    })
  }

  
  render() {
    return (
      <div>
        <nav>
          <h1>Super Genius</h1>
          <Link to="/">Home</Link>
          <Link to="/artists">artists</Link>
          <Link to="/songs">songs</Link>
        </nav>
        <main>
          <Route exact path='/' component={Home}/>
          <Route path='/artists' render={(renderProps)=><Artists {...renderProps} artists={this.state.artists}/>}/>
          <Route path='/songs' render={(renderProps)=><Songs deleteSong={this.deleteSong} {...renderProps} songs={this.state.songs}/>}/>
        </main>
      </div>
    );
  }
}

export default App;


// <Route
// path='/artists'
// render={(props) => (
//   <Artists {...props} isAuthed={true} />
// )}
// />