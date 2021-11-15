const initialState = {
  libraryGames: [],
};

const libraryReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "FETCH_LIBRARY":
      if (state.libraryGames.some((game) => game.id === payload.id)) {
        return {
          ...state,
          libraryGames: state.libraryGames.map((game) =>
            game.type !== payload.data.type && game.id === payload.id
              ? {
                  ...game,
                  type: payload.data.type,
                }
              : game
          ),
        };
      }
      return {
        ...state,
        libraryGames: [
          ...state.libraryGames,
          { id: payload.id, ...payload.data },
        ],
      };
    case "UPDATE_LIBRARY":
      return {
        ...state,
        libraryGames: state.libraryGames.filter(
          (game) => game.id !== payload.id
        ),
      };
    default:
      return state;
  }
};

export default libraryReducer;
