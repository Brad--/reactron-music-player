import {expect} from 'chai';
import {fromJS} from 'immutable';
import {createNew, addToPlaylist, renamePlaylist} from '../src/playlists.js'

describe('playlists', () => {
  describe('adding a new playlist', () => {
    it('creates an empty playlist', () => {
      let state = fromJS({
        playlists: []
      });
      let nextState = createNew(state);

      expect(nextState).to.equal(fromJS({
        playlists: [{
          name: "New Playlist",
          songs: []
        }]
      }));
    });

    it('does not affect previous playlists', () => {
      let state = fromJS({
        playlists: [
          {
            name: "Playlist 1",
            songs: ["Roundabout", "Royals"]
          },
          {
            name: "Playlist 2",
            songs: ["Put Your Hands Up", "This Is A Stickup"]
          }
        ]
      });
      let nextState = createNew(state);

      expect(nextState).to.equal(fromJS({
        playlists: [
          {
            name: "Playlist 1",
            songs: ["Roundabout", "Royals"]
          },
          {
            name: "Playlist 2",
            songs: ["Put Your Hands Up", "This Is A Stickup"]
          },
          {
            name: "New Playlist",
            songs: []
          }
        ]
      }));
    });
  });

  describe('adding a song to a playlist', () => {
    it('adds a song to a playlist', () => {
      let state = fromJS({
        playlists: [
          {
            name: "Playlist 1",
            songs: ["Roundabout", "Royals"]
          },
          {
            name: "Playlist 2",
            songs: ["Put Your Hands Up", "This Is A Stickup"]
          }
        ]
      });
      let nextState = addToPlaylist(state, "Playlist 1", ["Put Your Hands Up"]);

      expect(nextState).to.equal(fromJS({
        playlists: [
          {
            name: "Playlist 1",
            songs: ["Roundabout", "Royals", "Put Your Hands Up"]
          },
          {
            name: "Playlist 2",
            songs: ["Put Your Hands Up", "This Is A Stickup"]
          }
        ]
      }));
    });

    it('only allows one instance of each song in a playlist', () => {
      let state = fromJS({
        playlists: [
          {
            name: "Playlist 1",
            songs: ["Roundabout", "Royals", "This Is A Stickup"]
          },
          {
            name: "Playlist 2",
            songs: ["Put Your Hands Up", "This Is A Stickup"]
          }
        ]
      });
      let nextState = addToPlaylist(state, "Playlist 1", ["Put Your Hands Up", "This Is A Stickup"]);

      expect(nextState).to.equal(fromJS({
        playlists: [
          {
            name: "Playlist 1",
            songs: ["Roundabout", "Royals", "This Is A Stickup", "Put Your Hands Up"]
          },
          {
            name: "Playlist 2",
            songs: ["Put Your Hands Up", "This Is A Stickup"]
          }
        ]
      }));
    });
  });

  describe('renaming a playlist', () => {
    it('renames a playlist', () => {
      let state = fromJS({
        playlists: [
          {
            name: "Playlist 1",
            songs: ["Roundabout", "Royals", "This Is A Stickup"]
          },
          {
            name: "Playlist 2",
            songs: ["Put Your Hands Up", "This Is A Stickup"]
          }
        ]
      });
      let nextState = renamePlaylist(state, "Playlist 1", "New Name");

      expect(nextState).to.equal(fromJS({
        playlists: [
          {
            name: "New Name",
            songs: ["Roundabout", "Royals", "This Is A Stickup"]
          },
          {
            name: "Playlist 2",
            songs: ["Put Your Hands Up", "This Is A Stickup"]
          }
        ]
      }));
    });
  });
});
