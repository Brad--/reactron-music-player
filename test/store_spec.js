import {Map, fromJS} from 'immutable';
import {expect} from 'chai';

import makeStore from '../src/store';

describe('store', () => {
  it('is a Redux store configured with the correct reducer', () => {
    let store = makeStore();
    expect(store.getState()).to.equal(fromJS({
      queue: [],
      playlists: [],
      selectedPlaylist: ""
    }));
    store.dispatch({
      type: "ADD_QUEUE",
      songs: ["Rocket Man"]
    });

    expect(store.getState()).to.equal(fromJS({
      queue: ["Rocket Man"],
      playlists: [],
      selectedPlaylist: ""
    }));
  });
});
