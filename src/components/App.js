import React, { Component } from 'react';
import '../styling/App.css';
import Track from './Track.js'
import {DropdownButton,MenuItem} from 'react-bootstrap';

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

];


class App extends Component {

  constructor(){
    super();
    this.state = {
      addableSongs : [],
      songs : [{
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
]
    };
  }

  addToList = (index) => {
    const {songs, addableSongs} = this.state;
    addableSongs.push(songs[index]);
    this.setState({
      addableSongs: addableSongs
    });
  };

  onDelete = (index) => {
    console.log("called with index: " + index);
    const {songs } = this.state;
    var removed = songs.splice(index,1);
    console.log(songs);
     this.setState(
       {songs : songs}
       );
  };

  render() {

    const {songs} = this.state;
    const songElements = songs.map((song,i)=>{ return (
      <li key={i} >
        <Track id={i} addToList={this.addToList.bind(this)} src={song.url} artist={song.owner} bpm={song.bpm} name={song.Id}/>
      </li>);});

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

    <h1 className="title">Looper</h1>
    <div className="main-buttons">
      <DropdownButton title="Play All" bsStyle={"Default".toLowerCase()}>
        <MenuItem eventKey="1">Action</MenuItem>
      </DropdownButton>      
      <button>
        Add Song
      </button>      
      <button>
        Sync
      </button>
    </div>
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
