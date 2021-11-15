import { collection, onSnapshot } from "@firebase/firestore";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { loadLibraryGameData } from "../actions/libraryAction";
import GameCard from "../components/GameCard";
import { db } from "../firebase";
import Avatar from "./../components/Avatar";
import { motion } from "framer-motion";
import { FaHeart, FaMedal } from "react-icons/fa";
import { IoLogoGameControllerB } from "react-icons/io";
const Dashboard = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { libraryGames } = useSelector((state) => state.library);

  const loadLibraryData = () => {
    const result = onSnapshot(
      collection(db, "library", user.uid, "games"),
      (doc) => {
        doc.forEach((game) => {
          dispatch(loadLibraryGameData(game.id, game.data()));
        });
      }
    );
  };
  useEffect(() => {
    if (user) {
      loadLibraryData();
    }
  }, []);

  return (
    <DashboardContainer>
      <div className="user-details">
        <Avatar email={user && user.email} />
        <h3>{user && user.email}</h3>
      </div>
      <h3>
        <FaHeart /> Wishlist
      </h3>
      <Games>
        {libraryGames.map(
          (game) =>
            game.type === "wishlist" && (
              <GameCard
                inLibrary={true}
                type={game.type}
                name={game.name}
                released={game.released}
                id={game.id}
                image={game.image}
                key={game.id}
              />
            )
        )}
      </Games>
      <h3>
        <IoLogoGameControllerB /> Currently Playing
      </h3>
      <Games>
        {libraryGames.map(
          (game) =>
            game.type === "current" && (
              <GameCard
                inLibrary={true}
                type={game.type}
                name={game.name}
                released={game.released}
                id={game.id}
                image={game.image}
                key={game.id}
              />
            )
        )}
      </Games>
      <h3>
        <FaMedal /> Completed
      </h3>
      <Games>
        {libraryGames.map(
          (game) =>
            game.type === "completed" && (
              <GameCard
                inLibrary={true}
                type={game.type}
                name={game.name}
                released={game.released}
                id={game.id}
                image={game.image}
                key={game.id}
              />
            )
        )}
      </Games>
    </DashboardContainer>
  );
};
const DashboardContainer = styled.div`
  padding: 0rem 1rem;
  width: 100%;
  margin-bottom: 2rem;
  @media screen and (min-width: 720px) {
    padding: 0rem 5rem;
  }
  .user-details {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  h3 {
    display: flex;
    align-items: center;
    svg {
      margin-right: 1rem;
      height: 1.7rem;
      width: 1.7rem;
    }
  }
`;

const Games = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 2rem;
  @media screen and (min-width: 420px) {
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  }
`;
export default Dashboard;
