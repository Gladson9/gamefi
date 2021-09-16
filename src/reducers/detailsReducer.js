const initialState = {
  game: { platforms: [] },
  screenshots: [],
  isLoading: true,
};

const detailsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "GET_DETAIL":
      return {
        ...state,
        game: payload.game,
        screenshots: payload.screenshots,
        isLoading: false,
      };
    case "LOADING_DETAIL":
      return { ...state, isLoading: true };
    default:
      return state;
  }
};

export default detailsReducer;
