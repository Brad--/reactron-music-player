import {addSongs, next, removeSong, shiftSong, INITIAL_STATE} from './queue';
import {createNew, deletePlaylist, addToPlaylist, removeFromPlaylist, renamePlaylist, selectPlaylist} from './playlists';

export default function reducer(state = INITIAL_STATE, action){
  switch(action.type) {
    case 'ADD_TO_QUEUE':
      return addSongs(state, action.songs);
    case 'BUMP_UP':
      return shiftSong(state, action.index, -1);
    case 'BUMP_DOWN':
      return shiftSong(state, action.index, 1);
    case 'REMOVE_FROM_QUEUE':
      return removeSong(state, action.index);
    case 'NEXT':
      return next(state);
    case 'NEW_PLAYLIST':
      return createNew(state, action.name);
    case 'REMOVE_PLAYLIST':
      return deletePlaylist(state, action.index);
    case 'SELECT_PLAYLIST':
      return selectPlaylist(state, action.name);
    case 'ADD_TO_PLAYLIST':
      return addToPlaylist(state, action.name, action.newSongs);
    case 'REMOVE_FROM_PLAYLIST':
      return removeFromPlaylist(state, action.name, action.index);
  }
  return state;
}
