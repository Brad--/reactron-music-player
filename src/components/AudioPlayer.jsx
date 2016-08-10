import React, { Component } from 'react';
import { connect } from 'react-redux';
import { next } from '../dispatchers.js';

class AudioPlayer extends Component {
  render() {
    return (
      <audio className="audio-player"
             src={this.props.queue.length === 0 ?
               "" :
               this.props.queue[0].path}
             onEnded={this.props.onEnded}
             controls autoPlay />
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
    onEnded: () => {
      dispatch(next())
    }
  };
};

const AudioPlayerC = connect(mapStateToProps, mapDispatchToProps)(AudioPlayer);

export default AudioPlayerC;
