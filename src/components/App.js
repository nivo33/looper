import React, { Component } from 'react';
import '../styling/App.css';
import Track from './Track.js'

class App extends Component {
  render() {
    return (
<div className="container">
    <link
      rel="stylesheet"
      href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css"
    />
    <link
      href="https://fonts.googleapis.com/css?family=Roboto:100,400,700"
      rel="stylesheet"
      type="text/css"
    />

    <h1>Looper</h1>
    <ul>
      <li><Track src='https://s3.amazonaws.com/candidate-task/Track+1.mp3' artist='Hey' name='Erik Brown' bpm='150'/> </li>
      <li><Track src='https://s3.amazonaws.com/candidate-task/Track+1.mp3' artist='Heey' name='Erik Brown' bpm='150'/> </li>
    </ul>
    <div className="footer">Niv Oppenhaim</div>
  </div>);
  }
}

export default App;
