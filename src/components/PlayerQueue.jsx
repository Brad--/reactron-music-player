import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addToQueue, removeFromQueue, bumpUp, bumpDown } from '../dispatchers.js';
import { fromJS } from 'immutable';

class PlayerQueue extends Component {
  render() {
    return (
      <div className="queue-container" onDrop={this.props.onDrop}>
      {this.props.queue.length < 2 ?
        <div className="song-container">Nothing up next</div> :
        null}
      {this.props.queue.slice(1).map((song, index) => {
        return (
          <div className="song-container">
            <span className="name-label">{song.name}</span>
            <span className="action-icon" title="change queue position" onClick={(e) => {
              this.props.onBumpUp(index + 1);
            }}>▲</span>
            <span className="action-icon" title="remove" onClick={(e) => {
              this.props.onRemoveSong(index + 1);
            }}>✖</span>
            <span className="action-icon" title="change queue position" onClick={(e) => {
              this.props.onBumpDown(index + 1);
            }}>▼</span>
          </div>
        );
      })}
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
      dispatch(addToQueue([...ev.dataTransfer.files].map((File) => {
        return fromJS({
          path: File.path,
          name: File.name
        });
      })))
    },
    onRemoveSong: (index) => {
      dispatch(removeFromQueue(index))
    },
    onBumpUp: (index) => {
      dispatch(bumpUp(index))
    },
    onBumpDown: (index) => {
      dispatch(bumpDown(index))
    }
  };
};

const PlayerQueueC = connect(mapStateToProps, mapDispatchToProps)(PlayerQueue);

export default PlayerQueueC;
