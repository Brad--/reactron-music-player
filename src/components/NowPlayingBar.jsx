import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fromJS } from 'immutable';

class NowPlayingBar extends Component {
  render() {
    var nowPlaying = (this.props.queue.length === 0) ?
      "Nothing playing" :
      this.props.queue[0].name
    return (
      <div className="now-playing-bar">
        <div className="now-playing-title">Now Playing: {nowPlaying}</div>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    queue: state.get('queue').toJS()
  };
};

const NowPlayingBarC = connect(mapStateToProps)(NowPlayingBar);

export default NowPlayingBarC;
