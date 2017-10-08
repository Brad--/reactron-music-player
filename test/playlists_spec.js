import {expect} from 'chai';
import {fromJS} from 'immutable';
import {createNew, deletePlaylist, addToPlaylist, removeFromPlaylist, renamePlaylist, selectPlaylist} from '../src/playlists.js'

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
        }],
        selectedPlaylist: "New Playlist"
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
        ],
        selectedPlaylist: "New Playlist"
      }));
    });
  });

  describe('removing a playlist', () => {
    it('deletes the playlist at the specified index', () => {
      let state = fromJS({
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
        ],
        selectedPlaylist: "New Playlist"
      });
      let nextState = deletePlaylist(state, 1);

      expect(nextState).to.equal(fromJS({
        playlists: [
          {
            name: "Playlist 1",
            songs: ["Roundabout", "Royals"]
          },
          {
            name: "New Playlist",
            songs: []
          }
        ],
        selectedPlaylist: "New Playlist"
      }));
    });
  });

  describe('adding a song to a playlist', () => {
    it('adds a song to a playlist', () => {
      let state = fromJS({
        playlists: [
          {
            name: "Playlist 1",
            songs: [{name: "Roundabout"}, {name: "Royals"}]
          },
          {
            name: "Playlist 2",
            songs: [{name: "Put Your Hands Up"}, {name: "This Is A Stickup"}]
          }
        ]
      });
      let nextState = addToPlaylist(state, "Playlist 1", [fromJS({name: "Put Your Hands Up"})]);

      expect(nextState).to.equal(fromJS({
        playlists: [
          {
            name: "Playlist 1",
            songs: [{name: "Put Your Hands Up"}, {name: "Roundabout"}, {name: "Royals"}]
          },
          {
            name: "Playlist 2",
            songs: [{name: "Put Your Hands Up"}, {name: "This Is A Stickup"}]
          }
        ]
      }));
    });

    it('only allows one instance of each song in a playlist', () => {
      let state = fromJS({
        playlists: [
          {
            name: "Playlist 1",
            songs: [{name: "Roundabout"}, {name: "Royals"}, {name: "This Is A Stickup"}]
          },
          {
            name: "Playlist 2",
            songs: [{name: "Put Your Hands Up"}, {name: "This Is A Stickup"}]
          }
        ]
      });
      let nextState = addToPlaylist(state, "Playlist 1", [fromJS({name: "Put Your Hands Up"}), fromJS({name: "This Is A Stickup"})]);

      expect(nextState).to.equal(fromJS({
        playlists: [
          {
            name: "Playlist 1",
            songs: [{name: "Put Your Hands Up"}, {name: "Roundabout"}, {name: "Royals"}, {name: "This Is A Stickup"}]
          },
          {
            name: "Playlist 2",
            songs: [{name: "Put Your Hands Up"}, {name: "This Is A Stickup"}]
          }
        ]
      }));
    });
  });

  describe('removing a song from a playlist', () => {
    it('removes a song from the specified index', () => {
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
      let nextState = removeFromPlaylist(state, "Playlist 1", 1);

      expect(nextState).to.equal(fromJS({
        playlists: [
          {
            name: "Playlist 1",
            songs: ["Roundabout"]
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

  describe('selecting a different playlist', () => {
    it('updates to reflected the current playlist', () => {
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
        ],
        selectedPlaylist: "Playlist 1"
      });
      let nextState = selectPlaylist(state, "Playlist 2");

      expect(nextState).to.equal(fromJS({
        playlists: [
          {
            name: "Playlist 1",
            songs: ["Roundabout", "Royals", "This Is A Stickup"]
          },
          {
            name: "Playlist 2",
            songs: ["Put Your Hands Up", "This Is A Stickup"]
          }
        ],
        selectedPlaylist: "Playlist 2"
      }));
    });
  });
});
