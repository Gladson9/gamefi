import axios from "axios";
import { getGameDetailsURL, getGameScreenshotsURL } from "../api";

export const loadGameDetails = (id) => async (dispatch) => {
  dispatch({
    type: "LOADING_DETAIL",
  });

  const gameDetailsData = await axios.get(getGameDetailsURL(id));
  const gameScreenshotsData = await axios.get(getGameScreenshotsURL(id));
  dispatch({
    type: "GET_DETAIL",
    payload: {
      game: gameDetailsData.data,
      screenshots: gameScreenshotsData.data.results,
    },
  });
};
