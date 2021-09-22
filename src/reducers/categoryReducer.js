const initialState = {
  category: "popular",
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_CATEGORY":
      return { ...state, category: action.payload.category };

    default:
      return state;
  }
};

export default categoryReducer;
