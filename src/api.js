// Base URL
const baseURL = "https://api.rawg.io/api/";

//Getting the date
const getCurrentMonth = () => {
  const month = new Date().getMonth() + 1;
  if (month < 10) {
    return `0${month}`;
  } else {
    return month;
  }
};

const getCurrentDay = () => {
  const day = new Date().getDate();
  if (day < 10) {
    return `0${day}`;
  } else {
    return day;
  }
};

const currentYear = new Date().getFullYear();
const currentMonth = getCurrentMonth();
const currentDay = getCurrentDay();
const currentDate = `${currentYear}-${currentMonth}-${currentDay}`;
const lastYear = `${currentYear - 1}-${currentMonth}-${currentDay}`;
const nextYear = `${currentYear + 1}-${currentMonth}-${currentDay}`;

const popularGames = `games?key=${process.env.REACT_APP_API_KEY}&dates=${lastYear},${currentDate}&ordering=-rating&page_size=9`;
const upcomingGames = `games?key=${process.env.REACT_APP_API_KEY}&dates=${currentDate},${nextYear}&ordering=-added&page_size=9`;
const newGames = `games?key=${process.env.REACT_APP_API_KEY}&dates=${lastYear},${currentDate}&orderig=-released&page_size=9`;

// exporting the urls
export const popularGamesURL = () => `${baseURL}${popularGames}`;
export const upcomingGamesURL = () => `${baseURL}${upcomingGames}`;
export const newGamesURL = () => `${baseURL}${newGames}`;

// getting Game Details
export const getGameDetailsURL = (gameId) =>
  `${baseURL}games/${gameId}?key=${process.env.REACT_APP_API_KEY}`;
// getting game screenshots
export const getGameScreenshotsURL = (gameId) =>
  `${baseURL}games/${gameId}/screenshots?key=${process.env.REACT_APP_API_KEY}`;

// Searched Game
export const searchGameURL = (gameName) =>
  `${baseURL}games?search=${gameName}&page_size=12&ordering=-added&key=${process.env.REACT_APP_API_KEY}`;
