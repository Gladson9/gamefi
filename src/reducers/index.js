import { combineReducers } from "redux";
import gamesReducer from "./gamesReducer";
import detailsReducer from "./detailsReducer";
import categoryReducer from "./categoryReducer";
import userReducer from "./userReducer";
import libraryReducer from "./libraryReducer";

const rootReducer = combineReducers({
  games: gamesReducer,
  detail: detailsReducer,
  category: categoryReducer,
  user: userReducer,
  library: libraryReducer,
});

export default rootReducer;
