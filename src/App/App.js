import React, { Component } from "react";
import Home from "../Home/Home";
import Artists from "../Artists/Artists"
import Songs from "../Songs/Songs"
import "./App.css";
import {Route, Link} from "react-router-dom";

class App extends Component {

  render() {
    return (
      <div>
        <Link className="SGenius"to="/">Super Genius</Link>
        <nav>
          <Link to="/artists">artists</Link>
          <Link to="/songs">songs</Link>
        </nav>
        <main>
          <Route exact path='/' component={Home}/>
          <Route path='/artists' component={Artists}/>
          <Route path='/songs' component={Songs}/>
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