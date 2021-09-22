import React from "react";

import styled from "styled-components";
import { motion } from "framer-motion";
// redux
import { useDispatch } from "react-redux";
import { loadGameDetails } from "./../actions/detailsAction";
import { Link } from "react-router-dom";
import { smallImage } from "./../util";
import { popUp } from "../animations";

const GameCard = ({ name, released, id, image }) => {
  const stringPathId = id.toString();
  // load details
  const dispatch = useDispatch();

  const loadDetailHandler = () => {
    document.body.style.overflow = "hidden";
    dispatch(loadGameDetails(id));
  };
  return (
    <StyledGame
      variants={popUp}
      initial="hidden"
      animate="show"
      layoutId={stringPathId}
      onClick={loadDetailHandler}
    >
      <Link to={`/game/${id}`}>
        <motion.h3 layoutId={`title ${stringPathId}`}>{name}</motion.h3>
        <p>{released}</p>
        <motion.img
          layoutId={`image ${stringPathId}`}
          src={smallImage(image, 640)}
          alt={name}
        />
      </Link>
    </StyledGame>
  );
};

const StyledGame = styled(motion.div)`
  background-color: #293145;
  min-height: 30vh;
  text-align: center;
  border-radius: 1rem;
  cursor: pointer;
  overflow: hidden;
  h3 {
    padding: 1rem;
  }
  img {
    width: 100%;
    height: 40vh;
    object-fit: cover;
  }
`;

export default GameCard;
