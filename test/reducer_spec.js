import {fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {
  it('handles ADD_TO_QUEUE', () => {
    let state = fromJS({
      queue: ["Rocket Man"]
    });
    let action = {type: 'ADD_TO_QUEUE', songs: ["Oops I Did It Again"]};
    let nextState = reducer(state, action);

    expect(nextState).to.equal(fromJS({
      queue: ["Rocket Man", "Oops I Did It Again"]
    }));
  });
  it('handles NEXT', () => {
    let state = fromJS({
      queue: ["Rocket Man"]
    });
    let action = {type: 'NEXT'};
    let nextState = reducer(state, action);

    expect(nextState).to.equal(fromJS({
      queue: []
    }));
  });
});
