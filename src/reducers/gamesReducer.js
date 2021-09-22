const initialState = {
  popularGames: { name: "Popular Games" },
  newGames: { name: "New Games" },
  upcomingGames: { name: "Upcoming Games" },
  searched: {},
};

const gamesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_GAMES":
      return {
        ...state,
        popularGames: {
          ...state.popularGames,
          data: action.payload.popularGames,
        },
        newGames: { ...state.newGames, data: action.payload.newGames },
        upcomingGames: {
          ...state.upcomingGames,
          data: action.payload.upcomingGames,
        },
      };
    case "FETCH_SEARCHED":
      return {
        ...state,
        searched: action.payload.searched,
      };
    case "CLEAR_SEARCHED":
      return {
        ...state,
        searched: [],
      };
    default:
      return { ...state };
  }
};

export default gamesReducer;
