import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addToPlaylist, addQueue } from '../dispatchers.js';

class PlaylistBody extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      searchFilter: ""
    }
  }
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
    return (
      <div className="playlist-container" onDrop={(ev) => {
        this.props.onDrop(this.props.current, ev);
      }}>
      <input type="text"
            placeholder="Search playlist"
            value={this.state.searchFilter}
            onChange={(ev) => {
              this.setState({searchFilter: ev.target.value});
            }}/>
      {currentPlaylistSongs.filter((song) => {
        return song.name.toUpperCase().includes(this.state.searchFilter.toUpperCase());
      }).sort((a,b) => {
        return a.name.toUpperCase().localeCompare(b.name.toUpperCase());
      }).map((song) => {
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
