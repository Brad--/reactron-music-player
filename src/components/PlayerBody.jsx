import React, { Component } from 'react';
import SplitPane from 'react-split-pane';

class PlayerBody extends Component {
  constructor() {
    super();
    this.state = {url: "", queue: []};
    this.onDrop = this.onDrop.bind(this);
    this.onEnded = this.onEnded.bind(this);
  };
  onDrop (ev) {
    var path = ev.dataTransfer.files[0].path;
    if(this.state.url === "") {
      this.setState({url: path});
    }
    else {
      var newQueue = this.state.queue;
      newQueue.push(path);
      this.setState({queue: newQueue});
    }
    ev.preventDefault();
  };
  onEnded () {
    var newQueue = this.state.queue;
    if (this.state.queue.length === 0) {
      this.setState({url: ""});
    }
    else {
      var nextSong = newQueue.shift();
      this.setState({url: nextSong, queue: newQueue});
    }
  };
  render() {
    var queue = this.state.queue.map(function(song) {
      return (
        <li>{song}</li>
      );
    });
    return (
      <div className="player-body">
        <div className="menu-bar">
          <div className="reactron-logo">Reactron Music Player</div>
        </div>
        <div className="playlist">
          <ul>
            {queue}
          </ul>
          <div className="spacer"></div>
          <div className="drop-area"
               onDrop={this.onDrop}>
          </div>
        </div>
        <audio className="audio-player"
               src={this.state.url}
               onEnded={this.onEnded}
               controls autoPlay />
      </div>
    );
  }
};

export default PlayerBody;
