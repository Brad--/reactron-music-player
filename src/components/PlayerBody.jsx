import React, { Component } from 'react';
import PlayerTopMenu from './PlayerTopMenu.jsx';
import PlayerQueue from './PlayerQueue.jsx';
import { connect } from 'react-redux';
import SplitPane from 'react-split-pane';
import { addQueue, next, createPlaylist, selectPlaylist } from '../dispatchers.js';

export class PlayerBody extends Component {
  render() {
    return (
      <SplitPane split="vertical" defaultSize={250} minSize={150} maxSize={400}>
        <div className="sidebar">
          <ul className="playlists-list">
            {this.props.playlists.map((playlist, i) => {
              const name = playlist.name;
              return(
                <li key={i}
                    className={this.props.selected === name ? "selected" : ""}
                    onClick={(e) => {
                      this.props.onSelectPlaylist(name);
                    }}>
                  {name}
                </li>);
            })}
          </ul>
          <input type="text" placeholder="Add new playlist" onKeyPress={(e) => {
            if(e.key === "Enter") {
              if(e.target.value !== "") {
                this.props.onCreate(e.target.value);
                e.target.value = "";
              } else {
                this.props.onCreate("New Playlist");
              }
            }
          }} />
        </div>
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
      </SplitPane>

    );
  }
};

function mapStateToProps(state) {
  console.log(state.get('selectedPlaylist'));
  return {
    queue: state.get('queue').toJS(),
    playlists: state.get('playlists').toJS(),
    selected: state.get('selectedPlaylist')
  };
};

function mapDispatchToProps(dispatch) {
  return {
    onDrop: (ev) => {
      dispatch(addQueue(ev.dataTransfer.files))
    },
    onEnded: () => {
      dispatch(next())
    },
    onCreate: (name) => {
      dispatch(createPlaylist(name))
    },
    onSelectPlaylist: (name) => {
      dispatch(selectPlaylist(name))
    }
  };
};

export const PlayerBodyContainer = connect(mapStateToProps, mapDispatchToProps)(PlayerBody);
