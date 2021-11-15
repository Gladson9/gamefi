export const loadLibraryGameData = (gameId, data) => (dispatch) => {
  dispatch({
    type: "FETCH_LIBRARY",
    payload: {
      id: gameId,
      data,
    },
  });
};
