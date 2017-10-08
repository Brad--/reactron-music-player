import {expect} from 'chai';
import {fromJS} from 'immutable';
import {addSongs, removeSong, next, shiftSong} from '../src/queue.js';

describe('the queue', () => {
  describe('adding songs', () => {
    it('adds a song to empty queue', () => {
      let state = fromJS({
        queue: []
      });
      let nextState = addSongs(state, ["Darude - Sandstorm"]);

      expect(nextState).to.equal(fromJS({
        queue: ["Darude - Sandstorm"]
      }));
    });

    it('adds a song to a preexisting queue', () => {
      let state = fromJS({
        queue: ["Darude - Sandstorm", "Bonetrousle"]
      });
      let nextState = addSongs(state, ["Too Close"]);

      expect(nextState).to.equal(fromJS({
        queue: ["Darude - Sandstorm", "Bonetrousle", "Too Close"]
      }));
    });

    it('adds multiple songs to the queue', () => {
      let state = fromJS({
        queue: ["Darude - Sandstorm", "Bonetrousle"]
      });
      let nextState = addSongs(state, ["Too Close", "Rocket Man"]);

      expect(nextState).to.equal(fromJS({
        queue: ["Darude - Sandstorm", "Bonetrousle", "Too Close", "Rocket Man"]
      }));
    });
  });

  describe('removing a song', () => {
    it('removes a song from the specified index', () => {
      let state = fromJS({
        queue: ["Darude - Sandstorm", "Bonetrousle", "Too Close", "Rocket Man"]
      });
      let nextState = removeSong(state, 1);

      expect(nextState).to.equal(fromJS({
        queue: ["Darude - Sandstorm", "Too Close", "Rocket Man"]
      }));
    });
  });

  describe('finishing current song', () => {
    it('removes the top song from the queue', () => {
      let state = fromJS({
        queue: ["Darude - Sandstorm", "Bonetrousle", "Too Close", "Rocket Man"]
      });
      let nextState = next(state);

      expect(nextState).to.equal(fromJS({
        queue: ["Bonetrousle", "Too Close", "Rocket Man"]
      }));
    });
  });

  describe('shifting a song\'s position', () => {
    it('bumps a song down a position', () => {
      let state = fromJS({
        queue: ["Darude - Sandstorm", "Bonetrousle", "Too Close", "Rocket Man"]
      });
      let nextState = shiftSong(state, 1, 1);

      expect(nextState).to.equal(fromJS({
        queue: ["Darude - Sandstorm", "Too Close", "Bonetrousle", "Rocket Man"]
      }));
    });

    it('bumps a song up a position', () => {
      let state = fromJS({
        queue: ["Darude - Sandstorm", "Bonetrousle", "Too Close", "Rocket Man"]
      });
      let nextState = shiftSong(state, 1, -1);

      expect(nextState).to.equal(fromJS({
        queue: ["Bonetrousle", "Darude - Sandstorm", "Too Close", "Rocket Man"]
      }));
    });
  });

});
