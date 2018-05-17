import React, { Component } from 'react';
import '../styling/TrackCover.css';

export default class TrackCover extends Component {

  render() {
  	const imgNum = Math.floor(Math.random()*1000);
  	const imgUrl='https://picsum.photos/500/120/?image='+imgNum;
    return (
 		<div 
 		className='track-cover' 
 		style={{backgroundImage: `url(${this.props.url})`}}>
 		</div>
    );
  }
}

