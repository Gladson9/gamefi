import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadGames } from "../actions/gamesAction";
import styled from "styled-components";
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";
import GameCard from "./../components/GameCard";
import GameDetail from "./../components/GameDetail";
import { useLocation } from "react-router";
import { fadeIn } from "./../animations";
import Header from "../components/Header";

const Home = () => {
  // getting the current location
  const location = useLocation();
  const pathId = location.pathname.split("/")[2];
  // Fecthing Games from api and storing in the redux store
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadGames());
  }, [dispatch]);

  //   Getting data from the redux store
  const { newGames, popularGames, upcomingGames, searched } = useSelector(
    (state) => state.games
  );
  //Switching category
  const { category } = useSelector((state) => state.category);
  let type;
  switch (category) {
    case "popular":
      type = popularGames;
      break;
    case "upcoming":
      type = upcomingGames;
      break;
    case "new":
      type = newGames;
      break;
    default:
      console.log("Hello");
  }
  return (
    <>
      <Header />

      <GameList variants={fadeIn} initial="hidden" animate="show">
        <AnimateSharedLayout type="crossfade">
          {searched.length ? (
            <div>
              <h2>Searched Results</h2>
              <Games>
                {searched.map((game) => (
                  <GameCard
                    name={game.name}
                    released={game.released}
                    id={game.id}
                    image={game.background_image}
                    key={game.id}
                  />
                ))}
              </Games>
            </div>
          ) : (
            <>
              <h2>{type.name}</h2>
              <Games>
                {type.data
                  ? type.data.map((game) => (
                      <GameCard
                        name={game.name}
                        released={game.released}
                        id={game.id}
                        image={game.background_image}
                        key={game.id}
                      />
                    ))
                  : ""}
              </Games>
            </>
          )}

          <AnimatePresence>
            {pathId && <GameDetail pathId={pathId} />}
          </AnimatePresence>
        </AnimateSharedLayout>
      </GameList>
    </>
  );
};

const GameList = styled(motion.div)`
  padding: 0rem 1rem;
  margin-bottom: 2rem;
  h2 {
    padding: 2rem 0rem;
    font-size: 2.2rem;
  }

  @media screen and (min-width: 720px) {
    padding: 0rem 5rem;
  }
`;
const Games = styled(motion.div)`
  min-height: 80vh;
  display: grid;
  grid-column-gap: 3rem;
  grid-row-gap: 5rem;
  @media screen and (min-width: 420px) {
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  }
`;
export default Home;
