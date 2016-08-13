import {fromJS} from 'immutable';

export const INITIAL_STATE = fromJS({
  queue: [],
  playlists: [],
  selectedPlaylist: ""
});

export function addSongs(state, songs) {
  return state.update('queue', queue => queue.push(...songs));
}

export function removeSong(state, index) {
  return state.update('queue', queue => queue.remove(index));
}

export function shiftSong(state, index, shiftAmount) {
  let song = state.getIn(['queue', index]);
  let newQueue = state.deleteIn(['queue', index])
              .get('queue').insert(index + shiftAmount, song);
  return state.set('queue', newQueue);
}

export function next(state) {
  return state.update('queue', queue => queue.shift());
}
