import {fromJS} from 'immutable';

export const INITIAL_STATE = fromJS({
  queue: [],
  playlists: [],
  selectedPlaylist: ""
});

export function addSongs(state, songs) {
  return state.update('queue', queue => queue.push(...songs));
}

export function next(state) {
  return state.update('queue', queue => queue.shift());
}
