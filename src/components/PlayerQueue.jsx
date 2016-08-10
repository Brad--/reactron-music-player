import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addQueue } from '../dispatchers.js';

class PlayerQueue extends Component {
  render() {
    var nowPlaying = (this.props.queue.length === 0) ?
      "Nothing playing" :
      this.props.queue[0].name
    var queueSongs = this.props.queue.slice(1).map(function(song) {
      return (
        <div className="song-container" key={song.path}>
          {song.name}
        </div>
      );
    });
    return (
      <div className="queue-container" onDrop={this.props.onDrop}>
        <div className="now-playing-bar">
          <div className="now-playing-title">Now Playing: </div>
          <div className="song-container">{nowPlaying}</div>
        </div>
        <div className="queue-list">
          <div className="up-next-title">Up Next: </div>
          {this.props.queue.length <= 1 ?
            <div className="song-container">Nothing up next</div> :
            queueSongs}
        </div>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    queue: state.get('queue').toJS()
  };
};

function mapDispatchToProps(dispatch) {
  return {
    onDrop: (ev) => {
      dispatch(addQueue(ev.dataTransfer.files))
    }
  };
};

const PlayerQueueC = connect(mapStateToProps, mapDispatchToProps)(PlayerQueue);

export default PlayerQueueC;
