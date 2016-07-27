import React, { Component } from 'react';
import SplitPane from 'react-split-pane';

class PlayerBody extends Component {
  constructor() {
    super();
    this.state = {url: ""};
    this.onDrop = this.onDrop.bind(this);
  };
  onDrop (ev) {
    this.setState({url: ev.dataTransfer.files[0].path});
    ev.preventDefault();
  };
  render() {
    return (
      <div className="player-body">
        <div className="menu-bar">
          <div className="reactron-logo">Reactron</div>
        </div>
        <div className="playlist">
          <div className="spacer"></div>
          <div className="drop-area" onDrop={this.onDrop}></div>
        </div>
        <audio className="audio-player" src={this.state.url} controls autoPlay />
      </div>
    );
  }
};

export default PlayerBody;
