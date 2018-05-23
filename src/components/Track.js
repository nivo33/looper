import React, {Component} from 'react';
import 'font-awesome/css/font-awesome.min.css';

import classnames from 'classnames';
import '../styling/Track.css';
import CircularProgress from './CircularProgress';

export default class Track extends Component{
	state = {showing : true,
			progress : 0,
			repeat: false,
			playing: false,
			mute: false};

componentWillReceiveProps(nextProps){
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
  const { index} = this.props;
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

  //when data is loaded, send back to parent for sync
  audio.addEventListener('loadedmetadata', () => this.props.addSongLength(index, audio.duration));  
	this.setState({listeners: {'ended':endedListener,'timeupdate':tupListener, 'error':errorListener}, audio});
}

componentWillUnmount = () => {
	//need to remove listeners to avoid errors, and remove audio element to avoid mem leaks
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
  	alert("There is an error with one of the tracks... Sorry!");
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
    	bpm
    } = this.props;

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

        {/*<TrackCover url={imgUrl}/>*/}

        <div className="artist-info-bpm-container">
        	<div className="artist-info">
          		<h2 className="artist-name">{artist}</h2>
          		<h3 className="artist-song-name">{name}</h3>
          		<h4 className="bpm"> bpm:{bpm} </h4>
          </div>
           <div className="player-controls">
            <CircularProgress percentage={progress}>
              <button
                onClick={this.togglePlay}
                className="player-btn big"
                title="Play/Pause"
              >
                <i className={playPauseClass}></i>
              </button>
            </CircularProgress>
          </div>
        </div>

        
        {/*<div className="player-progress-container" onClick={e => this.setProgress(e)}>
                  <span className="player-progress-value" style={{width: progress + '%'}}></span>
                </div>*/}

        <div className="mute-shuffle-repeat-container">
         

          <div className="player-buttons">
            <button
              className="player-btn small volume"
              onClick={this.toggleMute}
              title="Mute/Unmute"
            >
              <i className={volumeClass}></i>
            </button>
            <button
              className={repeatClass}
              onClick={this.toggleRepeat}
              title="Repeat"
            >
              <i className="fa fa-repeat"></i>
            </button>
            <button
              className="player-btn small "
              onClick={()=>{this.props.onDelete(this.props.index);}}
              title="Delete"
            >
              <i className="fa fa-trash"></i>
            </button>
          </div>
        </div>

      </div>
    );
	}
}
	