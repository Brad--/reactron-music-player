import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addToPlaylist, addQueue } from '../dispatchers.js';

class PlaylistBody extends Component {
  render() {
    let playlistIndex = -1;
    for (let i = 0; i < this.props.playlists.length; i += 1) {
      if(this.props.playlists[i].name === this.props.current) {
        playlistIndex = i;
      }
    }
    let currentPlaylistSongs = playlistIndex === -1 ?
                               [] :
                               this.props.playlists[playlistIndex].songs;
    console.log(this.props.current, currentPlaylistSongs);
    return (
      <div className="queue-container" onDrop={(ev) => {
        this.props.onDrop(this.props.current, ev);
      }}>
      {currentPlaylistSongs.map((song) => {
        return (
          <div className="song-container"
            key={song.path}
            onDoubleClick={(e) => {
              this.props.onDoubleClick([song]);
            }}>
            {song.name}
          </div>
        );
      })}
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    playlists: state.get('playlists').toJS(),
    current: state.get('selectedPlaylist')
  };
};

function mapDispatchToProps(dispatch) {
  return {
    onDrop: (name, ev) => {
      dispatch(addToPlaylist(name, ev.dataTransfer.files))
    },
    onDoubleClick: (songs) => {
      dispatch(addQueue(songs))
    }
  };
};

const PlaylistBodyC = connect(mapStateToProps, mapDispatchToProps)(PlaylistBody);

export default PlaylistBodyC;
