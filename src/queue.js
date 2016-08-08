import {fromJS} from 'immutable';

export const INITIAL_STATE = fromJS({
  queue: []
});

export function addSongs(state, songs) {
  return state.update('queue', queue => queue.push(...songs));
}

export function next(state) {
  return state.update('queue', queue => queue.shift());
}
