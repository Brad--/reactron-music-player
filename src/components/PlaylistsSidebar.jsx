import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createPlaylist, selectPlaylist, removePlaylist } from '../dispatchers.js';

class PlaylistsSidebar extends Component {
  render() {
    return (
    <div className="sidebar">
      <ul className="playlists-list">
        {this.props.playlists.map((playlist, index) => {
          const name = playlist.name;
          let classNames = "playlist-item";
          if(this.props.selected === name) {
            classNames += ' selected';
          }
          return(
            <div key={index}
                className={classNames}
                onClick={(ev) => {
                  this.props.onSelectPlaylist(name);
                }}>
              <span className="name-label">{name}</span>
              <span className="action-icon" title="remove" onClick={(ev) => {
                this.props.onRemovePlaylist(index);
                ev.stopPropagation();
              }}>✖</span>
            </div>);
        })}
      </ul>
      <input type="text" placeholder="Add new playlist" onKeyPress={(ev) => {
        if(ev.key === "Enter") {
          if(ev.target.value !== "") {
            this.props.onCreate(ev.target.value);
            ev.target.value = "";
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
    },
    onRemovePlaylist: (index) => {
      dispatch(removePlaylist(index))
    }
  };
};

const PlaylistsSidebarC = connect(mapStateToProps, mapDispatchToProps)(PlaylistsSidebar);

export default PlaylistsSidebarC;
