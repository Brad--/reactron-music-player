import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createPlaylist, selectPlaylist } from '../dispatchers.js';

class PlaylistsSidebar extends Component {
  render() {
    return (
    <div className="sidebar">
      <ul className="playlists-list">
        {this.props.playlists.map((playlist, i) => {
          const name = playlist.name;
          let classNames = "playlist-item";
          if(this.props.selected === name) {
            classNames += ' selected';
          }
          return(
            <li key={i}
                className={classNames}
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
  );
  }
};

function mapStateToProps(state) {
  return {
    playlists: state.get('playlists').toJS(),
    selected: state.get('selectedPlaylist')
  };
};

function mapDispatchToProps(dispatch) {
  return {
    onCreate: (name) => {
      dispatch(createPlaylist(name))
    },
    onSelectPlaylist: (name) => {
      dispatch(selectPlaylist(name))
    }
  };
};

const PlaylistsSidebarC = connect(mapStateToProps, mapDispatchToProps)(PlaylistsSidebar);

export default PlaylistsSidebarC;
