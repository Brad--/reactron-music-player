export const addQueue = (songs) => ({
  type: "ADD_QUEUE",
  songs: [...songs]
});

export const next = () => ({
  type: "NEXT"
});

export const createPlaylist = (name) => ({
  type: "NEW_PLAYLIST",
  name: name
});

export const selectPlaylist = (name) => ({
  type: "SELECT_PLAYLIST",
  name: name
});
