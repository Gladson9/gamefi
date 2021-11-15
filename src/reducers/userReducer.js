const initialState = {
  user: null,
};

const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "LOGIN":
      return { ...state, user: { ...payload } };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

export default userReducer;
