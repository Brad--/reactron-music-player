import React, { Component } from 'react';
import { connect } from 'react-redux';
import { next } from '../dispatchers.js';

class AudioPlayer extends Component {
  componentDidUpdate(prevProps, prevState) {
    if(prevProps.queue.length > this.props.queue.length &&
      this.props.queue.length !== 0 &&
      prevProps.queue[0].path === this.props.queue[0].path) {
        this.player.play();
    }
  }
  render() {
    return (
      <audio className="audio-player"
              ref={(ref) => this.player = ref}
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
