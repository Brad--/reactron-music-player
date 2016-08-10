import React, { Component } from 'react';
import PlayerTopMenu from './PlayerTopMenu.jsx';
import PlayerQueue from './PlayerQueue.jsx';
import PlaylistsSidebar from './PlaylistsSidebar.jsx';
import PlaylistBody from './PlaylistBody.jsx';
import AudioPlayer from './AudioPlayer.jsx';
import { connect } from 'react-redux';
import SplitPane from 'react-split-pane';
import { addQueue, next, createPlaylist, selectPlaylist } from '../dispatchers.js';

export class PlayerBody extends Component {
  render() {
    return (
      <div className="player-body">
        <PlayerTopMenu />
        <SplitPane split="vertical" defaultSize={250} minSize={150} maxSize={400}>
          <PlaylistsSidebar />
          <div className="main-pane">
            <PlaylistBody />
            <PlayerQueue />
          </div>
        </SplitPane>
        <AudioPlayer />
      </div>
    );
  }
};

export default PlayerBody;
