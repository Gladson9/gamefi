import React, { useEffect, useState } from "react";

import styled from "styled-components";
import { motion } from "framer-motion";
// redux
import { useDispatch } from "react-redux";
import { loadGameDetails } from "./../actions/detailsAction";

import { smallImage } from "./../util";
import { popUp } from "../animations";
import { FaPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import { doc, setDoc, updateDoc, deleteDoc } from "@firebase/firestore";
import { db } from "../firebase";
import { useHistory } from "react-router";

const GameCard = ({ name, released, id, image, inLibrary, type }) => {
  const { user } = useSelector((state) => state.user);
  const { libraryGames } = useSelector((state) => state.library);
  const history = useHistory();
  const stringPathId = id.toString();
  const [category, setCategory] = useState(type);
  const [gameInLibrary, setGameInLibrary] = useState(
    libraryGames.some((game) => game.id === id.toString())
  );
  // const [addedToLibrary, setAddedToLibrary] = useState(false);
  // load details
  const dispatch = useDispatch();

  const loadDetailHandler = () => {
    // document.body.style.overflow = "hidden";
    dispatch(loadGameDetails(id));
    history.push(`/game/${id}`);
  };

  const addToLibrary = async (e) => {
    setGameInLibrary(true);
    e.stopPropagation();
    if (user) {
      const libraryRef = doc(db, "library", user.uid, "games", id.toString());
      try {
        await setDoc(libraryRef, {
          type: "wishlist",
          name: name,
          released: released,
          image: image,
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      history.push("/login");
    }
  };

  const handleCategoryChange = (e) => {
    e.stopPropagation();
    setCategory(e.target.value);
  };

  useEffect(() => {
    async function setLibraryData() {
      setGameInLibrary(libraryGames.some((game) => game.id === id.toString()));
      if (inLibrary) {
        if (category === "remove") {
          dispatch({
            type: "UPDATE_LIBRARY",
            payload: {
              id: id.toString(),
            },
          });
          await deleteDoc(doc(db, "library", user.uid, "games", id.toString()));
        } else {
          const gameRef = doc(db, "library", user.uid, "games", id.toString());
          await updateDoc(gameRef, {
            type: category,
          });
        }
      }
    }
    setLibraryData();
  }, [category]);
  return (
    <StyledGame
      variants={popUp}
      initial="hidden"
      animate="show"
      layoutId={stringPathId}
    >
      {/* <Link to={`/game/${id}`}> */}
      <motion.img
        onClick={loadDetailHandler}
        layoutId={`image ${stringPathId}`}
        src={smallImage(image, 640)}
        alt={name}
      />
      <motion.h3 onClick={loadDetailHandler} layoutId={`title ${stringPathId}`}>
        {name}
      </motion.h3>
      {/* </Link> */}
      <div>
        <p>Released: {released}</p>
        {inLibrary ? (
          <StyledSelect value={category} onChange={handleCategoryChange}>
            <option className="options" value="wishlist">
              Wishlist
            </option>
            <option className="options" value="current">
              Currently Playing
            </option>
            <option className="options" value="completed">
              Completed
            </option>
            <option className="options" value="remove">
              Remove from Library
            </option>
          </StyledSelect>
        ) : (
          !gameInLibrary && (
            <FaPlus
              className="icon"
              title="Add to Library"
              onClick={addToLibrary}
            />
          )
        )}
      </div>
    </StyledGame>
  );
};

const StyledGame = styled(motion.div)`
  background-color: #293145;
  min-height: 30vh;
  max-width: 25rem;
  border-radius: 1rem;
  cursor: pointer;
  overflow: hidden;
  h3,
  p {
    padding: 0.4rem 1rem;
  }
  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 400px;
  }
  img {
    width: 100%;
    height: 25vh;
    object-fit: cover;
    aspect-ratio: 16/9;
  }
  .icon {
    font-size: 1.2rem;
    color: #ff7920;
    margin-right: 1rem;
  }
  .icon:hover {
    color: #f19456;
  }
`;
const StyledSelect = styled.select`
  background-color: #ffffff;
  border: none;
  padding: 0.2rem 1rem;
  border-radius: 0.2rem;
  margin-right: 1rem;
`;
export default GameCard;
