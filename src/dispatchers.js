export const addQueue = (songs) => ({
  type: "ADD_QUEUE",
  songs: [...songs]
});

export const next = () => ({
  type: "NEXT"
});
