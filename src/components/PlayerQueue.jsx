import React, { Component } from 'react';

const pattern = "/.*\/(.*)/";
const parser = new RegExp(pattern);

const beautifySongName = ( url ) => {
  return url.split(/\\|\//).pop();
}

class PlayerQueue extends Component {
  render() {
    var nowPlaying = (this.props.nowPlaying === "") ?
      "Nothing playing" :
      beautifySongName(this.props.nowPlaying);
    var queueSongs = this.props.queueSongs.map(function(song) {
      return (
        <div className="song-container">
          {beautifySongName(song)}
        </div>
      );
    });
    return (
      <div className="queue-container">
        <div className="now-playing-bar">
          <div className="now-playing-title">Now Playing: </div>
          <div className="song-container">{nowPlaying}</div>
        </div>
        <div className="queue-list">
          <div className="up-next-title">Up Next: </div>
          {this.props.queueSongs.length === 0 ?
            <div className="song-container">Nothing up next</div> :
            queueSongs}
        </div>
      </div>
    );
  }
};

export default PlayerQueue;
