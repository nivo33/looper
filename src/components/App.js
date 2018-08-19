import React, { Component } from 'react';
import {CSSTransitionGroup } from 'react-transition-group';
import {Button, DropdownButton, MenuItem} from 'react-bootstrap';
import Popup from 'react-popup';
import Track from './Track.js'
import 'font-awesome/css/font-awesome.min.css';
import '../styling/App.css';

const mainButtonsStyle = {marginRight:10, backgroundColor:'#ffeecc'};

export default class App extends Component {

  state = {
      addableSongs : [0,1,2,3,4],
      playAll : false,
      sync : false,
      songs : [{
        'Id':1,
        'url':'https://sampleswap.org/samples-ghost/REMIXABLE%20COLLECTIONS/Grinning%20In%20Your%20Face%20Blues/5021[kb]132_4bars-grinning-drums-loop.aif.mp3',
        'owner':'Ori Wino',
        'bpm':120,
        'showing': false,
        'sync' : false
        },{
        'Id':2,
        'url':'https://sampleswap.org/samples-ghost/REMIXABLE%20COLLECTIONS/Grinning%20In%20Your%20Face%20Blues/1255[kb]132_grinning-guitar-loop.aif.mp3',
        'owner':'Yona Piliz',
        'bpm':100,
        'showing': false,
        'sync' : false
        },{
        'Id':3,
        'url':'https://sampleswap.org/samples-ghost/REMIXABLE%20COLLECTIONS/Grinning%20In%20Your%20Face%20Blues/1255[kb]132_grinning-drum-funk.aif.mp3',
        'owner':'Bar Inbal',
        'bpm':123,
        'showing': false,
        'sync' : false
        }, {
        'Id':4,
        'url':'https://sampleswap.org/samples-ghost/REMIXABLE%20COLLECTIONS/%20REMIXABLE%20BITS/2390[kb]wide-open-synth-melody.aif.mp3',
        'owner':'Oreen Winok',
        'bpm':80,
        'showing': false,
        'sync' : false
        }, {
        'Id':5,
        'url':'https://sampleswap.org/samples-ghost/REMIXABLE%20COLLECTIONS/%20REMIXABLE%20BITS/4452[kb]all-your-guitar.aif.mp3',
        'owner':'James Man',
        'bpm':90,
        'showing': false,
        'sync' : false
      }
      ]
  };

  addSongLength = (index, length) => {
    const {songs} = this.state;
    songs[index].length = length;
  };

  extractTrackName = (song) =>{
    //remove file ending and url from song name
    let name = song.url.slice(song.url.lastIndexOf(']')+1, song.url.lastIndexOf('.'));
    name = name.replace(/-|_|.aif/g,' ');
    let nameArr = name.split(' ');
    nameArr.forEach((name, index) => nameArr[index] = name.charAt(0).toUpperCase() + name.slice(1));
    return nameArr.join(' ');
  };

  onSync = () => {
    //Update global and per-song sync status
    const {sync,songs} = this.state;
    if(!sync){
      songs.forEach((song)=>song.sync=true);
      songs.sort((a,b)=> b.length - a.length);
      this.setState({playAll:true, sync:true});
    }
    else{
      songs.forEach((song)=>song.sync=false);
      songs.sort((a,b) => a.Id - b.Id);
      this.setState({playAll:false, sync:false}); 
    }
  };

  onDelete = (index) => {
    const {songs, addableSongs} = this.state;
    addableSongs.push(index);
    songs[index].showing = false;
    this.setState(this.state);
  };

  onAdd = (index) => {
    // Add song back to looper
    const {songs, addableSongs, sync} = this.state;
    songs[index].showing=true;
    let i = addableSongs.indexOf(index);
    addableSongs.splice(i,1);
    if(sync)
      Popup.alert("Looks like you added a new song! Press sync again to re-sync");
    this.setState(this.state);
  };

  stopSingleTrackSync(index){
    const {songs} = this.state;
    songs[index].sync = false;
    this.setState(this.state);
  }

  togglePlayAll = () => {
    const {playAll} = this.state;
    this.setState({playAll:!playAll});
  };

  getMaxShowingBPM = () => {
    const {songs} = this.state;
    const reducer = (currBPM, song) => {
      if(song.showing && song.bpm > currBPM)
        return song.bpm;
      else 
        return currBPM;
    };
    return songs.reduce(reducer, 0);
  };

  render() {
    const {songs, addableSongs, playAll, sync} = this.state;

    const trackElements = songs.map((song,i)=>{ 
      if(!song.showing){
        return null;
      }
      return (
      <li key={i} >
        <Track
            index={i}
            onDelete={this.onDelete.bind(this)}
            src={song.url}
            artist={song.owner}
            bpm={song.sync ? this.getMaxShowingBPM() : song.bpm}
            oldBpm={song.sync ? song.bpm : 0}
            onUnsync={this.stopSingleTrackSync.bind(this)}
            playAll={playAll}
            addSongLength={this.addSongLength.bind(this)}
            name={this.extractTrackName(song)}
        />
      </li>);
    });

    const addableElements = addableSongs.map((songIndex, i ) => {
      return (
        <MenuItem onClick={()=>{this.onAdd(songIndex)}} key={i}>
          {this.extractTrackName(songs[songIndex])}
        </MenuItem>);
    });

    return (
  <div className="container">
    <Popup/> 
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css"/>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkyc}uHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossOrigin="anonymous"/>

    <h1 className="title">Looper</h1>
    <div className="main-buttons">
      <Button 
        title="Play All" 
        onClick={this.togglePlayAll.bind(this)}
        style={mainButtonsStyle}
        disabled={addableSongs.length === songs.length}
      >
        <i className={playAll ? "fa fa-stop" : "fa fa-play"}/>
        {playAll ? " Stop" : " Play All"}
      </Button>
      <DropdownButton  
        title="Add Track" 
        id="1" 
        bsStyle="default" 
        disabled={addableSongs.length===0} 
        style={mainButtonsStyle}
      >
        {addableElements}
      </DropdownButton>
      <Button 
        title="Sync" 
        onClick={this.onSync.bind(this)} 
        style={mainButtonsStyle}
        disabled={addableSongs.length === songs.length}
      >
          {sync ? "Unsync" : "Sync"}
      </Button>
    </div>
    <ul id="TrackList">
      <CSSTransitionGroup transitionName="tracks" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
        {trackElements}
      </CSSTransitionGroup>
    </ul>
    <div className="footer" style={{marginBottom:10}}>Niv Oppenhaim</div>
  </div>);
  }

}




