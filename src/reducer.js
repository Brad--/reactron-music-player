import {addSongs, next, INITIAL_STATE} from './queue';

export default function reducer(state = INITIAL_STATE, action){
  switch (action.type) {
    case 'ADD_QUEUE':
      return addSongs(state, action.songs);
    case 'NEXT':
      return next(state);
  }
  return state;
}
