import { combineReducers } from "redux";
import gamesReducer from "./gamesReducer";
import detailsReducer from "./detailsReducer";
import categoryReducer from "./categoryReducer";

const rootReducer = combineReducers({
  games: gamesReducer,
  detail: detailsReducer,
  category: categoryReducer,
});

export default rootReducer;
