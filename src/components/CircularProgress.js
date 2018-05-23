import React, {Component} from 'react';
import 'react-circular-progressbar/dist/styles.css';
import CircularProgressbar from 'react-circular-progressbar';

export default class CircularProgess extends Component{
  render(){
  const { children, ...otherProps } = this.props;

  return (
    <div
      style={{
        position: "relative",
        width: "72px",
        height: "72px"
      }}
    >
      <div style={{ position: "absolute" }}>
        <CircularProgressbar {...otherProps} textForPercentage={null} />
      </div>
      <div
        style={{
          position: "absolute",
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        {this.props.children}
      </div>
    </div>
  );
}
}