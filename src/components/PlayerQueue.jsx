import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addQueue } from '../dispatchers.js';
import { fromJS } from 'immutable';

class PlayerQueue extends Component {
  render() {
    var queueSongs = this.props.queue.slice(1).map(function(song) {
      return (
        <div className="song-container">
          {song.name}
        </div>
      );
    });
    return (
      <div className="queue-container" onDrop={this.props.onDrop}>
        <div className="queue-list">
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
      dispatch(addQueue([...ev.dataTransfer.files].map((File) => {
        return fromJS({
          path: File.path,
          name: File.name
        });
      })))
    }
  };
};

const PlayerQueueC = connect(mapStateToProps, mapDispatchToProps)(PlayerQueue);

export default PlayerQueueC;
