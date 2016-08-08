import React, { Component } from 'react';
import PlayerTopMenu from './PlayerTopMenu.jsx';
import PlayerQueue from './PlayerQueue.jsx';
import { connect } from 'react-redux';
import { addQueue, next } from '../dispatchers.js';

export class PlayerBody extends Component {
  render() {
    return (
      <div className="player-body">
        <PlayerTopMenu />
        <PlayerQueue queue={this.props.queue}/>
        <div className="drop-area"
             onDrop={this.props.onDrop}>
             ♬ Drag and drop songs here ♬
        </div>
        <audio className="audio-player"
               src={this.props.queue.length === 0 ?
                 "" :
                 this.props.queue[0].path}
               onEnded={this.props.onEnded}
               controls autoPlay />
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    queue: state.get('queue').toJS()
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onDrop: ( ev ) => {
      dispatch(addQueue(ev.dataTransfer.files))
    },
    onEnded: () => {
      dispatch(next())
    }
  };
}

export const PlayerBodyContainer = connect(mapStateToProps, mapDispatchToProps)(PlayerBody);
