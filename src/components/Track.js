import React, {Component} from 'react';
import classnames from 'classnames';
import CircularProgress from './CircularProgress';
import {Button} from 'react-bootstrap';
import PropTypes from 'prop-types';
import 'font-awesome/css/font-awesome.min.css';
import '../styling/Track.css';

export default class Track extends Component{

	state = {
    showing : true,
		progress : 0,
		repeat: false,
		playing: false,
		mute: false
  };

  componentWillReceiveProps(nextProps){
    //check if playAll has been set, act accordingly
  	const {audio} = this.state;
  	if(nextProps.playAll){
  		audio.currentTime = 0; 
  		this.play();
      this.setState({repeat:true});
  	}
  	else{
  		this.pause();
  		audio.currentTime = 0;
      this.setState({repeat:false});
  	}
  }

  componentWillMount= () =>{
    //set all event handlers for audio element
    const {index} = this.props;
  	const audio = document.createElement('audio');
  	audio.src = this.props.src;
  	audio.autoplay=false;
  	audio.volume=1;
  	let tupListener = e => {this.updateProgress();};
  	audio.addEventListener('timeupdate', tupListener);

  	let errorListener = e => {this.handleError();};
  	audio.addEventListener('error', errorListener);

  	let endedListener = e => {this.next();};
  	audio.addEventListener('ended', endedListener);

    //when data is loaded, send back duration to parent to support sync
    audio.addEventListener('loadedmetadata', () => this.props.addSongLength(index, audio.duration));  
  	this.setState({listeners: {'ended':endedListener,'timeupdate':tupListener, 'error':errorListener}, audio});
  }

  componentWillUnmount = () => {
  	//remove listeners to avoid errors with pausing, and remove audio element to avoid mem leaks
  	const {audio, listeners} = this.state;
  	for(let key in listeners){
  		audio.removeEventListener(key, listeners[key]);
  	}
  	audio.pause();
  	this.setState({audio:null});
  }

	updateProgress = () => {
    const { duration, currentTime } = this.state.audio;
    const progress = (currentTime * 100) / duration;

    this.setState({
      progress: progress,
    });
  };

  handleError = () =>{
  	alert("There is an error with one of the tracks!");
  }

  toggleRepeat = () =>
    this.setState({
      repeat: !this.state.repeat,
    });

  play = () => {
    this.setState({
      playing: true,
    });

    this.state.audio.play();
  };

  pause = () => {
    this.setState({
      playing: false,
    });
    this.state.audio.pause();
  };

  next = ()=> {
  	const {audio, repeat} = this.state;
  	this.setState({progress:0});
  	if(repeat){
  		audio.currentTime=0;
  		audio.play();
  	}
  	else{
  		this.setState({playing:false});
  	}
  };

	toggleMute = () => {
	    const { mute, audio } = this.state;
	    this.setState({
	      mute: !mute,
	    });

	    audio.volume = !!mute;
	  };

	togglePlay = () => this.state.playing ? this.pause() : this.play();

	render(){

  	const {
      progress,
      playing,
      repeat,
      mute
    } = this.state;

    const {
    	artist,
    	name,
    	bpm,
      index,
      oldBpm,
      onDelete,
      onUnsync
    } = this.props;

    //BUTTON CLASSES
    const playPauseClass = classnames({
      'fa': true,
      'fa-play': !playing,
      'fa-pause': playing,
    });
    
    const volumeClass = classnames({
      'fa': true,
      'fa-volume-up': !mute,
      'fa-volume-off': mute,
    });

    const repeatClass = classnames({
      'player-btn small repeat': true,
      'active': repeat,
      'disabled': !repeat
    });

	return (
      <div className="player-container">
        <div className="artist-info-bpm-container">
        	<div className="artist-info">
          		<h2 className="artist-name" title="Artist">
                {artist}
              </h2>
          		<h3 className="artist-song-name" title="Song">
                {name}
              </h3>
          		<h4 className="bpm"> 
                BPM:{bpm} 
              </h4>
              {oldBpm !== 0 ? 
                <Button 
                  title="Reset BPM"
                  bsSize="xsmall" 
                  style={{backgroundColor:'#ffd480', color:'#8c8c8c'}}
                  onClick={()=>onUnsync(index)}
                >
                  Old BPM:{oldBpm}
                </Button> 
                : null
              }
          </div>
           <div className="player-btn-container">
            <CircularProgress percentage={progress}>
              <button
                title="Play/Pause"
                onClick={this.togglePlay}
                className="player-btn big"
              >
                <i className={playPauseClass}></i>
              </button>
            </CircularProgress>
          </div>
        </div>

        <div className="mute-shuffle-repeat-container">
          <div className="player-buttons">
            <button
              title="Mute/Unmute"
              className="player-btn small volume"
              onClick={this.toggleMute}
            >
              <i className={volumeClass}></i>
            </button>
            <button
              title="Repeat"
              className={repeatClass}
              onClick={this.toggleRepeat}
            >
              <i className="fa fa-repeat"></i>
            </button>
            <button
              title="Delete"
              className="player-btn small "
              onClick={()=>{onDelete(index)}}
            >
              <i className="fa fa-trash"></i>
            </button>
          </div>
        </div>
      </div>
    );
	}
}

Track.defaultProps = {
  addSongLength : (a,b) => {},
  playAll : false,
  bpm : 0
	}

Track.propTypes = {
  index: PropTypes.number,
  onDelete: PropTypes.func,
  src: PropTypes.string,
  artist: PropTypes.string,
  bpm: PropTypes.number,
  oldBpm: PropTypes.number,
  playAll: PropTypes.bool,
  name: PropTypes.string,
  onUnsync: PropTypes.func
}
