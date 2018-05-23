import React, { Component } from 'react';
import '../styling/App.css';
import 'font-awesome/css/font-awesome.min.css';
import Track from './Track.js'

import { CSSTransitionGroup } from 'react-transition-group';
import {Button, DropdownButton, MenuItem} from 'react-bootstrap';

const extractTrackName = (song) =>{
  //remove file ending and url from song name
  let name = song.url.slice(song.url.lastIndexOf('/')+1, song.url.lastIndexOf('.'));
  return name.replace('+',' ');
};


export default class App extends Component {

  state = {
      addableSongs : [],
      playAll : false,
      sync : false,
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

 addSongLength = (index, length) => {
  const {songs} = this.state;
  songs[index].length = length;
}
  
  onSync = () => {
    const {sync,songs} = this.state;
    if(!sync){
      songs.sort((a,b)=> b.length - a.length);
      this.setState({playAll:true, sync:true});
    }
    else{
      songs.sort((a,b) => a.Id - b.Id);
      this.setState({playAll:false, sync:false}); 
    }

    }

  onDelete = (index) => {
    const {songs, addableSongs} = this.state;
    addableSongs.push(index);
    songs[index].showing = false;
    this.setState(this.state);
  };

  onAdd = (index) => {
    // Add song back to looper
    const {songs, addableSongs} = this.state;
    songs[index].showing=true;
    let i = addableSongs.indexOf(index);
    addableSongs.splice(i,1);
    this.setState(this.state);
  }

  togglePlayAll = () => {
    const {playAll} = this.state;
    this.setState({playAll:!playAll});
  }

  render() {
    //TODO: make sticky header
    const {songs, addableSongs, playAll, sync} = this.state;
    const trackElements = songs.map((song,i)=>{ 
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
          playAll={playAll}
          addSongLength={this.addSongLength.bind(this)}
          name={extractTrackName(song)}/>
      </li>);});

    const addableElements = addableSongs.map((songIndex, i ) => {
      return (
        <MenuItem onClick={()=>{this.onAdd(songIndex)}} key={i}>
          {extractTrackName(songs[songIndex])}
        </MenuItem>);
    });

    return (
  <div className="container">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css"/>
    <link href="https://fonts.googleapis.com/css?family=Roboto:100,400,700" rel="stylesheet" type="text/css"/>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkyc}uHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossOrigin="anonymous"/>

    <h1 className="title">Looper</h1>
    <div className="main-buttons">
      <Button title="PlayAllButton" onClick={this.togglePlayAll.bind(this)} style={{marginRight:10}}>
       <i className={playAll ? "fa fa-stop" : "fa fa-play"}></i>
       {playAll ? " Stop" : " Play All"}
      </Button>
      <DropdownButton  title="Add Track" id="1" bsStyle="default" disabled={addableSongs.length===0} style={{marginRight:10}}>
        {addableElements}
      </DropdownButton>
      <Button title="SyncButton" onClick={this.onSync.bind(this)} style={{marginRight:10}}>
        {sync ? "Unsync" : "Sync"}
      </Button>
    </div>
    <ul>
    <CSSTransitionGroup transitionName="tracks" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
        {trackElements}
      </CSSTransitionGroup>
    </ul>
    <div className="footer" style={{marginBottom:10}}>Niv Oppenhaim</div>
  </div>);
  }
}
