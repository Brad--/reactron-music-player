export const addToQueue = (songs) => ({
  type: "ADD_TO_QUEUE",
  songs: [...songs]
});

export const bumpUp = (index) => ({
  type: "BUMP_UP",
  index: index
});

export const bumpDown = (index) => ({
  type: "BUMP_DOWN",
  index: index
});

export const removeFromQueue = (index) => ({
  type: "REMOVE_FROM_QUEUE",
  index: index
});

export const next = () => ({
  type: "NEXT"
});

export const createPlaylist = (name) => ({
  type: "NEW_PLAYLIST",
  name: name
});

export const removePlaylist = (index) => ({
  type: "REMOVE_PLAYLIST",
  index: index
});

export const selectPlaylist = (name) => ({
  type: "SELECT_PLAYLIST",
  name: name
});

export const addToPlaylist = (name, newSongs) => ({
  type: "ADD_TO_PLAYLIST",
  name: name,
  newSongs: [...newSongs]
});

export const removeFromPlaylist = (name, index) => ({
  type: "REMOVE_FROM_PLAYLIST",
  name: name,
  index: index
});
