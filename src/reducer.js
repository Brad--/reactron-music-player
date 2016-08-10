import {addSongs, next, INITIAL_STATE} from './queue';
import {createNew, addToPlaylist, renamePlaylist, selectPlaylist} from './playlists';

export default function reducer(state = INITIAL_STATE, action){
  switch(action.type) {
    case 'ADD_QUEUE':
      return addSongs(state, action.songs);
    case 'NEXT':
      return next(state);
    case 'NEW_PLAYLIST':
      return createNew(state, action.name);
    case 'SELECT_PLAYLIST':
      return selectPlaylist(state, action.name);
    case 'ADD_PLAYLIST':
      return addToPlaylist(state, action.name, action.newSongs);
  }
  return state;
}
