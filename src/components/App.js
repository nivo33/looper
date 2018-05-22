import React, { Component } from 'react';
import '../styling/App.css';
import Track from './Track.js'
import {ButtonToolbar, Button, DropdownButton, MenuItem} from 'react-bootstrap';

const extractTrackName = (song) =>{
  //extract song name
  return song.url.slice(song.url.lastIndexOf('/')+1, song.url.lastIndexOf('.'));
};

export default class App extends Component {
  
  constructor(){
    super();
    this.state = {
      addableSongs : [],
      songs : [{
  'Id':1,
  'url':'https://s3.amazonaws.com/candidate-task/Track+1.mp3',
  'owner':'Ori Winokur',
  'bpm':120,
  'showing': true
  },{
  'Id':2,
  'url':'https://s3.amazonaws.com/candidate-task/Track+2.mp3',
  'owner':'Yonatan Pistiner',
  'bpm':100,
  'showing': true
  },{
  'Id':3,
  'url':'https://s3.amazonaws.com/candidate-task/Track+3.mp3',
  'owner':'Barak Inbar',
  'bpm':123,
  'showing': true
  }, {
  'Id':4,
  'url':'https://s3.amazonaws.com/candidate-task/Track+4.mp3',
  'owner':'Ori Winokur',
  'bpm':80,
  'showing': true
  }
]
    };
  }

  onDelete = (index) => {
    const {songs, addableSongs} = this.state;
    addableSongs.push(index);
    songs[index].showing = false;
    this.setState(this.state);
  };

  // onDelete = (index) => {
  //   const {songs } = this.state;
  //   var removed = songs.splice(index,1);
  //    this.setState(
  //      {songs : songs}
  //      );
  // };

  render() {
    const {songs, addableSongs} = this.state;
    const songElements = songs.map((song,i)=>{ 
      if(!song.showing){
        return null;
      }
      return (
      <li key={i} >
        <Track index={i} 
          onDelete={this.onDelete.bind(this)} 
          src={song.url} 
          artist={song.owner} 
          bpm={song.bpm} 
          name={extractTrackName(song)}/>
      </li>);});

    const addables = addableSongs.map((songIndex, i ) => {
      return (
        <MenuItem key={i}>{extractTrackName(songs[songIndex])}</MenuItem>);
    });

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
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossOrigin="anonymous"/>
      <DropdownButton id="1" title="Add Track" bsStyle="default" >
        {addables}
      </DropdownButton>
      <Button>
        Play All
      </Button>
      <Button onClick={()=>alert("Sorry! Not yet implemented!")}>
        Sync
      </Button>
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
