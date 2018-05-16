import React from 'react';
import '../styling/Track.css';
import 'font-awesome/css/font-awesome.min.css';
import TrackCover from './TrackCover';
import classnames from 'classnames';

export default class Track extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			showing : true,
			progress : 0,
			repeat: false,
			playing: false,
			mute: false
		};
		console.log(props.src);
		this.audio = new Audio();//document.createElement('audio');
		this.audio.src = props.src;
		this.audio.autoplay=false;
		this.audio.volume=1;
		this.audio.addEventListener('timeupdate', e => {
      		this.updateProgress();
    	});
    	this.audio.addEventListener('error', e => {
      		this.handleError();
    	});
    	 this.audio.addEventListener('ended', e => {
      		this.next();
    	});

    	var imgNum = Math.floor(Math.random()*1000);
  		this.imgUrl='https://picsum.photos/500/120/?image='+imgNum;
	}

	updateProgress = () => {
    const { duration, currentTime } = this.audio;
    const progress = (currentTime * 100) / duration;

    this.setState({
      progress: progress,
    });
  };

  handleError = () =>{
  	alert("There is an error with one of the tracks... Sorry!");
  }



   setProgress = e => {
    const target = e.target.nodeName === 'SPAN' ? e.target.parentNode : e.target;
    const width = target.clientWidth;
    const rect = target.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const duration = this.audio.duration;
    const currentTime = (duration * offsetX) / width;
    const progress = (currentTime * 100) / duration;

    this.audio.currentTime = currentTime;

    this.setState({
      progress: progress,
    });

    this.play();
  };

  toggleRepeat = () =>
    this.setState({
      repeat: !this.state.repeat,
    });

  play = () => {
    this.setState({
      playing: true,
    });

    this.audio.play();
  };

  pause = () => {
    this.setState({
      playing: false,
    });

    this.audio.pause();
  };

  next = ()=> {
  	this.setState({progress:0});
  	if(this.state.repeat){
  		this.audio.currentTime=0;
  		this.audio.play()
  	}
  	else{
  		this.setState({playing:false});
  	}
  };

  	delete = () => {
  		this.audio.pause();
  		this.audio.currentTime = 0;
  		this.setState({showing:false});
  		this.props.addToList(this.props.id);
  	}

	toggleMute = () => {
	    const { mute } = this.state;

	    this.setState({
	      mute: !mute,
	    });

	    this.audio.volume = !!mute;
	  };

	togglePlay = () => this.state.playing ? this.pause() : this.play();

	render(){

	if(!this.state.showing){return <div></div>}

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
    	imgUrl
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

        <div className="artist-info-bpm">
        	<div className="artist-info">
          		<h2 className="artist-name">{artist}</h2>
          		<h3 className="artist-song-name">{name}</h3>
         	</div>
         	<div className="bpm">
          		<h3 className="bpm-text"> {bpm}bpm </h3>
          	</div>
        </div>

        <div className="player-progress-container" onClick={e => this.setProgress(e)}>
          <span className="player-progress-value" style={{width: progress + '%'}}></span>
        </div>

        <div className="player-options">
          <div className="player-buttons player-controls">
            <button
              onClick={this.togglePlay}
              className="player-btn big"
              title="Play/Pause"
            >
              <i className={playPauseClass}></i>
            </button>
          </div>

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
              onClick={this.delete.bind(this)}
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
	