import {Set, fromJS} from 'immutable';

export const INITIAL_STATE = fromJS({
  playlists: []
});

export function createNew(state, name="New Playlist") {
  return state.update('playlists', playlists => playlists.push(fromJS({
    name: name,
    songs: []
  })));
};

export function addToPlaylist(state, name, newSongs) {
  let selectedPlaylist = state.get('playlists').findIndex(playlist => {
    return playlist.get('name') === name;
  });
  let setA = Set([...newSongs]);
  let setB = state.getIn(['playlists', selectedPlaylist, 'songs']).toSet();
  let union = setB.union(setA).toList();
  return state.setIn(['playlists', selectedPlaylist, 'songs'], union);
}

export function renamePlaylist(state, oldName, newName) {
  let selectedPlaylist = state.get('playlists').findIndex(playlist => {
    return playlist.get('name') === oldName;
  });
  return state.setIn(['playlists', selectedPlaylist, 'name'], newName);
}
