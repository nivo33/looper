import React, { Component } from 'react';
import '../styling/App.css';
import Track from './Track.js'

const songs=
[{
  'Id':1,
  'url':'https://s3.amazonaws.com/candidate-task/Track+1.mp3',
  'owner':'Ori Winokur',
  'bpm':120
  },{
  'Id':2,
  'url':'https://s3.amazonaws.com/candidate-task/Track+2.mp3',
  'owner':'Yonatan Pistiner',
  'bpm':100
  },{
  'Id':3,
  'url':'https://s3.amazonaws.com/candidate-task/Track+3.mp3',
  'owner':'Barak Inbar',
  'bpm':123
  }, {
  'Id':4,
  'url':'https://s3.amazonaws.com/candidate-task/Track+4.mp3',
  'owner':'Ori Winokur',
  'bpm':80
  }
//   , {
//   'Id':5,
//   'url':'https://s3.amazonaws.com/candidate-task/Track+5',
//   'owner':'Yonatan Pistiner',
//   'bpm':60
//   },{
//   'Id':6,
//   'url':'https://s3.amazonaws.com/candidate-task/Track+6',
//   'owner':'Barak Inbar',
//   'bpm':90
// }
];

class App extends Component {
  render() {
    const songElements = songs.map((song,i)=>{return (<li><Track src={song.url} artist={song.owner} bpm={song.bpm} name={song.Id}/></li>);});
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
      {songElements}
      {/*<li><Track src='https://s3.amazonaws.com/candidate-task/Track+1.mp3' artist='Hey' name='Erik Brown' bpm='150'/> </li>
      <li><Track src='https://s3.amazonaws.com/candidate-task/Track+1.mp3' artist='Heey' name='Erik Brown' bpm='150'/> </li>*/}
    </ul>
    <div className="footer">Niv Oppenhaim</div>
  </div>);
  }
}

export default App;
