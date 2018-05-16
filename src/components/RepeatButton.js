import React, { Component } from 'react';
import '../styling/RepeatButton.css';



export default class RepeatButton extends Component {

  render() {
  	const {
  		className,
  		onClick,
  	} = this.props
    return (
 		<button className={className} onClick={onClick}>
 			<i className="fa fa-repeat"></i>
 		</button>
    );
  }
}

RepeatButton.defaultProps = {
	className : "repeat"
}